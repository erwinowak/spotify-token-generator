"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useWizard } from "@/hooks/use-wizard";
import { StepIndicator } from "@/components/wizard/StepIndicator";
import { Step1Config } from "@/components/wizard/Step1Config";
import { Step2Scopes } from "@/components/wizard/Step2Scopes";
import { Step3Token } from "@/components/wizard/Step3Token";
import { generateSpotifyAuthUrl, generateState } from "@/lib/spotify";
import { DEFAULT_DEV_REDIRECT_URI } from "@/lib/constants";
import type { FormData } from "@/lib/validations";

function HomeContent() {
  const searchParams = useSearchParams();
  const {
    currentStep,
    formData,
    refreshToken,
    accessToken,
    state: storedState,
    setFormData,
    setRefreshToken,
    setAccessToken,
    setState,
    nextStep,
    goToStep,
    reset: resetWizard,
  } = useWizard();

  const [isLoading, setIsLoading] = useState(false);
  const [codeProcessed, setCodeProcessed] = useState(false);

  const reset = () => {
    setCodeProcessed(false);
    resetWizard();
  };

  const exchangeCodeForToken = useCallback(
    async (code: string) => {
      if (!formData) {
        toast.error("Missing form data");
        setCodeProcessed(false);
        return;
      }

      try {
        let redirectUri = formData.redirectUri;
        if (!redirectUri) {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
          if (siteUrl) {
            redirectUri = `${siteUrl.replace(/\/$/, "")}/api/callback`;
          } else if (typeof window !== "undefined") {
            redirectUri = `${window.location.origin}/api/callback`;
          } else {
            redirectUri = DEFAULT_DEV_REDIRECT_URI;
          }
        }

        const response = await fetch("/api/exchange", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            formData: { ...formData, redirectUri },
            redirectUri,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          const errorMessage =
            error.details || error.error || "Failed to exchange code";
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setRefreshToken(data.refreshToken);
        if (data.accessToken) setAccessToken(data.accessToken);
        nextStep();
        toast.success("Token generated!", {
          description: "Save it in a safe place",
        });
      } catch (error) {
        setCodeProcessed(false);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        toast.error("Error exchanging code for token", {
          description: errorMessage,
          duration: 5000,
        });
        goToStep(2);
      } finally {
        setIsLoading(false);
      }
    },
    [
      formData,
      setRefreshToken,
      setAccessToken,
      nextStep,
      goToStep,
    ]
  );

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const returnedState = searchParams.get("state");

    if (codeProcessed) return;

    if (error) {
      toast.error("Authorization failed", {
        description: error === "access_denied" ? "Access denied" : error,
      });
      goToStep(2);
      return;
    }

    if (code && formData && returnedState === storedState && !codeProcessed) {
      setCodeProcessed(true);
      setIsLoading(true);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        window.history.replaceState({}, "", url.toString());
      }
      exchangeCodeForToken(code);
    } else if (code && !formData) {
      toast.error("Session expired", {
        description: "Please fill out the form again",
      });
      goToStep(2);
    }
  }, [
    searchParams,
    formData,
    storedState,
    goToStep,
    codeProcessed,
    exchangeCodeForToken,
  ]);

  const handleStep1Next = (
    config: Pick<FormData, "clientId" | "clientSecret" | "redirectUri">
  ) => {
    setFormData({
      ...config,
      scopes: ["user-read-currently-playing"],
    });
    nextStep();
  };

  const handleStep2Authorize = (data: FormData) => {
    let redirectUri = data.redirectUri;
    if (!redirectUri) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (siteUrl) {
        redirectUri = `${siteUrl.replace(/\/$/, "")}/api/callback`;
      } else if (typeof window !== "undefined") {
        redirectUri = `${window.location.origin}/api/callback`;
      } else {
        redirectUri = DEFAULT_DEV_REDIRECT_URI;
      }
    }

    const formDataWithRedirect: FormData = { ...data, redirectUri };
    setFormData(formDataWithRedirect);
    const state = generateState();
    setState(state);
    const url = generateSpotifyAuthUrl(
      formDataWithRedirect,
      state,
      redirectUri
    );
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      {/* Background Grid */}
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3f3f46 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0">
              <Image src="/icon" alt="" width={32} height={32} className="rounded-lg" />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-100">
              Token Generator{"\u00A0"}
              <span className="text-zinc-500 font-normal">for Spotify®</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
            <span className="hidden sm:inline">
              Unofficial Tool for Developers
            </span>
            <a
              href="https://developer.spotify.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-2"
            >
              Official Dashboard <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 container max-w-3xl mx-auto px-6 py-12 relative z-10">
        <StepIndicator currentStep={currentStep} />

        <div className="mt-12">
          {currentStep === 1 && (
            <Step1Config onNext={handleStep1Next} initialData={formData} />
          )}
          {currentStep === 2 && formData && (
            <Step2Scopes
              formData={formData}
              onBack={() => goToStep(1)}
              onAuthorize={handleStep2Authorize}
            />
          )}
          {currentStep === 3 && refreshToken && (
            <Step3Token
              refreshToken={refreshToken}
              accessToken={accessToken}
              grantedScopes={formData?.scopes ?? []}
              onReset={reset}
            />
          )}
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-[#09090b]/90 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-zinc-700 border-t-emerald-500 mx-auto mb-4" />
              <p className="text-zinc-500 text-lg font-medium">Processing...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-zinc-700 border-t-emerald-500" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
