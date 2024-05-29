import {
  Generic,
  IReward,
  ITransaction,
  PopupBroker,
  To,
} from '@monorepo/chrome-extension/msg-bridge';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import RewardTipModal from '../../../../components/Modals/RewardTipModal/RewardTipModal';
import { TopBar } from '../../../../components/TopBar/TopBar';
import { rewards } from '../../../../recoil/atoms/reward.atom';
import styles from './index.module.css';
import { Tooltip } from '@monorepo/generic-shared/components';
import { Transaction } from '../../../../components/Transaction/Transaction';
import { Toast } from '../../../../components/Toast';
import { ToastMsg } from '../../../../constants/messages';

export default function Rewards() {
  const [rewardModal, setRewardModal] = useState(false);
  const [toggleReedem, setToggleReedem] = useState(true);
  const [reward, setReward] = useRecoilState(rewards);

  useEffect(() => {
    PopupBroker.dispatch(Generic.GetRewards, null, To.Background, true)
      ?.then((response: IReward) => {
        setReward(response);
      })
      .catch((error) => {
        if (error.status === 401) {
          Toast.error(ToastMsg.TOKEN_EXPIRED);
        }
      });
  }, []);

  return (
    <div className={styles['container']}>
      {rewardModal && <RewardTipModal setModal={setRewardModal} />}
      <TopBar
        hexColor="#F3F3F4"
        title={chrome.i18n.getMessage('rewardsPageTitle')}
        titleColor="text-white-100"
        isBack={true}
        bgColor="bg-black"
      />
      <div className="h-[480px]">
        <div className="h-[140px] font-PPNeueMachina text-white-0 bg-black p-4 flex flex-col items-center justify-center gap-4">
          <span className="text-xl flex items-center justify-center gap-2">
            <p className="pt-1">Clevr Cash</p>
            <svg
              onClick={() => setRewardModal(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="13.266"
              height="13.266"
              viewBox="0 0 13.266 13.266"
            >
              <g
                id="Group_14295"
                name="Group 14295"
                transform="translate(-262.504 -113.593)"
              >
                <g
                  id="Group_12324"
                  name="Group 12324"
                  transform="translate(263.004 114.093)"
                >
                  <circle
                    id="Ellipse_961"
                    name="Ellipse 961"
                    cx="6.133"
                    cy="6.133"
                    r="6.133"
                    fill="none"
                    stroke="#74849d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                  />
                  <path
                    id="Path_3970"
                    name="Path 3970"
                    d="M8.269,11.576V8.5H7.5"
                    transform="translate(-1.919 -2.546)"
                    fill="none"
                    stroke="#74849d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    fillRule="evenodd"
                  />
                  <path
                    id="Path_3971"
                    name="Path 3971"
                    d="M7.5,12.5H9.038"
                    transform="translate(-1.919 -3.47)"
                    fill="none"
                    stroke="#74849d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    fillRule="evenodd"
                  />
                </g>
                <circle
                  id="Ellipse_962"
                  name="Ellipse 962"
                  cx="0.791"
                  cy="0.791"
                  r="0.791"
                  transform="translate(268.544 116.862)"
                  fill="#74849d"
                />
              </g>
            </svg>
          </span>
          <span className="text-3xl bg-[#101417] px-3 py-1 flex items-center gap-2 rounded-full">
            <img
              src={chrome.runtime.getURL('assets/png/blue-logo.png')}
              alt=""
            />
            <p className="pt-[6px]">
              {reward.currency}{' '}
              {reward.totalEarnings?.toPrecision(4) || 0}
            </p>
          </span>
          {/* {toggleReedem ? (
            <button
              onClick={() => setToggleReedem(false)}
              className="w-full h-14 text-lg bg-primary rounded-[10px] mt-auto"
            >
              Reedem rewards
            </button>
          ) : (
            <>
              <span className="flex items-center gap-2 text-xs text-secondary font-InterRegular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.266"
                  height="13.266"
                  viewBox="0 0 13.266 13.266"
                >
                  <g
                    id="Group_14295"
                    name="Group 14295"
                    transform="translate(-262.504 -113.593)"
                  >
                    <g
                      id="Group_12324"
                      name="Group 12324"
                      transform="translate(263.004 114.093)"
                    >
                      <circle
                        id="Ellipse_961"
                        name="Ellipse 961"
                        cx="6.133"
                        cy="6.133"
                        r="6.133"
                        fill="none"
                        stroke="#74849d"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      />
                      <path
                        id="Path_3970"
                        name="Path 3970"
                        d="M8.269,11.576V8.5H7.5"
                        transform="translate(-1.919 -2.546)"
                        fill="none"
                        stroke="#74849d"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        fillRule="evenodd"
                      />
                      <path
                        id="Path_3971"
                        name="Path 3971"
                        d="M7.5,12.5H9.038"
                        transform="translate(-1.919 -3.47)"
                        fill="none"
                        stroke="#74849d"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        fillRule="evenodd"
                      />
                    </g>
                    <circle
                      id="Ellipse_962"
                      name="Ellipse 962"
                      cx="0.791"
                      cy="0.791"
                      r="0.791"
                      transform="translate(268.544 116.862)"
                      fill="#74849d"
                    />
                  </g>
                </svg>
                Only $25 left until you can cash out your rewards
              </span>
              <div className="w-full h-3 bg-[rgba(116,132,157,0.29)] rounded-full">
                <div className="w-[17%] h-3 bg-primary rounded-full"></div>
              </div>
              <div className="w-full flex items-center justify-between font-PPNeueMachina text-sm text-white-0">
                <button
                  onClick={() => setToggleReedem(true)}
                  className="p-2 pt-3 bg-primary rounded-[10px]"
                >
                  $5.00
                </button>
                <button className="p-2 pt-3 bg-[#151A1D] rounded-[10px]">
                  $30.00
                </button>
              </div>
            </>
          )} */}
        </div>
        <div className="h-[340px] pt-4 px-4">
          <div className="w-[148px] font-PPNeueMachina text-xl flex items-center justify-between">
            <h2 className="pt-1">Transactions</h2>
            <Tooltip tooltip="Orders may need 72 hours to payout" width={165}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13.266"
                height="13.266"
                viewBox="0 0 13.266 13.266"
              >
                <g
                  id="Group_14295"
                  name="Group 14295"
                  transform="translate(-262.504 -113.593)"
                >
                  <g
                    id="Group_12324"
                    name="Group 12324"
                    transform="translate(263.004 114.093)"
                  >
                    <circle
                      id="Ellipse_961"
                      name="Ellipse 961"
                      cx="6.133"
                      cy="6.133"
                      r="6.133"
                      fill="none"
                      stroke="#74849d"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    />
                    <path
                      id="Path_3970"
                      name="Path 3970"
                      d="M8.269,11.576V8.5H7.5"
                      transform="translate(-1.919 -2.546)"
                      fill="none"
                      stroke="#74849d"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      fillRule="evenodd"
                    />
                    <path
                      id="Path_3971"
                      name="Path 3971"
                      d="M7.5,12.5H9.038"
                      transform="translate(-1.919 -3.47)"
                      fill="none"
                      stroke="#74849d"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      fillRule="evenodd"
                    />
                  </g>
                  <circle
                    id="Ellipse_962"
                    name="Ellipse 962"
                    cx="0.791"
                    cy="0.791"
                    r="0.791"
                    transform="translate(268.544 116.862)"
                    fill="#74849d"
                  />
                </g>
              </svg>
            </Tooltip>
          </div>
          <div className="mt-4 pb-4 h-[276px] overflow-y-scroll scrollbar-hide">
            <div className="flex flex-col items-center gap-2">
              {reward.transactions?.length ? (
                reward.transactions?.map((item: ITransaction, i) => (
                  <Transaction key={`reward-${i}`} {...item} />
                ))
              ) : (
                <span className="w-full h-[50px] rounded-[20px] flex items-center justify-center p-4 text-secondary font-PPNeueMachina text-lg">
                  No rewards found.
                </span>
              )}
              {/* <div className="w-full h-[70px] rounded-[20px] bg-white-50 flex items-center gap-4 p-4">
                <img
                  className="w-9 h-9 rounded-full"
                  src={chrome.runtime.getURL('assets/png/camper.jxr')}
                  alt=""
                />
                <div className="font-InterRegular flex flex-col gap-2">
                  <span className="text-sm">Spent $34.99</span>
                  <span className="text-xs text-secondary">
                    3 Oct 2022 21:22
                  </span>
                </div>
                <div className="font-InterRegular flex flex-col items-end gap-2 ml-auto">
                  <span className="text-sm">+$1.49</span>
                  <span className="text-xs text-colorYellow">Pending</span>
                </div>
              </div>
              <div className="w-full h-[70px] rounded-[20px] bg-white-50 flex items-center gap-4 p-4">
                <img
                  className="w-9 h-9 rounded-full"
                  src={chrome.runtime.getURL('assets/png/camper.jxr')}
                  alt=""
                />
                <div className="font-InterRegular flex flex-col gap-2">
                  <span className="text-sm">Spent $34.99</span>
                  <span className="text-xs text-secondary">
                    3 Oct 2022 21:22
                  </span>
                </div>
                <div className="font-InterRegular flex flex-col items-end gap-2 ml-auto">
                  <span className="text-sm">+$1.49</span>
                  <span className="text-xs text-colorGreen">Done</span>
                </div>
              </div>
              <div className="w-full h-[70px] rounded-[20px] bg-white-50 flex items-center gap-4 p-4">
                <img
                  className="w-9 h-9 rounded-full"
                  src={chrome.runtime.getURL('assets/png/camper.jxr')}
                  alt=""
                />
                <div className="font-InterRegular flex flex-col gap-2">
                  <span className="text-sm">Spent $34.99</span>
                  <span className="text-xs text-secondary">
                    3 Oct 2022 21:22
                  </span>
                </div>
                <div className="font-InterRegular flex flex-col items-end gap-2 ml-auto">
                  <span className="text-sm">+$1.49</span>
                  <span className="text-xs text-colorRed">Refunded</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
