import getConfig from 'next/config';
import Link from 'next/link';
import { useState } from 'react';
import ChromeExtBtn from '../ChromeExtBtn';
import SearchBar from '../SearchBar';
import TranslationDropDown from '../TranslationDropDown';
import Wallet from '../Wallet';
import styles from './styles/index.module.css';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

function Navbar() {
  const [show, setShow] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  const toggleDropdown = () => {
    setShow(!show);
  };
  return (
    <>
      <header className={styles.header}>
        <div className="max-w-[1920px] h-full mx-auto flex items-center justify-between">
          <div className="w-fit flex justify-center items-center ml-10">
            <Link href="/" legacyBehavior>
              <a>
                <div className={styles.headerLogo}>
                  <ImageWithFallback
                    fallbackSrc=""
                    layout="fill"
                    objectFit="cover"
                    src={`${IMAGE_HOST}/assets/images/svg/logo.svg`}
                    alt="logo"
                  />
                </div>
              </a>
            </Link>
          </div>
          <nav className={styles.headerDesktopNav}>
            <a
              target="_blank"
              href={publicRuntimeConfig.BLOG_URL}
              className="hover:text-primary"
              rel="noreferrer"
            >
              Blog
            </a>
            <Link href="/stores/A" legacyBehavior>
              <a>Stores</a>
            </Link>
            {/* <a
              target="_blank"
              rel="noreferrer"
              href={publicRuntimeConfig.FAQ_URL}
              className="hover:text-primary"
            >
              FAQs
            </a> */}
          </nav>
          <div className="hidden lg:flex w-fit h-[50px] items-center justify-between gap-5 mr-10">
            <div className="xl:w-[430px] w-[260px]">
              <SearchBar />
            </div>
            <TranslationDropDown />
            <div>
              <Wallet />
            </div>
          </div>
          <div
            className="flex lg:hidden items-center mr-10"
            onClick={() => toggleDropdown()}
          >
            <div className="relative w-[39px] h-[21px]">
              <ImageWithFallback
                fallbackSrc=""
                layout="fill"
                objectFit="cover"
                src={`${IMAGE_HOST}/assets/images/svg/hamburger.svg`}
                alt="hamburger"
              />
            </div>
          </div>
        </div>
        {show && (
          <div className="fixed left-0 top-0 bg-[#14161A] w-screen h-screen flex flex-col z-10">
            <div className="w-full h-24 mx-auto flex justify-around border-solid border-b-2 border-[rgba(112,112,112,0.3)]">
              <div className="w-full flex justify-between">
                <div className="flex items-center ml-10">
                  <Link href="/" legacyBehavior>
                    <a>
                      <div className="relative w-44 h-[34px] md:w-40 md:h-[33px] sm:w-32 sm:h-[26px] ">
                        <ImageWithFallback
                          fallbackSrc=""
                          src={`${IMAGE_HOST}/assets/images/svg/logo.svg`}
                          alt="logo"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="flex items-center gap-3 mr-10">
                  <TranslationDropDown />
                  <div className="relative w-12 h-12">
                    <ImageWithFallback
                      fallbackSrc=""
                      onClick={() => toggleDropdown()}
                      src={`${IMAGE_HOST}/assets/images/svg/close.svg`}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-10/12 mx-auto mt-4 mb-4">
              <SearchBar />
            </div>
            <nav className="w-10/12 mx-auto text-base text-white font-InterRegular flex flex-col gap-4">
              <a
                href={publicRuntimeConfig.BLOG_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                Blog
              </a>
              <Link href="/stores/A" legacyBehavior>
                <a>Stores</a>
              </Link>
              {/* <a
                target="_blank"
                rel="noreferrer"
                href={publicRuntimeConfig.FAQ_URL}
                className="hover:text-primary"
              >
                FAQs
              </a> */}
            </nav>
            <div className="sm:w-3/5 md:w-1/2 mx-auto flex-grow flex flex-col justify-end">
              <div className="mt-4 mb-4 w-52 mx-auto">
                <ChromeExtBtn text="Add to Chrome" className="bg-primary" />
              </div>
              <div className="mt-4 mb-4 mx-auto">
                <Wallet />
              </div>
              <div className="flex items-center justify-center mt-4 mb-4">
                <div className="pr-4 border-solid border-r-2 border-[rgba(112,112,112,0.3)]">
                  <div className="relative w-44 h-[34px] md:w-40 md:h-[33px] sm:w-32 sm:h-[26px]">
                    <ImageWithFallback
                      fallbackSrc=""
                      src={`${IMAGE_HOST}/assets/images/svg/logo.svg`}
                      alt="logo"
                      layout="fill"
                      objectFit="cover"
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
          </div>
        )}
      </header>
    </>
  );
}
export default Navbar;
