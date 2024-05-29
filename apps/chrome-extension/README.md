# Marketplace extension

Browser extension code enabling suggestions about discounts and promotions on websites viewed by the user. Thanks to this, the user can learn about opportunities and take advantage of the offers immediately without having to go to other websites.

## How to setup?

Fill in your own data

- chrome-extension/background/src/environments
- chrome-extension/content-script/src/environments
- chrome-extension/popup/src/environments

Edit chrome-extension/popup/_locales/en -> change XXX to name appliaction

## Schema

- production: true | false
- IMAGE_HOST_CDN: url to the images
- SITE_URL: your application url
- SUPPORT_URL: 'XXX/help' 
- APP_URL: application url
- FORGOT_PASSWORD_URL: 'XXX/forgot-password'
- ADD_WALLET_URL: 'XXX/settings'
- EXTENSION_URL: url to the extension

XXX change to your domian

- production: true | false
- API_ADDRESS: url api address
- SEGMENT_API: url for segment tracking
- SEGMENT_KEY: password for segment tracking

### Contributors

- Malek
- pwntrOn
- ub