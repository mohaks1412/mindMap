// tailwind.config.js - ADD THIS!
module.exports = {
  darkMode: ['class'], // ✅ Next-themes
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 🔥 MAP YOUR CSS VARS TO TAILWIND
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--color-fg-muted) / <alpha-value>)',
        'fg-subtle': 'rgb(var(--color-fg-subtle) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-soft': 'rgb(var(--color-bg-soft) / <alpha-value>)',
        'bg-strong': 'rgb(var(--color-bg-strong) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-fg': 'rgb(var(--color-accent-fg) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        'success-fg': 'rgb(var(--color-success-fg) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        'warning-fg': 'rgb(var(--color-warning-fg) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        'danger-fg': 'rgb(var(--color-danger-fg) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
