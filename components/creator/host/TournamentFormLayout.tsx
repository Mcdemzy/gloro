"use client";
import React from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface TournamentFormLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onSaveDraft?: () => void;
  onProceed?: () => void;
  showProceedButton?: boolean;
}

const TournamentFormLayout = ({
  children,
  currentStep,
  onSaveDraft,
  onProceed,
  showProceedButton = true,
}: TournamentFormLayoutProps) => {
  const router = useRouter();

  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Dates & Schedule" },
    { number: 3, label: "Rules & Details" },
    { number: 4, label: "Complete" },
  ];

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/creator");
    } else {
      router.push(
        `/creator/host/tournament${currentStep > 2 ? `/step-${currentStep - 1}` : ""}`,
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-white">Create New Tournament</h1>

      {/* Warning Alert */}
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={24} className="text-red-400 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-red-400 font-semibold mb-1">
            NOTE: If one of the team members is yet to set config for a
            particular game they are applying to, the team wont be allowed to
            register for the game.
          </h3>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        {steps.map((step) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step.number <= currentStep
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-600 text-gray-400"
                }`}
              >
                {step.number}
              </div>
              {step.number < 4 && (
                <div
                  className={`h-1 w-20 ${
                    step.number < currentStep ? "bg-cyan-500" : "bg-gray-600"
                  }`}
                ></div>
              )}
            </div>
            {step.number === 4 && (
              <div className="w- h-8 rounded-full text-gray-400 flex items-center justify-center font-semibold text-sm">
                Done
              </div>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={onSaveDraft}
          className="ml-auto px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-400 rounded-lg font-semibold transition-all"
        >
          Save as Draft
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 space-y-8">
        {children}

        {/* Proceed Button */}
        {showProceedButton && (
          <div className="flex justify-end pt-4">
            <button
              onClick={onProceed}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
            >
              Proceed
              <ArrowLeft size={20} className="rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentFormLayout;
