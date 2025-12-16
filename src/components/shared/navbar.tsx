"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const noNavbarRoutes = ["/SignIn", "/SignUp", "/forgot-password", "/verify"];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (noNavbarRoutes.includes(pathname)) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrollY > 20
            ? "bg-white/80 backdrop-blur-lg border-b border-gray-200/50 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Badger AI"
                fill
                className="object-contain p-1"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              badger<span className="text-indigo-600">.ai</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it Works", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item}
              </a>
            ))}

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <div className="flex flex-col text-right hidden lg:block">
                  <span className="text-sm font-semibold text-slate-900">
                    {user.username}
                  </span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/SignIn">
                <button className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                  Get Started
                </button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-in slide-in-from-top-10 fade-in duration-200">
          <div className="flex flex-col gap-6 text-center">
            {["Features", "How it Works", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-slate-900 hover:text-indigo-600"
              >
                {item}
              </a>
            ))}
            <hr className="border-slate-100" />

            {user ? (
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="font-semibold text-slate-900">
                    {user.username}
                  </p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-5 py-3.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/SignIn" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-5 py-3.5 bg-slate-900 text-white font-semibold rounded-xl shadow-lg active:scale-95 transition-transform">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
