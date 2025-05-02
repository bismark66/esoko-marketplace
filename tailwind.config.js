/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "default-bg": "#ffffff",
        "bg-dark": "#f9fafb",
        "bg-contrast": "#fffdd0",
        "footer-bg": "#111827",
        "primary-btn": "#2e8b57",
        "primary-btn-hover": "#256f3a",
        "primary-btn-disabled": "#a3e3b8",
        "secondary-btn": "#f9fafb",
        "secondary-btn-hover": "#e5e7eb",
        "secondary-btn-disabled": "#f3f4f6",
        "text-default": "#111827",
        "text-primary": "#111827",
        "text-secondary": "#374151",
      },
    },
  },
  plugins: [],
};
