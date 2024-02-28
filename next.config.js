// @ts-check

const withTM = require('next-transpile-modules')([/*'antd-mobile'*/]);

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	basePath: '/01factory',
	eslint: {
		ignoreDuringBuilds: true
	},
	// webpack: (config) => {
	// 	config.resolve.fallback = { fs: false };
	// 	return config;
	// },
	pageExtensions: ['page.tsx', 'api.ts'],
	// reactStrictMode: true,	// Could not be used becuase of arco
	// eslint-disable-next-line require-await, @typescript-eslint/require-await
	async redirects() {
		return process.env.NODE_ENV === 'development' ? [] : [
			// {
			// 	source: '/',
			// 	destination: '/pg001',
			// 	permanent: true,
			// },
		];
	},
	// i18n: {
	// 	locales: ['en-US', 'zh_CN', 'cn'],
	// 	defaultLocale: 'cn',
	// },
};

module.exports = withTM(nextConfig);
