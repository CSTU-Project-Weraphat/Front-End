/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const { i18n } = require('./next-i18next.config')

module.exports = {
  images: {
      domains: ['cdn.discordapp.com'],
  },
  i18n,
}
module.exports = nextConfig
