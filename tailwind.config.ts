import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#8B0000', light: '#A50000', dark: '#6B0000', foreground: '#FFF8F0' },
        secondary: { DEFAULT: '#C89B3C', light: '#D4AE5C', dark: '#A07D28', foreground: '#111827' },
        coffee:    { DEFAULT: '#4A2C2A', light: '#6B3F3C', dark: '#321E1C' },
        cream:     { DEFAULT: '#FFF8F0', dark: '#F5ECD8' },
        dark:      { DEFAULT: '#111827', surface: '#1F2937', border: '#374151' },
        success:   '#22C55E',
        warning:   '#F59E0B',
        error:     '#EF4444',
        border:    'hsl(var(--border))',
        input:     'hsl(var(--input))',
        ring:      'hsl(var(--ring))',
        background:'hsl(var(--background))',
        foreground:'hsl(var(--foreground))',
        muted:     { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent:    { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        card:      { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover:   { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Playfair Display', 'serif'],
        body:    ['var(--font-body)', 'Inter', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 24px rgba(139,0,0,0.35)',
        'glow-gold':    '0 0 24px rgba(200,155,60,0.35)',
        'card':         '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover':   '0 12px 40px rgba(0,0,0,0.16)',
        'card-dark':    '0 4px 24px rgba(0,0,0,0.4)',
        'glass':        '0 8px 32px rgba(0,0,0,0.12)',
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(74,44,42,0.7) 50%, rgba(17,24,39,0.85) 100%)',
        'card-gradient':    'linear-gradient(180deg, transparent 0%, rgba(17,24,39,0.9) 100%)',
        'primary-gradient': 'linear-gradient(135deg, #8B0000 0%, #C89B3C 100%)',
        'gold-gradient':    'linear-gradient(135deg, #C89B3C 0%, #F0C060 50%, #C89B3C 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in':        'fadeIn 0.6s ease forwards',
        'slide-up':       'slideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'pulse-glow':     'pulseGlow 2s ease-in-out infinite',
        'shimmer':        'shimmer 1.5s infinite',
        'float':          'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:      { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:     { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight:{ from: { opacity: '0', transform: 'translateX(100%)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulseGlow:   { '0%,100%': { boxShadow: '0 0 20px rgba(139,0,0,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(139,0,0,0.6)' } },
        shimmer:     { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
