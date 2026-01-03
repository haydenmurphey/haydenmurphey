/**
 * Animation Configuration
 * Centralized animation constants for Framer Motion animations
 * Ensures consistent timing and easing across the application
 */

/**
 * Animation durations (in seconds)
 */
export const ANIMATION_DURATIONS = {
  // Fast animations for micro-interactions
  fast: 0.15,
  
  // Standard animations for most UI elements
  normal: 0.3,
  
  // Smooth animations for page transitions
  smooth: 0.5,
  
  // Slow animations for dramatic effects
  slow: 0.8,
  
  // Page transitions
  pageTransition: 0.5,
  
  // Hover effects
  hover: 0.3,
  
  // Focus effects
  focus: 0.2,
} as const;

/**
 * Animation delays (in seconds)
 * Used for staggered animations
 */
export const ANIMATION_DELAYS = {
  // No delay
  none: 0,
  
  // Small delay between items
  tiny: 0.05,
  
  // Standard stagger delay
  small: 0.1,
  
  // Medium stagger delay
  medium: 0.15,
  
  // Large stagger delay
  large: 0.2,
  
  // Extra large delay
  xlarge: 0.3,
} as const;

/**
 * Easing functions
 * Consistent easing curves for animations
 */
export const ANIMATION_EASINGS = {
  // Default easing
  default: [0.6, -0.05, 0.01, 0.99],
  
  // Smooth ease in/out
  smooth: [0.43, 0.13, 0.23, 0.96],
  
  // Spring-like motion
  spring: [0.68, -0.55, 0.265, 1.55],
  
  // Ease out cubic
  easeOut: [0.33, 1, 0.68, 1],
  
  // Ease in cubic
  easeIn: [0.32, 0, 0.67, 0],
} as const;

/**
 * Common animation variants
 * Reusable animation presets for Framer Motion
 */
export const ANIMATION_VARIANTS = {
  /**
   * Fade in from opacity 0 to 1
   */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  /**
   * Slide in from right
   */
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  
  /**
   * Slide in from left
   */
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  
  /**
   * Slide in from top
   */
  slideInTop: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  
  /**
   * Slide in from bottom
   */
  slideInBottom: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  },
  
  /**
   * Scale in from small to normal
   */
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  
  /**
   * Scale in with spring
   */
  scaleInSpring: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }
    },
    exit: { opacity: 0, scale: 0.5 },
  },
} as const;

/**
 * Stagger configuration
 * Controls timing of child animations
 */
export const STAGGER_CONFIG = {
  /**
   * Fast stagger (0.05s between items)
   */
  fast: {
    delayChildren: 0,
    staggerChildren: 0.05,
  },
  
  /**
   * Normal stagger (0.1s between items)
   */
  normal: {
    delayChildren: 0,
    staggerChildren: 0.1,
  },
  
  /**
   * Slow stagger (0.15s between items)
   */
  slow: {
    delayChildren: 0,
    staggerChildren: 0.15,
  },
  
  /**
   * Very slow stagger (0.2s between items)
   */
  verySlow: {
    delayChildren: 0,
    staggerChildren: 0.2,
  },
} as const;

/**
 * Scroll reveal animation
 * For elements that animate when scrolling into view
 */
export const SCROLL_REVEAL = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.smooth,
      ease: ANIMATION_EASINGS.easeOut,
    }
  },
} as const;

/**
 * Hover scale animation
 * For interactive elements
 */
export const HOVER_SCALE = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeOut,
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeIn,
    }
  },
} as const;

/**
 * Navigation animation configuration
 * Specific to FloatingNav component
 */
export const NAV_ANIMATION = {
  container: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: ANIMATION_DURATIONS.smooth },
  },
  item: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  stagger: ANIMATION_DELAYS.small,
} as const;

/**
 * Helper function to create staggered animation
 * @param baseDelay - Base delay before first item animates
 * @param staggerDelay - Delay between each item
 * @param index - Item index in the list
 */
export function getStaggerDelay(
  baseDelay: number = 0, 
  staggerDelay: number = ANIMATION_DELAYS.small, 
  index: number = 0
): number {
  return baseDelay + (index * staggerDelay);
}

/**
 * Helper function to create transition config
 */
export function createTransition(
  duration: number = ANIMATION_DURATIONS.normal,
  delay: number = 0,
  easing: number[] = ANIMATION_EASINGS.default as unknown as number[]
) {
  return {
    duration,
    delay,
    ease: easing,
  };
}

export type AnimationDuration = typeof ANIMATION_DURATIONS[keyof typeof ANIMATION_DURATIONS];
export type AnimationDelay = typeof ANIMATION_DELAYS[keyof typeof ANIMATION_DELAYS];
export type AnimationEasing = typeof ANIMATION_EASINGS[keyof typeof ANIMATION_EASINGS];
