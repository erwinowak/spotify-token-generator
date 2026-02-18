"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Check, Key, Lock, Globe, Info } from "lucide-react";
import { toast } from "sonner";
import { formSchema, type FormData } from "@/lib/validations";
import { DEFAULT_DEV_REDIRECT_URI } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Step1ConfigProps {
  onNext: (data: Pick<FormData, "clientId" | "clientSecret" | "redirectUri">) => void;
  initialData?: FormData | null;
}

type ConfigData = Pick<FormData, "clientId" | "clientSecret" | "redirectUri">;

export function Step1Config({ onNext, initialData }: Step1ConfigProps) {
  const [copied, setCopied] = useState(false);

  const defaultRedirectUri = useMemo(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) return `${siteUrl.replace(/\/$/, "")}/api/callback`;
    if (typeof window !== "undefined") {
      return `${window.location.origin}/api/callback`;
    }
    return DEFAULT_DEV_REDIRECT_URI;
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      clientId: "",
      clientSecret: "",
      redirectUri: defaultRedirectUri,
      scopes: ["user-read-currently-playing"],
    },
  });

  const redirectUri = watch("redirectUri");

  useEffect(() => {
    if (!initialData?.redirectUri) {
      setValue("redirectUri", defaultRedirectUri, { shouldValidate: true });
    }
  }, [setValue, defaultRedirectUri, initialData]);

  const copyRedirectUri = async () => {
    try {
      await navigator.clipboard.writeText(redirectUri || defaultRedirectUri);
      setCopied(true);
      toast.success("Redirect URI copied!", {
        description: "Paste it in Spotify Dashboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const onSubmit = (data: FormData) => {
    onNext({
      clientId: data.clientId,
      clientSecret: data.clientSecret,
      redirectUri: data.redirectUri || defaultRedirectUri,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Client Configuration</h1>
        <p className="text-zinc-500 text-sm">
          Enter your app data from the official dashboard.
        </p>
      </div>

      <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 shadow-xl space-y-5">
        <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex items-start gap-3">
          <Info className="text-amber-500 shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-amber-200/80 leading-relaxed">
            Your keys (Client ID/Secret) are used <strong>only locally</strong> in your browser to generate the authorization link. They are not sent or stored anywhere.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
            <Key size={12} /> Client ID
          </label>
          <input
            type="text"
            placeholder="Paste Client ID here..."
            {...register("clientId")}
            className={cn(
              "w-full bg-black/40 border p-3 rounded-md outline-none transition-all font-mono text-sm placeholder:text-zinc-700 text-zinc-200",
              errors.clientId ? "border-red-500/50" : "border-zinc-700 focus:border-emerald-500"
            )}
          />
          {errors.clientId && (
            <p className="text-sm text-red-400 mt-1">{errors.clientId.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
            <Lock size={12} /> Client Secret
          </label>
          <input
            type="password"
            placeholder="••••••••••••••••••••••••"
            {...register("clientSecret")}
            className={cn(
              "w-full bg-black/40 border p-3 rounded-md outline-none transition-all font-mono text-sm placeholder:text-zinc-700 text-zinc-200",
              errors.clientSecret ? "border-red-500/50" : "border-zinc-700 focus:border-emerald-500"
            )}
          />
          {errors.clientSecret && (
            <p className="text-sm text-red-400 mt-1">
              {errors.clientSecret.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <Globe size={12} /> Redirect URI
            </label>
            <button
              type="button"
              onClick={copyRedirectUri}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <input
            type="url"
            {...register("redirectUri")}
            className={cn(
              "w-full bg-black/40 border p-3 rounded-md outline-none transition-all font-mono text-sm text-zinc-200 border-zinc-700 focus:border-emerald-500"
            )}
          />
          {errors.redirectUri && (
            <p className="text-sm text-red-400 mt-1">
              {errors.redirectUri.message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={!!(errors.clientId || errors.clientSecret || errors.redirectUri)}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all text-sm shadow-lg shadow-emerald-900/20"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}
