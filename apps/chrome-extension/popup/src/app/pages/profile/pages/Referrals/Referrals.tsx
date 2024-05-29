import {
  Generic,
  IReferral,
  PopupBroker,
  To,
} from '@monorepo/chrome-extension/msg-bridge';
import { environment } from '../../../../../environments/environment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ReferralTipModal from '../../../../components/Modals/ReferralTipModal/ReferralTipModal';
import { TopBar } from '../../../../components/TopBar/TopBar';
import { referrals } from '../../../../recoil/atoms/referral.atom';
import styles from './index.module.css';
import { Tooltip } from '@monorepo/generic-shared/components';
import { Toast } from '../../../../components/Toast';
import { ToastMsg } from '../../../../constants/messages';

export default function Referrals() {
  const [referral, setReferral] = useRecoilState(referrals);
  const [referralModal, setReferralModal] = useState(false);
  const [toggleCopy, setToggleCopy] = useState(true);

  useEffect(() => {
    PopupBroker.dispatch(Generic.GetReferrals, null, To.Background, true)
      ?.then((response: IReferral) => {
        setReferral(response);
      })
      .catch((error) => {
        if (error.status === 401) {
          Toast.error(ToastMsg.TOKEN_EXPIRED);
        }
      });
  }, []);

  return (
    <div className={styles['container']}>
      {referralModal && <ReferralTipModal setModal={setReferralModal} />}
      <TopBar
        hexColor="#F3F3F4"
        title={chrome.i18n.getMessage('referralsPageTitle')}
        titleColor="text-white-100"
        isBack={true}
        bgColor="bg-black"
      />

      <div className="h-[480px] overflow-y-scroll scrollbar-hide">
        <div className="h-[194px] font-PPNeueMachina text-white-0 bg-black p-4 flex flex-col items-center justify-center gap-4">
          <span className="w-full text-xl flex items-center justify-center gap-2">
            <p className="pt-1">Total reward earned</p>
            <svg
              onClick={() => setReferralModal(true)}
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
            <p className="pt-[6px]">${referral.availableRewards || 0}</p>
          </span>
          <div className="flex items-center justify-between gap-6">
            <div>
              <span className="w-full text-base flex items-center justify-center gap-2">
                <p className="pt-1">Clicks</p>
                <Tooltip tooltip="Users clicked your referral" width={123}>
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
              </span>
              <p className="font-PPNeueMachina text-2xl text-white-0">
                {referral.clicked || 0}
              </p>
            </div>
            <div>
              <span className="w-full text-base flex items-center justify-center gap-2">
                <p className="pt-1">Joined</p>
                <Tooltip
                  tooltip="Users joined through your referral"
                  width={90}
                >
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
              </span>
              <p className="font-PPNeueMachina text-2xl text-white-0">
                {referral.joined || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[144px] bg-primary text-white-0 p-4 flex flex-col items-center justify-center gap-4">
          <span className="w-full text-xl flex items-center justify-center gap-2">
            <p className="pt-1">My referral link</p>{' '}
            <Tooltip tooltip="Orders may need 72 hours to payout" width={104}>
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
                      stroke="#B1C1C9"
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
                      stroke="#B1C1C9"
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
                      stroke="#B1C1C9"
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
          </span>
          <div className="w-full h-11 bg-[#605EF0] rounded-full font-InterRegular text-sm flex items-center justify-between">
            <p className="pl-4 oneRowEllipsis">
              {environment.APP_URL}/?referral={referral.referral}
            </p>
            {toggleCopy ? (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${environment.APP_URL}/?referral=${referral.referral}`
                  );
                  setToggleCopy(false);
                  setTimeout(() => {
                    setToggleCopy(true);
                  }, 1000);
                }}
                className="w-[117px] h-11 bg-black rounded-full"
              >
                Copy
              </button>
            ) : (
              <button className="w-[117px] h-11 bg-colorGreen rounded-full">
                Copied!
              </button>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="font-PPNeueMachina text-xl flex items-center justify-start gap-2">
            <h2 className="pt-1">Referrals</h2>
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
          <div className="mt-4 flex flex-col items-center gap-2">
            {referral.uses?.length ? (
              referral.uses?.map((item, i) => (
                <div
                  key={`referral-${i}`}
                  className="w-full h-[70px] rounded-[20px] bg-white-50 flex items-center gap-4 p-4"
                >
                  <img
                    className="w-9 h-9 rounded-full"
                    src={chrome.runtime.getURL(
                      'assets/png/default-profile.png'
                    )}
                    alt=""
                  />
                  <div className="font-InterRegular flex flex-col gap-2">
                    <span className="text-sm">{item.referral}</span>
                    <span className="text-xs text-secondary">
                      {moment(item.created).format('DD/MM/YYYY')}
                    </span>
                  </div>
                  <div className="font-InterRegular flex flex-col items-end gap-2 ml-auto">
                    <span className="text-sm">+${item.refBonus || 0}</span>
                    <span
                      className={`text-xs ${
                        item.satus === 'done'
                          ? 'text-colorGreen'
                          : 'text-colorYellow'
                      }`}
                    >
                      {item.satus === 'done' ? 'Done' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className="w-full h-[50px] rounded-[20px] flex items-center justify-center p-4 text-secondary font-PPNeueMachina text-lg">
                No referrals found.
              </span>
            )}
            {/* <div className="w-full h-[70px] rounded-[20px] bg-white-50 flex items-center gap-4 p-4">
              <img
                className="w-9 h-9 rounded-full"
                src={chrome.runtime.getURL('assets/png/camper.jxr')}
                alt=""
              />
              <div className="font-InterRegular flex flex-col gap-2">
                <span className="text-sm">idf71232f</span>
                <span className="text-xs text-secondary">3 Oct 2022 21:22</span>
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
                <span className="text-sm">idf71232f</span>
                <span className="text-xs text-secondary">3 Oct 2022 21:22</span>
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
  );
}
