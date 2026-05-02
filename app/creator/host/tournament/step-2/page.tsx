"use client";

/**
 * Step 2 — Dates & Schedule
 *
 * Fixes vs original:
 * - State persisted in WizardContext (survives back navigation)
 * - Validation is inline, not alert()
 * - Schedules are real WizardSchedule objects with `order` field for the API
 * - Registration close time merged into registrationCloseDate ISO string
 * - `order` auto-increments as schedules are added
 */

import { useState } from "react";
import { Plus, X, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import TournamentFormLayout from "@/components/creator/host/TournamentFormLayout";
import { useWizard, WizardSchedule } from "@/context/TournamentWizardContext";

// ── Schedule modal ────────────────────────────────────────────────────────────

interface ScheduleModalProps {
  nextOrder: number;
  onSave: (s: WizardSchedule) => void;
  onClose: () => void;
}

function ScheduleModal({ nextOrder, onSave, onClose }: ScheduleModalProps) {
  const [form, setForm] = useState<WizardSchedule>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    order: nextOrder,
  });
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!form.title.trim()) {
      setError("Stage name is required");
      return;
    }
    if (!form.startDate) {
      setError("Start date is required");
      return;
    }
    if (!form.endDate) {
      setError("End date is required");
      return;
    }
    if (form.endDate < form.startDate) {
      setError("End date must be after start date");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-linear-to-br from-[#0c3540] to-[#0a2d36] border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6 orbitron">
          Add Schedule Stage
        </h3>

        <div className="space-y-5">
          <div>
            <label className="text-gray-400 text-sm font-medium mb-1.5 block">
              Stage name
            </label>
            <input
              type="text"
              autoFocus
              value={form.title}
              onChange={(e) => {
                setForm((f) => ({ ...f, title: e.target.value }));
                setError("");
              }}
              placeholder="e.g. Qualifiers, Semi Final, Grand Final"
              className="w-full px-4 py-2.5 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm font-medium mb-1.5 block">
              Description (optional)
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Best of 3, etc."
              className="w-full px-4 py-2.5 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                Start date
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => {
                  setForm((f) => ({ ...f, startDate: e.target.value }));
                  setError("");
                }}
                className="w-full px-3 py-2.5 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                End date
              </label>
              <input
                type="date"
                value={form.endDate}
                min={form.startDate}
                onChange={(e) => {
                  setForm((f) => ({ ...f, endDate: e.target.value }));
                  setError("");
                }}
                className="w-full px-3 py-2.5 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg"
            >
              Add stage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDateRange(start: string, end: string) {
  if (!start || !end) return "";
  const fmt = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  return `${fmt(start)} → ${fmt(end)}`;
}

function DateInput({
  label,
  value,
  onChange,
  required,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  min?: string;
}) {
  return (
    <div>
      <label className="text-white font-semibold mb-2 block text-sm">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors appearance-none"
        />
        <Calendar
          className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400/60 pointer-events-none"
          size={16}
        />
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function HostTournamentStep2() {
  const router = useRouter();
  const {
    state,
    setStartDate,
    setEndDate,
    setRegistrationOpenDate,
    setRegistrationCloseDate,
    addSchedule,
    removeSchedule,
  } = useWizard();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Local time state (merged into close date on change)
  const [closeTime, setCloseTime] = useState("23:59");

  const handleCloseDateTime = (date: string, time: string) => {
    if (date) {
      // Store as "YYYY-MM-DDTHH:mm" — converted to ISO on submit
      setRegistrationCloseDate(`${date}T${time}`);
    }
  };

  // Parse stored close date back to date/time parts for display
  const closeDatePart = state.registrationCloseDate
    ? (state.registrationCloseDate.split("T")[0] ?? "")
    : "";

  const handleProceed = () => {
    const e: Record<string, string> = {};
    if (!state.startDate) e.startDate = "Start date required";
    if (!state.endDate) e.endDate = "End date required";
    if (state.endDate && state.startDate && state.endDate < state.startDate)
      e.endDate = "End date must be after start date";
    if (!state.registrationOpenDate)
      e.regOpen = "Registration open date required";
    if (!closeDatePart) e.regClose = "Registration close date required";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    router.push("/creator/host/tournament/step-3");
  };

  return (
    <>
      <TournamentFormLayout currentStep={2} onProceed={handleProceed}>
        {/* Tournament dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <DateInput
              label="Tournament Start Date"
              value={state.startDate}
              onChange={(v) => {
                setStartDate(v);
                setErrors((e) => ({ ...e, startDate: "" }));
              }}
              required
            />
            {errors.startDate && (
              <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>
            )}
          </div>
          <div>
            <DateInput
              label="Tournament End Date"
              value={state.endDate}
              onChange={(v) => {
                setEndDate(v);
                setErrors((e) => ({ ...e, endDate: "" }));
              }}
              required
              min={state.startDate}
            />
            {errors.endDate && (
              <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Registration dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <DateInput
              label="Registration Opens"
              value={state.registrationOpenDate}
              onChange={(v) => {
                setRegistrationOpenDate(v);
                setErrors((e) => ({ ...e, regOpen: "" }));
              }}
              required
            />
            {errors.regOpen && (
              <p className="text-red-400 text-xs mt-1">{errors.regOpen}</p>
            )}
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block text-sm">
              Registration Closes <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="date"
                  value={closeDatePart}
                  max={state.startDate || undefined}
                  onChange={(e) => {
                    handleCloseDateTime(e.target.value, closeTime);
                    setErrors((er) => ({ ...er, regClose: "" }));
                  }}
                  className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors appearance-none"
                />
                <Calendar
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/60 pointer-events-none"
                  size={16}
                />
              </div>
              <input
                type="time"
                value={closeTime}
                onChange={(e) => {
                  setCloseTime(e.target.value);
                  handleCloseDateTime(closeDatePart, e.target.value);
                }}
                className="w-28 px-3 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm"
              />
            </div>
            {errors.regClose && (
              <p className="text-red-400 text-xs mt-1">{errors.regClose}</p>
            )}
          </div>
        </div>

        {/* Schedules */}
        <div>
          <label className="text-white font-semibold mb-2 block">
            Tournament Stages
          </label>
          <p className="text-gray-500 text-sm mb-4">
            Add stages like Qualifiers, Group Stage, Semi Finals, Grand Final.
          </p>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 px-4 py-2.5 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 border border-cyan-500/20 text-sm font-medium"
          >
            <Plus size={16} />
            Add stage
          </button>

          <div className="space-y-2.5">
            {state.schedules.length === 0 ? (
              <p className="text-gray-600 text-sm text-center py-6 border border-dashed border-gray-700 rounded-xl">
                No stages added yet. Stages are optional but recommended.
              </p>
            ) : (
              state.schedules.map((sc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-[#0a2d36] border border-cyan-500/15 rounded-xl group hover:border-cyan-400/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {sc.order}
                    </span>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {sc.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {formatDateRange(sc.startDate, sc.endDate)}
                        {sc.description ? ` · ${sc.description}` : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSchedule(idx)}
                    className="text-red-400/60 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </TournamentFormLayout>

      {showModal && (
        <ScheduleModal
          nextOrder={state.schedules.length + 1}
          onSave={(sc) => {
            addSchedule(sc);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
