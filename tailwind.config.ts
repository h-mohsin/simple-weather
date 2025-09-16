import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      gridTemplateColumns: {
        'forecast-item' : '10% 37.5% 5% 37.5% 10%',
        'popular-city' : '10% 80% 10%'
      },

      gridTemplateRows: {
        'forecast-container' : '15% 85%',
      },

      boxShadow: {
        'normal' : '0px 0px 10px rgba(0, 0, 0, .3)'
      }
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"]
},

  plugins: [],
};
export default config;
