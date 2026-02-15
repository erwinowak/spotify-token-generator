"use client";

import { useState, useEffect } from "react";
import type { FormData } from "@/lib/validations";

export type Step = 1 | 2 | 3 | 4;

interface WizardState {
  currentStep: Step;
  formData: FormData | null;
  refreshToken: string | null;
  state: string | null;
}

const STORAGE_KEY = "spotify-wizard-state";

export function useWizard() {
  const [wizardState, setWizardState] = useState<WizardState>(() => {
    if (typeof window === "undefined") {
      return {
        currentStep: 1,
        formData: null,
        refreshToken: null,
        state: null,
      };
    }

    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {
          currentStep: 1,
          formData: null,
          refreshToken: null,
          state: null,
        };
      }
    }

    return {
      currentStep: 1,
      formData: null,
      refreshToken: null,
      state: null,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(wizardState));
    }
  }, [wizardState]);

  const setFormData = (data: FormData) => {
    setWizardState((prev) => ({ ...prev, formData: data }));
  };

  const setRefreshToken = (token: string) => {
    setWizardState((prev) => ({ ...prev, refreshToken: token }));
  };

  const setState = (state: string) => {
    setWizardState((prev) => ({ ...prev, state }));
  };

  const nextStep = () => {
    setWizardState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4) as Step,
    }));
  };

  const goToStep = (step: Step) => {
    setWizardState((prev) => ({ ...prev, currentStep: step }));
  };

  const reset = () => {
    const newState = {
      currentStep: 1 as Step,
      formData: null,
      refreshToken: null,
      state: null,
    };
    setWizardState(newState);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    currentStep: wizardState.currentStep,
    formData: wizardState.formData,
    refreshToken: wizardState.refreshToken,
    state: wizardState.state,
    setFormData,
    setRefreshToken,
    setState,
    nextStep,
    goToStep,
    reset,
  };
}
