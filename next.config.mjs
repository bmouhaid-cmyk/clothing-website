import createNextIntlPlugin from 'next-intl/plugin';

/** 
 * Use the plugin ONLY for Server Components translation loading.
 * The Middleware handles routing.
 */
const withNextIntl = createNextIntlPlugin();

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
    output: 'standalone',
};

export default withNextIntl(nextConfig);
