const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
    /**
    * @type {import('next').NextConfig}
    */
    const nextConfig = defaultConfig;

    nextConfig.reactStrictMode = true;
    if (phase !== PHASE_DEVELOPMENT_SERVER) {
        nextConfig.assetPrefix = './';
    }

    return nextConfig;
};
