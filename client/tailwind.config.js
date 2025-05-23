/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6c47ff",
          light: "#e0d6ff",
          dark: "#5a3cd7",
        },
        secondary: "#ff6b6b",
        success: "#4caf50",
        warning: "#ff9800",
        error: "#f44336",
      },
      boxShadow: {
        sm: "0 2px 4px rgba(0, 0, 0, 0.05)",
        md: "0 4px 8px rgba(0, 0, 0, 0.1)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      backgroundImage: {
        "welcome-pattern": "url('/src/assets/welcome-bg.jpg')",
      },
    },
  },
  plugins: [],
}
