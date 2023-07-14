/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
    },
    colors: {
      'primary': 'black',
      'secondary': '#424242',
      'disabled': '#09173e',
      'error': '#d3dce6',
      'success': '#d3dce6',
      'info': '#d3dce6',
      'warning': '#d3dce6',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
