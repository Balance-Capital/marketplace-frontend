/* eslint-disable no-unsafe-finally */
/* eslint-disable @next/next/no-img-element */
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'next-share';
import jwt from 'jsonwebtoken';

import { COOKIE_NAME } from '../../constants/cookieName';
import { Tooltip } from '@monorepo/generic-shared/components';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import CalenderDropDown from '../../components/CalenderDropDown';
import SideBar from '../../components/SideBar';
import PaginationBar, { IPagination } from '../../components/PaginationBar';
import {
  NavbarFooterContext,
  UserAvatarImageContext,
  UserBalanceContext,
} from '../../components/Layout';
import ImageWithFallback from '../../components/ImgWithFallback/ImgWithFallback';
import IUser from '../../interfaces/user';
import RollbarService from "../../services/rollbar";
import { useRollbar } from '@rollbar/react';

interface IUserReferralsUses {
  refBonus: number;
  satus: string;
  referral: string;
  created: Date;
}
interface IUserDataSchema {
  referral: string;
  clicked: number;
  joined: number;
  availableRewards: number;
  pendingRewards: number;
  uses: Array<IUserReferralsUses>;
  pagination: IPagination;
}
interface IProps {
  header: IHeaderSchema;
  userData: IUserDataSchema;
  user: IUser;
  apiHost: string;
}

