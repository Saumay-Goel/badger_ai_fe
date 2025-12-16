"use client";
import React, { useState, useActionState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupAction } from "@/app/actions/auth.actions";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  User,
  CheckCircle,
  Loader2,
  Check,
  AtSign,
} from "lucide-react";

const initialState = {
  error: "",
  success: false,
  email: "",
};

export default function BadgerSignup() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState
  );

  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, label: "Credentials" },
    { id: 2, label: "Personal Details" },
    { id: 3, label: "Confirmation" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Effect: Handle Success Redirect
  useEffect(() => {
    if (state?.success) {
      const targetEmail = state.email || formData.email;

      const stepTimer = setTimeout(() => {
        setCurrentStep(3); // Show Success UI
      }, 0);

      const redirectTimer = setTimeout(() => {
        router.push(`/verify?email=${encodeURIComponent(targetEmail)}`);
      }, 2000);

      return () => {
        clearTimeout(stepTimer);
        clearTimeout(redirectTimer);
      };
    }
  }, [state, formData.email, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email";

      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Min 8 chars";

      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords mismatch";
      if (Object.keys(newErrors).length > 0) isValid = false;
    }

    if (step === 2) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Required";
        isValid = false;
      }
      if (!formData.username.trim()) {
        newErrors.username = "Required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    if (currentStep === 2) {
      if (!validateStep(2)) {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep(1)) setCurrentStep(2);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  const getInputClasses = (fieldName: string) => {
    return `w-full bg-white border rounded-xl pl-12 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
      errors[fieldName]
        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
    }`;
  };

  const getIconClasses = (fieldName: string) => {
    return `absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
      errors[fieldName] ? "text-red-400" : "text-slate-400"
    }`;
  };

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob [animation-delay:2s]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#FFFFFF] backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-2xl ring-1 ring-slate-900/5 p-8">
          <div className="flex flex-row justify-center inline-flex items-center gap-2 mb-8 w-full">
            <Image src="/logo.png" alt="Badger AI" width={45} height={45} />
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              badger<span className="text-indigo-600">.ai</span>
            </span>
          </div>

          {/* Stepper Visuals */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10"></div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full -z-10 transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              ></div>
              {steps.map((step) => {
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 
                        ${
                          isCompleted || isActive
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-white border-slate-300 text-slate-400"
                        }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <span className="font-semibold">{step.id}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 px-1">
              {steps.map((step) => (
                <span
                  key={step.id}
                  className={`text-xs font-medium transition-colors duration-300 ${
                    currentStep >= step.id
                      ? "text-indigo-800"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>

          {currentStep === 3 ? (
            <div className="text-center animate-in zoom-in-95 duration-500">
              <div className="mb-6 relative w-48 h-48 mx-auto">
                <Image src="/whistle.png" alt="You are almost there" fill />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Account Created Successfully!
              </h2>
              <p className="text-slate-600 mb-8">
                Welcome to badger.ai. Please verify your email.
              </p>
              <div className="w-full bg-indigo-600 hover:bg-indigo-900 py-3.5 rounded-xl text-white font-semibold transition-all hover:shadow-xl text-center cursor-pointer">
                Redirecting...
              </div>
            </div>
          ) : (
            // 3. The Form Element wraps EVERYTHING.
            // Notice: inputs are hidden via CSS, not removed from DOM.
            <form
              action={formAction}
              onSubmit={handleClientSubmit}
              className="space-y-5"
            >
              {state?.error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg animate-in fade-in">
                  {state.error}
                </div>
              )}

              {/* === STEP 1 FIELDS (Hidden if currentStep !== 1) === */}
              <div
                className={
                  currentStep === 1
                    ? "space-y-5 animate-in fade-in slide-in-from-right-8 duration-300"
                    : "hidden"
                }
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={getIconClasses("email")} />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={getInputClasses("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className={getIconClasses("password")} />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 8 characters"
                      className={`${getInputClasses("password")} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <CheckCircle
                      className={getIconClasses("confirmPassword")}
                    />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className={`${getInputClasses("confirmPassword")} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={
                  currentStep === 2
                    ? "space-y-5 animate-in fade-in slide-in-from-right-8 duration-300"
                    : "hidden"
                }
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={getIconClasses("fullName")} />
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={getInputClasses("fullName")}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <AtSign className={getIconClasses("username")} />
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="johndoe123"
                      className={getInputClasses("username")}
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="flex items-start gap-2 text-sm bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                  <div className="mt-0.5">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-slate-600 leading-snug">
                    By creating an account, you agree to our{" "}
                    <a
                      href="#"
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      Terms of Service
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-2">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBackClick}
                    disabled={isPending}
                    className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back
                  </button>
                )}

                {currentStep < 2 ? (
                  // Step 1 Button: Just a normal button, not submit
                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 py-3.5 rounded-xl text-white font-semibold transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Next Step
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  // Step 2 Button: The REAL Submit button that triggers formAction
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 py-3.5 rounded-xl text-white font-semibold transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Account
                        <CheckCircle className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}

          {currentStep !== 3 && (
            <div className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/SignIn"
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                Sign in instead
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
