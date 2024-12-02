import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const animatedPlugin = require("tailwindcss-animated");
const daisy = require("daisyui");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1363DF",
          light: "#47B5FF", // Variación más clara
          dark: "#06283D", // Variación más oscura
        },
        secondary: {
          DEFAULT: "#47B5FF",
          light: "#DFF6FF",
          dark: "#1363DF",
        },
        accent: "#06283D",
        neutral: "#DFF6FF",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: "#1363DF",
            primaryLight: "#47B5FF",
            primaryDark: "#06283D",
            secondary: "#47B5FF",
            secondaryLight: "#DFF6FF",
            secondaryDark: "#1363DF",
            accent: "#06283D",
            neutral: "#DFF6FF",
            warning: "#06283D",
          },
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        // ... custom themes
      },
    }),
    animatedPlugin,
    daisy,
  ],

  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
} satisfies Config;

// nextui({
//   themes: {
//     light: {
//       colors: {
//         primary: "#FFEDDB",
//         secondary: "#E3B7A0",
//         content1: "#FFEDDB",
//         background: "#FBFBFB",
//         focus: "#FFEDDB",
//         warning: "#BF9270",
//       },
//     },
//   },
// }),
