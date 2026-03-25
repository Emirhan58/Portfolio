import type { Variants } from "motion/react";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Shoji door animation variants for mobile menu
// Two panels split from center and slide outward like traditional Japanese sliding doors
export const shojiLeft: Variants = {
  closed: { x: "0%" },
  open: { x: "-100%", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const shojiRight: Variants = {
  closed: { x: "0%" },
  open: { x: "100%", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const shojiContent: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { delay: 0.3, duration: 0.4 } },
};
