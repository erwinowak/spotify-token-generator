"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/animations/PageTransition";

interface Step4TokenProps {
  refreshToken: string;
  onReset: () => void;
}

export function Step4Token({ refreshToken, onReset }: Step4TokenProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(refreshToken);
      setCopied(true);
      toast.success("Token copied to clipboard!", {
        description: "Save it in a safe place",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy token");
    }
  };

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
              Your Refresh Token
            </CardTitle>
          </motion.div>
          <CardDescription className="text-base">
            Save this token in a safe place
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Refresh Token</Label>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Valid for a long time
              </Badge>
            </div>
            <div className="relative">
              <Textarea
                value={refreshToken}
                readOnly
                className="font-mono text-sm min-h-[120px] pr-12 bg-muted/50"
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="h-8 w-8"
                >
                  {copied ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </motion.div>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-lg bg-muted/30 border"
          >
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Important:</strong> This token allows
              generating new access tokens. Do not share it publicly and store it
              in a safe place.
            </p>
          </motion.div>

          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                onClick={copyToClipboard}
                className="w-full"
                variant={copied ? "outline" : "default"}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button onClick={onReset} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  );
}

