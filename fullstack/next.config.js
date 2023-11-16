/* eslint-disable */
const process = require("node:process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make it accessible in client side.
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
