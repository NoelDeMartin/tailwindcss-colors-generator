const version = require('./package.json').version;

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/tailwindcss-colors-generator/'
        : '/',
    pwa: {
        name: 'TailwindCSS Colors Generator',
        themeColor: '#319795',
        msTileColor: '#319795',
        manifestOptions: {
            background_color: '#ffffff',
            orientation: 'portrait',
            version,
        },
    },
};
