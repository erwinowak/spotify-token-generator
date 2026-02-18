"use client";

import { AuthorCredit } from "@/components/AuthorCredit";

export function Footer() {
  return (
    <footer className="py-10 border-t border-zinc-800 mt-12 bg-[#050505]">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <div className="text-zinc-500 text-xs mb-4">
          Token Generator for Spotify is an open-source project created by{" "}
          <AuthorCredit />
          .
        </div>

        <div className="max-w-xl mx-auto bg-zinc-900/50 rounded p-4 text-[10px] text-zinc-600 leading-relaxed border border-zinc-800">
          <p className="font-bold mb-1 text-zinc-500">Disclaimer</p>
          <p>
            This website is not affiliated with, endorsed, sponsored, or
            specifically approved by Spotify AB. Spotify® is a registered
            trademark of Spotify AB. Use of the Spotify trademark is for
            descriptive purposes only to indicate compatibility. Data is
            processed locally within your browser and is not stored on our
            servers.
          </p>
        </div>
      </div>
    </footer>
  );
}
