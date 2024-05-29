import getConfig from 'next/config';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';
import Link from 'next/link';

function Footer() {
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  return (
    <>
      <footer className="w-full bg-black">
        <div className="max-w-[1920px] mx-auto md:h-[25rem] sm:h-[30rem] flex sm:flex-col items-center justify-center">
          <div className="w-[80%] h-[60%] flex items-center sm:justify-center">
            <div className="w-2/4 hidden lg:block text-white">
              <div className="relative w-[193px] h-[39px]">
                <ImageWithFallback
                  fallbackSrc=""
                  src={`${IMAGE_HOST}/assets/images/svg/logo.svg`}
                  alt="logo"
                  layout="fill"
                  objectFit="cover"
                  width={0}
                  height={0}
                />
              </div>
              <span className="font-InterRegular mt-4 inline-block">
                © 2024 All rights reserved
              </span>
              <a
                href={publicRuntimeConfig.EXTENSION_URL}
                target="_blank"
                rel="noreferrer"
                className="w-[18rem] h-[7rem] mt-4 bg-[#14161A] rounded-xl flex items-center justify-center"
              >
                <div className="flex items-center justify-center">
                  <div className="relative w-[14rem] h-10">
                    <ImageWithFallback
                      fallbackSrc=""
                      src={`${IMAGE_HOST}/assets/images/svg/chrome-extension-2.svg`}
                      alt="chrome extension logo"
                      layout="fill"
                      objectFit="cover"
                      width={0}
                      height={0}
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="w-9/12 lg:w-2/4 font-InterRegular flex lg:justify-around sm:justify-between gap-8 flex-wrap">
              <div className="flex flex-col gap-4">
                <h4 className="text-primary font-PPNeueMachina text-lg">
                  SITE
                </h4>
                <Link href="/stores/A" legacyBehavior>
                  <a className="text-secondary text-base">Stores</a>
                </Link>
                <a
                  target="_blank"
                  href={publicRuntimeConfig.BLOG_URL}
                  className="text-secondary text-base"
                  rel="noreferrer"
                >
                  Blog
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={publicRuntimeConfig.FAQ_URL}
                  className="text-secondary text-base"
                >
                  FAQs
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-primary font-PPNeueMachina text-lg">
                  LINKS
                </h4>
                <a
                  target="_blank"
                  href={publicRuntimeConfig.TERM_OF_USE_URL}
                  className="text-secondary text-base"
                  rel="noreferrer"
                >
                  Term of Use
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={publicRuntimeConfig.PRIVACY_POLICY_URL}
                  className="text-secondary text-base"
                >
                  Privacy Policy
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={publicRuntimeConfig.CONTACT_URL}
                  className="text-secondary text-base"
                >
                  Contact Us
                </a>
                {/* <a
                  target="_blank"
                  rel="noreferrer"
                  href={publicRuntimeConfig.COOKIES_URL}
                  className="text-secondary text-base"
                >
                  Cookies
                </a> */}
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-primary font-PPNeueMachina text-lg">
                  CONNECT
                </h4>
                <div className="flex items-center gap-4">
                  <a
                    href="https://twitter.com/XXX"
                    target="_blank"
                    className="text-secondary text-base"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28.734"
                      height="21.75"
                      viewBox="0 0 1200 1227"
                    >
                      <path
                        id="XXX_X_icon"
                        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                        fill="#718199"
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/people/XXX/100086118620543/?sk=about&_rdc=1&_rdr"
                    className="text-secondary text-base"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11.119"
                      height="22.66"
                      viewBox="0 0 11.119 22.66"
                    >
                      <path
                        id="XXX_Facebook_icon"
                        d="M28.047,13.11H24.619V10.862a.915.915,0,0,1,.954-1.041h2.419V6.109L24.66,6.1a4.219,4.219,0,0,0-4.54,4.54V13.11H17.982v3.824h2.139V27.756h4.5V16.934h3.035Z"
                        transform="translate(-17.482 -5.596)"
                        fill="#718199"
                        stroke="rgba(0,0,0,0)"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/XXX/"
                    className="text-secondary text-base"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21.001"
                      viewBox="0 0 21 21.001"
                    >
                      <path
                        id="XXX_Instagram_icon"
                        d="M-2823,6859c-2.712,0-3.061,0-4.119-.06a7.274,7.274,0,0,1-2.431-.47,4.8,4.8,0,0,1-1.77-1.15,4.724,4.724,0,0,1-1.15-1.77,7.281,7.281,0,0,1-.47-2.431c-.06-1.06-.06-1.408-.06-4.119s0-3.061.06-4.121a7.264,7.264,0,0,1,.47-2.429,4.741,4.741,0,0,1,1.15-1.771,4.844,4.844,0,0,1,1.77-1.148,7.333,7.333,0,0,1,2.43-.47c1.059-.061,1.407-.061,4.119-.061s3.061,0,4.121.06a7.275,7.275,0,0,1,2.429.47,4.73,4.73,0,0,1,1.77,1.149,4.866,4.866,0,0,1,1.16,1.771,7.573,7.573,0,0,1,.461,2.429c.059,1.062.059,1.41.059,4.122,0,1.68-.022,2.434-.039,3.04v.007c-.01.373-.019.667-.019,1.072a7.6,7.6,0,0,1-.461,2.432,4.858,4.858,0,0,1-1.16,1.77,4.708,4.708,0,0,1-1.77,1.149,7.235,7.235,0,0,1-2.429.471C-2819.939,6859-2820.288,6859-2823,6859Zm.026-15.129H-2823a5.134,5.134,0,0,0-5.119,5.136,5.137,5.137,0,0,0,5.131,5.124,5.138,5.138,0,0,0,5.129-5.131,5.151,5.151,0,0,0-1.5-3.633,5.078,5.078,0,0,0-3.615-1.5Zm5.314-1.411a1.2,1.2,0,0,0-1.2,1.2,1.2,1.2,0,0,0,1.2,1.2,1.2,1.2,0,0,0,1.2-1.2,1.2,1.2,0,0,0-1.2-1.2Zm-5.34,9.87a3.332,3.332,0,0,1-3.329-3.329,3.334,3.334,0,0,1,3.33-3.332,3.334,3.334,0,0,1,3.331,3.331,3.334,3.334,0,0,1-3.331,3.33Z"
                        transform="translate(2833.5 -6838.499)"
                        fill="#718199"
                        stroke="rgba(0,0,0,0)"
                        strokeMiterlimit="10"
                        strokeWidth="1"
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/XXX/"
                    className="text-secondary text-base"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                    >
                      <path
                        id="Subtraction_1"
                        data-name="Subtraction 1"
                        d="M19.8,24H4.2A4.2,4.2,0,0,1,0,19.8V4.2A4.2,4.2,0,0,1,4.2,0H19.8A4.2,4.2,0,0,1,24,4.2V19.8A4.2,4.2,0,0,1,19.8,24ZM15.151,11.778a2.047,2.047,0,0,1,1.439.6,2.284,2.284,0,0,1,.637,1.631V21.1h3.81V13.5a4.895,4.895,0,0,0-.211-1.861,4.263,4.263,0,0,0-.86-1.547,4.631,4.631,0,0,0-1.891-1.265,4.244,4.244,0,0,0-1.514-.291A4.891,4.891,0,0,0,13,10.388V8.828H9.622V21.1H13V14.625a3.152,3.152,0,0,1,.836-2.22,1.786,1.786,0,0,1,1.279-.626ZM3.371,8.828V21.1H6.757V8.828ZM5.062,2.9A2.115,2.115,0,1,0,7.178,5.018,2.117,2.117,0,0,0,5.062,2.9Z"
                        fill="#718199"
                      />
                    </svg>
                  </a>

                  <a href="#" className="text-secondary text-base hidden">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex flex-wrap items-center justify-center mt-20">
            <div className="pr-4 border-solid border-r-2 border-[rgba(112,112,112,0.3)]">
              <div className="relative md:w-40 md:h-[33px] sm:w-32 sm:h-[26px]">
                <ImageWithFallback
                  fallbackSrc=""
                  src={`${IMAGE_HOST}/assets/images/svg/logo.svg`}
                  alt="logo"
                  layout="fill"
                  objectFit="cover"
                  width={0}
                  height={0}
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-[10px] text-white font-InterRegular">
                © 2024 All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
