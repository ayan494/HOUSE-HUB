// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#f7f7f7',
        primary: {
          DEFAULT: '#6699cc',
          foreground: '#ffffff',
        },
        brand: '#6699cc',
        premium: '#6699cc',
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
}
