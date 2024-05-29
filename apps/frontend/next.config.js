// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

// https://nextjs.org/docs/advanced-features/security-headers
const {
  ENV_DEVELOPMENT,
  ENV_PRODUCTION,
  ENV_TEST
} = require('./constants/enviroments');

const Env = process.env.ENV || ENV_DEVELOPMENT;
let envDomain = null;

switch(Env) {
  case ENV_DEVELOPMENT: envDomain = 'localhost:4200'; break;
  case ENV_PRODUCTION: envDomain = 'XXX';break;
  case ENV_TEST: envDomain = 'XXX';break;
  default: envDomain = 'localhost:4200';
};

const imageSources = [
  process.env.IMAGE_HOST_CDN
];

const ContentSecurityPolicy = [
  // `default-src 'self'`,
  // `script-src 'self'`,
  // `child-src 'self'`,
  // `style-src 'self'`,
  // `font-src 'self'`,
  // `img-src 'self' ${imageSources.join(' ')}`,
  // `media-src 'self' ${imageSources.join(' ')}`  
].join(';');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  // Allow for specific domains to have access or * for all
  {
    key: "Access-Control-Allow-Origin",
    value: "*"
  },
  // Allows for specific methods accepted
  {
    key: "Access-Control-Allow-Methods",
    value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  },
  // Allows for specific headers accepted (These are a few standard ones)
  {
    key: "Access-Control-Allow-Headers",
    value: "Content-Type, Authorization, Accept",
  },      
];

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: imageSources
  },
  publicRuntimeConfig: {
    ROLLBAR_TOKEN_CLIENT: process.env.ROLLBAR_TOKEN_CLIENT,
    ROLLBAR_TOKEN_SERVER: process.env.ROLLBAR_TOKEN_SERVER,
    RPC_API_KEY: process.env.RPC_API_KEY,
    ENV: process.env.ENV,
    IMAGE_HOST_CDN: process.env.IMAGE_HOST_CDN,
    EXTENSION_URL: process.env.EXTENSION_URL,
    BLOG_URL: process.env.BLOG_URL,
    FAQ_URL: process.env.FAQ_URL,
    TERM_OF_USE_URL: process.env.TERM_OF_USE_URL,
    PRIVACY_POLICY_URL: process.env.PRIVACY_POLICY_URL,
    COOKIES_URL: process.env.COOKIES_URL,
    CONTACT_URL: process.env.CONTACT_URL,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    API_HOST: process.env.API_HOST,
    SEGMENT_BY_GOOGLE_KEY: process.env.SEGMENT_BY_GOOGLE_KEY,
    TAG_MANAGER_KEY: process.env.TAG_MANAGER_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: `${process.env.API_HOST}/auth/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },  
};

module.exports = withNx(nextConfig);

