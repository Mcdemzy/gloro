"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/lib/api/validation/schemas";
import { useForgotPassword } from "@/lib/hooks/auth/useAuth";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { onSubmit, isLoading, sent } = useForgotPassword();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleFormSubmit = (data: ForgotPasswordFormValues) => {
    onSubmit(data.email);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto flex-1">
        {/* Back button */}
        <button
          onClick={() => router.push("/auth/login")}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors group"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to login
        </button>

        {!sent ? (
          <>
            {/* Header */}
            <div className="mb-7">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(78,7,224,0.3), rgba(141,45,226,0.3))",
                  border: "1px solid rgba(141,45,226,0.4)",
                }}
              >
                <Mail size={22} className="text-purple-300" />
              </div>
              <h3 className="text-white text-xl font-bold tracking-wide mb-1">
                Forgot your password?
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                No worries. Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <FormInput
                label="Email address"
                type="email"
                placeholder="Enter your email"
                icon={<Mail size={18} />}
                error={errors.email?.message}
                {...register("email")}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/40 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(90deg, #4E07E0, #8D2DE2)",
                }}
              >
                {isLoading ? "Sending…" : "Send reset link"}
              </button>
            </form>
          </>
        ) : (
          /* Success state */
          <div className="flex flex-col items-center text-center pt-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(78,7,224,0.2), rgba(6,182,212,0.2))",
                border: "1px solid rgba(6,182,212,0.35)",
              }}
            >
              <CheckCircle2 size={30} className="text-cyan-400" />
            </div>

            <h3 className="text-white text-xl font-bold mb-2">
              Check your inbox
            </h3>
            <p className="text-white/45 text-sm leading-relaxed mb-1">
              We sent a reset link to
            </p>
            <p className="text-cyan-400 text-sm font-medium mb-6">
              {getValues("email")}
            </p>
            <p className="text-white/30 text-xs leading-relaxed mb-8">
              Didn't get it? Check your spam folder or{" "}
              <button
                onClick={() => onSubmit(getValues("email"))}
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
              >
                resend
              </button>
              .
            </p>

            <button
              onClick={() => router.push("/auth/login")}
              className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm transition-colors"
            >
              <ArrowLeft size={14} />
              Back to login
            </button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
