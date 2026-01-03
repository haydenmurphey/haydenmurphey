/**
 * Color Constants
 * Additional color values not defined in Tailwind config
 * For CSS-in-JS or dynamic color calculations
 */

/**
 * CSS custom property names
 * Maps to values defined in globals.css
 */
export const CSS_VARS = {
  // Background colors
  bgDark: '--color-cyber-dark',
  bgNavy: '--color-cyber-navy',
  bgTealDark: '--color-cyber-teal-dark',
  
  // Accent colors
  cyan: '--color-cyber-cyan',
  green: '--color-cyber-green',
  
  // Text colors
  textLight: '--color-cyber-gray-light',
  textMuted: '--color-cyber-gray-muted',
} as const;

/**
 * RGB color values for dynamic opacity
 * Useful for rgba() and CSS custom properties
 */
export const RGB_COLORS = {
  // Cyber cyan (main accent)
  cyan: '0, 255, 255',
  
  // Cyber green (success/active)
  green: '0, 255, 170',
  
  // Cyber dark (background)
  dark: '10, 25, 41',
  
  // Cyber navy (card background)
  navy: '15, 30, 50',
  
  // Cyber teal dark (elevated surfaces)
  tealDark: '20, 40, 60',
  
  // Gray light (text)
  grayLight: '226, 232, 240',
  
  // Gray muted (secondary text)
  grayMuted: '148, 163, 184',
} as const;

/**
 * Hex color values
 * For direct use in CSS or JS
 */
export const HEX_COLORS = {
  // Background colors
  cyberDark: '#0a1929',
  cyberNavy: '#0f1e32',
  cyberTealDark: '#14283c',
  
  // Accent colors
  cyberCyan: '#00ffff',
  cyberGreen: '#00ffaa',
  
  // Text colors
  cyberGrayLight: '#e2e8f0',
  cyberGrayMuted: '#94a3b8',
  
  // Transparent overlays
  cyberCyanAlpha20: 'rgba(0, 255, 255, 0.2)',
  cyberCyanAlpha30: 'rgba(0, 255, 255, 0.3)',
  cyberCyanAlpha80: 'rgba(0, 255, 255, 0.8)',
  
  cyberGreenAlpha20: 'rgba(0, 255, 170, 0.2)',
  cyberGreenAlpha30: 'rgba(0, 255, 170, 0.3)',
  
  cyberTealDarkAlpha80: 'rgba(20, 40, 60, 0.8)',
} as const;

/**
 * Opacity values
 * Standard opacity levels used throughout the app
 */
export const OPACITY = {
  hidden: 0,
  subtle: 0.1,
  light: 0.2,
  medium: 0.5,
  strong: 0.8,
  visible: 1,
} as const;

/**
 * Shadow colors
 * For neon glow effects
 */
export const SHADOW_COLORS = {
  cyanGlow: '0 0 20px rgba(0, 255, 255, 0.5)',
  cyanGlowStrong: '0 0 30px rgba(0, 255, 255, 0.8)',
  greenGlow: '0 0 20px rgba(0, 255, 170, 0.5)',
  greenGlowStrong: '0 0 30px rgba(0, 255, 170, 0.8)',
} as const;

/**
 * Border styles
 * Common border color combinations
 */
export const BORDER_COLORS = {
  cyan: {
    light: 'rgba(0, 255, 255, 0.2)',
    medium: 'rgba(0, 255, 255, 0.3)',
    strong: 'rgba(0, 255, 255, 0.5)',
  },
  green: {
    light: 'rgba(0, 255, 170, 0.2)',
    medium: 'rgba(0, 255, 170, 0.3)',
    strong: 'rgba(0, 255, 170, 0.5)',
  },
} as const;

/**
 * Gradient definitions
 * Reusable gradient strings
 */
export const GRADIENTS = {
  cyberCyan: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 255, 255, 0.05) 100%)',
  cyberGreen: 'linear-gradient(135deg, rgba(0, 255, 170, 0.1) 0%, rgba(0, 255, 170, 0.05) 100%)',
  darkOverlay: 'linear-gradient(180deg, rgba(10, 25, 41, 0) 0%, rgba(10, 25, 41, 0.8) 100%)',
} as const;

/**
 * Helper function to get CSS variable value
 * @param varName - CSS variable name (with or without --)
 */
export function getCSSVar(varName: string): string {
  const cleanName = varName.startsWith('--') ? varName : `--${varName}`;
  return `var(${cleanName})`;
}

/**
 * Helper function to create rgba color with dynamic opacity
 * @param rgbValue - RGB string (e.g., '0, 255, 255')
 * @param opacity - Opacity value (0-1)
 */
export function createRGBA(rgbValue: string, opacity: number): string {
  return `rgba(${rgbValue}, ${opacity})`;
}

/**
 * Helper function to get Tailwind CSS class for color
 * @param color - Color name
 * @param type - Type of class (bg, text, border)
 */
export function getTailwindClass(
  color: 'cyan' | 'green' | 'dark' | 'navy' | 'teal-dark' | 'gray-light' | 'gray-muted',
  type: 'bg' | 'text' | 'border' | 'shadow' = 'bg'
): string {
  const prefix = type === 'shadow' ? 'shadow-neon' : type;
  return `${prefix}-cyber-${color}`;
}

export type RGBColor = typeof RGB_COLORS[keyof typeof RGB_COLORS];
export type HexColor = typeof HEX_COLORS[keyof typeof HEX_COLORS];
export type OpacityValue = typeof OPACITY[keyof typeof OPACITY];
