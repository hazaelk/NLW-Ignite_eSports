/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.tsx', './index.html'],
    theme: {
        fontFamily: {
            sans: ['Inter', 'sans-serif']
        },
        extend: {
            colors: {},
            backgroundImage: {
                backgroundGalaxy: "url('/bg-galaxy.png')",
                'nlw-gradient':
                    'linear-gradient(89.86deg, #9572FC 35.08%, #43E7AD 45.94%, #E1D55D 70.57%)',
                'game-gradient':
                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
            }
        }
    },
    plugins: []
}
