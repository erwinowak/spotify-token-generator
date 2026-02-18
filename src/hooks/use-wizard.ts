"use client";

import { useState, useEffect } from "react";
import type { FormData } from "@/lib/validations";

export type Step = 1 | 2 | 3;

interface WizardState {
  currentStep: Step;
  formData: FormData | null;
  refreshToken: string | null;
  accessToken: string | null;
  state: string | null;
}

const STORAGE_KEY = "spotify-wizard-state";

const defaultState: WizardState = {
  currentStep: 1,
  formData: null,
  refreshToken: null,
  accessToken: null,
  state: null,
};

export function useWizard() {
  const [wizardState, setWizardState] = useState<WizardState>(defaultState);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as WizardState;
        setWizardState({
          ...parsed,
          accessToken: parsed.accessToken ?? null,
        });
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(wizardState));
  }, [wizardState]);

  const setFormData = (data: FormData) => {
    setWizardState((prev) => ({ ...prev, formData: data }));
  };

  const setRefreshToken = (token: string) => {
    setWizardState((prev) => ({ ...prev, refreshToken: token }));
  };

  const setAccessToken = (token: string | null) => {
    setWizardState((prev) => ({ ...prev, accessToken: token }));
  };

  const setState = (state: string) => {
    setWizardState((prev) => ({ ...prev, state }));
  };

  const nextStep = () => {
    setWizardState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 3) as Step,
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
      accessToken: null,
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
    accessToken: wizardState.accessToken,
    state: wizardState.state,
    setFormData,
    setRefreshToken,
    setAccessToken,
    setState,
    nextStep,
    goToStep,
    reset,
  };
}
