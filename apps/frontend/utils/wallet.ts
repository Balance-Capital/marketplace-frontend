import getConfig from 'next/config';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import metamaskSDK from '@web3-onboard/metamask';
import coinbaseSDK from '@web3-onboard/coinbase';

const { publicRuntimeConfig } = getConfig();
const rpcApiKey = publicRuntimeConfig?.RPC_API_KEY;
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${rpcApiKey}`;
const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

export interface IWallets {
  address: string;
  default: boolean;
  lastUpdate: Date;
  name: string;
}

const metamaskSDKWallet = metamaskSDK({
  options: {
    extensionOnly: false,
    dappMetadata: {
      name: 'XXX',
    },
  },
});

const coinbaseSDKWallet = coinbaseSDK({
  enableMobileWalletLink: true,
});

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected, metamaskSDKWallet, coinbaseSDKWallet],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL,
    },
  ],
  appMetadata: {
    name: 'XXX',
    icon: `${IMAGE_HOST}/assets/images/icon/web3-icon.png`,
    logo: `${IMAGE_HOST}/assets/images/png/web3-logo.png`,
    description: 'Smart shopping',
  },
  accountCenter: {
    desktop: {
      position: 'topLeft',
      enabled: true,
      minimal: true,
    },
    mobile: {
      position: 'topRight',
      enabled: true,
      minimal: true,
    },
  },
});

const WalletConnect = async (accessToken) => {
  const connectedWallets = await onboard.connectWallet();
  if (connectedWallets?.length > 0) {
    if (window) {
      window.localStorage.setItem(
        'wallet',
        JSON.stringify(
          connectedWallets.map((item) => ({
            accounts: item.accounts || undefined,
            chains: item.chains || undefined,
            icon: item.icon || undefined,
            label: item.label || undefined,
            instance: item.instance || undefined,
          }))
        )
      );
    }

    return fetch(
      `/api/walletAdd?walletAddress=${connectedWallets[0]?.accounts[0]?.address}&walletName=${connectedWallets[0]?.label}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((userAccount) => {
        if (userAccount?.status === 409) {
          return 'conflict';
        } else {
          return 'ok';
        }
      })
      .catch((err) => {
        if (err?.status === 409) {
          return 'conflict';
        } else {
          return 'error';
        }
      });
  }
};

export default WalletConnect;
