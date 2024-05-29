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
        <button
          onClick={() => onClickToggle()}
          className="w-24 h-8 flex items-center justify-center font-PPNeueMachina text-xs text-white-0 bg-black rounded-full"
        >
          {chrome.i18n.getMessage('homePageBtnTitle2')}
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <button className="w-24 h-8 flex items-center justify-center font-PPNeueMachina text-xs text-white-0 bg-success rounded-full">
            {code}
          </button>
          <span className="flex items-center gap-2 font-InterRegular text-sm text-success">
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
