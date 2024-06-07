import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default withMT({
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            blue: colors.blue,
            cyan: colors.cyan,
            emerald: colors.emerald,
            fuchsia: colors.fuchsia,
            green: colors.green,
            indigo: colors.indigo,
            lime: colors.lime,
            orange: colors.orange,
            pink: colors.pink,
            purple: colors.purple,
            red: colors.red,
            rose: colors.rose,
            sky: colors.sky, //warn - As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.
            teal: colors.teal,
            violet: colors.violet,
            yellow: colors.amber,
            white: colors.white,
            violet: colors.violet,
        },
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
});
