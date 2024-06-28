/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'sm': '320px',
            'md': '640px',
            'lg': '920px',
            'xl': '1100px',
            '2xl': '1536px',
          },
        extend: {
            keyframes: {
                'border-spin': {
                  '100%': {
                    transform: 'rotate(-360deg)',
                  },
                },
              },
              animation: {
                'border-spin': 'border-spin 7s linear infinite',
              },
        },
    },
    plugins: [],
    darkMode: "selector"
}

