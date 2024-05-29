import {
  Generic,
  ISettings,
  IWallet,
  PopupBroker,
  To,
} from '@monorepo/chrome-extension/msg-bridge';
import { environment } from '../../../../../environments/environment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ImgWithFallback from '../../../../components/ImgWithFallback/ImgWithFallback';
import { TopBar } from '../../../../components/TopBar/TopBar';
import { addressEllipsis } from '../../../../helpers/helper';
import { settings } from '../../../../recoil/atoms/settings.atom';
import styles from './index.module.css';
import { Toast } from '../../../../components/Toast';
import { ToastMsg } from '../../../../constants/messages';

export default function UserProfile() {
  const [setting, setSetting] = useRecoilState(settings);
  const [wallets, setWallets] = useState([] as IWallet[]);

  useEffect(() => {
    PopupBroker.dispatch(Generic.GetSettings, null, To.Background, true)
      ?.then((response: ISettings) => {
        setSetting(response);
        setWallets(response.wallets);
      })
      .catch((error) => {
        if (error.status === 401) {
          Toast.error(ToastMsg.TOKEN_EXPIRED);
        }
      });
  }, []);

  return (
    <div className={styles['container']}>
      <TopBar
        hexColor="#F3F3F4"
        title={chrome.i18n.getMessage('userProfilePageTitle')}
        titleColor="text-white-100"
        isBack={true}
        bgColor="bg-black"
      />
      <form className="h-[480px] p-4 font-InterRegular flex flex-col items-center gap-2">
        {setting?.firstName && (
          <div className="w-full text-sm text-secondary">
            Username
            <div className="w-full h-[51px] text-black border-solid border-2 border-[rgba(112,112,112,0.1)] px-4 rounded-[15px] mt-[14px] flex items-center">
              {setting.firstName} {setting.lastName}
            </div>
          </div>
        )}
        {setting?.email && (
          <div className="w-full text-sm text-secondary">
            Email
            <div className="w-full h-[51px] text-black border-solid border-2 border-[rgba(112,112,112,0.1)] px-4 rounded-[15px] mt-[14px] flex items-center">
              {setting.email}
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-2 mt-2">
          {wallets?.map((item: IWallet, i) => (
            <div
              key={i}
              className="w-full rounded-xl bg-[rgba(116,132,157,0.05)] p-3"
            >
              <div className="flex items-start gap-4">
                <ImgWithFallback
                  className="w-[28px] h-[28px]"
                  src={`/assets/png/${item.name.toLowerCase()}.png`}
                  fallback={'/assets/png/store-default.png'}
                  alt={item.name}
                />
                <div className="w-full flex flex-col gap-2">
                  <span className="text-base">{item.name}</span>
                  <span className="text-base">
                    {addressEllipsis(item.address)}
                  </span>
                  <span className="text-xs text-secondary">
                    Updated {moment(item?.lastUpdate).toISOString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {Array.isArray(wallets) && wallets.length === 0 && (
            <a
              className="text-sm ml-auto underline"
              href={environment.ADD_WALLET_URL}
              target="_blank"
              rel="noreferrer"
            >
              + Add wallet
            </a>
          )}
        </div>
        {/* <label className="w-full text-sm text-secondary">
          Username
          <input
            className="w-full h-[51px] bg-transparent focus:outline-none text-black placeholder-black border-solid border-2 border-[rgba(112,112,112,0.1)] px-4 rounded-[15px] mt-[14px]"
            type="text"
            placeholder="James"
          />
        </label>
        <label className="w-full text-sm text-secondary">
          <span className="flex items-center justify-between">
            Email <button className="text-xs text-primary">Change email</button>
          </span>
          <input
            className="w-full h-[51px] bg-transparent focus:outline-none text-black placeholder-black border-solid border-2 border-[rgba(112,112,112,0.1)] px-4 rounded-[15px] mt-[14px]"
            type="email"
            placeholder="james.smith@email.com"
          />
        </label>
        <label className="w-full text-sm text-secondary">
          Currency
          <div className="w-full h-[51px] bg-transparent border-solid border-2 border-[rgba(112,112,112,0.1)] px-4 rounded-[15px] mt-[14px] flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
            >
              <g
                id="Group_14162"
                name="Group 14162"
                transform="translate(-0.264 -0.31)"
              >
                <circle
                  id="Ellipse_1000"
                  name="Ellipse 1000"
                  cx="14"
                  cy="14"
                  r="14"
                  transform="translate(0.264 0.31)"
                  fill="#101417"
                />
                <g
                  id="_9041654_globe_icon"
                  name="9041654_globe_icon"
                  transform="translate(6.009 6.009)"
                >
                  <path
                    id="Path_4074"
                    name="Path 4074"
                    d="M7.963,15.927A7.963,7.963,0,1,0,0,8,7.908,7.908,0,0,0,7.963,15.927Z"
                    fill="none"
                    stroke="#fafafa"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    fillRule="evenodd"
                  />
                  <path
                    id="Path_4075"
                    name="Path 4075"
                    d="M1,5H14.936"
                    transform="translate(-0.005 -0.023)"
                    fill="none"
                    stroke="#fafafa"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    fillRule="evenodd"
                  />
                  <path
                    id="Path_4076"
                    name="Path 4076"
                    d="M1,11H14.936"
                    transform="translate(-0.005 -0.05)"
                    fill="none"
                    stroke="#fafafa"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    fillRule="evenodd"
                  />
                  <path
                    id="Path_4077"
                    name="Path 4077"
                    d="M7.982,15.927c2.209,0,3.982-3.51,3.982-7.928S10.19,0,7.982,0,4,3.581,4,8,5.773,15.927,7.982,15.927Z"
                    transform="translate(-0.018)"
                    fill="none"
                    stroke="#fafafa"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    fillRule="evenodd"
                  />
                </g>
              </g>
            </svg>
            Multi-currency
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="13.144"
              height="7.572"
              viewBox="0 0 13.144 7.572"
            >
              <path
                id="_9041672_chevron_down_icon"
                name="9041672_chevron_down_icon"
                d="M10.815.5,5.658,5.658.5.5"
                transform="translate(0.914 0.914)"
                fill="none"
                stroke="#74849d"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </label>

        <label className="w-full text-sm text-secondary">
          Language
          <div className="w-full h-[51px] bg-transparent border-solid border-2 border-[rgba(112,112,112,0.1)] px-4 rounded-[15px] mt-[14px] flex items-center gap-4">
            <img src={chrome.runtime.getURL('assets/png/uk-flag.png')} alt="" />
            English
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="13.144"
              height="7.572"
              viewBox="0 0 13.144 7.572"
            >
              <path
                id="_9041672_chevron_down_icon"
                name="9041672_chevron_down_icon"
                d="M10.815.5,5.658,5.658.5.5"
                transform="translate(0.914 0.914)"
                fill="none"
                stroke="#74849d"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </label>
        <input
          className="w-full h-14 text-base bg-black text-white-0 mt-auto rounded-full"
          type="submit"
          value="Update profile"
        /> */}
      </form>
    </div>
  );
}
