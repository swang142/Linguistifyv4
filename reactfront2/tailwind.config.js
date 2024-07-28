// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Add customizations here
      colors: {
        grey: '#ebedf0',
        white: '#ffffff',
        blue: '#6058f7',
        // THIS AINT NO WORKING BROTHER
        textlight: '#2a2a35',
        textdark: '#FAFAFA',
        bglight: '#FAFAFA',
        bgdark: '#212121',
      },
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'body': ['Jost', 'sans-serif']
      }

    },
  },
  plugins: [],
}
