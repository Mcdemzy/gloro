"use client";
import { useState } from "react";
import { Plus, Calendar, X } from "lucide-react";
import { useRouter } from "next/navigation";
import TournamentFormLayout from "@/components/creator/host/TournamentFormLayout";

interface Schedule {
  startDate: string;
  endDate: string;
  stage: string;
}

export default function HostTournamentStep2() {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationOpenDate, setRegistrationOpenDate] = useState("");
  const [registrationCloseDate, setRegistrationCloseDate] = useState("");
  const [registrationCloseTime, setRegistrationCloseTime] = useState("12:00");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState<Schedule>({
    startDate: "",
    endDate: "",
    stage: "",
  });

  const handleAddSchedule = () => {
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = () => {
    if (scheduleForm.startDate && scheduleForm.endDate && scheduleForm.stage) {
      setSchedules([...schedules, { ...scheduleForm }]);
      setScheduleForm({ startDate: "", endDate: "", stage: "" });
      setShowScheduleModal(false);
    }
  };

  const handleRemoveSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const formatDateRange = (start: string, end: string) => {
    if (!start || !end) return "";
    const startObj = new Date(start);
    const endObj = new Date(end);
    const startMonth = startObj.toLocaleDateString("en-US", { month: "short" });
    const endMonth = endObj.toLocaleDateString("en-US", { month: "short" });
    const startDay = startObj.getDate();
    const endDay = endObj.getDate();

    return `${startMonth} ${startDay} • ${endMonth} ${endDay}`;
  };

  const handleSaveDraft = () => {
    console.log("Saving step 2 draft:", {
      startDate,
      endDate,
      registrationOpenDate,
      registrationCloseDate,
      registrationCloseTime,
      schedules,
    });
    alert("Tournament dates saved as draft!");
  };

  const handleProceed = () => {
    if (!startDate || !endDate) {
      alert("Please enter start and end dates");
      return;
    }

    if (!registrationOpenDate || !registrationCloseDate) {
      alert("Please enter registration dates");
      return;
    }

    // Navigate to step 3
    router.push("/creator/host/tournament/step-3");
  };

  const handleBack = () => {
    router.push("/creator/host/tournament");
  };

  return (
    <TournamentFormLayout
      currentStep={2}
      onSaveDraft={handleSaveDraft}
      onProceed={handleProceed}
    >
      {/* Start and End Date */}
      <div>
        <label className="text-white font-semibold mb-3 block">
          Start and End Date <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <Calendar
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
              size={20}
            />
          </div>
          <span className="text-gray-400 text-xl">~</span>
          <div className="flex-1 relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <Calendar
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Registration Open Date */}
      <div>
        <label className="text-white font-semibold mb-3 block">
          Registration Open Date <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            value={registrationOpenDate}
            onChange={(e) => setRegistrationOpenDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <Calendar
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {/* Registration Close Date */}
      <div>
        <label className="text-white font-semibold mb-3 block">
          Registration Close Date <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="date"
              value={registrationCloseDate}
              onChange={(e) => setRegistrationCloseDate(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <Calendar
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
              size={20}
            />
          </div>
          <span className="text-gray-400">&</span>
          <div className="flex-1">
            <input
              type="time"
              value={registrationCloseTime}
              onChange={(e) => setRegistrationCloseTime(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Scheduling */}
      <div>
        <label className="text-white font-semibold mb-3 block">
          Scheduling
        </label>

        {/* Add Schedule Button */}
        <button
          type="button"
          onClick={handleAddSchedule}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 px-4 py-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20"
        >
          <Plus size={18} />
          Click on the + icon to add Schedule (s)
        </button>

        {/* Schedule List */}
        <div className="space-y-3">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#0a2d36] border border-cyan-500/20 rounded-lg group hover:border-cyan-400/50 transition-all"
            >
              <div>
                <p className="text-white font-medium">
                  {formatDateRange(schedule.startDate, schedule.endDate)}
                </p>
                <p className="text-gray-400 text-sm">{schedule.stage}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSchedule(index)}
                className="text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={20} />
              </button>
            </div>
          ))}

          {schedules.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              No schedules added yet. Add tournament stages like Qualifiers,
              Semi Finals, etc.
            </p>
          )}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowScheduleModal(false)}
          ></div>

          <div className="relative bg-gradient-to-br from-[#0c3540] to-[#0a2d36] border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Add Schedule</h3>

            <div className="space-y-6">
              {/* Date Range */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Date Range
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={scheduleForm.startDate}
                    onChange={(e) =>
                      setScheduleForm({
                        ...scheduleForm,
                        startDate: e.target.value,
                      })
                    }
                    className="flex-1 px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="date"
                    value={scheduleForm.endDate}
                    onChange={(e) =>
                      setScheduleForm({
                        ...scheduleForm,
                        endDate: e.target.value,
                      })
                    }
                    className="flex-1 px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Stage */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Stage Name
                </label>
                <input
                  type="text"
                  value={scheduleForm.stage}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, stage: e.target.value })
                  }
                  placeholder="e.g., Qualifiers, Semi Final, Grand Final"
                  className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSchedule}
                  className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all shadow-lg"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </TournamentFormLayout>
  );
}
