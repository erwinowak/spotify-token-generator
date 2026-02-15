"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/animations/PageTransition";
import { formSchema, spotifyScopes, type FormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface Step2FormProps {
  onNext: (data: FormData) => void;
  initialData?: FormData | null;
}

export function Step2Form({ onNext, initialData }: Step2FormProps) {
  const [copied, setCopied] = useState(false);

  const defaultRedirectUri = useMemo(() => {
    if (typeof window !== "undefined") {
      // Użyj NEXT_PUBLIC_SITE_URL jeśli jest dostępna (produkcja)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (siteUrl) {
        return `${siteUrl}/api/callback`;
      }
      // W development: konwertuj localhost na 127.0.0.1 dla zgodności z Spotify Dashboard
      const origin = window.location.origin.replace("localhost", "127.0.0.1");
      return `${origin}/api/callback`;
    }
    return "http://127.0.0.1:3000/api/callback";
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      clientId: "",
      clientSecret: "",
      redirectUri: defaultRedirectUri,
      scopes: [],
    },
  });

  // Automatycznie wybierz wszystkie scopes i ustaw redirect URI
  useEffect(() => {
    setValue("scopes", [...spotifyScopes], { shouldValidate: true });
    if (!initialData?.redirectUri) {
      setValue("redirectUri", defaultRedirectUri, { shouldValidate: true });
    }
  }, [setValue, defaultRedirectUri, initialData]);

  const copyRedirectUri = async () => {
    try {
      await navigator.clipboard.writeText(defaultRedirectUri);
      setCopied(true);
      toast.success("Redirect URI copied to clipboard!", {
        description: "Paste it in Spotify Dashboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy redirect URI");
    }
  };

  const onSubmit = (data: FormData) => {
    // Zawsze używaj wszystkich scopes
    const formData: FormData = {
      ...data,
      scopes: [...spotifyScopes],
      redirectUri: data.redirectUri || defaultRedirectUri,
    };
    onNext(formData);
  };

  return (
    <PageTransition>
      <Card className="w-full max-w-2xl mx-auto border-2 shadow-xl dark:shadow-2xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-6">
          <CardTitle className="text-2xl font-bold">Spotify App Data</CardTitle>
          <CardDescription className="text-base">
            Enter your data from Spotify Developers Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {/* Client ID */}
              <div className="space-y-2.5">
                <Label htmlFor="clientId" className="text-sm font-semibold text-foreground">
                  Client ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="clientId"
                  placeholder="Enter your Client ID"
                  {...register("clientId")}
                  className={cn(
                    "h-11 text-base",
                    errors.clientId && "border-destructive focus-visible:ring-destructive"
                  )}
                  autoFocus
                />
                {errors.clientId && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.clientId.message}
                  </motion.p>
                )}
              </div>

              {/* Client Secret */}
              <div className="space-y-2.5">
                <Label htmlFor="clientSecret" className="text-sm font-semibold text-foreground">
                  Client Secret <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="clientSecret"
                  type="password"
                  placeholder="Enter your Client Secret"
                  {...register("clientSecret")}
                  className={cn(
                    "h-11 text-base",
                    errors.clientSecret && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors.clientSecret && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.clientSecret.message}
                  </motion.p>
                )}
              </div>

              {/* Redirect URI */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="redirectUri" className="text-sm font-semibold text-foreground">
                    Redirect URI <span className="text-destructive">*</span>
                  </Label>
                  <motion.button
                    type="button"
                    onClick={copyRedirectUri}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-primary" />
                        <span className="text-primary">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>
                <div className="relative">
                  <Input
                    id="redirectUri"
                    type="url"
                    placeholder="http://127.0.0.1:3000/api/callback"
                    {...register("redirectUri")}
                    className={cn(
                      "h-11 text-base pr-12",
                      errors.redirectUri && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  <motion.button
                    type="button"
                    onClick={copyRedirectUri}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-muted transition-colors"
                    title="Copy redirect URI"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </motion.button>
                </div>
                {errors.redirectUri && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.redirectUri.message}
                  </motion.p>
                )}
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Must match the URI set in Spotify Dashboard. Click the copy button to easily add it to your app settings.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div 
              whileHover={{ scale: 1.01 }} 
              whileTap={{ scale: 0.99 }}
              className="pt-4"
            >
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Continue to Authorization"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </PageTransition>
  );
}
