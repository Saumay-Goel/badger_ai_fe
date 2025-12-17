import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 z-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Made for Indian Manufacturing
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Automate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              Purchase Dept.
            </span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
            Stop spending hours calling IndiaMART leads. Badger AI autonomously
            calls, WhatsApps, and negotiates with vendors to get you the best
            rates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/SignIn"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-xl shadow-indigo-500/25 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
            >
              Checkout
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold"
                >
                  {i}
                </div>
              ))}
            </div>
            <p>Trusted by 500+ Indian factories</p>
          </div>
        </div>

        {/* Hero Visual - AI Simulation */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-full">
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden p-6 ring-1 ring-slate-900/5">
            {/* Header of Mock App */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Badger Agent</h3>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Active • Calling Vendors
                  </p>
                </div>
              </div>
              <div className="text-xs font-mono text-slate-400">PO: #2094</div>
            </div>

            {/* Chat Simulation */}
            <div className="space-y-4 font-mono text-sm">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-slate-600">YOU</span>
                </div>
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm text-slate-700 w-full">
                  <p>
                    I need 200 sheets of SS 304 Grade for the Okhla Ph-3
                    factory. Get me the best rates with a GST bill urgently.
                  </p>
                </div>
              </div>

              <div className="flex justify-center py-2">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                  Connecting to 12 Dealers in NCR...
                </span>
              </div>

              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none shadow-md w-full">
                  <p className="mb-2">
                    Update: Sir, I have received quotes from 3 vendors.
                  </p>
                  <div className="bg-white/10 rounded-lg p-2 space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-white/10 pb-1">
                      <span>Gupta Steels</span>
                      <span className="font-bold">₹4,200 (Ready Stock)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Balaji Metals</span>
                      <span className="font-bold">₹3,950 (2 Days)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area Mock */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
              <div className="h-10 bg-slate-50 rounded-lg flex-1 border border-slate-200 flex items-center px-3 text-gray-400 text-xs">
                Type your purchase requirements...
              </div>
              <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce duration-[3000ms]">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">
                Cost Saved
              </p>
              <p className="text-lg font-bold text-slate-900">₹25,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
