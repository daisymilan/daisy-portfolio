"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every Framer Motion animation honor the visitor's "reduce motion"
 * OS setting. The CSS rule in globals.css only covers CSS animations, not
 * the JS-driven ones Framer Motion runs.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
