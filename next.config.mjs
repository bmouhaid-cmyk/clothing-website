/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias['next-intl/config'] = require('path').resolve(__dirname, './i18n/request.ts');
        return config;
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/fr',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
