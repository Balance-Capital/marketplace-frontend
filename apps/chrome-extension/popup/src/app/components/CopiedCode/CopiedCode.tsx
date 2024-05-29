import { useState } from 'react';
import styles from './index.module.css';
import {
  Generic,
  PopupBroker,
  To,
} from '@monorepo/chrome-extension/msg-bridge';

export default function CopiedCode({
  code,
  redirectUrl,
}: {
  code: string;
  redirectUrl: string;
}) {
  const [toggle, setToggle] = useState(true);

  const onClickToggle = () => {
    navigator.clipboard.writeText(code);
    setToggle(false);
    setTimeout(() => {
      setToggle(true);
      PopupBroker.dispatch(
        Generic.OpenAffiliateInTab,
        { redirectUrl },
        To.Background,
        false
      );
    }, 500);
  };

  return (
    <div>
      {toggle ? (
        <button onClick={() => onClickToggle()} className={styles['btn']}>
          {chrome.i18n.getMessage('homePageBtnTitle2')}
        </button>
      ) : (
        <div className={styles['row']}>
          <button className={styles['activeBtn']}>{code}</button>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11.178"
              height="8.397"
              viewBox="0 0 11.178 8.397"
            >
              <path
                id="Path_3973"
                name="Path 3973"
                d="M4.5,6.617l2.47,2.47L13.557,2.5"
                transform="translate(-3.439 -1.439)"
                fill="none"
                stroke="#37ac82"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                fillRule="evenodd"
              />
            </svg>
            {chrome.i18n.getMessage('homePageBtnTitle3')}
          </span>
        </div>
      )}
    </div>
  );
}
