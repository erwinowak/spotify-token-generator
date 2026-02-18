"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

const SITE_URL = "https://erwinowak.dev";
const FAVICON = `https://www.google.com/s2/favicons?domain=erwinowak.dev&sz=128`;

/**
 * Strefa hover obejmuje link + obszar dymku (pt-[7.5rem]), żeby można było najechać na dymek i kliknąć bez znikania.
 */
const TOOLTIP_HOVER_ZONE_REM = 7.5;

export function AuthorCredit() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block"
      style={{
        paddingTop: `${TOOLTIP_HOVER_ZONE_REM}rem`,
        marginTop: `-${TOOLTIP_HOVER_ZONE_REM}rem`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wrapper bez paddingu – dymek pozycjonowany względem niego, więc tuż nad linkiem */}
      <span className="relative inline-block">
        <Link
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 text-emerald-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 outline-none"
        >
          Erwin Nowak
          <ExternalLink size={12} className="shrink-0" />
        </Link>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64"
            >
            <div className="relative">
              <Link
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full rounded-xl border border-zinc-700 bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <div className="p-4 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={FAVICON}
                        alt=""
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-semibold text-zinc-200 text-sm truncate">
                        Erwin Nowak
                      </span>
                      <span className="block text-[11px] text-emerald-400/90 font-mono truncate">
                        erwinowak.dev
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                    <Sparkles size={10} className="text-emerald-500/80 shrink-0" />
                    <span>AI Architect & Modern Websites</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center gap-2 text-emerald-400 text-xs font-medium">
                    <span>Visit site</span>
                    <ExternalLink size={10} />
                  </div>
                </div>
              </Link>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b border-zinc-700 bg-zinc-900/95" />
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}
