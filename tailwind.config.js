/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dentsu-primary": "#05051e",
      },
      container: {
        padding: {
          DEFAULT: "2.25rem", // 16px padding on small screens
          sm: "2.25rem", // 32px padding on screens >= 640px
          md: "2.25rem", // 32px padding on screens >= 768px
          lg: "4rem", // 64px padding on screens >= 1024px
          xl: "4rem", // 64px padding on screens >= 1280px
          "2xl": "4rem", // 64px padding on screens >= 1536px
        },
      },
    },
  },
  plugins: [],
};
