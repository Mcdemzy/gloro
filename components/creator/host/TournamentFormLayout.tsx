"use client";
import React from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface TournamentFormLayoutProps {
  children: React.ReactNode;
  currentStep: 1 | 2 | 3;
  onSaveDraft?: () => void;
  onProceed: () => void;
  proceedLabel?: string;
  proceedDisabled?: boolean;
}

const STEPS = [
  { number: 1, label: "Basic Info" },
  { number: 2, label: "Dates & Schedule" },
  { number: 3, label: "Settings & Rules" },
];

/** Step routes in order */
const STEP_ROUTES: Record<number, string> = {
  1: "/creator/host/tournament",
  2: "/creator/host/tournament/step-2",
  3: "/creator/host/tournament/step-3",
};

const TournamentFormLayout = ({
  children,
  currentStep,
  onSaveDraft,
  onProceed,
  proceedLabel,
  proceedDisabled = false,
}: TournamentFormLayoutProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/creator");
    } else {
      router.push(STEP_ROUTES[currentStep - 1]);
    }
  };

  const isLastStep = currentStep === 3;
  const buttonLabel =
    proceedLabel ?? (isLastStep ? "Submit Tournament" : "Proceed");

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        <span className="font-semibold text-sm">Back</span>
      </button>

      <h1 className="text-3xl font-bold text-white orbitron">
        Create New Tournament
      </h1>

      {/* Warning */}
      <div className="bg-linear-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle
          size={20}
          className="text-red-400 mt-0.5 shrink-0"
        />
        <p className="text-red-400/90 text-sm leading-relaxed">
          <span className="font-semibold">Note:</span> If any team member hasn't
          configured a particular game in their profile, their team won't be
          allowed to register for that game.
        </p>
      </div>

      {/* Step progress */}
      <div className="flex items-center gap-0">
        {STEPS.map((step, idx) => {
          const isComplete = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <React.Fragment key={step.number}>
              {/* Step bubble + label */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all
                    ${
                      isComplete
                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                        : isActive
                          ? "bg-cyan-500 text-white ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/30"
                          : "bg-[#0c3540] text-gray-500 border border-gray-600"
                    }`}
                >
                  {isComplete ? "✓" : step.number}
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap
                    ${isActive ? "text-cyan-400" : isComplete ? "text-cyan-600" : "text-gray-500"}`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-3 mb-5 transition-all
                  ${isComplete ? 'bg-cyan-500' : 'bg-gray-700'}"
                >
                  <div
                    className={`h-full transition-all duration-500 ${isComplete ? "bg-cyan-500" : "bg-gray-700"}`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Done bubble */}
        <div className="flex flex-col items-center gap-1.5 ml-0">
          <div
            className={`px-3 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all
            ${currentStep > 3 ? "bg-cyan-500 text-white" : "bg-[#0c3540] text-gray-500 border border-gray-600"}`}
          >
            Done
          </div>
          <span className="text-xs font-medium text-gray-500">Complete</span>
        </div>

        {/* Save Draft — pushed to the right */}
        {onSaveDraft && (
          <button
            onClick={onSaveDraft}
            className="ml-auto flex items-center gap-1.5 px-5 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 rounded-lg text-sm font-semibold transition-all"
          >
            <FileText size={14} />
            Save Draft
          </button>
        )}
      </div>

      {/* Form card */}
      <div className="bg-linear-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 space-y-8">
        {children}

        {/* Proceed / Submit */}
        <div className="flex justify-end pt-2 border-t border-cyan-500/10">
          <button
            onClick={onProceed}
            disabled={proceedDisabled}
            className="flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/40 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/40"
          >
            {buttonLabel}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentFormLayout;
