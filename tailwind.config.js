module.exports = {
  content: [
    "./index.html", // Для файлов HTML
    "./src/**/*.{js,jsx,ts,tsx}", // Для файлов в `src/`
  ],
  theme: {
    extend: {
      colors: {
        black: "#0D0D0D",
        gray: {
          800: "#1A1A1A",
          400: "#9CA3AF",
        },
        blue: {
          600: "#2563EB",
          500: "#3B82F6",
          400: "#60A5FA",
        },
        red: {
          600: "#EF4444",
        },
        white: "#FFFFFF",
      },
      screens: {
        "lg-xl": "1124px", // Новый кастомный брейкпоинт
        "2xl": "1600px", // Новый кастомный брейкпоинт
      },
    },
  },
  plugins: [],
};
