import React from "react";
import { Phone, MessageCircle, IndianRupee } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Multilingual Voice Agent",
      description:
        "Badger speaks English, Hindi, and Hinglish. It calls vendors, navigates IVRs, and negotiates rates just like a purchase manager.",
      badge: "Hindi + English",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "WhatsApp & Email Integrated",
      description:
        "Vendors prefer WhatsApp? No problem. Badger engages suppliers on their preferred channel to get quotes faster.",
      badge: null,
    },
    {
      icon: <IndianRupee className="w-5 h-5" />,
      title: "GST Ready Comparison",
      description:
        "We normalize quotes to show Landed Cost (Basic + GST + Freight). Compare 'ex-works' vs 'delivered' prices instantly.",
      badge: null,
    },
  ];

  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Don&apos;t just manage POs. <br />{" "}
            <span className="text-indigo-600">Automate the follow-up.</span>
          </h2>
          <p className="text-lg text-slate-600">
            Traditional ERPs are just forms. Badger is an active agent that
            chases vendors so you don&apos;t have to.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-indigo-100 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                {feature.badge && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    {feature.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
