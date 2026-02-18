"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle, RefreshCw, Shield, LogOut } from "lucide-react";
import { toast } from "sonner";

interface Step3TokenProps {
  refreshToken: string;
  accessToken?: string | null;
  grantedScopes?: string[];
  onReset: () => void;
}

export function Step3Token({
  refreshToken,
  accessToken,
  grantedScopes = [],
  onReset,
}: Step3TokenProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full mb-4 ring-1 ring-emerald-500/20">
          <CheckCircle size={24} />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-zinc-100">
          Token generated
        </h1>
        <p className="text-zinc-500 text-sm">
          Copy the <strong className="text-zinc-400">Refresh Token</strong> to
          your application (e.g. Home Assistant).
        </p>
      </div>

      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 shadow-xl overflow-hidden">
        <div className="bg-black/40 px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
            JSON Response
          </span>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <RefreshCw size={12} /> Refresh Token
              </label>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                Permanent
              </span>
            </div>
            <div className="relative group">
              <div className="bg-black/60 p-4 rounded-lg font-mono text-xs text-zinc-300 break-all border border-zinc-800 group-hover:border-emerald-500/30 transition-colors">
                {refreshToken}
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(refreshToken, "refresh")}
                className="absolute top-2 right-2 p-2 bg-zinc-800 rounded hover:text-emerald-400 text-zinc-400 transition-colors opacity-0 group-hover:opacity-100 border border-zinc-700"
              >
                {copied === "refresh" ? (
                  <CheckCircle size={14} />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>

          {accessToken && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Shield size={12} /> Access Token
                </label>
                <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded border border-zinc-700 font-medium">
                  Expires ~1h
                </span>
              </div>
              <div className="relative group">
                <div className="bg-black/60 p-4 rounded-lg font-mono text-xs text-zinc-500 truncate border border-zinc-800 group-hover:border-zinc-600 transition-colors">
                  {accessToken}
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(accessToken, "access")}
                  className="absolute top-2 right-2 p-2 bg-zinc-800 rounded hover:text-white text-zinc-500 transition-colors opacity-0 group-hover:opacity-100 border border-zinc-700"
                >
                  {copied === "access" ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          )}

          {grantedScopes.length > 0 && (
            <div className="pt-4 border-t border-zinc-800/50">
              <div className="text-[10px] uppercase text-zinc-600 font-bold mb-2">
                Granted Scopes
              </div>
              <div className="flex flex-wrap gap-2">
                {grantedScopes.map((scope) => (
                  <span
                    key={scope}
                    className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded border border-zinc-700/50"
                  >
                    {scope}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-zinc-900 px-6 py-4 border-t border-zinc-800 flex justify-center">
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-300 flex items-center gap-2 transition-colors"
          >
            <LogOut size={12} /> Clear Session
          </button>
        </div>
      </div>
    </motion.div>
  );
}
