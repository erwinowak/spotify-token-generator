"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code, CheckCircle } from "lucide-react";
import {
  availableScopesWithCategories,
  scopeCategories,
} from "@/lib/spotify-scopes";
import { generateSpotifyAuthUrl } from "@/lib/spotify";
import type { FormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface Step2ScopesProps {
  formData: FormData;
  onBack: () => void;
  onAuthorize: (data: FormData) => void;
}

export function Step2Scopes({ formData, onBack, onAuthorize }: Step2ScopesProps) {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(
    formData.scopes?.length ? formData.scopes : ["user-read-currently-playing"]
  );

  const toggleScope = (scopeId: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scopeId)
        ? prev.filter((id) => id !== scopeId)
        : [...prev, scopeId]
    );
  };

  const handleAuthorize = () => {
    if (selectedScopes.length === 0) return;
    const fullData: FormData = {
      ...formData,
      scopes: selectedScopes,
      redirectUri: formData.redirectUri || "",
    };
    onAuthorize(fullData);
  };

  const scopeKey = selectedScopes.join(",");
  const previewAuthUrl = useMemo(() => {
    if (!formData.clientId || !scopeKey) return null;
    const uri = formData.redirectUri || "";
    try {
      return generateSpotifyAuthUrl(
        { ...formData, scopes: selectedScopes, redirectUri: uri },
        "preview",
        uri
      );
    } catch {
      return null;
    }
  }, [formData, scopeKey, selectedScopes]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Scopes</h1>
        <p className="text-zinc-500 text-sm">
          Select which permissions the token should have access to.
        </p>
      </div>

      <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 shadow-xl">
        <div className="space-y-6">
          {scopeCategories.map((cat) => (
            <div key={cat}>
              <h3 className="text-xs font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                {cat}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableScopesWithCategories
                  .filter((s) => s.category === cat)
                  .map((scope) => {
                    const isSelected = selectedScopes.includes(scope.id);
                    return (
                      <div
                        key={scope.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleScope(scope.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleScope(scope.id);
                          }
                        }}
                        className={cn(
                          "cursor-pointer px-3 py-2.5 rounded border transition-all flex items-center justify-between group",
                          isSelected
                            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-100"
                            : "bg-black/20 border-zinc-800 hover:border-zinc-600 text-zinc-400"
                        )}
                      >
                        <span className="font-mono text-xs truncate mr-2 opacity-90">
                          {scope.id}
                        </span>
                        <div
                          className={cn(
                            "w-4 h-4 rounded flex items-center justify-center border",
                            isSelected
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-zinc-700 bg-zinc-800"
                          )}
                        >
                          {isSelected && (
                            <CheckCircle size={10} className="text-white" />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-lg font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors text-sm"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleAuthorize}
            disabled={selectedScopes.length === 0}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all text-sm shadow-lg shadow-emerald-900/20"
          >
            Authorize with Spotify
          </button>
        </div>

        {previewAuthUrl && (
          <div className="mt-6 border-t border-zinc-800 pt-4">
            <div className="text-[10px] text-zinc-500 uppercase font-bold mb-2 flex items-center gap-2">
              <Code size={12} /> Generated URL
            </div>
            <div className="p-3 bg-black/40 rounded border border-zinc-800 font-mono text-[10px] text-zinc-500 break-all select-all hover:text-zinc-400 transition-colors">
              {previewAuthUrl}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
