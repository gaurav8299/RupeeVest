// Animation utilities and helpers for consistent animations across the app

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeOut" },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const slideUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2, ease: "easeOut" },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const float = {
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const bounceSoft = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// CSS class utilities for common animations
export const animationClasses = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  float: "animate-float",
  bounceSoft: "animate-bounce-soft",
  cardHover: "card-hover",
  pulse: "animate-pulse",
  spin: "animate-spin",
};

// Intersection Observer hook for scroll animations
export function useScrollAnimation(threshold = 0.1) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    },
    { threshold, rootMargin: "0px 0px -50px 0px" }
  );

  return observer;
}

// Staggered animation for lists
export function staggerAnimation(elements: NodeListOf<Element>, delay = 100) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("animate-fade-in");
    }, index * delay);
  });
}

// Page transition utilities
export const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

// Loading animation states
export const loadingStates = {
  skeleton: "animate-pulse bg-gray-200",
  spinner: "loading-spinner",
  dots: "animate-bounce",
};

// Hover effects for interactive elements
export const hoverEffects = {
  lift: "hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300",
  scale: "hover:scale-105 transition-transform duration-200",
  glow: "hover:shadow-lg hover:shadow-navy-500/25 transition-shadow duration-300",
  slideRight: "group-hover:translate-x-1 transition-transform duration-200",
};

// Animation timing functions
export const easingFunctions = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

// Duration presets
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
};
