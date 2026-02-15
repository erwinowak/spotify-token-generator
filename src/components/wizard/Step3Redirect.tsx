"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, RotateCcw, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/animations/PageTransition";

interface Step3RedirectProps {
  authUrl: string;
  onReset?: () => void;
}

export function Step3Redirect({ authUrl, onReset }: Step3RedirectProps) {
  const [redirecting, setRedirecting] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    // Przekierowanie po krótkim opóźnieniu dla lepszego UX
    const redirectTimer = setTimeout(() => {
      if (redirecting) {
        window.location.href = authUrl;
      }
    }, 1500);

    // Timeout po 10 sekundach - jeśli przekierowanie nie nastąpiło
    const timeoutTimer = setTimeout(() => {
      setTimeoutReached(true);
      setRedirecting(false);
    }, 10000);

    return () => {
      clearTimeout(redirectTimer);
      clearTimeout(timeoutTimer);
    };
  }, [authUrl, redirecting]);

  const handleManualRedirect = () => {
    window.location.href = authUrl;
  };

  const handleReset = () => {
    setRedirecting(false);
    if (onReset) {
      onReset();
    }
  };

  return (
    <PageTransition>
      <Card className="w-full max-w-2xl mx-auto border-2 shadow-xl dark:shadow-2xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CardTitle className="text-2xl">
              {timeoutReached ? "Redirect Timed Out" : "Redirecting to Spotify..."}
            </CardTitle>
          </motion.div>
          <CardDescription>
            {timeoutReached
              ? "The redirect didn't happen automatically. You can try again or start over."
              : "You will be redirected to Spotify authorization page"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          {redirecting && !timeoutReached ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-16 h-16 text-primary" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-muted-foreground"
              >
                Please wait...
              </motion.p>
            </>
          ) : (
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <Button
                onClick={handleManualRedirect}
                className="w-full"
                size="lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Go to Spotify Authorization
              </Button>
              {onReset && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  );
}
