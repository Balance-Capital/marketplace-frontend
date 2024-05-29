import { Generic } from '@monorepo/chrome-extension/msg-bridge';
import { environment } from '../../../../environments/environment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export function ConnectPanel() {
  const [win, setWin] = useState({} as chrome.windows.Window);

  function PopupCenter(pageURL: string, w: number, h: number) {
    const left = +(window.screen.width / 2 - w / 2).toFixed();
    const top = +(window.screen.height / 2 - h / 2).toFixed();
    chrome.windows.create(
      {
        focused: true,
        type: 'popup',
        url: pageURL,
        width: w,
        height: h,
        left,
        top,
      },
      (window) => {
        setWin(window as chrome.windows.Window);
        chrome.windows.onRemoved.addListener(function remove(windowId: number) {
          if (window?.id === windowId) {
            setWin({} as chrome.windows.Window);
            chrome.windows.onRemoved.removeListener(remove);
          }
        });
        const tabId = window?.tabs ? window.tabs[0].id : -1;
        chrome.storage.local.set({ [Generic.AuthTabId]: tabId });
      }
    );
  }

  const onGoogle = () => {
    if (Object.keys(win).length === 0) {
      PopupCenter(`${environment.APP_URL}/auth/login/google`, 500, 800);
    }
  };

  const onFacebook = () => {
    if (Object.keys(win).length === 0) {
      PopupCenter(`${environment.APP_URL}/auth/login/facebook`, 500, 800);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <h2>{chrome.i18n.getMessage('joinToCompany')}</h2>
        <span>{chrome.i18n.getMessage('joinReward')}</span>
      </div>
      <div
        className={`w-full h-[70px] cursor-pointer font-InterRegular text-lg flex items-center justify-center gap-4 rounded-2xl ${styles['btn-light']}`}
        onClick={onGoogle}
      >
        <img
          src={chrome.runtime.getURL(`assets/png/gmail.png`)}
          alt="gmail logo"
        />
        <span>{chrome.i18n.getMessage('continueWith')} Google</span>
      </div>
      <div
        className={`w-full h-[70px] cursor-pointer font-InterRegular text-lg flex items-center justify-center gap-4 rounded-2xl ${styles['btn-light']}`}
        onClick={onFacebook}
      >
        <img src={chrome.runtime.getURL(`assets/png/fb.png`)} alt="fb logo" />
        <span>{chrome.i18n.getMessage('continueWith')} Facebook</span>
      </div>
      {/* <Link className={styles['btn-light']} to="/">
        <img
          src={chrome.runtime.getURL(`assets/png/fb.png`)}
          alt="gmail logo"
        />
        <span>{chrome.i18n.getMessage('continueWith')} Facebook</span>
      </Link> */}
      <Link className={styles['btn-light']} to="/login">
        <img
          src={chrome.runtime.getURL(`assets/png/email-dark.png`)}
          alt="gmail logo"
        />
        <span>{chrome.i18n.getMessage('loginWith')} Email</span>
      </Link>
      <a
        className={styles['btn-dark']}
        href={`${environment.APP_URL}/join`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={chrome.runtime.getURL(`assets/png/email.png`)}
          alt="gmail logo"
        />
        <span>{chrome.i18n.getMessage('joinWith')} Email</span>
      </a>
    </div>
  );
}
