/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.mk-glossary.korabli.su",
            },
        ],
    },
};

module.exports = nextConfig
