import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/Footer";
import { DEFAULT_DEV_ORIGIN } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Spotify Refresh Token Generator",
    template: "%s | Spotify Token Generator",
  },
  description: "Generate your Spotify refresh token in a few simple steps. Free, secure, and easy-to-use tool for developers to create long-lived refresh tokens for Spotify API integration.",
  keywords: [
    "Spotify",
    "refresh token",
    "token generator",
    "Spotify API",
    "OAuth",
    "authentication",
    "developer tools",
    "Spotify integration",
    "API token",
    "music API",
  ],
  authors: [{ name: "Erwin Nowak", url: "https://erwinowak.dev" }],
  creator: "Erwin Nowak",
  publisher: "Erwin Nowak",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_DEV_ORIGIN),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Spotify Refresh Token Generator",
    title: "Spotify Refresh Token Generator",
    description: "Generate your Spotify refresh token in a few simple steps. Free, secure, and easy-to-use tool for developers.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Spotify Refresh Token Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spotify Refresh Token Generator",
    description: "Generate your Spotify refresh token in a few simple steps. Free, secure, and easy-to-use tool for developers.",
    images: ["/opengraph-image"],
    creator: "@spotify",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon", sizes: "32x32", type: "image/png" },
      { url: "/icon", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon",
  },
  manifest: "/manifest.json",
  category: "developer tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
