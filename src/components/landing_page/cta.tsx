import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to modernize your purchasing?
          </h2>
          <p className="text-indigo-100 mb-10 max-w-2xl mx-auto text-lg">
            Join Indian MSMEs and Enterprises saving 20+ hours a week with
            Badger AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 transform flex items-center justify-center gap-2">
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">
            No credit card required • Works with Tally/Zoho
          </p>
        </div>
      </div>
    </section>
  );
}
