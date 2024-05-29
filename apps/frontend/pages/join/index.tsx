/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { NavbarFooterContext } from '../../components/Layout';
import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import ImageWithFallback from '../../components/ImgWithFallback/ImgWithFallback';
import { Toast } from '../../components/Toast';
import sleep from '../../utils/sleep';

interface IProps {
  header: IHeaderSchema;
}

export default function Index(props: IProps) {
  const { header } = props;
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const [inputType, setInputType] = useState('password');
  const content = getLanguage(language, router.locale).content;
  const [offersNewsApprove, setOffersNewsApprove] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  const [loading, setLoading] = useState(false);

  const toggleInputType = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const submitEnquiryForm = async (gReCaptchaToken: string) => {
    setLoading(true);
    fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password,
        offersNewsApprove,
        gReCaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res?.status === 200) {
          Toast.success(res?.message);
          await sleep(2500);
          router.push('/login-email')
        } else if(res?.status === 403) {
          Toast.error(res?.message);
        } else if(res?.status === 409) {
          Toast.info(res?.message)
        } else {
          Toast.error(res?.message)
        }
        setLoading(false);
      });
  };

  const handleSubmitForm = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (email === '') {
        Toast.error('Field email is mandatory');
        return;
      }
      if (password === '') {
        Toast.error('Field password is mandatory');
        return;
      }
      if (!executeRecaptcha) {
        Toast.info('Execute recaptcha not yet available');
        return;
      }
      executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
        submitEnquiryForm(gReCaptchaToken);
      });
    },
    [executeRecaptcha, submitEnquiryForm]
  );

  useEffect(() => {
    setIsFooter(false);
    setIsNavbar(false);
  }, [setIsFooter, setIsNavbar]);

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
      <div className="max-w-[1920px] mx-auto bg-[#f3f3f4]">
        <div className="w-full h-screen flex">
          <div className="grow basis-0">
            <Link href="/login" legacyBehavior className="cursor-pointer">
              <a className="h-[40px] w-fit block mx-auto lg:ml-[80px] mt-[43px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="192.826"
                  height="38.517"
                  viewBox="0 0 192.826 38.517"
                >
                  <path
                    id="Union_46"
                    data-name="Union 46"
                    d="M5595.8,10303.874v-3.408a8.331,8.331,0,0,0,2.046.279c1.859,0,2.511-.931,3.16-2.355l.372-.9-6.664-16.863h4.371l4.373,11.624,4.34-11.624h4.4l-7.347,18.567c-1.3,3.256-3.38,5.146-6.54,5.146A5.932,5.932,0,0,1,5595.8,10303.874Zm-36.179-.184v-23.064h3.814v1.983a6.768,6.768,0,0,1,5.425-2.356,8.809,8.809,0,0,1-.031,17.608,7.015,7.015,0,0,1-5.146-1.983v7.813Zm4.063-14.632c0,2.975,1.984,5.082,4.681,5.082a5.093,5.093,0,0,0,0-10.166C5565.669,10283.975,5563.685,10286.113,5563.685,10289.059Zm-127.952,10.59-5.635-20.106-1.1-3.62h10.619l5.875-10.1,3.352,1.921-4.756,8.178c2.188.008,12.009.016,14.205,0l-4.758-8.183,3.352-1.921,5.873,10.1h10.621l-1.094,4.117-5.64,19.609Zm2.935-3.807h25.048l4.622-16.113h-34.291Zm140.021-2.816c0-2.79,1.859-4.742,5.827-5.395l5.022-.807v-.556c0-1.459-1.239-2.542-3.1-2.542a4,4,0,0,0-3.781,2.542l-3.318-1.614c.993-2.635,3.876-4.4,7.253-4.4,4.125,0,7.008,2.48,7.008,6.016v11.221h-3.845v-1.8a6.779,6.779,0,0,1-5.271,2.169C5580.952,10297.861,5578.689,10296,5578.689,10293.025Zm6.6-2.387c-1.611.311-2.387,1.021-2.387,2.232,0,1.176.959,1.89,2.325,1.89a4.1,4.1,0,0,0,4.309-4.153v-.683Zm-71.362-1.613c0-5.051,3.628-8.772,8.369-8.772,5.239,0,8.216,3.75,8.216,8.247a5.686,5.686,0,0,1-.217,1.7h-12.152a4.335,4.335,0,0,0,4.495,4.092,4.262,4.262,0,0,0,3.907-2.17l3.285,1.613c-1.021,2.418-3.781,4.122-7.223,4.122A8.5,8.5,0,0,1,5513.93,10289.025Zm4.309-1.922h7.937a3.724,3.724,0,0,0-3.876-3.5A4.026,4.026,0,0,0,5518.238,10287.1Zm-33.6-1.179c0-6.882,4.9-11.9,11.531-11.9,4.929,0,8.526,2.788,9.734,6.074l-3.781,1.767a6.18,6.18,0,0,0-5.953-4c-4.339,0-7.316,3.256-7.316,8.059,0,4.838,2.977,8.094,7.316,8.094a6.182,6.182,0,0,0,5.953-4l3.781,1.766c-1.208,3.287-4.8,6.077-9.734,6.077C5489.564,10297.861,5484.635,10292.809,5484.635,10285.925Zm64.015,11.564v-16.863h3.812v2.387c.869-1.924,2.48-2.573,4.557-2.573h.993v3.595h-1.456c-2.3,0-3.846,1.489-3.846,4.063v9.393Zm-11.378,0-6.633-16.863h4.433l4,11,4-11h4.433l-6.633,16.863Zm-29.388,0v-23.466h4.063v23.466Zm-50.862-10.347a2.2,2.2,0,1,1,2.206,2.193A2.2,2.2,0,0,1,5457.021,10287.143Zm-13.792,2.154a2.19,2.19,0,1,1,1.536-3.766,2.189,2.189,0,0,1-1.51,3.766Zm175.291-5.271a1.931,1.931,0,1,1,1.368.569A1.865,1.865,0,0,1,5618.52,10284.026Zm.2-2.547a1.6,1.6,0,0,0-.481,1.176,1.624,1.624,0,0,0,.479,1.185,1.65,1.65,0,0,0,2.346,0,1.626,1.626,0,0,0,.481-1.185,1.6,1.6,0,0,0-.483-1.176,1.645,1.645,0,0,0-2.341,0Zm.479,1.988a1.124,1.124,0,0,1-.308-.825,1.194,1.194,0,0,1,.277-.8.908.908,0,0,1,.727-.326,1.121,1.121,0,0,1,.507.114.768.768,0,0,1,.427.675h-.318a.593.593,0,0,0-.165-.345.564.564,0,0,0-.414-.145.574.574,0,0,0-.553.344,1.041,1.041,0,0,0-.111.471,1,1,0,0,0,.178.605.6.6,0,0,0,.515.248.548.548,0,0,0,.36-.116.594.594,0,0,0,.2-.331h.318a.862.862,0,0,1-.308.551.928.928,0,0,1-.592.194A1.006,1.006,0,0,1,5619.2,10283.468Z"
                    transform="translate(-5428.999 -10265.823)"
                  />
                </svg>
              </a>
            </Link>
            <div className="max-w-[614px] p-8 mx-auto h-[calc(100%-84px)] flex flex-col justify-center gap-8">
              <div>
                <h1 className="font-PPNeueMachina text-[30px] md:text-[50px] flex items-center gap-4">
                  <div
                    onClick={() => router.push('/login', '/login')}
                    className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-[rgba(177,193,201,0.1)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.799"
                      height="23.799"
                      viewBox="0 0 23.799 23.799"
                    >
                      <g
                        id="_9041645_right_top_arrow"
                        data-name="9041645_right_top_arrow"
                        transform="translate(21.799 11.899) rotate(135)"
                      >
                        <path
                          id="Path_4097"
                          data-name="Path 4097"
                          d="M12.25,0V12.25H0"
                          transform="translate(1.75 1.75)"
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          fillRule="evenodd"
                        />
                        <path
                          id="Path_4098"
                          data-name="Path 4098"
                          d="M14,14,0,0"
                          transform="translate(0 0)"
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          fillRule="evenodd"
                        />
                      </g>
                    </svg>
                  </div>
                  <span className="w-[calc(100%-60px)]">{content.p1}</span>
                </h1>
              </div>
              <div className="w-full flex flex-col items-center gap-4">
                <span className="w-full font-InterRegular text-[22px] text-start">
                  {content.p2}
                </span>
                <form
                  onSubmit={handleSubmitForm}
                  className="w-full flex flex-col items-center gap-4 font-InterRegular text-[22px]"
                >
                  <label className="w-full h-[84px] p-4 bg-[#F3F3F4] border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-2xl flex items-center">
                    <input
                      placeholder="Enter email"
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e?.target?.value)}
                      className="w-full bg-transparent focus:outline-none text-black placeholder-black"
                    />
                  </label>
                  <label className="w-full h-[84px] p-4 bg-[#F3F3F4] border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-2xl flex items-center gap-4">
                    <input
                      placeholder="Enter password"
                      type={inputType}
                      name="password"
                      onChange={(e) => setPassword(e?.target?.value)}
                      className="w-full bg-transparent focus:outline-none text-black placeholder-black"
                    />
                    <span onClick={() => toggleInputType()}>
                      {inputType === 'password' ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23.347"
                          height="18.597"
                          viewBox="0 0 23.347 18.597"
                        >
                          <g
                            id="_9041858_eye_no_icon_1_"
                            name="9041858_eye_no_icon (1)"
                            transform="translate(0.5 0.707)"
                          >
                            <path
                              id="Path_4078"
                              name="Path 4078"
                              d="M5.536,2.655A19.253,19.253,0,0,0,0,8.23q5,7.23,11.174,7.23a10.511,10.511,0,0,0,5.371-1.495m2.087-1.5A22.152,22.152,0,0,0,22.347,8.23Q17.345,1,11.174,1a10.2,10.2,0,0,0-3.193.509"
                              transform="translate(0 0.315)"
                              fill="none"
                              stroke="#000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              fillRule="evenodd"
                            />
                            <line
                              id="Line_393"
                              name="Line 393"
                              x2="17.089"
                              y2="17.182"
                              transform="translate(2.629)"
                              fill="none"
                              stroke="#000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                            />
                          </g>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23.697"
                          height="15.686"
                          viewBox="0 0 23.697 15.686"
                        >
                          <g
                            id="_9041858_eye_no_icon_1_"
                            name="9041858_eye_no_icon (1)"
                            transform="translate(0.5 0.5)"
                          >
                            <g
                              id="_9041806_eye_icon_1_"
                              name="9041806_eye_icon (1)"
                            >
                              <path
                                id="Path_4088"
                                name="Path 4088"
                                d="M11.348,14.686q6.268,0,11.348-7.343Q17.616,0,11.348,0T0,7.343Q5.081,14.686,11.348,14.686Z"
                                fill="none"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                fillRule="evenodd"
                              />
                              <path
                                id="Path_4089"
                                name="Path 4089"
                                d="M9.673,2a4.708,4.708,0,0,1,.725.056,3.248,3.248,0,0,0-.057.612A3.341,3.341,0,0,0,14.289,5.95a4.59,4.59,0,0,1,.057.723A4.673,4.673,0,1,1,9.673,2Z"
                                transform="translate(1.676 0.67)"
                                fill="none"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                fillRule="evenodd"
                              />
                            </g>
                          </g>
                        </svg>
                      )}
                    </span>
                  </label>
                  <label className="w-full flex items-center gap-4">
                    <input
                      className="accent-primary w-[17px] h-[17px]"
                      type="checkbox"
                      name="offersNewsApprove"
                      onChange={(e) => setOffersNewsApprove(e?.target?.value)}
                    />
                    <span className="font-InterRegular text-base text-secondary">
                      {content.p3}
                    </span>
                  </label>
                  {loading ? (
                    <ImageWithFallback
                      fallbackSrc=""
                      alt="spinner"
                      width={70}
                      height={70}
                      src={`${IMAGE_HOST}/assets/images/gif/logo-loader-dark.gif`}
                    />
                  ) : (
                    <input
                      className="cursor-pointer w-full h-[85px] bg-black text-white mt-8 rounded-[20px] hover:bg-primary drop-shadow-[0_50px_90px_rgba(0,0,0,0.08)]"
                      type="submit"
                      value={content.btn}
                    />
                  )}
                  <span className="text-black font-InterRegular text-base">
                    {content.p4}{' '}
                    <Link href="/login-email">
                      <a className="text-primary underline">{content.p5}</a>
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#473FAD] to-[#5E57CB] grow basis-0 hidden lg:block">
            <div className="w-full h-screen bg-homeBanner bg-contain bg-no-repeat bg-center flex flex-col items-center justify-end">
              <a
                href={publicRuntimeConfig.EXTENSION_URL}
                target="_blank"
                rel="noreferrer"
                className="mb-[50px] w-[260px] h-[80px] bg-[#14161A] rounded-xl flex items-center justify-center"
              >
                <div className="flex items-center">
                  <div className="relative w-[14rem] h-10">
                    <ImageWithFallback
                      fallbackSrc=""
                      src={`${IMAGE_HOST}/assets/images/svg/chrome-extension-2.svg`}
                      alt="chrome extension logo"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const header = prepareHeader(language, context.locale);
  return {
    props: {
      header,
    },
  };
}
