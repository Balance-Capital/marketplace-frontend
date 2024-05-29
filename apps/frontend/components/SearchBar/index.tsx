import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import debounce from 'lodash/debounce';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import { ISearchSchema } from '../../pages/api/searchbar';
import useClickOutSide from '../../hooks/useClickOutSide';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

function SearchBar() {
  const router = useRouter();
  const menuRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(Array<ISearchSchema>);
  const [searchBarEvent, setSearchBarEvent] = useState(null);
  const content = getLanguage(language, router.locale);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  useClickOutSide(menuRef, setShow);

  const showDropDown = async () => {
    setSearchBarEvent(inputRef);
    if (inputRef.current?.value !== '') {
      setIsLoading(true);
      fetch(`/api/searchbar?id=${inputRef.current?.value}`).then(
        async (results) => {
          const data: Array<ISearchSchema> = await results.json();
          setData(data);
          setShow(true);
          setIsLoading(false)
        }
      );
    } else {
      setShow(false);
    }
  };
  const debouncedChangeHandler = debounce(showDropDown, 300);

  const handleClick = (path) => {
    router.push(path, path);
    setShow(false);
    searchBarEvent.current.value = '';
  };

  const onClickShowDropDown = () => {
    if (searchBarEvent?.current.value !== '' && data.length) {
      setShow(true);
    }
  };

  const highlightText = (txt: string, isSlice: boolean): string => {
    let subStr = txt;
    if (isSlice) {
      const indexOf = txt.indexOf(searchBarEvent.current.value);
      subStr = txt.slice(indexOf === -1 ? 0 : indexOf, txt.length);
    }
    return subStr.replace(
      new RegExp(searchBarEvent.current.value, 'gi'),
      `<span>${
        searchBarEvent.current.value.charAt(0).toUpperCase() +
        searchBarEvent.current.value.slice(1)
      }</span>`
    );
  };

  return (
    <>
      <div className="relative w-full h-full" ref={menuRef}>
        <form className="xl:text-base lg:text-sm text-xs py-4 px-2 font-InterRegular rounded-full border-solid border-2 border-[rgba(112,112,112,0.3)] flex items-center justify-start">
          <label htmlFor="default-search" className="mb-2 sr-only">
            {content.search}
          </label>
          <div className="w-full flex items-center">
            <div className="ml-4">
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
              onClick={onClickShowDropDown}
              ref={inputRef}
              type="text"
              id="default-search"
              className="w-full ml-3 bg-transparent focus:outline-none text-secondary placeholder-secondary"
              placeholder={content.placeholder}
              onChange={debouncedChangeHandler}
            />
          </div>
        </form>

        {/* Show dynamic list */}
        {!isLoading && show && data && data?.length === 0 && (
          <div className="w-full absolute bg-white shadow-3xl rounded-2xl mt-2 text-black z-10">
            <div className="p-4 mx-auto rounded-2xl flex items-center hover:bg-[rgba(112,112,112,0.04)]">
              {content.noresult}
            </div>
          </div>
        )}
        {!isLoading && show && data && data?.length > 0 && (
          <div className="w-full absolute bg-white shadow-3xl rounded-2xl mt-2 text-black z-10">
            {data.map((element, index) => (
              <a
                key={index}
                href="#"
                onClick={() => handleClick(`/site/${element.domain}`)}
              >
                <div className="p-4 mx-auto rounded-2xl flex items-center hover:bg-[rgba(112,112,112,0.04)] cursor-pointer">
                  <div className="relative grow-0 shrink-0 w-16 h-16 lg:w-20 lg:h-20 border-2 border-[rgba(112,112,112,0.1)] rounded-2xl shadow-3xl">
                    <ImageWithFallback
                      fallbackSrc="/assets/imgs/store-default.png"
                      src={`${IMAGE_HOST}/${element?.logo}`}
                      alt={`logo ${element?.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="ml-[4%]">
                    <p
                      className="text-sm lg:text-lg font-InterSemiBold [&>span]:bg-yellow-300"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(element?.name || '', false),
                      }}
                    ></p>
                    <p
                      className="text-xs lg:text-base font-InterRegular text-secondary twoRowEllipsis [&>span]:bg-yellow-300"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(element?.description || '', true),
                      }}
                    ></p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="w-full absolute bg-white shadow-3xl rounded-2xl mt-2 text-black z-10">
            <div className="relative w-fit mx-auto my-7">
              <ImageWithFallback
                fallbackSrc=""
                alt="spinner"
                width={50}
                height={50}
                src={`${IMAGE_HOST}/assets/images/gif/logo-loader-dark.gif`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default SearchBar;
