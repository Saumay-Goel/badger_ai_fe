"use client";

import React, { useState, useRef, useActionState } from "react";
import { verifyOtpAction } from "@/app/actions/auth.actions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function BadgerVerify() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [state, action, isPending] = useActionState(verifyOtpAction, {
    error: "",
  });

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      const pastedData = value.split("").slice(0, 6);
      pastedData.forEach((digit, i) => {
        if (inputRefs.current[i]) newOtp[i] = digit;
      });
      setOtp(newOtp);
      inputRefs.current[pastedData.length - 1]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const fullOtp = otp.join("");

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob [animation-delay:2s]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-2xl ring-1 ring-slate-900/5 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Badger AI" width={40} height={40} />
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                badger<span className="text-indigo-600">.ai</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Verify your email
            </h2>
            <p className="text-slate-600 text-sm">
              We sent a 6-digit code to <br />
              <span className="font-semibold text-slate-900">{email}</span>
            </p>
          </div>
          <div className="mb-6 relative w-48 h-48 mx-auto">
            <Image src="/examine.png" alt="You are almost there" fill />
          </div>

          <form action={action} className="space-y-6">
            {state?.error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium animate-pulse">
                {state.error}
              </div>
            )}

            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="otp" value={fullOtp} />

            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-14 text-center text-2xl font-bold bg-white border rounded-xl text-slate-900 shadow-sm focus:outline-none focus:ring-2 transition-all
                    ${
                      digit
                        ? "border-indigo-500 ring-indigo-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }
                    ${state?.error ? "border-red-300 focus:border-red-500" : ""}
                  `}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isPending || fullOtp.length < 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed py-3.5 rounded-xl text-white font-semibold transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Email
                  <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors hover:underline"
                onClick={() => alert("Resend action here!")}
              >
                Click to resend
              </button>
            </p>
            <div className="mt-4">
              <a
                href="/SignIn"
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-1"
              >
                ← Back to log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
