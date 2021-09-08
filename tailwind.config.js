module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        70: "0 1 70%",
        25: "0 1 25%"
      },
      fontFamily: {
        "logo": ["Lobster Two"]
      },
      colors: {
        articlePage: "rgb(51,51,51)"
      },
      boxShadow: {
        custom: "32px 26px 20px -20px rgba(0,0,0,0.4)"
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}