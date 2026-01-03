import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cyber Minimalist Color Palette
        'cyber-dark': '#0a1929',
        'cyber-darker': '#051120',
        'cyber-navy': '#132f4c',
        'cyber-teal': '#0d3a4f',
        'cyber-teal-dark': '#082532',
        'cyber-cyan': '#1ad1ff',
        'cyber-cyan-bright': '#00ffcc',
        'cyber-green': '#00ffae',
        'cyber-green-bright': '#00ff88',
        'cyber-red': '#ff002b',
        'cyber-orange': '#ff6b35',
        'cyber-gray': '#66768f',
        'cyber-gray-light': '#a3b3cc',
      },
      fontFamily: {
        mono: ['var(--font-space-mono)', 'Space Mono', 'JetBrains Mono', 'Fira Mono', 'Roboto Mono', 'monospace'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(26, 209, 255, 0.5), 0 0 20px rgba(26, 209, 255, 0.3)',
        'neon-green': '0 0 10px rgba(0, 255, 174, 0.5), 0 0 20px rgba(0, 255, 174, 0.3)',
        'glow-cyan': '0 0 30px rgba(26, 209, 255, 0.4)',
        'glow-green': '0 0 30px rgba(0, 255, 174, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px rgba(26, 209, 255, 0.5), 0 0 10px rgba(26, 209, 255, 0.3)' },
          'to': { boxShadow: '0 0 10px rgba(26, 209, 255, 0.8), 0 0 20px rgba(26, 209, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
