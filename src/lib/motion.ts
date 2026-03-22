/**
 * Motion Design Tokens — G14 Compliance
 * Centralized Framer Motion variants, durations, easings, and hover targets.
 *
 * Usage:
 *   import { MOTION, EASE, DURATION, HOVER } from "@/lib/motion";
 *   <motion.div {...MOTION.fadeIn}>...</motion.div>
 */

import type { Variants } from "framer-motion";

/* ── Durations ── */
export const DURATION = {
  instant: 0.05,
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
  xslow: 0.7,
} as const;

/* ── Easing Curves ── */
export const EASE = {
  standard:   [0.4, 0, 0.2, 1]    as const, // Material standard
  decelerate: [0, 0, 0.2, 1]      as const, // Enter screen
  accelerate: [0.4, 0, 1, 1]      as const, // Exit screen
  spring:     [0.175, 0.885, 0.32, 1.275] as const, // Springy
} as const;

/* ── Base Transition ── */
const transitionBase = {
  duration: DURATION.base,
  ease: EASE.standard,
};

const transitionFast = {
  duration: DURATION.fast,
  ease: EASE.standard,
};

/* ── Animation Variants ── */
export const MOTION: Record<string, Variants> = {
  /** Simple opacity fade — most common */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: transitionBase },
    exit:    { opacity: 0, transition: transitionFast },
  },

  /** Slide up from 12px below + fade */
  slideUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: transitionBase },
    exit:    { opacity: 0, y: -8, transition: transitionFast },
  },

  /** Slide down from 12px above + fade */
  slideDown: {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0, transition: transitionBase },
    exit:    { opacity: 0, y: 12, transition: transitionFast },
  },

  /** Scale from 95% + fade — for popovers/modals */
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { ...transitionBase, duration: DURATION.fast } },
    exit:    { opacity: 0, scale: 0.95, transition: transitionFast },
  },

  /** Slide in from left (sidebar, drawers) */
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: transitionBase },
    exit:    { opacity: 0, x: -20, transition: transitionFast },
  },

  /** Stagger container — wraps staggered children */
  stagger: {
    initial:  {},
    animate:  { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
    exit:     { transition: { staggerChildren: 0.04 } },
  },

  /** Individual stagger child */
  staggerItem: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: transitionBase },
    exit:    { opacity: 0, y: 5,  transition: transitionFast },
  },
};

/* ── Hover Targets (whileHover / whileTap props) ── */
export const HOVER = {
  /** Subtle lift — cards, buttons */
  lift:  { y: -2, transition: transitionFast },
  /** Subtle scale — icon buttons */
  scale: { scale: 1.04, transition: transitionFast },
  /** Glow pulse (CSS handles through class) */
  glow:  { scale: 1.02, transition: transitionFast },
} as const;

export const TAP = {
  scale: { scale: 0.97 },
  press: { scale: 0.95 },
} as const;

/* ── Reduced-Motion Guard ──
 * Wrap this around MOTION usage in hooks.
 * Usage: const variants = getMotionSafe(MOTION.slideUp);
 */
export function getMotionSafe<T extends Variants>(variants: T): T {
  if (typeof window === "undefined") return variants;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return {} as T;
  }
  return variants;
}
