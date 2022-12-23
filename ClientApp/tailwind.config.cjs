/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
    theme: {
        extend: {
            colors: {
                primary: "#02D871",
                "primary-dark": "#06c469",
            },
        },
    },
    plugins: [],
};
