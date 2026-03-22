import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: 'var(--void)',
        deep: 'var(--deep)',
        nebula: 'var(--nebula)',
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        border: 'var(--border)',
        'border-glow': 'var(--border-glow)',
        pulsar: 'var(--pulsar)',
        quasar: 'var(--quasar)',
        nova: 'var(--nova)',
        starlight: 'var(--starlight)',
        comet: 'var(--comet)',
        asteroid: 'var(--asteroid)',
        constellation: 'var(--constellation)',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        body: ['Sora', 'sans-serif'],
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        orbit: 'orbit 2s linear infinite',
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        nebulaDrift: 'nebulaDrift 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spinReverse 5s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 8px 2px rgba(0,180,216,0.4)',
          },
          '50%': {
            boxShadow: '0 0 20px 6px rgba(0,180,216,0.7)',
          },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        nebulaDrift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'glow-pulsar': '0 0 16px 4px rgba(0,180,216,0.5)',
        'glow-quasar': '0 0 16px 4px rgba(123,47,255,0.5)',
        'glow-nova': '0 0 16px 4px rgba(247,37,133,0.5)',
      },
    },
  },
  plugins: [],
}

export default config