export default function ReferralsDashboard(props: IProps) {
  const rollbarService = useRollbar();
  const [isCopied, setIsCopied] = useState(false);
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const { setUserBalance } = useContext(UserBalanceContext);
  const { setUserAvatarImage } = useContext(UserAvatarImageContext);
  const router = useRouter();
  const { header, userData, user, apiHost } = props;
  const content = getLanguage(language, router.locale).content;
  const [referralLink, setReferralLink] = useState('');
  const [referralList, setReferralList] = useState(userData?.uses || []);
  const [loader, setLoader] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])

  useEffect(() => { 
    setReferralLink(`${window.location.origin}/?referral=${userData?.referral}`)
  },[referralLink, setReferralLink])
  
  useEffect(() => {
    setUserBalance(user?.balance || 0);
    setUserAvatarImage(user?.avatar || null);
  }, [setUserAvatarImage, setUserBalance, user])

  const changeDateWidget = async (date: Date) => {
    try {
      setLoader(true);
      const token = getCookie('token')?.toString() || null;
      const data = await fetch(`${apiHost}/referrals?dateStart=${date.toISOString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then((data) => data.json());
      if (data?.uses?.length) {
        setReferralList(data.uses);
      } else {
        setReferralList([]);
      }  
      setLoader(false);
    } catch(err) {
      rollbarService.warning(`Referrals chnage date widget ${err?.message}, ${err?.stack}`, err);
    }
  };

  const pushPage = async (page: number) => {
    try{
      const { dateStart } = router.query;
      setLoader(true);
      const token = getCookie('token')?.toString() || null;
      const data = await fetch(
        `${apiHost}/referrals?dateStart=${dateStart}&page=${page || 1}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      ).then((data) => data.json());
      if (data?.uses) {
        setReferralList(data.uses);
        setLoader(false);
      }  
    } catch(err) {
      rollbarService.warning(`Referrals push page ${err?.message}, ${err?.stack}`, err);
    }
  };

  return (
    <>
      <SeoHeader
        title={header.title}
        description={header.description}
        keyWords={header.keyWords}
        openGraph={header.openGraph}
        canonicalLink={header.canonicalLink}
        metaRobots={header.metaRobots}
        jsonLd={header.jsonLd}
      />
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row bg-[#f3f3f4]">
        <SideBar user={user} />
        <div className="w-full lg:w-[calc(100%-370px)] px-6 py-12 lg:p-12">
          <section className="flex flex-wrap items-start justify-between gap-8">
            <div className="w-full 2xl:w-[700px]">
              <h2 className="font-PPNeueMachina text-black text-[26px] xl:text-[30px]">
                My Referrals
              </h2>
              <div className="font-InterRegular bg-black p-8 rounded-[25px] mt-8">
                <h2 className="text-[#F3F3F4] text-2xl">{content.h2b}</h2>
                <p className="text-[#74849D] text-lg mt-4">{content.p7}</p>
                <div className="mt-8 bg-[#101417] text-base rounded-[25px] flex items-center justify-between">
                  <span className="text-[#F3F3F4] px-4 text-xs md:text-sm 1xl:text-base">
                    {referralLink}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referralLink);
                      setIsCopied(true);
                      setTimeout(() => {
                        setIsCopied(false);
                      }, 2000);
                    }}
                    className={`text-white ${
                      isCopied ? 'bg-[#37AB81]' : 'bg-primary'
                    } px-8 md:px-12 py-4 rounded-full`}
                  >
                    {isCopied ? 'Copied' : content.b1}
                  </button>
                </div>
                <p className="text-[#f3f3f4] text-lg mt-8">{content.p8}</p>
                <div className="flex items-center gap-2 mt-4 text-xs lg:text-base">
                  <FacebookShareButton
                    style={{ flex: '1 1 0%' }}
                    url={referralLink}
                    hashtag={'#marketplace'}
                  >
                    <div className="hover:bg-[#4A83FA] hover:text-white text-[#4A83FA] border-2 border-[#4A83FA] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                      >
                        <g
                          id="_317727_facebook_social_media_social_icon"
                          data-name="317727_facebook_social media_social_icon"
                          transform="translate(0.139)"
                        >
                          <rect
                            id="Rectangle_264"
                            data-name="Rectangle 264"
                            width="21"
                            height="20"
                            rx="10"
                            transform="translate(-0.139)"
                            fill="#4a83fa"
                          />
                          <path
                            id="f"
                            d="M18.693,21.295V14.053h2.53l.633-3.018H18.693V9.828q0-1.811,1.9-1.811h1.265V5h-2.53C17,5,15.53,6.739,15.53,9.225v1.811H13v3.018h2.53v7.242Z"
                            transform="translate(-6.572 -1.639)"
                            fill="#fff"
                          />
                        </g>
                      </svg>
                      <span className="hidden md:block">
                        {content.facebook}
                      </span>
                    </div>
                  </FacebookShareButton>
                  <TwitterShareButton
                    style={{ flex: '1 1 0%' }}
                    url={referralLink}
                  >
                    <div className="[&:hover>*]:fill-white hover:bg-[#60B6E3] hover:text-white text-[#60B6E3] border-2 border-[#60B6E3] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.962"
                        height="17.035"
                        viewBox="0 0 1200 1227"
                        className="fill-[#60b6e3]"
                      >
                        <path
                          id="_104501_twitter_x_icon"
                          data-name="104501_twitter_x_icon"
                          d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                          // d="M24.536,12.342a8.557,8.557,0,0,1-2.47.677,4.308,4.308,0,0,0,1.891-2.379,8.609,8.609,0,0,1-2.731,1.044A4.3,4.3,0,0,0,13.9,15.606a12.21,12.21,0,0,1-8.864-4.493,4.306,4.306,0,0,0,1.331,5.742,4.288,4.288,0,0,1-1.948-.538c0,.018,0,.036,0,.054a4.3,4.3,0,0,0,3.45,4.217,4.324,4.324,0,0,1-1.133.151,4.261,4.261,0,0,1-.809-.077,4.305,4.305,0,0,0,4.017,2.987,8.678,8.678,0,0,1-6.367,1.781A12.23,12.23,0,0,0,22.4,15.125q0-.28-.012-.557A8.71,8.71,0,0,0,24.536,12.342Z"
                        />
                      </svg>
                      <span className="hidden md:block">{content.twitter}</span>
                    </div>
                  </TwitterShareButton>
                  <EmailShareButton
                    style={{ flex: '1 1 0%' }}
                    url={referralLink}
                    subject={'Referral'}
                    body="Go with this referral will give you rewards"
                  >
                    <div className="[&:hover>*]:fill-white hover:bg-[#6563FF] hover:text-white text-[#6563FF] border-2 border-[#6563FF] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="18.377"
                        viewBox="0 0 24 18.377"
                        className="fill-[#6563ff]"
                      >
                        <g
                          id="_9041767_mail_icon"
                          data-name="9041767_mail_icon"
                          transform="translate(0.504 0.496)"
                        >
                          <path
                            id="Subtraction_17"
                            data-name="Subtraction 17"
                            d="M20.218,18.377H3.785A3.612,3.612,0,0,1,0,14.978V3.392A3.609,3.609,0,0,1,3.785,0H20.218A3.608,3.608,0,0,1,24,3.392V14.978A3.611,3.611,0,0,1,20.218,18.377ZM4.759,4.84A1,1,0,0,0,4.247,6.7l7.243,4.343a.99.99,0,0,0,1.027,0L19.76,6.7A1.011,1.011,0,0,0,20.1,5.327a1,1,0,0,0-1.376-.343L12,9.021,5.273,4.985A.983.983,0,0,0,4.759,4.84Z"
                            transform="translate(-0.504 -0.496)"
                          />
                        </g>
                      </svg>
                      <span className="hidden md:block">{content.email}</span>
                    </div>
                  </EmailShareButton>
                </div>
              </div>
            </div>
            <div className="w-full 2xl:w-[700px]">
              <h2 className="font-PPNeueMachina text-black text-[26px] xl:text-[30px]">
                {content.h2c}
              </h2>
              <div className="flex-grow flex flex-wrap items-center gap-[26px] mt-8">
                <div className="flex-grow font-InterRegular">
                  <div className="bg-black rounded-[25px] p-12">
                    <h3 className="text-base text-[#f3f3f4] flex items-center gap-2">
                      {content.h3c}{' '}
                      <Tooltip
                        tooltip="Orders may need 72 hours to payout"
                        width={165}
                        isHover={true}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                        >
                          <g
                            id="_9041646_info_circle_icon"
                            data-name="9041646_info_circle_icon"
                            transform="translate(1 1)"
                          >
                            <g
                              id="Group_12324"
                              data-name="Group 12324"
                              transform="translate(0 0)"
                            >
                              <circle
                                id="Ellipse_961"
                                data-name="Ellipse 961"
                                cx="10"
                                cy="10"
                                r="10"
                                transform="translate(0 0)"
                                fill="none"
                                stroke="#74849d"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                id="Path_3970"
                                data-name="Path 3970"
                                d="M8.754,13.515V8.5H7.5"
                                transform="translate(1.599 1.208)"
                                fill="none"
                                stroke="#74849d"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                fillRule="evenodd"
                              />
                              <path
                                id="Path_3971"
                                data-name="Path 3971"
                                d="M7.5,12.5h2.508"
                                transform="translate(1.599 2.223)"
                                fill="none"
                                stroke="#74849d"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                fillRule="evenodd"
                              />
                            </g>
                            <circle
                              id="Ellipse_962"
                              data-name="Ellipse 962"
                              cx="1.29"
                              cy="1.29"
                              r="1.29"
                              transform="translate(9.033 4.516)"
                              fill="#74849d"
                            />
                          </g>
                        </svg>
                      </Tooltip>
                    </h3>
                    <div className="flex items-center flex-wrap gap-4 md:gap-16 mt-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={`${IMAGE_HOST}/assets/images/svg/circle-logo.svg`}
                          alt=""
                          className="w-9 h-9"
                        />
                        <span className="font-PPNeueMachina text-[#FCFCFC] text-[26px] xl:text-[30px]">
                          {userData?.availableRewards || 0}
                        </span>
                      </div>
                      {/* <button className="text-white bg-primary px-8 md:px-12 py-3 rounded-full">
                        {content.btn1}
                      </button> */}
                    </div>
                  </div>
                </div>
                <div className="flex-grow font-InterRegular">
                  <div className="bg-black rounded-[25px] p-12 flex flex-wrap items-center gap-8 md:gap-16">
                    <div>
                      <h3 className="text-base text-[#f3f3f4] flex items-center gap-2">
                        {content.h3d}{' '}
                        <Tooltip
                          tooltip="Need verification from affiliates"
                          width={100}
                          isHover={true}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                          >
                            <g
                              id="_9041646_info_circle_icon"
                              data-name="9041646_info_circle_icon"
                              transform="translate(1 1)"
                            >
                              <g
                                id="Group_12324"
                                data-name="Group 12324"
                                transform="translate(0 0)"
                              >
                                <circle
                                  id="Ellipse_961"
                                  data-name="Ellipse 961"
                                  cx="10"
                                  cy="10"
                                  r="10"
                                  transform="translate(0 0)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                                <path
                                  id="Path_3970"
                                  data-name="Path 3970"
                                  d="M8.754,13.515V8.5H7.5"
                                  transform="translate(1.599 1.208)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  fillRule="evenodd"
                                />
                                <path
                                  id="Path_3971"
                                  data-name="Path 3971"
                                  d="M7.5,12.5h2.508"
                                  transform="translate(1.599 2.223)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  fillRule="evenodd"
                                />
                              </g>
                              <circle
                                id="Ellipse_962"
                                data-name="Ellipse 962"
                                cx="1.29"
                                cy="1.29"
                                r="1.29"
                                transform="translate(9.033 4.516)"
                                fill="#74849d"
                              />
                            </g>
                          </svg>
                        </Tooltip>
                      </h3>
                      <p className="mt-4 font-PPNeueMachina text-[#FCFCFC] text-[26px] xl:text-[30px]">
                        {userData?.pendingRewards || 0}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base text-[#f3f3f4] flex items-center gap-2">
                        {content.h3e}{' '}
                        <Tooltip
                          tooltip="Users clicked your referral"
                          width={100}
                          isHover={true}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                          >
                            <g
                              id="_9041646_info_circle_icon"
                              data-name="9041646_info_circle_icon"
                              transform="translate(1 1)"
                            >
                              <g
                                id="Group_12324"
                                data-name="Group 12324"
                                transform="translate(0 0)"
                              >
                                <circle
                                  id="Ellipse_961"
                                  data-name="Ellipse 961"
                                  cx="10"
                                  cy="10"
                                  r="10"
                                  transform="translate(0 0)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                                <path
                                  id="Path_3970"
                                  data-name="Path 3970"
                                  d="M8.754,13.515V8.5H7.5"
                                  transform="translate(1.599 1.208)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  fillRule="evenodd"
                                />
                                <path
                                  id="Path_3971"
                                  data-name="Path 3971"
                                  d="M7.5,12.5h2.508"
                                  transform="translate(1.599 2.223)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  fillRule="evenodd"
                                />
                              </g>
                              <circle
                                id="Ellipse_962"
                                data-name="Ellipse 962"
                                cx="1.29"
                                cy="1.29"
                                r="1.29"
                                transform="translate(9.033 4.516)"
                                fill="#74849d"
                              />
                            </g>
                          </svg>
                        </Tooltip>
                      </h3>
                      <p className="mt-4 font-PPNeueMachina text-[#FCFCFC] text-[26px] xl:text-[30px]">
                        {userData?.clicked || 0}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base text-[#f3f3f4] flex items-center gap-2">
                        {content.h3f}{' '}
                        <Tooltip
                          tooltip="Users joined through your referral"
                          width={100}
                          isHover={true}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                          >
                            <g
                              id="_9041646_info_circle_icon"
                              data-name="9041646_info_circle_icon"
                              transform="translate(1 1)"
                            >
                              <g
                                id="Group_12324"
                                data-name="Group 12324"
                                transform="translate(0 0)"
                              >
                                <circle
                                  id="Ellipse_961"
                                  data-name="Ellipse 961"
                                  cx="10"
                                  cy="10"
                                  r="10"
                                  transform="translate(0 0)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                                <path
                                  id="Path_3970"
                                  data-name="Path 3970"
                                  d="M8.754,13.515V8.5H7.5"
                                  transform="translate(1.599 1.208)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  fillRule="evenodd"
                                />
                                <path
                                  id="Path_3971"
                                  data-name="Path 3971"
                                  d="M7.5,12.5h2.508"
                                  transform="translate(1.599 2.223)"
                                  fill="none"
                                  stroke="#74849d"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  fillRule="evenodd"
                                />
                              </g>
                              <circle
                                id="Ellipse_962"
                                data-name="Ellipse 962"
                                cx="1.29"
                                cy="1.29"
                                r="1.29"
                                transform="translate(9.033 4.516)"
                                fill="#74849d"
                              />
                            </g>
                          </svg>
                        </Tooltip>
                      </h3>
                      <p className="mt-4 font-PPNeueMachina text-[#FCFCFC] text-[26px] xl:text-[30px]">
                        {userData?.joined || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <h2 className="font-PPNeueMachina text-black text-[26px] xl:text-[30px]">
                {content.h2d}
              </h2>
              <CalenderDropDown onChange={changeDateWidget} />
            </div>
            <div className="overflow-auto font-InterRegular">
              {loader ? (
                <div className="w-fit mx-auto">
                  <ImageWithFallback
                    fallbackSrc=""
                    alt="spinner"
                    width={100}
                    height={100}
                    src={`${IMAGE_HOST}/assets/images/gif/logo-loader-dark.gif`}
                  />
                </div>
              ) : referralList.length > 0 ? (
                <>
                  <table className="min-w-[900px] w-full border-separate border-spacing-y-2">
                    <thead className="text-[#74849D] text-lg">
                      <tr className="[&>*]:w-[20%] [&>*]:text-start [&>*]:font-normal [&>*]:p-5">
                        <th>{content.th1}</th>
                        <th>{content.th2}</th>
                        <th>{content.th3}</th>
                        <th>{content.th4}</th>
                      </tr>
                    </thead>
                    <tbody className="text-black">
                      {referralList?.map((_v, _k) => (
                        <tr className="[&>*]:p-5 [&>*]:bg-white" key={_k}>
                          <td className="flex items-center gap-4 rounded-tl-[25px] rounded-bl-[25px]">
                            <img
                              className="bg-[rgba(116,132,157,0.1)] rounded-full"
                              src="/assets/images/png/profile.png"
                              alt=""
                            />
                            <p>{_v.referral}</p>
                          </td>
                          <td>{_v.refBonus?.toPrecision(4) || 0}</td>
                          <td>{moment(_v.created).format('YYYY-MM-DD')}</td>
                          <td className="rounded-tr-[25px] rounded-br-[25px]">
                            {_v.satus === 'pending' ? (
                              <span className="text-[#BF9B05] px-6 py-3 bg-[rgba(191,155,5,0.05)] rounded-full">
                                {content.pending}
                              </span>
                            ) : (
                              <span className="text-[#37AC82] px-6 py-3 bg-[rgba(55,172,130,0.1)] rounded-full">
                                {content.paid}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <PaginationBar
                    pagination={userData?.pagination}
                    clickPage={() => pushPage(userData?.pagination?.page)}
                    clickNextPage={() => pushPage(userData?.pagination?.next)}
                    clickBackPage={() => pushPage(userData?.pagination?.prev)}
                  />
                </>
              ) : (
                <div className="font-PPNeueMachina text-secondary text-[20px] xl:text-[26px] text-center my-8">
                  {content.notfound}
                </div>
              )}
            </div>
            <p className="w-fit font-InterRegular text-base text-[#74849D] mx-auto mt-4">
              {content.p9}
            </p>
          </section>
        </div>
      </div>
    </>
  )
};

export async function getServerSideProps(context) {
  const props: IProps = {
    header: undefined,
    userData: undefined,
    user: undefined,
    apiHost: ''
  };
  try {

    const token = context?.req?.cookies?.token || null;
    if (!token) return context?.res?.status(401)?.redirect('/401');
  
    const API_HOST = process.env.API_HOST || null
    if(!API_HOST) return context?.res?.status(400)?.json({'error':'empty API HOST'})  

    const header = prepareHeader(language, context?.locale);
    const dateStart = moment().startOf('month').toISOString();

    props.apiHost = API_HOST;
    props.header = header;

    const userId = context?.req?.cookies[COOKIE_NAME] || 'dadce205-869a-4395-a13e-54989d08a55d';
    const referral = context?.req?.cookies?.referral || 'dadce205';
    const userTrackerId = `${userId}:${referral}`;
    const page = context?.req?.query?.page || 1;

    const userData = await fetch(
      `${API_HOST}/referrals?sessionId=${userTrackerId}&dateStart=${dateStart}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    ).then((data) => data.json());
    const user = jwt.decode(token);
    props.user = user as IUser;
    props.userData = userData;
    return { props }
  } catch(err) {
    RollbarService.warning(`Can't get data for referrals from api ${err?.message}`, context, err);
  }
}
