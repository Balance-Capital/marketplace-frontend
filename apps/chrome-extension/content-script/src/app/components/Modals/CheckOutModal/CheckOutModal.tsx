import { Dispatch, SetStateAction, useRef } from 'react';
import useClickOutSide from '../../../hooks/useClickOutSide';
import ImgWithFallback from '../../ImgWithFallback/ImgWithFallback';
import { environment } from '../../../../environments/environment';

export default function CheckOutModal({
  storeLogo,
  storeName,
  setModal,
}: {
  storeLogo: string;
  storeName: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const modalRef = useRef(null);
  useClickOutSide(modalRef, setModal);

  return (
    <div
      className="fixed inset-0 z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
        <div ref={modalRef} className="grid grid-cols-2 h-[600px]">
          <div className="flex flex-col p-10 bg-white-50 rounded-tl-[40px] rounded-bl-[40px]">
            <img
              className="mr-[300px]"
              alt="dark logo"
              src={chrome.runtime.getURL('assets/svg/logo-dark.svg')}
            />
            <div className="flex-1 flex flex-col items-center justify-between">
              <div className="flex flex-col items-center gap-4">
                <img
                  alt="money"
                  className="mt-12"
                  src={chrome.runtime.getURL('assets/png/money.png')}
                />
                <h2 className="font-PPNeueMachina text-4xl">Well done!</h2>
                <p className="font-InterRegular text-2xl flex flex-col items-center gap-4">
                  <span>
                    You just saved <span className="text-success">$4.99</span>
                  </span>
                  <span className="text-base">1 code successfully used</span>
                  <span className="text-xs text-success rounded-md border-[1px] border-white-200 capitalize flex items-center gap-1 px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15.067"
                      height="15.08"
                      viewBox="0 0 15.067 15.08"
                    >
                      <path
                        id="Subtraction_19"
                        data-name="Subtraction 19"
                        d="M6.516,15.081a3.2,3.2,0,0,1-2.268-.949l-3.311-3.3a3.215,3.215,0,0,1,0-4.535L6.6.64A2.142,2.142,0,0,1,8.123,0h3.742a3.211,3.211,0,0,1,3.2,3.209V6.945a2.187,2.187,0,0,1-.633,1.541L8.777,14.132A3.191,3.191,0,0,1,6.516,15.081ZM10.756,2.5a1.514,1.514,0,1,0,1.508,1.515A1.515,1.515,0,0,0,10.756,2.5Z"
                        transform="translate(-0.001 -0.001)"
                        fill="#37ab81"
                      />
                    </svg>
                    CLEVR20
                  </span>
                </p>
              </div>
              <span className="font-InterRegular text-xs text-secondary">
                Enjoying Marketplace? Leave us a
                <span className="underline"> review!</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col p-10 bg-white-0 rounded-tr-[40px] rounded-br-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.571"
              height="20.571"
              viewBox="0 0 20.571 20.571"
              className="ml-[300px]"
              onClick={() => setModal(false)}
            >
              <g
                id="_9041735_cross_icon"
                data-name="9041735_cross_icon"
                transform="translate(1.414 19.157) rotate(-90)"
              >
                <path
                  id="Path_3961"
                  data-name="Path 3961"
                  d="M17.742,17.742,0,0Z"
                  transform="translate(0 0)"
                  fill="none"
                  stroke="#bec5d1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3962"
                  data-name="Path 3962"
                  d="M17.742,0,0,17.742"
                  transform="translate(0 0)"
                  fill="none"
                  stroke="#bec5d1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  fillRule="evenodd"
                />
              </g>
            </svg>
            <div className="flex-1 flex flex-col justify-between">
              <div className="mt-9 flex items-center justify-between">
                <ImgWithFallback
                  className="w-[92px] h-[92px] rounded-xl border-[1px] border-white-200"
                  src={`${environment.IMAGE_HOST_CDN}/${storeLogo}`}
                  fallback={'/assets/png/store-default.png'}
                  alt={storeName}
                />
                <div className="font-InterRegular flex flex-col items-end gap-2">
                  <span className="text-base text-secondary">
                    Est. Cart Total
                  </span>
                  <span className="text-xl">$28.99</span>
                </div>
              </div>
              <div className="font-InterRegular space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Original total</span>
                  <span>$33.98</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">With Marketplace</span>
                  <span>$33.98</span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Total savings</span>
                  <span className="text-success">-$4.99</span>
                </div>
              </div>
              <div className="font-InterRegular flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <span className="text-xs">
                    Follow this store for future discount alerts
                  </span>
                  <div className="py-3 px-4 border-[1px] border-white-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImgWithFallback
                        className="w-[38px] h-[38px] rounded-full border-[1px] border-white-200"
                        src={`${environment.IMAGE_HOST_CDN}/${storeLogo}`}
                        fallback={'/assets/png/store-default.png'}
                        alt={storeName}
                      />
                      <span className="text-sm">{storeName}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-[#E3E6EB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white-0 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                    </label>
                  </div>
                </div>
                <button className="bg-black text-lg text-white-0 py-4 w-full rounded-full flex items-center gap-3 justify-center">
                  Continue to checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.434"
                    height="13.264"
                    viewBox="0 0 22.434 13.264"
                  >
                    <g
                      id="_8666600_arrow_left_icon"
                      data-name="8666600_arrow_left_icon"
                      transform="translate(21.743 12.911) rotate(180)"
                    >
                      <line
                        id="Line_1"
                        data-name="Line 1"
                        x1="21.743"
                        transform="translate(0 6.278)"
                        fill="none"
                        stroke="#fff"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      />
                      <path
                        id="Path_2922"
                        data-name="Path 2922"
                        d="M6.279,12.557,0,6.279,6.279,0"
                        transform="translate(0.017)"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
