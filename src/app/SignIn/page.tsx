"use client";
import React, { useState, useActionState } from "react";
import { loginAction } from "../actions/auth.actions";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export default function BadgerLogin() {
  const [state, action, isPending] = useActionState(loginAction, { error: "" });

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientErrors, setClientErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setClientErrors(newErrors);
    return isValid;
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob [animation-delay:2s]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-2xl ring-1 ring-slate-900/5 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Badger AI" width={45} height={45} />
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                badger<span className="text-indigo-600">.ai</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome back
            </h2>
            <p className="text-slate-600">
              Sign in to your account to continue
            </p>
          </div>

          <form
            action={action}
            onSubmit={handleClientSubmit}
            className="space-y-5"
          >
            {state?.error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {state.error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    clientErrors.email ? "text-red-400" : "text-slate-400"
                  }`}
                />
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (clientErrors.email)
                      setClientErrors({ ...clientErrors, email: "" });
                  }}
                  placeholder="you@company.com"
                  className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all
                    ${
                      clientErrors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                />
              </div>
              {clientErrors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                  {clientErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    clientErrors.password ? "text-red-400" : "text-slate-400"
                  }`}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (clientErrors.password)
                      setClientErrors({ ...clientErrors, password: "" });
                  }}
                  placeholder="Enter your password"
                  className={`w-full bg-white border rounded-xl pl-12 pr-12 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all
                    ${
                      clientErrors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
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
              {clientErrors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                  {clientErrors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="remember"
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 py-3.5 rounded-xl text-white font-semibold transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-slate-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 py-3 rounded-xl font-medium transition-all hover:shadow-md flex items-center justify-center gap-2 text-slate-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button className="bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 py-3 rounded-xl font-medium transition-all hover:shadow-md flex items-center justify-center gap-2 text-slate-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/SignUp"
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Sign up for free
            </Link>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
