import getConfig from 'next/config';
import { useRef } from 'react';
import useClickOutSide from '../../../hooks/useClickOutSide';
import ImageWithFallback from '../../ImgWithFallback/ImgWithFallback';

export default function RecentActivityRecord({ setModal }) {
  const modalRef = useRef(null);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  useClickOutSide(modalRef, setModal);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-60"></div>

      <div className="flex items-center justify-end fixed inset-0 z-10">
        <div
          className="w-full overflow-auto md:w-[500px] mt-[20vh] md:mt-0 h-[80vh] md:h-screen bg-white rounded-tl-[25px] rounded-tr-[25px] md:rounded-none"
          ref={modalRef}
        >
          <div className="md:hidden flex justify-end p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => setModal(false)}
            >
              <rect
                id="Rectangle_806"
                data-name="Rectangle 806"
                width="53"
                height="53"
                rx="26.5"
                fill="rgba(177,193,201,0.1)"
              />
              <g id="g2246" transform="translate(19.284 19.284)">
                <path
                  id="path1419"
                  d="M-1479.2-17.007l15.079-15.079"
                  transform="translate(1479.199 32.087)"
                  fill="none"
                  stroke="#0a0b0e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  id="path1421"
                  d="M-1479.2-32.087l15.079,15.079"
                  transform="translate(1479.199 32.087)"
                  fill="none"
                  stroke="#0a0b0e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>
          <div className="px-12 py-0 md:p-12">
            <div className="font-InterRegular flex flex-col gap-3 pb-8 border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-2xl flex items-center gap-2">
                <ImageWithFallback
                  fallbackSrc="/assets/imgs/store-default.png"
                  className="rounded-full"
                  width={36}
                  height={36}
                  alt=""
                  src={`${IMAGE_HOST}/assets/images/png/Canon coupons vouchers code 2022.png`}
                />
                Canon
              </h2>
              <div className="flex items-center justify-between">
                <h2 className="text-secondary">Page URL</h2>
                <span className="w-fit flex gap-2 items-center text-[#37AC82] px-6 py-3 bg-[rgba(55,172,130,0.1)] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                  >
                    <circle
                      id="Ellipse_986"
                      data-name="Ellipse 986"
                      cx="4.5"
                      cy="4.5"
                      r="4.5"
                      fill="#37ac82"
                    />
                  </svg>
                  Active
                </span>
              </div>
              <div className="bg-[rgba(101,99,255,0.1)] text-primary font-InterRegular text-sm flex items-center justify-between p-2 rounded-full">
                <h2 className="text-ellipsis overflow-hidden whitespace-nowrap sm:w-[250px] md:w-[350px]">
                  https://starbucks.com/dealspage.en-gb.html?label=gen173asdqweasdqwe
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.996"
                  height="18.995"
                  viewBox="0 0 18.996 18.995"
                >
                  <g
                    id="Group_13453"
                    data-name="Group 13453"
                    transform="translate(0.75 0.75)"
                  >
                    <g id="Group_12010" data-name="Group 12010">
                      <rect
                        id="Rectangle_905"
                        data-name="Rectangle 905"
                        width="11.05"
                        height="11.049"
                        rx="1"
                        transform="translate(6.446 6.445)"
                        fill="none"
                        stroke="rgba(101,99,255,0.42)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Path_2927"
                        data-name="Path 2927"
                        d="M11.336,7.957V9.825a1.511,1.511,0,0,1-1.511,1.511H1.511A1.511,1.511,0,0,1,0,9.825V1.511A1.511,1.511,0,0,1,1.511,0h2.2"
                        transform="translate(11.336) rotate(90)"
                        fill="none"
                        stroke="rgba(101,99,255,0.42)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="font-InterRegular text-lg flex flex-col gap-3 py-8 border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-secondary">Clicks</h2>
              <p className="font-bold">1,439</p>
            </div>
            <div className="font-InterRegular text-lg flex flex-col gap-3 py-8 border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-secondary">Conversions</h2>
              <p className="font-bold">23</p>
            </div>
            <div className="font-InterRegular text-lg flex flex-col gap-3 py-8 border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-secondary">Commission</h2>
              <p className="font-bold">$12.54</p>
            </div>
            <div className="font-InterRegular text-lg flex flex-col gap-3 py-8 border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-secondary">Link preview</h2>
              <div className="relative overflow-hidden h-[116px] lg:h-[200px] rounded-[25px]">
                <ImageWithFallback
                  fallbackSrc=""
                  src={`${IMAGE_HOST}/assets/images/png/blog-post.png`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h2 className="text-ellipsis overflow-hidden whitespace-nowrap font-InterMedium text-[16px] lg:text-[20px] text-black pt-4">
                  Today’s Top Deals & Offers on Coffee — Starbucks Stores
                </h2>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap font-InterRegular text-[12px] lg:text-[16px] text-secondary pt-2">
                  https://starbucks.com/dealspage.en-gb.html?label=gen173asdqweasdqwe
                </p>
              </div>
            </div>
            <div className="font-InterRegular text-[#f54a6b] text-lg flex items-center justify-center gap-3 py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.325"
                height="16.498"
                viewBox="0 0 15.325 16.498"
              >
                <path
                  id="Union_56"
                  data-name="Union 56"
                  d="M-9683.464-7510.5a1.769,1.769,0,0,1-1.769-1.768v-8.839h11.788v8.839a1.769,1.769,0,0,1-1.769,1.768Zm6.483-8.251v5.306a.589.589,0,0,0,.586.59.59.59,0,0,0,.591-.59v-5.306a.588.588,0,0,0-.591-.587A.587.587,0,0,0-9676.98-7518.752Zm-2.947,0v5.306a.59.59,0,0,0,.588.59.591.591,0,0,0,.591-.59v-5.306a.588.588,0,0,0-.591-.587A.587.587,0,0,0-9679.928-7518.752Zm-2.945,0v5.306a.589.589,0,0,0,.586.59.592.592,0,0,0,.591-.59v-5.306a.59.59,0,0,0-.591-.587A.587.587,0,0,0-9682.873-7518.752Zm-3.538-3.533a.591.591,0,0,1-.59-.591v-.587a1.182,1.182,0,0,1,1.178-1.182h3.536v-.587a1.769,1.769,0,0,1,1.769-1.768h2.359a1.771,1.771,0,0,1,1.769,1.768v.587h3.532a1.183,1.183,0,0,1,1.183,1.182v.587a.592.592,0,0,1-.591.591Zm5.3-2.946v.587h3.536v-.587a.59.59,0,0,0-.587-.591h-2.359A.593.593,0,0,0-9681.108-7525.231Z"
                  transform="translate(9687.001 7526.999)"
                  fill="#f54a6b"
                />
              </svg>
              <h2>Delete this link</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
