"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useWizard } from "@/hooks/use-wizard";
import { StepIndicator } from "@/components/wizard/StepIndicator";
import { Step1Instructions } from "@/components/wizard/Step1Instructions";
import { Step2Form } from "@/components/wizard/Step2Form";
import { Step3Redirect } from "@/components/wizard/Step3Redirect";
import { Step4Token } from "@/components/wizard/Step4Token";
import { generateSpotifyAuthUrl, generateState } from "@/lib/spotify";
import type { FormData } from "@/lib/validations";

function HomeContent() {
  const searchParams = useSearchParams();
  const {
    currentStep,
    formData,
    refreshToken,
    state: storedState,
    setFormData,
    setRefreshToken,
    setState,
    nextStep,
    goToStep,
    reset: resetWizard,
  } = useWizard();

  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [codeProcessed, setCodeProcessed] = useState(false);

  const reset = () => {
    setCodeProcessed(false);
    setAuthUrl(null);
    resetWizard();
  };

  const exchangeCodeForToken = useCallback(async (code: string) => {
    if (!formData) {
      toast.error("Missing form data");
      setCodeProcessed(false);
      return;
    }

    try {
      // Użyj dokładnie tego samego redirectUri co w handleStep2Submit
      let redirectUri = formData.redirectUri;
      if (!redirectUri && typeof window !== "undefined") {
        // Użyj NEXT_PUBLIC_SITE_URL jeśli jest dostępna (produkcja)
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        if (siteUrl) {
          redirectUri = `${siteUrl}/api/callback`;
        } else {
          // W development: konwertuj localhost na 127.0.0.1 dla zgodności z Spotify Dashboard
          redirectUri = `${window.location.origin.replace("localhost", "127.0.0.1")}/api/callback`;
        }
      }
      if (!redirectUri) {
        redirectUri = "http://127.0.0.1:3000/api/callback";
      }

      const response = await fetch("/api/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          formData: {
            ...formData,
            redirectUri,
          },
          redirectUri,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.details || error.error || "Failed to exchange token";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setRefreshToken(data.refreshToken);
      nextStep();
      toast.success("Token generated successfully!", {
        description: "Save it in a safe place",
      });
    } catch (error) {
      setCodeProcessed(false);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error("Error exchanging code for token", {
        description: errorMessage,
        duration: 5000,
      });
      goToStep(2);
    } finally {
      setIsLoading(false);
    }
  }, [formData, setRefreshToken, nextStep, goToStep, setCodeProcessed]);

  // Obsługa callback z Spotify
  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const returnedState = searchParams.get("state");

    // Zapobiegaj wielokrotnemu przetwarzaniu tego samego kodu
    if (codeProcessed) {
      return;
    }

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
      
      // Usuń kod z URL żeby zapobiec odświeżaniu strony
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
  }, [searchParams, formData, storedState, goToStep, codeProcessed, exchangeCodeForToken]);

  const handleStep1Next = () => {
    nextStep();
  };

  const handleStep2Submit = async (data: FormData) => {
    // Zawsze używaj tego samego redirect URI
    let redirectUri = data.redirectUri;
    if (!redirectUri && typeof window !== "undefined") {
      // Użyj NEXT_PUBLIC_SITE_URL jeśli jest dostępna (produkcja)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (siteUrl) {
        redirectUri = `${siteUrl}/api/callback`;
      } else {
        // W development: konwertuj localhost na 127.0.0.1 dla zgodności z Spotify Dashboard
        redirectUri = `${window.location.origin.replace("localhost", "127.0.0.1")}/api/callback`;
      }
    }
    if (!redirectUri) {
      redirectUri = "http://127.0.0.1:3000/api/callback";
    }

    const formDataWithRedirect: FormData = {
      ...data,
      redirectUri,
    };

    setFormData(formDataWithRedirect);
    setIsLoading(true);

    try {
      const state = generateState();
      setState(state);

      const url = generateSpotifyAuthUrl(formDataWithRedirect, state, redirectUri);
      setAuthUrl(url);
      nextStep();
    } catch (error) {
      toast.error("Error generating authorization URL", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Innovative Sound Visualization Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Deep Dark Base with Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-black via-slate-950 to-black" />
        
        {/* Holographic Mesh Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mesh" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/10" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>

        {/* Sound Wave Interference Patterns - Multiple Layers */}
        {Array.from({ length: 8 }).map((_, waveIndex) => {
          const centerX = 20 + (waveIndex * 12) + Math.sin(waveIndex) * 5;
          const centerY = 30 + Math.cos(waveIndex) * 20;
          const delay = waveIndex * 0.8;
          return (
            <div
              key={`wave-${waveIndex}`}
              className="absolute rounded-full border border-primary/20"
              style={{
                left: `${centerX}%`,
                top: `${centerY}%`,
                width: '200px',
                height: '200px',
                transform: 'translate(-50%, -50%)',
                animation: `sound-wave-expand ${12 + Math.random() * 4}s ease-out infinite`,
                animationDelay: `${delay}s`,
                boxShadow: '0 0 40px rgba(29, 185, 84, 0.1)',
              }}
              suppressHydrationWarning
            />
          );
        })}

        {/* Sound Particles - Floating Particles with Glow */}
        <div className="absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const duration = 15 + Math.random() * 10;
            const delay = Math.random() * 5;
            const size = 2 + Math.random() * 3;
            const opacity = 0.3 + Math.random() * 0.4;
            return (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full bg-primary"
                style={{
                  left: `${startX}%`,
                  top: `${startY}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: `0 0 ${size * 4}px rgba(29, 185, 84, ${opacity})`,
                  animation: `particle-float ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  opacity: opacity,
                }}
                suppressHydrationWarning
              />
            );
          })}
        </div>

        {/* Frequency Lines - Dynamic Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" style={{ pointerEvents: 'none' }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const x1 = (i * 3.33) % 100;
            const y1 = 20 + Math.sin(i * 0.5) * 30;
            const x2 = ((i + 10) * 3.33) % 100;
            const y2 = 20 + Math.sin((i + 10) * 0.5) * 30;
            const delay = i * 0.1;
            return (
              <line
                key={`line-${i}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/20"
                style={{
                  animation: `frequency-line ${4 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
                suppressHydrationWarning
              />
            );
          })}
        </svg>

        {/* Holographic Orbs - Glowing Energy Balls */}
        {Array.from({ length: 6 }).map((_, i) => {
          const left = 15 + (i * 15) + Math.sin(i) * 10;
          const top = 20 + Math.cos(i * 1.5) * 25;
          const size = 100 + Math.random() * 150;
          const delay = i * 1.2;
          return (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full bg-primary/5 blur-3xl"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                transform: 'translate(-50%, -50%)',
                animation: `orb-pulse ${8 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                boxShadow: `0 0 ${size}px rgba(29, 185, 84, 0.3)`,
              }}
              suppressHydrationWarning
            />
          );
        })}

        {/* Sound Frequency Rings - Concentric Circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 5 }).map((_, i) => {
            const size = 150 + i * 100;
            const delay = i * 0.5;
            return (
              <div
                key={`ring-${i}`}
                className="absolute rounded-full border border-primary/15"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  animation: `frequency-ring ${6 + i * 2}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size * 0.3}px rgba(29, 185, 84, 0.1)`,
                }}
                suppressHydrationWarning
              />
            );
          })}
        </div>

        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10" />
        
        {/* Subtle Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent tracking-tight"
          >
            Spotify Refresh Token Generator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Generate your Spotify refresh token in a few simple steps. Free, secure, and easy-to-use tool for developers to create long-lived refresh tokens for Spotify API integration.
          </motion.p>
        </div>

        <StepIndicator currentStep={currentStep} />

            <div className="mt-12">
              {currentStep === 1 && <Step1Instructions onNext={handleStep1Next} />}
              {currentStep === 2 && (
                <Step2Form onNext={handleStep2Submit} initialData={formData} />
              )}
              {currentStep === 3 && authUrl && (
                <Step3Redirect authUrl={authUrl} onReset={reset} />
              )}
              {currentStep === 4 && refreshToken && (
                <Step4Token refreshToken={refreshToken} onReset={reset} />
              )}
            </div>

        {isLoading && currentStep !== 3 && (
          <div className="fixed inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-4" />
                <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-primary/30" />
              </div>
              <p className="text-muted-foreground text-lg font-medium">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
