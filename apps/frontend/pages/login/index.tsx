import { useContext, useEffect } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
import { NavbarFooterContext } from '../../components/Layout';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import ImageWithFallback from '../../components/ImgWithFallback/ImgWithFallback';

interface IProps {
  header: IHeaderSchema;
}

export default function Index(props: IProps) {
  const { header } = props;
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  const { locale } = useRouter();
  const content = getLanguage(language, locale).content;

  useEffect(() => {
    setIsFooter(false);
    setIsNavbar(false);    
  }, [setIsNavbar, setIsFooter])

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
            <Link href="/" legacyBehavior>
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
                <h1 className="font-PPNeueMachina text-[30px] md:text-[50px]">
                  {content.h1}
                </h1>
                <p className="font-InterRegular text-lg text-secondary">
                  {content.p1}
                </p>
              </div>
              <div className="w-full flex flex-col items-center gap-4">
                <span className="w-full font-InterRegular text-[22px] text-start">
                  {content.p2}
                </span>
                <Link href="/auth/login/google" legacyBehavior>
                  <a className="w-full h-[70px] font-InterRegular text-lg flex items-center justify-center gap-4 rounded-2xl bg-[#f3f3f4] hover:bg-[#f8f7f8] drop-shadow-[0_50px_90px_rgba(0,0,0,0.08)]">
                    <div className="relative w-[25px] h-[25px]">
                      <ImageWithFallback
                        fallbackSrc=""
                        src={`${IMAGE_HOST}/assets/images/png/gmail.png`}
                        alt="gmail logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span>{content.p3}</span>
                  </a>
                </Link>
                <Link href="/auth/login/facebook" legacyBehavior>
                  <a className="w-full h-[70px] font-InterRegular text-lg flex items-center justify-center gap-4 rounded-2xl bg-[#f3f3f4] hover:bg-[#f8f7f8] drop-shadow-[0_50px_90px_rgba(0,0,0,0.08)]">
                    <div className="relative w-[25px] h-[25px]">
                      <ImageWithFallback
                        fallbackSrc=""
                        src={`${IMAGE_HOST}/assets/images/png/fb.png`}
                        alt="fb logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span>{content.p4}</span>
                  </a>
                </Link>
                <Link href="/login-email" legacyBehavior>
                  <a className="w-full h-[70px] font-InterRegular text-lg flex items-center justify-center gap-4 rounded-2xl bg-[#f3f3f4] hover:bg-[#f8f7f8] drop-shadow-[0_50px_90px_rgba(0,0,0,0.08)]">
                    <div className="relative w-[24px] h-[19px]">
                      <ImageWithFallback
                        fallbackSrc=""
                        src={`${IMAGE_HOST}/assets/images/png/email-dark.png`}
                        alt="dark email logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span>{content.p5}</span>
                  </a>
                </Link>
                <Link href="/join" legacyBehavior>
                  <a className="w-full h-[70px] font-InterRegular text-lg flex items-center justify-center gap-4 rounded-2xl bg-black text-white hover:bg-primary drop-shadow-[0_50px_90px_rgba(0,0,0,0.08)]">
                    <div className="relative w-[24px] h-[19px]">
                      <ImageWithFallback
                        fallbackSrc=""
                        src={`${IMAGE_HOST}/assets/images/png/email.png`}
                        alt="email logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span>{content.p6}</span>
                  </a>
                </Link>
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
  const token = context?.req?.cookies?.token || null;
  if (token) return context.res.redirect('/affiliate-dashboard');
  const header = prepareHeader(language, context.locale);

  return {
    props: {
      header,
    },
  };
}
