import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';
import { IUser, Roles } from '../../interfaces/user';

interface IProps {
  user: IUser;
}

export default function SideBar(props: IProps) {
  const { user } = props;
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  return (
    <>
      <div className="w-full lg:w-[370px] bg-[#EEEEEF] overflow-x-scroll scrollbar-hide">
        <div className="w-[850px] lg:w-full mx-auto flex flex-row lg:flex-col gap-3 items-center lg:items-start justify-center px-6 py-4 lg:p-12 font-InterRegular text-sm lg:text-lg [&>*]:w-full">
          {user.role.includes(Roles.ADMIN) ? (
            <Link href="/admin-dashboard" legacyBehavior>
              <a
                className={`flex items-center gap-2 p-4 rounded-xl border-solid border-2 border-[rgba(112,112,112,0.05)] ${
                  router.pathname === '/admin-dashboard'
                    ? '[&>svg>path]:stroke-primary text-primary bg-[rgba(247,247,250,0.8)]'
                    : ''
                }`}
              >
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
                Dashboard - Statistics
              </a>
            </Link>
          ) : (
            ''
          )}
          <Link href="/affiliate-dashboard" legacyBehavior>
            <a
              className={`flex items-center gap-2 p-4 rounded-xl border-solid border-2 border-[rgba(112,112,112,0.05)] ${
                router.pathname === '/affiliate-dashboard'
                  ? '[&>svg>path]:stroke-primary text-primary bg-[rgba(247,247,250,0.8)]'
                  : ''
              }`}
            >
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
              Dashboard
            </a>
          </Link>
          <Link href="/referrals" legacyBehavior>
            <a
              className={`flex items-center gap-2 p-4 rounded-xl border-solid border-2 border-[rgba(112,112,112,0.05)] ${
                router.pathname === '/referrals'
                  ? '[&>svg>g>path]:stroke-primary text-primary bg-[rgba(247,247,250,0.8)]'
                  : ''
              }`}
            >
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
              My referrals
            </a>
          </Link>
          {/* <Link href="/my-links" legacyBehavior>
            <a
              className={`flex items-center gap-2 p-4 rounded-xl border-solid border-2 border-[rgba(112,112,112,0.05)] ${
                router.pathname === '/my-links'
                  ? '[&>svg>g>path]:stroke-primary text-primary bg-[rgba(247,247,250,0.8)]'
                  : ''
              }`}
            >
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
              My links
            </a>
          </Link> */}
          <Link href="/my-rewards" legacyBehavior>
            <a
              className={`flex items-center gap-2 p-4 rounded-xl border-solid border-2 border-[rgba(112,112,112,0.05)] ${
                router.pathname === '/my-rewards'
                  ? ' [&>svg>g>path]:stroke-primary text-primary bg-[rgba(247,247,250,0.8)]'
                  : ''
              }`}
            >
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
              My rewards
            </a>
          </Link>
          {/* <a
            href="#"
            className="flex items-center gap-2 p-4 [&>svg>g>*>*]:hover:stroke-primary hover:text-primary hover:bg-[rgba(247,247,250,0.8)] rounded-xl border-solid border-2 border-[rgba(112,112,112,0.05)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <g
                id="_9041646_info_circle_icon"
                data-name="9041646_info_circle_icon"
                transform="translate(0.25 0.25)"
              >
                <g
                  id="Group_249"
                  data-name="Group 249"
                  transform="translate(0.5 0.5)"
                >
                  <circle
                    id="Ellipse_953"
                    data-name="Ellipse 953"
                    cx="9.25"
                    cy="9.25"
                    r="9.25"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    id="Path_3767"
                    data-name="Path 3767"
                    d="M8.5,12.5v-4h-1"
                    transform="translate(0.667 1.167)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    fillRule="evenodd"
                  />
                  <path
                    id="Path_3768"
                    data-name="Path 3768"
                    d="M7.5,12.5h2"
                    transform="translate(0.75 1.375)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    fillRule="evenodd"
                  />
                </g>
                <circle
                  id="Ellipse_954"
                  data-name="Ellipse 954"
                  cx="1"
                  cy="1"
                  r="1"
                  stroke="#000"
                  transform="translate(8.75 5.214)"
                />
              </g>
            </svg>
            Support
          </a> */}
          <Link href="/settings" legacyBehavior>
            <a
              className={`flex items-center gap-2 p-4 rounded-xl border-solid border-2 border-[rgba(112,112,112,0.05)] ${
                router.pathname === '/settings'
                  ? '[&>svg>g>*]:stroke-primary text-primary bg-[rgba(247,247,250,0.8)]'
                  : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19.435"
                viewBox="0 0 20 19.435"
              >
                <g
                  id="_8666615_settings_icon_1_"
                  data-name="8666615_settings_icon (1)"
                  transform="translate(0.75 0.75)"
                >
                  <ellipse
                    id="Ellipse_341"
                    data-name="Ellipse 341"
                    cx="2.321"
                    cy="2.25"
                    rx="2.321"
                    ry="2.25"
                    transform="translate(6.894 6.683)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    id="Path_2920"
                    data-name="Path 2920"
                    d="M16.473,12.413A1.315,1.315,0,0,0,16.75,13.9l.05.049a1.6,1.6,0,0,1,0,2.307,1.72,1.72,0,0,1-2.38,0l-.05-.049a1.42,1.42,0,0,0-1.53-.269A1.345,1.345,0,0,0,12,17.166V17.3a1.683,1.683,0,0,1-3.364,0v-.073A1.349,1.349,0,0,0,7.727,16a1.42,1.42,0,0,0-1.53.269l-.05.049a1.72,1.72,0,0,1-2.38,0,1.6,1.6,0,0,1,0-2.307l.05-.049a1.315,1.315,0,0,0,.278-1.484,1.389,1.389,0,0,0-1.27-.815H2.682a1.631,1.631,0,1,1,0-3.261h.076a1.385,1.385,0,0,0,1.27-.88A1.315,1.315,0,0,0,3.75,6.038L3.7,5.989a1.6,1.6,0,0,1,0-2.307,1.72,1.72,0,0,1,2.38,0l.05.049A1.42,1.42,0,0,0,7.66,4h.067a1.345,1.345,0,0,0,.841-1.231V2.63a1.683,1.683,0,0,1,3.364,0V2.7a1.345,1.345,0,0,0,.841,1.231,1.42,1.42,0,0,0,1.53-.269l.05-.049a1.72,1.72,0,0,1,2.38,0,1.6,1.6,0,0,1,0,2.307l-.05.049a1.315,1.315,0,0,0-.277,1.484v.065a1.389,1.389,0,0,0,1.27.815h.143a1.631,1.631,0,1,1,0,3.261h-.076A1.389,1.389,0,0,0,16.473,12.413Z"
                    transform="translate(-1 -1)"
                    fill="none"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
              Settings
            </a>
          </Link>
          <div className="mt-[50%] hidden lg:block">
            <div className="px-4 py-6 bg-gradient-to-b from-[#5C5CCD] to-[#4543BD] rounded-[25px]">
              <ImageWithFallback
                fallbackSrc={`${IMAGE_HOST}/assets/images/png/invite-1.png`}
                width={82}
                height={82}
                src={`${IMAGE_HOST}/assets/images/png/invite-1.png`}
                alt=""
              />
              <h2 className="font-PPNeueMachina text-lg text-white">
                Refer friends, earn commission
              </h2>
              <p className="font-InterRegular text-xs text-[#D3CEFF] mt-2">
                Introduce a friend to us and earn 5% of their cashback
                rewards when they shop online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
