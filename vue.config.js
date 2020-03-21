const version = require('./package.json').version;

module.exports = {
    pwa: {
        name: 'Media Tracker',
        themeColor: '#319795',
        msTileColor: '#319795',
        manifestOptions: {
            background_color: '#ffffff',
            orientation: 'portrait',
            version,
        },
    },
};
