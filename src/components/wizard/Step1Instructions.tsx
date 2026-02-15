"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition, StaggerContainer, StaggerItem } from "@/components/animations/PageTransition";

interface Step1InstructionsProps {
  onNext: () => void;
}

const instructions = [
  {
    title: "Open Spotify Developers Dashboard",
    description: "Go to the dashboard and select or create an app",
  },
  {
    title: "Save Client ID and Client Secret",
    description: "You'll find them in your app settings",
  },
  {
    title: "Set Redirect URI",
    description: "Add redirect URI in your app settings",
  },
];

export function Step1Instructions({ onNext }: Step1InstructionsProps) {
  return (
    <PageTransition>
      <Card className="w-full max-w-2xl mx-auto border-2 shadow-xl dark:shadow-2xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to Spotify Token Generator
            </CardTitle>
          </motion.div>
          <CardDescription className="text-base">
            Generate your refresh token in a few simple steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">What you&apos;ll need:</h3>
            <StaggerContainer>
              <div className="space-y-4">
                {instructions.map((instruction, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 p-4 rounded-lg border bg-card"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-medium">{instruction.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {instruction.description}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <a
                href="https://developer.spotify.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Open Spotify Developers Dashboard
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button onClick={onNext} className="w-full" size="lg">
              I have the data, continue
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </PageTransition>
  );
}
