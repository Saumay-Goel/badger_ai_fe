import React from "react";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">
            badger<span className="text-indigo-600">.ai</span>
          </span>
        </div>
        <div className="flex gap-8 text-sm text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Twitter
          </a>
        </div>
        <div className="text-slate-400 text-sm">
          © 2024 Badger AI India Pvt Ltd.
        </div>
      </div>
    </footer>
  );
}
