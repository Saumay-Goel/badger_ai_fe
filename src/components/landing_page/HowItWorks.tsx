import React from "react";
import { FileText, Bot, IndianRupee } from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            How Badger Works
          </h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-slate-700 z-0"></div>

          {[
            {
              title: "You Request",
              desc: "Upload a BOM or send a voice note on WhatsApp describing what you need.",
              icon: <FileText />,
            },
            {
              title: "AI Negotiates",
              desc: "Badger calls local dealers and emails distributors to compare rates.",
              icon: <Bot />,
            },
            {
              title: "Results Ready",
              desc: "Get a comparison table with landed costs (GST + Freight) included.",
              icon: <IndianRupee />,
            },
          ].map((step, index) => (
            <div key={index} className="relative z-10">
              <div className="w-24 h-24 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl relative group">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform opacity-0 group-hover:opacity-100 duration-500"></div>
                <div className="text-indigo-400 group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold border-4 border-slate-900">
                  {index + 1}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed px-4">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
