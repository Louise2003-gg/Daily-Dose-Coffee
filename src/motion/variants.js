// ── Shared Framer Motion variants ──────────────────────────

export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2,  ease: "easeIn" } },
};

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export const cardHover = {
  rest:  { scale: 1,    y: 0,  transition: { duration: 0.2, ease: "easeOut" } },
  hover: { scale: 1.03, y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  tap:   { scale: 0.97,        transition: { duration: 0.1 } },
};

export const buttonTap = {
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export const slideInBottom = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
