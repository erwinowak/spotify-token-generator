"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate particle positions and animations once using lazy initialization
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  );

  return (
    <footer className="relative mt-auto border-t border-border/40 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            suppressHydrationWarning
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Main CTA Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link
              href="https://erwinowak.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-bold text-foreground transition-all duration-500 overflow-hidden"
            >
              {/* Animated Gradient Background */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl"
                animate={isHovered ? {
                  background: [
                    "linear-gradient(90deg, rgba(29, 185, 84, 0.2), rgba(29, 185, 84, 0.3), rgba(29, 185, 84, 0.2))",
                    "linear-gradient(90deg, rgba(29, 185, 84, 0.3), rgba(29, 185, 84, 0.4), rgba(29, 185, 84, 0.3))",
                    "linear-gradient(90deg, rgba(29, 185, 84, 0.2), rgba(29, 185, 84, 0.3), rgba(29, 185, 84, 0.2))",
                  ],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-primary/40 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={isHovered ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500"
                animate={isHovered ? {
                  borderColor: [
                    "rgba(29, 185, 84, 0)",
                    "rgba(29, 185, 84, 0.5)",
                    "rgba(29, 185, 84, 0)",
                  ],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />

              {/* Floating Sparkles */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={isHovered ? {
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  } : {
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                </motion.div>
              ))}

              {/* Text Content */}
              <span className="relative z-10 flex items-center gap-3">
                <motion.span
                  className="bg-linear-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent"
                  animate={isHovered ? {
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Created by Erwin Nowak
                </motion.span>
                
                <motion.div
                  animate={isHovered ? {
                    x: [0, 5, 0],
                    rotate: [0, 15, 0],
                  } : {
                    x: 0,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </motion.div>
              </span>

              {/* Lightning Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={isHovered ? {
                  opacity: [0, 0.3, 0],
                } : {
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  repeat: isHovered ? Infinity : 0,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-primary/50 to-transparent"
                  animate={isHovered ? {
                    x: ["-100%", "100%"],
                  } : {}}
                  transition={{
                    duration: 1,
                    repeat: isHovered ? Infinity : 0,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Ripple Effect on Click */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-primary/30"
                initial={{ scale: 0, opacity: 0.8 }}
                whileTap={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </Link>
          </motion.div>

          {/* Copyright with Subtle Animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xs text-muted-foreground flex items-center gap-2"
          >
            <Zap className="h-3 w-3 text-primary/50" />
            <span>© {new Date().getFullYear()} Spotify Token Generator. All rights reserved.</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
