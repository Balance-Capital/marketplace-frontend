import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import getConfig from 'next/config';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import moment from 'moment';

import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
import ProfileDropDown from '../ProfileDropDown';

const { publicRuntimeConfig } = getConfig();
const rpcApiKey = publicRuntimeConfig?.RPC_API_KEY;
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${rpcApiKey}`;
const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

const injected = injectedModule({});

// const walletConnect = walletConnectModule({
//   projectId: '1',
//   qrcodeModalOptions: {
//     mobileLinks: [
//       'rainbow',
//       'metamask',
//       'argent',
//       'trust',
//       'imtoken',
//       'pillar',
//     ],
//   },
// });
const wcV2InitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'XXX',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1, 56],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'http://XXX',
};
// const walletConnect = walletConnectModule(wcV2InitOptions);

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL,
    },
  ],
  appMetadata: {
    name: 'Marketplace',
    icon: `${IMAGE_HOST}/assets/images/png/logo-black.png`,
    description: 'Smart shopping',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
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

let globalConnectedWallets = null;
export const disconnect = async () => {
  const token = getCookie('token')?.valueOf() || null;
  if (token) {
    deleteCookie('token');
    if (globalConnectedWallets) {
      await onboard.disconnectWallet({
        label: globalConnectedWallets[0].label,
      });
    }
    document.location = '/';
  }
};

export default function Wallet() {
  const router = useRouter();
  const [wallet, setWallet] = useState(null);
  const [primaryWallet] = onboard.state.get().wallets;
  const content = getLanguage(language, router.locale);
  const logged = getCookie('token')?.valueOf() || false;
  const PAGE_AFTER_LOGIN = '/affiliate-dashboard';

  useEffect(() => {
    if (logged) {
      setWallet(true);
    }
  }, [logged, wallet]);

  const connect = async () => {
    if (!wallet) {
      const connectedWallets = await onboard.connectWallet();
      if (connectedWallets?.length > 0) {
        setWallet(connectedWallets);
        globalConnectedWallets = connectedWallets;
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

        fetch(
          `/api/walletConnect?wallet=${connectedWallets[0].accounts[0]?.address}`
        )
          .then((response) => response.json())
          .then((userAccount) => {
            const { token } = userAccount;
            const expires = moment().add(10, 'minutes').toDate();
            setCookie('token', token, { expires });
            router.push(PAGE_AFTER_LOGIN, PAGE_AFTER_LOGIN);
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    } else {
      await onboard.disconnectWallet({ label: primaryWallet.label });
      setWallet(null);
    }
  };

  return (
    <div>
      {wallet ? (
        <ProfileDropDown />
      ) : (
        <Link href="/login" legacyBehavior>
          <a className="font-InterRegular text-[17px] text-white">Login</a>
        </Link>
      )}
    </div>
  );
}
