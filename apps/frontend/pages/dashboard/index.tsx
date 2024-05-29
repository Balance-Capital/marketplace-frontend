/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import CalenderDropDown from '../../components/CalenderDropDown';
import { useContext, useEffect } from 'react';
import { NavbarFooterContext } from '../../components/Layout';

interface IProps {
  header: IHeaderSchema;
}

export function Index(props: IProps) {
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const router = useRouter();
  const { header } = props;
  const content = getLanguage(language, router.locale).content;

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])
  
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

      <section className="bg-gradient-to-b from-[#5958CB] to-[#4543BD]">
        <div className="max-w-[1920px] mx-auto">
          <div className="w-[80%] py-20 mx-auto flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-0">
            <div className="w-[100%] xl:w-[40%] font-InterRegular">
              <h1 className="font-PPNeueMachina text-[#F3F3F4] text-[36px] xl:text-[40px]">
                {content.h1}
              </h1>
              <p className="text-[#CECEF0] text-[18px] xl:text-[20px]">
                {content.p1}
              </p>
              <div className="mt-4">
                <a href="#" className="text-[#CECEF0] underline">
                  {content.a1}
                </a>
              </div>
            </div>
            <div className="w-[100%] xl:w-[40%] font-InterRegular bg-black p-8 rounded-[25px]">
              <h2 className="text-[#F3F3F4] text-2xl">{content.hb}</h2>
              <p className="text-[#74849D] text-lg mt-4">{content.p7}</p>
              <div className="mt-8 bg-[#101417] text-base rounded-[25px] flex items-center justify-between">
                <span className="text-[#F3F3F4] px-4 text-xs md:text-sm 1xl:text-base">
                  cleverpay.com/?referral=id2971b
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      'cleverpay.com/?referral=id2971b'
                    );
                  }}
                  className="text-white bg-primary px-8 md:px-12 py-4 rounded-full"
                >
                  {content.b1}
                </button>
              </div>
              <p className="text-[#f3f3f4] text-lg mt-8">{content.p8}</p>
              <div className="flex items-center gap-2 mt-4 text-xs lg:text-base">
                <div className="flex-1 hover:bg-[#4A83FA] hover:text-white text-[#4A83FA] border-2 border-[#4A83FA] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
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
                  <span className="hidden md:block">{content.span1}</span>
                </div>
                <div className="flex-1 [&:hover>*]:fill-white hover:bg-[#60B6E3] hover:text-white text-[#60B6E3] border-2 border-[#60B6E3] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.962"
                    height="17.035"
                    viewBox="0 0 20.962 17.035"
                    className="fill-[#60b6e3]"
                  >
                    <path
                      id="_104501_twitter_bird_icon"
                      data-name="104501_twitter_bird_icon"
                      d="M24.536,12.342a8.557,8.557,0,0,1-2.47.677,4.308,4.308,0,0,0,1.891-2.379,8.609,8.609,0,0,1-2.731,1.044A4.3,4.3,0,0,0,13.9,15.606a12.21,12.21,0,0,1-8.864-4.493,4.306,4.306,0,0,0,1.331,5.742,4.288,4.288,0,0,1-1.948-.538c0,.018,0,.036,0,.054a4.3,4.3,0,0,0,3.45,4.217,4.324,4.324,0,0,1-1.133.151,4.261,4.261,0,0,1-.809-.077,4.305,4.305,0,0,0,4.017,2.987,8.678,8.678,0,0,1-6.367,1.781A12.23,12.23,0,0,0,22.4,15.125q0-.28-.012-.557A8.71,8.71,0,0,0,24.536,12.342Z"
                      transform="translate(-3.574 -10.326)"
                    />
                  </svg>
                  <span className="hidden md:block">{content.span2}</span>
                </div>
                <div className="flex-1 [&:hover>*]:fill-white hover:bg-[#6563FF] hover:text-white text-[#6563FF] border-2 border-[#6563FF] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
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
                  <span className="hidden md:block">{content.span3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F3F4]">
        <div className="max-w-[1920px] mx-auto">
          <div className="w-[80%] py-10 md:py-20 mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <h2 className="font-PPNeueMachina text-[26px] xl:text-[30px]">
                {content.h2}
              </h2>
              <p className="font-InterRegular text-base text-[#74849D]">
                {content.p2}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex-grow flex flex-col items-center justify-center bg-[#FFC363] rounded-[30px] p-6 md:p-12">
                <img
                  className="w-60 h-60"
                  src="/assets/images/png/invite-1.png"
                  alt=""
                />
                <div className="w-[240px] md:w-[320px] text-center">
                  <h3 className="font-PPNeueMachina text-[26px]">
                    {content.h3}
                  </h3>
                  <p className="font-InterRegular text-lg mt-4">{content.p3}</p>
                </div>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center bg-[#A381FF] rounded-[30px] p-6 md:p-12">
                <img
                  className="w-60 h-60"
                  src="/assets/images/png/invite-2.png"
                  alt=""
                />
                <div className="w-[240px] md:w-[320px] text-center">
                  <h3 className="font-PPNeueMachina text-[26px]">
                    {content.h3a}
                  </h3>
                  <p className="font-InterRegular text-lg mt-4">{content.p4}</p>
                </div>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center bg-[#F8BABA] rounded-[30px] p-6 md:p-12">
                <img
                  className="w-60 h-60"
                  src="/assets/images/png/invite-3.png"
                  alt=""
                />
                <div className="w-[240px] md:w-[320px] text-center">
                  <h3 className="font-PPNeueMachina text-[26px]">
                    {content.h3b}
                  </h3>
                  <p className="font-InterRegular text-lg mt-4">{content.p5}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f4]">
        <div className="max-w-[1920px] mx-auto py-10">
          <div className="w-[80%] mx-auto">
            <h2 className="font-PPNeueMachina text-black text-[26px] xl:text-[30px]">
              My rewards
            </h2>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex-grow font-InterRegular mt-8">
                <div className="bg-black rounded-[25px] p-12">
                  <h3 className="text-base text-[#f3f3f4] flex items-center gap-2">
                    Available rewards{' '}
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
                  </h3>
                  <div className="flex items-center flex-wrap gap-4 md:gap-16 mt-4">
                    <div className="flex items-center gap-4">
                      <img
                        src="/assets/images/svg/circle-logo.svg"
                        alt=""
                        className="w-9 h-9"
                      />
                      <span className="font-PPNeueMachina text-[#FCFCFC] text-[26px] xl:text-[30px]">
                        10,000.00
                      </span>
                    </div>
                    <button className="text-white bg-primary px-8 md:px-12 py-3 rounded-full">
                      Reedem
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-grow font-InterRegular mt-8">
                <div className="bg-black rounded-[25px] p-12 flex flex-wrap items-center gap-8 md:gap-16">
                  <div>
                    <h3 className="text-base text-[#f3f3f4] flex items-center gap-2">
                      Pending rewards{' '}
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
                    </h3>
                    <p className="mt-4 font-PPNeueMachina text-[#FCFCFC] text-[26px] xl:text-[30px]">
                      10,000.00
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base text-[#f3f3f4] flex items-center gap-2">
                      Clicked{' '}
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
                    </h3>
                    <p className="mt-4 font-PPNeueMachina text-[#FCFCFC] text-[26px] xl:text-[30px]">
                      1,321
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base text-[#f3f3f4] flex items-center gap-2">
                      Joined{' '}
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
                    </h3>
                    <p className="mt-4 font-PPNeueMachina text-[#FCFCFC] text-[26px] xl:text-[30px]">
                      190
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f4]">
        <div className="max-w-[1920px] mx-auto py-10 md:py-20">
          <div className="w-[80%] mx-auto">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <h2 className="font-PPNeueMachina text-black text-[26px] xl:text-[30px]">
                Referral activity
              </h2>
              <CalenderDropDown onChange={undefined} />
            </div>
            <div className="overflow-auto font-InterRegular">
              <table className="min-w-[900px] w-full border-separate border-spacing-y-2">
                <thead className="text-[#74849D] text-lg">
                  <tr className="[&>*]:w-[20%] [&>*]:text-start [&>*]:font-normal [&>*]:p-5">
                    <th>Friend’ s Referral ID</th>
                    <th>Referral Bonus Earned</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {[1, 2, 3, 4, 5].map((_v) => (
                    <tr className="[&>*]:p-5 [&>*]:bg-white" key={_v}>
                      <td className="flex items-center gap-4 rounded-tl-[25px] rounded-bl-[25px]">
                        <img
                          className="bg-[rgba(116,132,157,0.1)] rounded-full"
                          src="/assets/images/png/profile.png"
                          alt=""
                        />
                        <p>id784532f</p>
                      </td>
                      <td>100</td>
                      <td>2022-10-08 13:03:05</td>
                      <td className="rounded-tr-[25px] rounded-br-[25px]">
                        {_v === 1 ? (
                          <span className="text-[#BF9B05] px-6 py-3 bg-[rgba(191,155,5,0.05)] rounded-full">
                            Pending
                          </span>
                        ) : (
                          <span className="text-[#37AC82] px-6 py-3 bg-[rgba(55,172,130,0.1)] rounded-full">
                            Paid
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="w-fit font-InterRegular text-base text-[#74849D] mx-auto mt-4">
              Pending e (3-14 days), your transaction will appear here.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#000]">
        <div className="max-w-[1920px] mx-auto text-center px-6 py-20 border-b-2 border-primary">
          <h2 className="font-PPNeueMachina text-white text-[26px] xl:text-[30px]">
            Share your link and earn
          </h2>
          <div className="max-w-[470px] mx-auto mt-8 bg-[#101417] text-base rounded-[25px] flex items-center justify-between">
            <span className="text-[#F3F3F4] px-4 text-xs md:text-sm 1xl:text-lg">
              cleverpay.com/?referral=id2971b
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  'cleverpay.com/?referral=id2971b'
                );
              }}
              className="text-white bg-primary px-8 md:px-12 py-4 rounded-full"
            >
              Copy
            </button>
          </div>
          <div className="max-w-[470px] mx-auto mt-8 flex items-center gap-2 text-xs lg:text-base">
            <div className="flex-1 hover:bg-[#4A83FA] hover:text-white text-[#4A83FA] border-2 border-[#4A83FA] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
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
              Facebook
            </div>
            <div className="flex-1 [&:hover>*]:fill-white hover:bg-[#60B6E3] hover:text-white text-[#60B6E3] border-2 border-[#60B6E3] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.962"
                height="17.035"
                viewBox="0 0 20.962 17.035"
                className="fill-[#60b6e3]"
              >
                <path
                  id="_104501_twitter_bird_icon"
                  data-name="104501_twitter_bird_icon"
                  d="M24.536,12.342a8.557,8.557,0,0,1-2.47.677,4.308,4.308,0,0,0,1.891-2.379,8.609,8.609,0,0,1-2.731,1.044A4.3,4.3,0,0,0,13.9,15.606a12.21,12.21,0,0,1-8.864-4.493,4.306,4.306,0,0,0,1.331,5.742,4.288,4.288,0,0,1-1.948-.538c0,.018,0,.036,0,.054a4.3,4.3,0,0,0,3.45,4.217,4.324,4.324,0,0,1-1.133.151,4.261,4.261,0,0,1-.809-.077,4.305,4.305,0,0,0,4.017,2.987,8.678,8.678,0,0,1-6.367,1.781A12.23,12.23,0,0,0,22.4,15.125q0-.28-.012-.557A8.71,8.71,0,0,0,24.536,12.342Z"
                  transform="translate(-3.574 -10.326)"
                />
              </svg>
              Twitter
            </div>
            <div className="flex-1 [&:hover>*]:fill-white hover:bg-[#6563FF] hover:text-white text-[#6563FF] border-2 border-[#6563FF] rounded-full flex items-center justify-center gap-1 md:gap-3 py-4">
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
              Email
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const logged = true;
  if (!logged) return context.res.status(401).redirect('/');
  const header = prepareHeader(language, context.locale);

  return {
    props: {
      header,
    },
  };
}

export default Index;
