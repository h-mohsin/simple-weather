/** @type {import('tailwindcss').Config} */
module.exports = {
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

        boxShadow: {
            'normal' : '0px 0px 1vw rgba(0, 0, 0, .3)'
        },

        borderRadius: {
            'normal' : 'max(0.7vw,15px)',
            'container' : 'max(0.7vw,15px)',
            'small' : 'max(0.47vw,10px)',
            'extra-small' : 'max(0.35vw,7.5px)',
        },

        backgroundColor: {
            'primary' : 'var(--primary-color)',
            'secondary' : 'var(--secondary-color)'
        },

        flex: {
            'search-bar' : '0 10 10%',
            'components' : '90 90 90%'
        }
    },
      },
      
  plugins: [],
}

