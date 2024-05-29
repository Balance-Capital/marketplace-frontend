# Marketplace Frontend and Extension - Monorepo

This monorepo contains the core code for the trading platform's UI and browser extension. Marketplace allows users to immediately earn money from commissions as soon as they create an account on the affiliate network and set up the platform.
The platform supports coupons, deals, and products at promotional prices.

[demo](https://clevrpay.com)

## Project using

- nx monorepo
- rollbar (tracking error)
- nextjs

## Hot to install and run

`
npm install
npm run <script>
`

### Scripts:
- "dev": developer version start
- "prod": build prodaction mode app,
- "ext:dev:watch": run developer mode,
- "ext:prod:build": run build exception,
- "start": "nx serve": start application
- "build": "nx build": build appliaction
- "test": "nx test": test appliaction

### Setup configuration
Create .env file or setup environments variables in your provider
- apps/frontend/constants/cookieName.ts -> put your cookie name here
- apps/frontend/components/Wallet/index.tsx -> put your app name and url, marked as XXX
- apps/frontend/utils/wallet.ts -> put your app name, marked as XXX
- apps/frontend/next.config.js -> put your domain instead XXX
- nx.json -> put your accessToken
- apps/frontend/project.json -> put your domain instead XXX

In the pages folder, edit each locale JSON file and change XXX to your own domain and application name

- apps/frontend/components/Footer -> change social media url to yours

# Affiliate integrated

- CommissionJunction
- SkimLinks

Products, coupons and deals

### Contributors

- Malek
- pwntrOn
- ub