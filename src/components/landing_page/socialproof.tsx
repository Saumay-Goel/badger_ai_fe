import React from "react";

export default function SocialProof() {
  return (
    <section className="py-10 border-y border-slate-200 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Empowering Procurement Teams At
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-xl font-bold text-slate-800">
            TATA<span className="font-light">Projects</span>
          </div>
          <div className="text-xl font-bold text-slate-800">
            L&T<span className="font-light">Construction</span>
          </div>
          <div className="text-xl font-bold text-slate-800">
            JSW<span className="font-light">Steel</span>
          </div>
          <div className="text-xl font-bold text-slate-800">Havells</div>
        </div>
      </div>
    </section>
  );
}
