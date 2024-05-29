import getConfig from 'next/config';
import { useEffect, useState, useRef } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import worldRegionSupport from '../../constants/worldRegionSupport';
import useClickOutSide from '../../hooks/useClickOutSide';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

export default function TranslationDropDown() {
  const router = useRouter();
  const menuRef = useRef(null);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('us');
  const [availableStores, setAvailableStores] = useState(null);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  useClickOutSide(menuRef, setShow);

  useEffect(() => {
    let cookie: string | null = getCookie('countryCode')?.toString() || null;
    if (cookie) {
      setSelected(cookie.toLowerCase());
    } else {
      cookie = 'US';
      setSelected(cookie.toLowerCase());
      cookieSet(cookie);
    }
    fetch(`${publicRuntimeConfig?.API_HOST}/stores/stats/regions`)
      .then(data => data.json())
      .then(data => {
        setAvailableStores(data);
    });
  }, [publicRuntimeConfig, setSelected, setAvailableStores]);

  const showDropDown = (e) => {
    setShow(!show);
  };

  const onSelect = (countryCode: string) => {
    setSelected(countryCode);
    setShow(!show);
    cookieSet(countryCode);
    router.push(router.asPath, router.asPath);
  };

  const cookieSet = (countryCode='US') => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 365);
    setCookie('countryCode', countryCode.toUpperCase(), {
      expires: expires,
    });
  }

  return (
    <>
      <div className="relative w-[123.5px]" ref={menuRef}>
        <button
          onClick={(e) => {
            showDropDown(e);
          }}
          className="mx-auto p-1 px-2 h-[50px] flex items-center gap-2 rounded-xl border-solid border-2 border-[rgba(112,112,112,0.3)]"
        >
          <div className="relative w-8 h-8">
            <ImageWithFallback
              fallbackSrc=""
              src={`${IMAGE_HOST}/assets/images/svg/${selected}.svg`}
              alt={`${selected} flag`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className="text-white">Stores</span>
          <div className="relative w-[12px] h-[7px]">
            <ImageWithFallback
              fallbackSrc=""
              src={`${IMAGE_HOST}/assets/images/svg/down-arrow.svg`}
              alt="down arrow"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </button>
        {show && (
          <div className="absolute w-full bg-white shadow-3xl rounded-2xl mt-2 text-black z-10">
            {availableStores && worldRegionSupport.filter((item)=>{
              let result = false;
              switch(item) {
                case 'us': result = availableStores.US > 0 ? true : false; break;
                case 'uk': result = availableStores.UK > 0 ? true : false; break;
                case 'eu': result = availableStores.EU > 0 ? true : false; break;
                case 'aus': result = availableStores.AUS > 0 ? true : false; break;
                case 'sa': result = availableStores.SA > 0 ? true : false; break;
              };
              return result;
            }).map((element) => (
              <div
                key={element}
                onClick={() => {
                  onSelect(element);
                }}
                className="p-[5%] w-full mx-auto rounded-2xl flex items-center hover:bg-[rgba(112,112,112,0.04)] cursor-pointer"
              >
                <div className="relative w-8 h-8">
                  <ImageWithFallback
                    fallbackSrc=""
                    src={`${IMAGE_HOST}/assets/images/svg/${element}.svg`}
                    alt={`${element} flag`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-[4%]">
                  <p className="text-sm lg:text-lg font-InterRegular uppercase">
                    {element}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
