"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/animations/PageTransition";

interface Step3RedirectProps {
  authUrl: string;
}

export function Step3Redirect({ authUrl }: Step3RedirectProps) {
  useEffect(() => {
    // Przekierowanie po krótkim opóźnieniu dla lepszego UX
    const timer = setTimeout(() => {
      window.location.href = authUrl;
    }, 1500);

    return () => clearTimeout(timer);
  }, [authUrl]);

  return (
    <PageTransition>
      <Card className="w-full max-w-2xl mx-auto border-2 shadow-xl dark:shadow-2xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CardTitle className="text-2xl">Redirecting to Spotify...</CardTitle>
          </motion.div>
          <CardDescription>
            You will be redirected to Spotify authorization page
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
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
        </CardContent>
      </Card>
    </PageTransition>
  );
}
