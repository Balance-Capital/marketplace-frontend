import getConfig from 'next/config';
import { useState, useRef } from 'react';
import useClickOutSide from '../../hooks/useClickOutSide';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

export default function SelectStoreDropDown() {
  const menuRef = useRef(null);
  const [show, setShow] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  useClickOutSide(menuRef, setShow);

  const showDropDown = (e) => {
    setShow(!show);
  };

  return (
    <>
      <div className="relative w-[220px]" ref={menuRef}>
        <button
          onClick={(e) => {
            showDropDown(e);
          }}
          className="w-full flex items-center justify-between p-3 rounded-[20px] border-solid border-2 border-secondary"
        >
          <p className="font-InterRegular text-lg text-white">Select store</p>
          <ImageWithFallback
            fallbackSrc=""
            src={`${IMAGE_HOST}/assets/images/svg/down-arrow.svg`}
            alt="down arrow"
            width={12}
            height={6}
          />
        </button>
        {show && (
          <div className="absolute w-full bg-white shadow-3xl rounded-[30px] mt-2 font-InterRegular text-lg text-[#74849D] z-10">
            <div className="w-fit mx-auto [&>*]:py-1">
              <div className="flex items-center m-3">
                <div className="ml-1">
                  <div className="relative w-6 h-6 self-center">
                    <ImageWithFallback
                      fallbackSrc=""
                      src={`${IMAGE_HOST}/assets/images/svg/search-icon.svg`}
                      alt="searchicon"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  id="default-search"
                  className="w-full ml-3 bg-transparent focus:outline-none text-secondary placeholder-secondary"
                  placeholder="Search"
                />
              </div>
              <hr />
              <div className="w-[196px] m-3 mx-auto rounded-2xl flex items-center hover:bg-[rgba(112,112,112,0.04)] cursor-pointer">
                <div className="relative w-10 h-10 lg:w-14 lg:h-14 border-2 border-[rgba(112,112,112,0.1)] rounded-2xl shadow-3xl">
                  <ImageWithFallback
                    fallbackSrc="/assets/imgs/store-default.png"
                    src={`${IMAGE_HOST}/assets/images/png/Canon coupons vouchers code 2022.png`}
                    alt="Canon coupons vouchers code 2022.png"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
                <div className="ml-[4%] ">
                  <p className="w-[130px] text-sm lg:text-lg font-InterSemiBold text-ellipsis overflow-hidden whitespace-nowrap">
                    Canon
                  </p>
                  <p className="w-[130px] text-xs lg:text-base font-InterRegular text-secondary text-ellipsis overflow-hidden whitespace-nowrap">
                    canon.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
