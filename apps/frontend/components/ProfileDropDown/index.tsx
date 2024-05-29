import getConfig from 'next/config';
import { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import { disconnect } from '../Wallet';
import useClickOutSide from '../../hooks/useClickOutSide';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';
import { UserBalanceContext } from '../Layout';
import { UserAvatarImageContext } from '../Layout';

export default function ProfileDropDown() {
  const menuRef = useRef(null);
  let dropRef: HTMLDivElement;
  const [show, setShow] = useState(false);
  const [downDirection, setDownDirection] = useState(false);
  const { userBalance } = useContext(UserBalanceContext);
  const { userAvatarImage } = useContext(UserAvatarImageContext);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  useClickOutSide(menuRef, setShow);

  const showMenu = (e) => {
    setShow(!show);
  };

  useEffect(() => {
    setDownDirection(
      dropRef?.getBoundingClientRect().bottom > window.innerHeight
    );
  }, [dropRef, show]);

  return (
    <>
      <div className="relative min-w-[150px]" ref={menuRef}>
        <button
          className={`w-full h-full text-white xl:text-base lg:text-sm text-xs p-2 flex items-center justify-between rounded-full border-solid border-2 border-[rgba(112,112,112,0.3)]`}
          disabled={false}
          onClick={(e) => {
            showMenu(e);
          }}
        >
          <div className="flex items-center gap-2">
            {userAvatarImage !== null ? (
              <div className="relative max-w-[70px] max-h-[50px]">
                <ImageWithFallback
                  fallbackSrc={`${IMAGE_HOST}/assets/images/avatars/default-avatar.png`}
                  width={50}
                  height={50}
                  layout="fixed"
                  src={
                    typeof userAvatarImage === 'string'
                      ? `${IMAGE_HOST}/${userAvatarImage}`
                      : userAvatarImage
                  }
                  alt="avatar image"
                  className="rounded-full"
                />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32.96"
                height="32.1"
                viewBox="0 0 29.96 32.1"
                className="bg-[rgba(255,255,255,0.08)] rounded-full pt-1"
              >
                <path
                  id="_9041988_user_male_icon"
                  data-name="9041988_user_male_icon"
                  d="M15.48.5A6.42,6.42,0,0,1,21.9,6.92V11.2a6.42,6.42,0,1,1-12.84,0V6.92A6.42,6.42,0,0,1,15.48.5ZM30.46,30.46V28.9c0-6.819-7.889-11.282-14.98-11.282S.5,22.083.5,28.9V30.46A2.14,2.14,0,0,0,2.64,32.6H28.32A2.14,2.14,0,0,0,30.46,30.46Z"
                  transform="translate(-0.5 -0.5)"
                  fill="#74849d"
                />
              </svg>
            )}
            <div className="relative w-[12px] h-[7px]">
              <ImageWithFallback
                fallbackSrc=""
                src={`${IMAGE_HOST}/assets/images/svg/down-arrow.svg`}
                alt="down arrow"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <span className="ml-2 flex items-center gap-2 text-[#CDCCFF] text-base font-InterRegular bg-[rgba(101,99,255,0.26)] p-2 rounded-full">
            <div className="relative w-5 h-5">
              <ImageWithFallback
                fallbackSrc=""
                layout="fill"
                objectFit="cover"
                src={`${IMAGE_HOST}/assets/images/svg/circle-logo.svg`}
                alt="circle logo"
              />
            </div>
            <span className="oneRowEllipsis">
              {userBalance ? userBalance : 0.0}
            </span>
          </span>
        </button>
        {show && (
          <div
            ref={(node) => {
              dropRef = node;
            }}
            className={`h-fit absolute bg-white shadow-3xl rounded-2xl p-4 my-2 font-InterRegular text-lg text-black z-10 space-y-4 ${
              downDirection ? 'bottom-full' : 'top-full'
            }`}
          >
            <Link href="/affiliate-dashboard" legacyBehavior>
              <a className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className=""
                >
                  <path
                    id="_9041765_grid_icon"
                    data-name="9041765_grid_icon"
                    d="M12.393.5h5.286A1.321,1.321,0,0,1,19,1.821V7.107a1.321,1.321,0,0,1-1.321,1.321H12.393a1.321,1.321,0,0,1-1.321-1.321V1.821A1.321,1.321,0,0,1,12.393.5ZM1.821.5H7.107A1.321,1.321,0,0,1,8.429,1.821V7.107A1.321,1.321,0,0,1,7.107,8.429H1.821A1.321,1.321,0,0,1,.5,7.107V1.821A1.321,1.321,0,0,1,1.821.5ZM12.393,11.071h5.286A1.321,1.321,0,0,1,19,12.393v5.286A1.321,1.321,0,0,1,17.679,19H12.393a1.321,1.321,0,0,1-1.321-1.321V12.393A1.321,1.321,0,0,1,12.393,11.071Zm-10.571,0H7.107a1.321,1.321,0,0,1,1.321,1.321v5.286A1.321,1.321,0,0,1,7.107,19H1.821A1.321,1.321,0,0,1,.5,17.679V12.393A1.321,1.321,0,0,1,1.821,11.071Z"
                    transform="translate(0.25 0.25)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
                <span>Dashboard</span>
                <div className="relative ml-auto w-[8px] h-[14px]">
                  <ImageWithFallback
                    fallbackSrc=""
                    src={`${IMAGE_HOST}/assets/images/svg/right-arrow.svg`}
                    alt="right arrow"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </a>
            </Link>
            <Link href="/referrals" legacyBehavior>
              <a className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23.124"
                  height="22.221"
                  viewBox="0 0 23.124 22.221"
                >
                  <g
                    id="Group_12693"
                    data-name="Group 12693"
                    transform="translate(12720.975 -8010.483)"
                  >
                    <path
                      id="Path_3964"
                      data-name="Path 3964"
                      d="M.6,5H19.39a.6.6,0,0,1,.6.6v7.829a3.738,3.738,0,0,1-3.733,3.733H3.733A3.738,3.738,0,0,1,0,13.431V5.6A.6.6,0,0,1,.6,5ZM18.788,6.2H1.2v7.226A2.532,2.532,0,0,0,3.733,15.96H16.259a2.532,2.532,0,0,0,2.529-2.529Z"
                      transform="translate(-12719.409 8015.54)"
                    />
                    <path
                      id="Path_3965"
                      data-name="Path 3965"
                      d="M6.6,18.861a.6.6,0,0,1-.6-.6V2.6a.6.6,0,1,1,1.2,0V18.259A.6.6,0,0,1,6.6,18.861Z"
                      transform="translate(-12716.014 8013.843)"
                    />
                    <path
                      id="Path_3966"
                      data-name="Path 3966"
                      d="M19.956,9.838H1.168A2.17,2.17,0,0,1-1,7.67V6.1A2.17,2.17,0,0,1,1.168,3.937H4.726a4.142,4.142,0,0,1-.38-1.747A3.929,3.929,0,0,1,5.439-.584a3.312,3.312,0,0,1,2.343-.839,3.929,3.929,0,0,1,2.241.658,2.8,2.8,0,0,1,.539.49,2.8,2.8,0,0,1,.539-.49,3.929,3.929,0,0,1,2.241-.658,3.312,3.312,0,0,1,2.343.839A3.929,3.929,0,0,1,16.778,2.19a4.142,4.142,0,0,1-.38,1.747h3.558A2.17,2.17,0,0,1,22.124,6.1V7.67A2.17,2.17,0,0,1,19.956,9.838ZM1.168,5.141A.965.965,0,0,0,.2,6.1V7.67a.965.965,0,0,0,.964.964H19.956a.965.965,0,0,0,.964-.964V6.1a.965.965,0,0,0-.964-.964Zm10-1.2h3.828A2.883,2.883,0,0,0,14.833.267a2.155,2.155,0,0,0-1.492-.486,2.758,2.758,0,0,0-1.55.44,1.383,1.383,0,0,0-.627,1.186Zm-5.032,0H9.96V1.407A1.383,1.383,0,0,0,9.332.221a2.758,2.758,0,0,0-1.55-.44A2.155,2.155,0,0,0,6.291.267,2.883,2.883,0,0,0,6.132,3.937Z"
                      transform="translate(-12719.975 8011.907)"
                    />
                  </g>
                </svg>
                <span>Referrals</span>
                <div className="relative ml-auto w-[8px] h-[14px]">
                  <ImageWithFallback
                    fallbackSrc=""
                    src={`${IMAGE_HOST}/assets/images/svg/right-arrow.svg`}
                    alt="right arrow"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </a>
            </Link>
            {/* <Link href="/my-links" legacyBehavior>
              <a className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.368"
                  height="21.609"
                  viewBox="0 0 20.368 21.609"
                >
                  <g
                    id="_9041729_chain_icon"
                    data-name="9041729_chain_icon"
                    transform="translate(0.939 0.75)"
                  >
                    <path
                      id="Path_3764"
                      data-name="Path 3764"
                      d="M5.5,11.476c1.531,2.159,4.754,1.78,6.333,0l3.14-3.158a4.357,4.357,0,0,0,0-6.316A4.324,4.324,0,0,0,8.658,2L5.5,5.16"
                      transform="translate(2.171 -0.632)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      fillRule="evenodd"
                    />
                    <path
                      id="Path_3765"
                      data-name="Path 3765"
                      d="M11.471,7.132c-1.531-2.159-4.737-1.89-6.316-.11L2,10.14A4.4,4.4,0,0,0,2,16.5a4.324,4.324,0,0,0,6.316,0l3.158-3.158"
                      transform="translate(-0.642 2.243)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>
                <span>Links</span>
                <div className="relative ml-auto w-[8px] h-[14px]">
                  <Image
                    src={`${IMAGE_HOST}/assets/images/svg/right-arrow.svg`}
                    alt="right arrow"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </a>
            </Link> */}
            <Link href="/my-rewards" legacyBehavior>
              <a className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="16.735"
                  viewBox="0 0 20 16.735"
                >
                  <g
                    id="_9041697_coins_icon"
                    data-name="9041697_coins_icon"
                    transform="translate(0.75 0.75)"
                  >
                    <path
                      id="Path_3760"
                      data-name="Path 3760"
                      d="M17.5,8.5v3c0,1.3-3.134,3-7,3s-7-1.7-7-3V9"
                      transform="translate(1 0.735)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      fillRule="evenodd"
                    />
                    <path
                      id="Path_3761"
                      data-name="Path 3761"
                      d="M3.794,9.259c.865,1.148,3.54,2.225,6.706,2.225,3.866,0,7-1.605,7-2.986,0-.775-.987-1.624-2.536-2.22"
                      transform="translate(1 0.312)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      fillRule="evenodd"
                    />
                    <path
                      id="Path_3762"
                      data-name="Path 3762"
                      d="M14.5,3.5v3c0,1.3-3.134,3-7,3s-7-1.7-7-3v-3"
                      transform="translate(-0.5 -0.037)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      fillRule="evenodd"
                    />
                    <path
                      id="Path_3763"
                      data-name="Path 3763"
                      d="M7.5,6.484c3.866,0,7-1.605,7-2.986s-3.134-3-7-3-7,1.617-7,3S3.634,6.484,7.5,6.484Z"
                      transform="translate(-0.5 -0.5)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>
                <span>Rewards</span>
                <div className="relative ml-auto w-[8px] h-[14px]">
                  <ImageWithFallback
                    fallbackSrc=""
                    src={`${IMAGE_HOST}/assets/images/svg/right-arrow.svg`}
                    alt="right arrow"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </a>
            </Link>
            <Link href="/settings" legacyBehavior>
              <a className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21.918"
                  height="21.918"
                  viewBox="0 0 21.918 21.918"
                >
                  <g
                    id="Group_12694"
                    data-name="Group 12694"
                    transform="translate(12720.372 -8083.5)"
                  >
                    <path
                      id="Path_3967"
                      data-name="Path 3967"
                      d="M11.459,1.7c-.182,0-.365.005-.547.015l-.581,1.665a1.2,1.2,0,0,1-.827.767,7.517,7.517,0,0,0-1.714.693,1.2,1.2,0,0,1-1.127.023L5.088,4.072a9.811,9.811,0,0,0-.9.886l.766,1.59a1.2,1.2,0,0,1-.043,1.126,7.521,7.521,0,0,0-.723,1.7,1.2,1.2,0,0,1-.78.813l-1.676.553c-.017.239-.026.478-.026.718q0,.273.015.547l1.665.581a1.2,1.2,0,0,1,.767.827,7.517,7.517,0,0,0,.693,1.714,1.2,1.2,0,0,1,.023,1.127l-.794,1.576a9.811,9.811,0,0,0,.886.9l1.59-.766a1.2,1.2,0,0,1,1.126.043,7.521,7.521,0,0,0,1.7.723,1.2,1.2,0,0,1,.813.78l.553,1.676a9.92,9.92,0,0,0,1.266.011l.581-1.665a1.2,1.2,0,0,1,.826-.767,7.517,7.517,0,0,0,1.712-.692,1.2,1.2,0,0,1,1.127-.023l1.576.794a9.812,9.812,0,0,0,.9-.886l-.766-1.59a1.2,1.2,0,0,1,.043-1.126,7.521,7.521,0,0,0,.723-1.7,1.2,1.2,0,0,1,.78-.813l1.676-.553c.017-.239.026-.478.026-.718q0-.274-.015-.549l-1.665-.581a1.2,1.2,0,0,1-.767-.826,7.517,7.517,0,0,0-.692-1.712,1.2,1.2,0,0,1-.023-1.127l.794-1.576a9.812,9.812,0,0,0-.886-.9l-1.59.766a1.2,1.2,0,0,1-1.126-.043,7.521,7.521,0,0,0-1.7-.723,1.2,1.2,0,0,1-.813-.78L12.177,1.73c-.239-.017-.478-.026-.718-.026m0-1.2a11.048,11.048,0,0,1,1.619.119l.8,2.41a8.716,8.716,0,0,1,1.974.839l2.286-1.1A11.023,11.023,0,0,1,20.269,4.94L19.127,7.205a8.712,8.712,0,0,1,.8,1.987l2.4.836a11.1,11.1,0,0,1-.026,3.05l-2.41.8a8.716,8.716,0,0,1-.839,1.974l1.1,2.286a11.023,11.023,0,0,1-2.174,2.136l-2.266-1.142a8.712,8.712,0,0,1-1.987.8l-.836,2.4A11.1,11.1,0,0,1,9.84,22.3l-.8-2.41a8.716,8.716,0,0,1-1.974-.839l-2.286,1.1a11.023,11.023,0,0,1-2.136-2.174l1.142-2.266a8.712,8.712,0,0,1-.8-1.989L.592,12.888A11.1,11.1,0,0,1,.619,9.84l2.41-.8a8.716,8.716,0,0,1,.839-1.974l-1.1-2.286A11.023,11.023,0,0,1,4.94,2.649L7.205,3.791a8.712,8.712,0,0,1,1.989-.8L10.03.592A11.062,11.062,0,0,1,11.459.5Z"
                      transform="translate(-12720.872 8083)"
                    />
                    <path
                      id="Ellipse_960"
                      data-name="Ellipse 960"
                      d="M4.743,1.2A3.539,3.539,0,1,0,8.282,4.743,3.543,3.543,0,0,0,4.743,1.2m0-1.2A4.743,4.743,0,1,1,0,4.743,4.743,4.743,0,0,1,4.743,0Z"
                      transform="translate(-12714.146 8089.726)"
                    />
                  </g>
                </svg>
                <span>Settings</span>
                <div className="relative ml-auto w-[8px] h-[14px]">
                  <ImageWithFallback
                    fallbackSrc=""
                    src={`${IMAGE_HOST}/assets/images/svg/right-arrow.svg`}
                    alt="right arrow"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </a>
            </Link>
            {/* <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.188"
                height="23.283"
                viewBox="0 0 18.188 23.283"
              >
                <g
                  id="Group_12695"
                  data-name="Group 12695"
                  transform="translate(12718.507 -8155.514)"
                >
                  <path
                    id="Path_3968"
                    data-name="Path 3968"
                    d="M-.4,20.887a.6.6,0,0,1-.6-.6V1.6A.6.6,0,0,1-.4,1a.6.6,0,0,1,.6.6V20.285A.6.6,0,0,1-.4,20.887Z"
                    transform="translate(-12717.507 8157.911)"
                  />
                  <path
                    id="Path_3969"
                    data-name="Path 3969"
                    d="M4.7-1A4.989,4.989,0,0,1,8.52.875,3.844,3.844,0,0,0,11.491,2.4,8.859,8.859,0,0,0,14.273,2,4.759,4.759,0,0,0,16.161.875a.6.6,0,0,1,1.028.426V11.491a.6.6,0,0,1-.176.426,5.95,5.95,0,0,1-2.358,1.419,10.048,10.048,0,0,1-3.163.456,4.989,4.989,0,0,1-3.823-1.875A3.844,3.844,0,0,0,4.7,10.395,4.844,4.844,0,0,0,.141,13.459a.6.6,0,0,1-.677.317A.6.6,0,0,1-1,13.19V3A.6.6,0,0,1-.936,2.73,7.029,7.029,0,0,1,1.391-.05,5.847,5.847,0,0,1,4.7-1Zm6.794,4.6A4.989,4.989,0,0,1,7.669,1.726,3.844,3.844,0,0,0,4.7.2,4.805,4.805,0,0,0,.2,3.144v8.048a6.013,6.013,0,0,1,1.187-1.051A5.847,5.847,0,0,1,4.7,9.191,4.989,4.989,0,0,1,8.52,11.065a3.844,3.844,0,0,0,2.971,1.522,8.859,8.859,0,0,0,2.782-.394,4.861,4.861,0,0,0,1.711-.962v-8.7a6.449,6.449,0,0,1-1.331.613A10.048,10.048,0,0,1,11.491,3.6Z"
                    transform="translate(-12717.507 8156.514)"
                  />
                </g>
              </svg>
              <span>Support</span>
              <div className="relative ml-auto w-[8px] h-[14px]">
                <Image
                  src={`${IMAGE_HOST}/assets/images/svg/right-arrow.svg`}
                  alt="right arrow"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.394"
                height="19.512"
                viewBox="0 0 19.394 19.512"
              >
                <path
                  id="_9041922_star_icon"
                  data-name="9041922_star_icon"
                  d="M13.263,15.808,10.836,9.7l4.853-4.887H9.623L7.2-1.3,4.77,4.812H-1.3L3.557,9.539,1.13,15.808,7.2,12.143l6.066,3.665m0,1.2a1.2,1.2,0,0,1-.622-.173L7.2,13.549,1.753,16.838A1.2,1.2,0,0,1,.008,15.373L2.147,9.847-2.136,5.675a1.2,1.2,0,0,1-.275-1.316A1.2,1.2,0,0,1-1.3,3.608H3.953L6.078-1.74A1.2,1.2,0,0,1,7.2-2.5a1.2,1.2,0,0,1,1.119.76L10.44,3.608h5.249a1.2,1.2,0,0,1,.854,2.053l-4.3,4.327,2.135,5.375a1.2,1.2,0,0,1-1.119,1.649Z"
                  transform="translate(2.5 2.5)"
                />
              </svg>
              <span>Rate us</span>
              <div className="relative ml-auto w-[8px] h-[14px]">
                <Image
                  src={`${IMAGE_HOST}/assets/images/svg/right-arrow.svg`}
                  alt="right arrow"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div> */}
            <div onClick={() => disconnect()} className="cursor-pointer">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.19"
                  height="19.492"
                  viewBox="0 0 18.19 19.492"
                >
                  <g
                    id="Group_12696"
                    data-name="Group 12696"
                    transform="translate(12718.566 -8299.606)"
                  >
                    <path
                      id="Path_3978"
                      data-name="Path 3978"
                      d="M9.7,12.043a.6.6,0,0,1-.432-1.021l3.39-3.5-3.39-3.5a.6.6,0,1,1,.865-.838l3.8,3.92a.6.6,0,0,1,0,.838l-3.8,3.92A.6.6,0,0,1,9.7,12.043Z"
                      transform="translate(-12714.471 8301.831)"
                    />
                    <path
                      id="Path_3979"
                      data-name="Path 3979"
                      d="M15.361,7.2H3.6A.6.6,0,1,1,3.6,6H15.361a.6.6,0,0,1,0,1.2Z"
                      transform="translate(-12716.34 8302.753)"
                    />
                    <path
                      id="Path_3980"
                      data-name="Path 3980"
                      d="M12.792,18.492H2.215A3.219,3.219,0,0,1-1,15.277V2.219A3.222,3.222,0,0,1,2.215-1L12.668-1h0a.6.6,0,0,1,.6.6.6.6,0,0,1-.6.6L2.215.207A2.016,2.016,0,0,0,.2,2.219V15.277a2.013,2.013,0,0,0,2.011,2.011H12.792a.6.6,0,1,1,0,1.2Z"
                      transform="translate(-12717.566 8300.606)"
                    />
                  </g>
                </svg>
                <span>Disconnect</span>
                <div className="relative ml-auto w-[8px] h-[14px]">
                  <ImageWithFallback
                    fallbackSrc=""
                    src={`${IMAGE_HOST}/assets/images/svg/right-arrow.svg`}
                    alt="right arrow"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
