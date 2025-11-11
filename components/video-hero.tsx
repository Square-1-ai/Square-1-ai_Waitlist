import React from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoHero() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 overflow-hidden">
      {/* subtle stars/dots */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-30" />
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_40%)] opacity-30 rounded-full pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Mock video / app screenshot card */}
        <div className="flex justify-center">
          <div className="relative rounded-2xl bg-gradient-to-br from-[#0b1220] to-[#121212] border border-white/6 shadow-2xl w-full max-w-5xl overflow-hidden">
            {/* top controls bar */}
            <div className="flex items-center gap-4 px-6 py-3 bg-black/20 backdrop-blur-sm">
              <div className="w-8 h-8 bg-white/6 rounded-full" />
              <div className="w-28 h-8 bg-white/4 rounded-md" />
              <div className="ml-auto flex items-center gap-3 text-sm text-blue-200">
                <span className="px-3 py-1 bg-white/6 rounded-md">All mail</span>
                <span className="px-3 py-1">Unread</span>
              </div>
            </div>

            <div className="md:flex">
              {/* left column (sidebar) */}
              <div className="hidden md:block md:w-56 bg-gradient-to-b from-black/20 to-black/10 p-4">
                <div className="h-10 bg-white/4 rounded mb-4" />
                <ul className="space-y-3 text-sm text-blue-100">
                  <li className="flex justify-between items-center px-3 py-2 bg-white/3 rounded">Inbox <span className="text-xs bg-white/6 px-2 py-0.5 rounded">128</span></li>
                  <li className="px-3 py-2">Drafts</li>
                  <li className="px-3 py-2">Sent</li>
                  <li className="px-3 py-2">Junk</li>
                </ul>
              </div>

              {/* main content (video area/mock) */}
              <div className="flex-1 p-6">
                <div className="relative rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 p-6">
                  <div className="h-64 md:h-80 rounded-lg bg-gradient-to-br from-[#0f1724] to-[#111827] flex items-center justify-center">
                    {/* play button */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-white/8 flex items-center justify-center hover:scale-105 transition-transform">
                        <div className="w-0 h-0 border-l-[18px] border-l-white border-t-[12px] border-b-[12px] border-t-transparent border-b-transparent ml-1" />
                      </div>
                      <div className="text-left text-blue-100 max-w-xl">
                        <div className="text-xl font-semibold">Dashboard demo</div>
                        <div className="text-sm text-slate-300">See how components come to life with motion and state.</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-blue-200">
                    <div>Oct 22, 2023 · 9:00 AM</div>
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1 bg-white/6 rounded">Share</button>
                      <button className="px-3 py-1 bg-white/6 rounded">Open</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
