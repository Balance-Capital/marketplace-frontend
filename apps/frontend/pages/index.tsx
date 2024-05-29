import { useContext, useEffect, useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { COOKIE_NAME } from '../constants/cookieName';
import IHeaderSchema from '../interfaces/header';
import IStoreSchema from '../interfaces/store';
import SeoHeader from '../components/SeoHeader';
import backendApi, { IBackendApi } from '../utils/backendApi';
import getLanguage from '../utils/getLanguage';
import language from './locale/homePage.json';
import ChromeExtBtn from '../components/ChromeExtBtn';
import { getSliceOffers } from '../components/PromoCard';
import BanerExtChrome from '../components/BanerExtChrome';
import { prepareHeader } from '../utils/prepareHeader';
import useScroll from '../hooks/useScroll';
import { NavbarFooterContext, UserAvatarImageContext, UserBalanceContext } from '../components/Layout';
import ImageWithFallback from '../components/ImgWithFallback/ImgWithFallback';
import ProductListItem from '../components/ProductsListItem';
import IOfferSchema from '../interfaces/offer';
import IProductSchema from '../interfaces/product';
import { ArrowCircleBtn } from '../components/Buttons';
import IUser from '../interfaces/user';
import RollbarService from '../services/rollbar';

interface IProps {
  header: IHeaderSchema;
  data: Array<IStoreSchema>;
  products: Array<IProductSchema>;
  user: IUser | null;
}

export function Index(props: IProps) {
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const successBar = useScroll({ isWheel: false });
  const todayBar = useScroll({ isWheel: false });
  const trendingBar = useScroll({ isWheel: false });
  const popularBar = useScroll({ isWheel: false });
  const categoriesBar = useScroll({ isWheel: false });
  const { data, header, products, user } = props;
  const [getSelectedCategory, setSelectedCategory] = useState('All');
  const [getStoresByCategory, setStoresByCategory] = useState(data);
  const [activeHowBtn, setActiveHowBtn] = useState(0);
  const { locale, push } = useRouter();
  const content = getLanguage(language, locale).content;
  const topTenStores = Array.isArray(data)
    ? data.slice(0, 10)
    : ([] as IStoreSchema[]);
  const trandingOffersAndDeals = getSliceOffers(data, 20, 40);
  const [preloadImgLinks, setPreloadImgLinks] = useState([]);
  const { setUserBalance } = useContext(UserBalanceContext);
  const { setUserAvatarImage } = useContext(UserAvatarImageContext);

  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  const [howImgs, _setHowImgs] = useState([
    { url: `${IMAGE_HOST}/assets/images/png/how1.png`, w: '700px', h: '444px' },
    { url: `${IMAGE_HOST}/assets/images/png/how2.png`, w: '723px', h: '442px' },
    { url: `${IMAGE_HOST}/assets/images/png/how3.png`, w: '702px', h: '442px' },
  ]);

  const categories = [
    'All',
    ...new Set(
      data?.reduce(
        (acc: string[], store: IStoreSchema) =>
          acc.concat(
            store.categories.filter(
              (str) => str !== '' && str !== null && str !== undefined
            )
          ),
        [] as string[]
      ) || []
    ),
  ];
  
  useEffect(() => {
    setUserBalance(user?.balance || 0)
    setUserAvatarImage(user?.avatar || null)
  }, [setUserBalance, setUserAvatarImage, user])

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])

  useEffect(() => {
    if (getSelectedCategory !== 'All') {
      setStoresByCategory(
        data.filter((store: IStoreSchema) =>
          store?.categories?.includes(getSelectedCategory)
        )
      );
    } else {
      setStoresByCategory(data);
    }
  }, [data, getSelectedCategory]);

  useEffect(() => {
    setPreloadImgLinks([
      globalThis.innerWidth > 1024
        ? `${IMAGE_HOST}/assets/images/png/header-bg.png`
        : `${IMAGE_HOST}/assets/images/png/header-bg-mob.png`,
      `${IMAGE_HOST}/assets/images/png/how1.png`,
      `${IMAGE_HOST}/assets/images/png/how2.png`,
      `${IMAGE_HOST}/assets/images/png/how3.png`,
      `${IMAGE_HOST}/assets/images/png/banner-bg.png`,
    ]);
  }, []);

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
        preloadImgLinks={preloadImgLinks}
      />
      <section className="w-full bg-gradient-to-b from-[#473FAD] to-[#5E57CB]">
        <div className="max-w-[1920px] mx-auto flex items-center justify-center bg-headerMobile lg:bg-headerDesktop bg-bottom lg:bg-right bg-no-repeat">
          <div className="w-[90%] h-[828px] md:h-[750px] lg:h-96 flex sm:flex-col lg:flex-row items-center sm:justify-center lg:justify-start">
            <div className="md:w-[550px] sm:w-[344px] text-white text-center lg:text-start mt-16 lg:mt-0">
              <h1 className="font-PPNeueMachina text-[40px] leading-10">
                {content.h1}
              </h1>
              <p className="mt-2 font-InterRegular text-base">{content.p1}</p>
              <div className="hidden lg:block mt-8 w-52 h-14">
                <ChromeExtBtn text={content.btn2} className="bg-black" />
              </div>
            </div>
            <div className="lg:hidden sm:w-[22rem] md:w-[24.75rem] mt-auto mb-10 flex items-center justify-center">
              <div className="absolute sm:w-[22rem] md:w-[24.75rem] rounded-xl h-[5.5rem] backdrop-blur-xl brightness-125 bg-white/30"></div>
              <div className="relative sm:w-[20rem] md:w-[21.875rem] flex items-center justify-between">
                <div className="relative w-[152px] h-[49px]">
                  <ImageWithFallback
                    fallbackSrc=""
                    layout="fill"
                    objectFit="cover"
                    src={`${IMAGE_HOST}/assets/images/svg/box-logo.svg`}
                    alt="box logo"
                  />
                </div>
                <div className="w-[10.375rem]">
                  <ChromeExtBtn text={content.btn2} className="bg-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto my-20">
        <div className="w-[90%] mx-auto my-8">
          <div className="flex items-center justify-between">
            <h2 className="grow text-center lg:text-start text-black text-[30px] font-PPNeueMachina leading-10">
              Stores with the Most Successful Codes
            </h2>
            <div className="hidden lg:flex items-center gap-4">
              <ArrowCircleBtn
                direction="left"
                handleClick={successBar.slide.bind(null, -400)}
              />
              <ArrowCircleBtn
                direction="right"
                handleClick={successBar.slide.bind(null, +400)}
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[90%] mx-auto">
          <div
            ref={successBar.scrollRef}
            className="overflow-x-scroll scrollbar-hide"
          >
            <div className="w-fit mx-auto flex gap-6 lg:px-0 sm:px-4 noselect">
              {topTenStores.map((element: IStoreSchema, index) => (
                <div
                  onClick={() =>
                    push(`site/${element?.domain}`, `site/${element?.domain}`)
                  }
                  key={`top-stores${index || 0}`}
                  className="cursor-pointer w-[327px] h-[129px] rounded-[25px] border-2 border-[#e5e6e861]/20 flex items-center gap-4"
                >
                  <div className="relative w-[58px] h-[58px] ml-6">
                    <ImageWithFallback
                      fallbackSrc="/assets/imgs/store-default.png"
                      src={`${IMAGE_HOST}/${element?.logo}`}
                      alt={element?.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[20px]"
                    />
                  </div>
                  <div>
                    <h2 className="w-52 text-ellipsis overflow-hidden whitespace-nowrap font-PPNeueMachina text-[21px] text-black">
                      {element?.name}
                    </h2>
                    <p className="font-InterRegular text-base text-secondary">
                      {element?.offersLength} offers
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full block lg:hidden mt-8">
            <div className="w-fit mx-auto flex items-center gap-4">
              <ArrowCircleBtn
                direction="left"
                handleClick={successBar.slide.bind(null, -400)}
              />
              <ArrowCircleBtn
                direction="right"
                handleClick={successBar.slide.bind(null, +400)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto my-20">
        <div className="w-[90%] mx-auto my-8">
          <div className="flex items-center justify-between">
            <h2 className="grow text-center lg:text-start text-black text-[30px] font-PPNeueMachina leading-10">
              Trending Products
            </h2>
            <div className="hidden lg:flex items-center gap-4">
              <ArrowCircleBtn
                direction="left"
                handleClick={todayBar.slide.bind(null, -400)}
              />
              <ArrowCircleBtn
                direction="right"
                handleClick={todayBar.slide.bind(null, +400)}
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[90%] mx-auto">
          <div
            ref={todayBar.scrollRef}
            className="overflow-x-scroll scrollbar-hide"
          >
            <div className="w-fit mx-auto flex gap-6 lg:px-0 sm:px-4">
              {products.map((element: IProductSchema, index) => (
                <ProductListItem data={element} key={`${index}`} />
              ))}
            </div>
          </div>
          <div className="w-full block lg:hidden mt-8">
            <div className="w-fit mx-auto flex items-center gap-4">
              <ArrowCircleBtn
                direction="left"
                handleClick={todayBar.slide.bind(null, -400)}
              />
              <ArrowCircleBtn
                direction="right"
                handleClick={todayBar.slide.bind(null, +400)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto my-20">
        <div className="w-[90%] mx-auto my-8">
          <div className="flex items-center justify-between">
            <h2 className="grow text-center lg:text-start text-black text-[30px] font-PPNeueMachina leading-10">
              Trending Offers and Deals
            </h2>
            <div className="hidden lg:flex items-center gap-4">
              <ArrowCircleBtn
                direction="left"
                handleClick={trendingBar.slide.bind(null, -400)}
              />
              <ArrowCircleBtn
                direction="right"
                handleClick={trendingBar.slide.bind(null, +400)}
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[90%] mx-auto">
          <div
            ref={trendingBar.scrollRef}
            className="overflow-y-scroll md:overflow-x-scroll scrollbar-hide"
          >
            <div className="w-fit mx-auto flex justify-center flex-row flex-wrap md:flex-nowrap gap-6 lg:px-0 sm:px-4">
              {trandingOffersAndDeals.map((element: IOfferSchema, index) => (
                <div
                  onClick={() => window?.open(element?.redirectUrl, '_blank')}
                  key={`top-stores${index || 0}`}
                  className="cursor-pointer w-[354px] md:w-[438px] h-[155px] rounded-[25px] border-2 border-[#e5e6e861]/20 p-4 flex flex-col justify-between"
                >
                  <div className="relative flex items-center gap-3">
                    <div className="relative w-[41px] h-[41px]">
                      <ImageWithFallback
                        fallbackSrc="/assets/imgs/store-default.png"
                        src={`${IMAGE_HOST}/${element?.storeLogo}`}
                        alt={element?.storeName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <h2 className="relative w-40 md:w-52 text-ellipsis overflow-hidden whitespace-nowrap font-PPNeueMachina text-[20px] text-black">
                      {element?.storeName}
                    </h2>
                    {element.verified ? (
                      <span className="ml-auto font-InterRegular text-[12px] text-[#EAFFF7] rounded-full bg-[#37AC82] px-2 py-1 flex items-center gap-1">
                        <svg
                          id="Group_13717"
                          data-name="Group 13717"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16.299"
                          height="12.612"
                          viewBox="0 0 16.299 12.612"
                        >
                          <path
                            id="Union_37"
                            data-name="Union 37"
                            d="M2.416,12.612,0,5.115.406,3.766h3.45L6.036,0,7.28.717,5.515,3.767c.834,0,4.629.005,4.617,0h.651L9.019.717,10.263,0l2.179,3.766h3.451L16.3,5.3l-2.416,7.312ZM3.5,11.193h9.29l2.039-6.006H1.465Zm7.6-2.427h-.8V7.138h.751c.026,0,.053,0,.08,0s.054,0,.08,0h.715v.617a.82.82,0,0,1,0,.39v.621H11.1Zm-6.733,0V7.138h.657a.874.874,0,0,1,.146-.018.833.833,0,0,1,.2.018h.621v.6a.82.82,0,0,1,0,.392v.634Z"
                            fill="#fff"
                          />
                        </svg>
                        Promoted
                      </span>
                    ) : element.salesCommission ? (
                      <span className="ml-auto font-InterRegular text-[12px] text-white rounded-full bg-black px-2 py-1 flex items-center gap-1">
                        <svg
                          id="Group_13717"
                          data-name="Group 13717"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16.299"
                          height="12.612"
                          viewBox="0 0 16.299 12.612"
                        >
                          <path
                            id="Union_37"
                            data-name="Union 37"
                            d="M2.416,12.612,0,5.115.406,3.766h3.45L6.036,0,7.28.717,5.515,3.767c.834,0,4.629.005,4.617,0h.651L9.019.717,10.263,0l2.179,3.766h3.451L16.3,5.3l-2.416,7.312ZM3.5,11.193h9.29l2.039-6.006H1.465Zm7.6-2.427h-.8V7.138h.751c.026,0,.053,0,.08,0s.054,0,.08,0h.715v.617a.82.82,0,0,1,0,.39v.621H11.1Zm-6.733,0V7.138h.657a.874.874,0,0,1,.146-.018.833.833,0,0,1,.2.018h.621v.6a.82.82,0,0,1,0,.392v.634Z"
                            fill="#fff"
                          />
                        </svg>
                        {`${
                          element.salesCommission &&
                          (element.salesCommission * 100).toPrecision(2)
                        } %`}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                  <span className="h-14 font-InterRegular text-[17px] text-black twoRowEllipsis">
                    {element?.title}
                  </span>
                  {/* <span className="font-InterRegular text-[14px] text-secondary flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.697"
                      height="9.234"
                      viewBox="0 0 12.697 9.234"
                    >
                      <path
                        id="Path_3973"
                        data-name="Path 3973"
                        d="M7.623,10.984a.927.927,0,0,1-.638-.251L4.014,7.913a.826.826,0,0,1,0-1.211.936.936,0,0,1,1.276,0L7.623,8.916,14.907,2a.936.936,0,0,1,1.276,0,.826.826,0,0,1,0,1.211L8.261,10.733A.927.927,0,0,1,7.623,10.984Z"
                        transform="translate(-3.75 -1.75)"
                        fill="#37ac82"
                      />
                    </svg>
                    Worked a few seconds ago
                  </span> */}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full sm:hidden md:block lg:hidden mt-8">
            <div className="w-fit mx-auto flex items-center gap-4">
              <ArrowCircleBtn
                direction="left"
                handleClick={trendingBar.slide.bind(null, -400)}
              />
              <ArrowCircleBtn
                direction="right"
                handleClick={trendingBar.slide.bind(null, +400)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto my-20">
        <div className="w-[90%] mx-auto my-8">
          <div className="flex items-center justify-between">
            <h2 className="grow text-center lg:text-start text-black text-[30px] font-PPNeueMachina leading-10">
              Most popular stores
            </h2>
          </div>
          <div className="flex items-center gap-8 mt-9">
            <div
              ref={categoriesBar.scrollRef}
              className="overflow-x-scroll scrollbar-hide"
            >
              <div className="min-w-fit flex gap-3">
                {categories?.map((str, i) => (
                  <button
                    className={`font-InterRegular text-sm rounded-full px-8 py-3 whitespace-nowrap ${
                      getSelectedCategory === str
                        ? 'text-white bg-black'
                        : 'text-black bg-[#F8F9FA]'
                    }`}
                    key={`button_${i}`}
                    onClick={() => setSelectedCategory(str)}
                  >
                    {str}
                  </button>
                ))}
              </div>
            </div>
            <div className="min-w-fit hidden lg:flex items-center gap-4">
              <ArrowCircleBtn
                direction="left"
                handleClick={categoriesBar.slide.bind(null, -400)}
              />
              <ArrowCircleBtn
                direction="right"
                handleClick={categoriesBar.slide.bind(null, +400)}
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[90%] mx-auto">
          <div
            ref={popularBar.scrollRef}
            className="overflow-y-scroll md:overflow-x-scroll scrollbar-hide"
          >
            <div className="w-fit mx-auto flex justify-center flex-row flex-wrap md:flex-nowrap gap-6 lg:px-0 sm:px-4">
              {getStoresByCategory?.map((element: IStoreSchema, index) => (
                <div
                  onClick={() =>
                    push(`site/${element?.domain}`, `site/${element?.domain}`)
                  }
                  key={`top-stores${index || 0}`}
                  className="cursor-pointer w-[170px] md:w-[198px] h-[229px] rounded-[25px] border-2 border-[#e5e6e861]/20 p-4 flex flex-col items-center justify-between"
                >
                  <div className="overflow-hidden relative w-[110px] h-[110px] bg-cover bg-no-repeat rounded-[25px] p-2 flex flex-col items-center justify-between">
                    <div className="absolute w-[110px] h-[110px] -mt-2">
                      <ImageWithFallback
                        fallbackSrc="/assets/imgs/store-default.png"
                        layout="fill"
                        objectFit="contain"
                        src={`${IMAGE_HOST}/${element?.logo}`}
                        alt="box logo"
                      />
                    </div>
                    <span className="relative bg-[#74849D]/50 rounded-full flex items-center gap-2 p-2 font-InterRegular text-xs text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18.11"
                        height="14.014"
                        viewBox="0 0 18.11 14.014"
                      >
                        <path
                          id="Union_37"
                          data-name="Union 37"
                          d="M2.685,14.014,0,5.684l.451-1.5H4.285L6.707,0,8.089.8,6.128,4.186c.927,0,5.144.006,5.13,0h.724L10.021.8,11.4,0l2.421,4.185h3.834l.451,1.7-2.685,8.125Zm1.209-1.577H14.216l2.266-6.674H1.628Zm8.439-2.7h-.89V7.931h.835c.029,0,.059,0,.089,0s.06,0,.089,0h.794v.686a.912.912,0,0,1,0,.434v.69h-.916Zm-7.482,0V7.931h.73a.971.971,0,0,1,.162-.02.925.925,0,0,1,.224.02h.69V8.6a.911.911,0,0,1,0,.435v.7Z"
                          fill="#fff"
                        />
                      </svg>
                      {element?.offers[0]?.valueType === 'other'
                        ? `${
                            element?.offersScore?.avgSavings
                              ? element?.offersScore?.avgSavings
                              : 'deal'
                          }`
                        : element?.offers[0]?.valueType === 'currency' ? `${
                            element?.offers[0]?.value
                              ? element?.offers[0]?.value + element?.offers[0]?.currency
                              : 'deal'
                          }`: element?.offers[0]?.valueType === 'percentage' 
                            ? `${
                              element?.offers[0]?.value
                                ? element?.offers[0]?.value + '%'
                                : 'deal'
                            }`
                            : ''}
                    </span>
                    {/* <span className="w-[26px] h-[26px] bg-[#74849D]/50 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14.479"
                        height="13.155"
                        viewBox="0 0 14.479 13.155"
                      >
                        <g
                          id="_9041831_heart_icon"
                          data-name="9041831_heart_icon"
                          transform="translate(0 -0.153)"
                          fill="none"
                        >
                          <path
                            d="M7.279,2.253c.5-2.513,4.365-2.67,6.03-1.005a4.471,4.471,0,0,1,0,6.03l-6.03,6.03-6.03-6.03a4.264,4.264,0,0,1,0-6.03C2.807-.31,6.776-.259,7.279,2.253Z"
                            stroke="none"
                          />
                          <path
                            d="M 10.38547515869141 1.153451919555664 C 10.07373523712158 1.153462409973145 8.506134986877441 1.215962409973145 8.259485244750977 2.449202537536621 L 6.298325538635254 2.449212074279785 C 6.060214996337891 1.258682250976562 4.476574897766113 1.198371887207031 4.161535263061523 1.198371887207031 C 3.281465530395508 1.198371887207031 2.415724754333496 1.495442390441895 1.955965042114258 1.955202102661133 C 1.339505195617676 2.571661949157715 1.000004768371582 3.391292572021484 1.000004768371582 4.263102531433105 C 1.000004768371582 5.134912490844727 1.339505195617676 5.95454216003418 1.955975532531738 6.57100248336792 L 7.278905391693115 11.89392375946045 L 12.58222198486328 6.590615272521973 C 13.77041053771973 5.251992225646973 13.78144073486328 3.134807586669922 12.60183525085449 1.955202102661133 C 12.10728549957275 1.460652351379395 11.25802516937256 1.15343189239502 10.38547515869141 1.153451919555664 M 10.38545894622803 0.1534538269042969 C 11.4717321395874 0.1534328460693359 12.59324741363525 0.5323953628540039 13.30894470214844 1.248092651367188 C 14.92037487030029 2.859521865844727 14.81641483306885 5.604172229766846 13.30894470214844 7.278112411499023 L 7.278905391693115 13.30814266204834 L 1.248865127563477 7.278112411499023 C -0.4162845611572266 5.612972259521484 -0.4162845611572266 2.913232803344727 1.248865127563477 1.248092651367188 C 2.806584358215332 -0.3096284866333008 6.776394844055176 -0.2594184875488281 7.278905391693115 2.253092765808105 C 7.565425872802734 0.8204832077026367 8.944396018981934 0.1534824371337891 10.38545894622803 0.1534538269042969 Z"
                            stroke="none"
                            fill="#dfe2e7"
                          />
                        </g>
                      </svg>
                    </span> */}
                  </div>
                  <span className="w-[120px] font-PPNeueMachina text-ellipsis whitespace-nowrap overflow-hidden text-center text-[17px] text-black">
                    {element.name}
                  </span>
                  <span className="font-InterRegular text-sm text-white bg-black px-3 py-1 flex items-center gap-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11.953"
                      height="11.965"
                      viewBox="0 0 11.953 11.965"
                    >
                      <path
                        id="Subtraction_19"
                        data-name="Subtraction 19"
                        d="M5.168,11.965a2.539,2.539,0,0,1-1.8-.753L.743,8.6a2.548,2.548,0,0,1,0-3.6L5.234.508A1.7,1.7,0,0,1,6.443,0H9.412a2.546,2.546,0,0,1,2.54,2.547V5.51a1.734,1.734,0,0,1-.5,1.223L6.963,11.212A2.533,2.533,0,0,1,5.168,11.965ZM8.532,1.981a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,8.532,1.981Z"
                        transform="translate(0)"
                        fill="#fff"
                      />
                    </svg>
                    {element?.offersLength}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full sm:hidden md:block mt-8">
            <div className="w-fit mx-auto flex items-center gap-4">
              <ArrowCircleBtn
                direction="left"
                handleClick={popularBar?.slide?.bind(null, -400)}
              />
              <ArrowCircleBtn
                direction="right"
                handleClick={popularBar?.slide?.bind(null, +400)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto my-20 hidden md:block">
        <div className="w-[90%] mx-auto flex items-center justify-around gap-12 flex-wrap">
          <div
            style={{
              width: howImgs[activeHowBtn].w,
              height: howImgs[activeHowBtn].h,
            }}
            className={`relative shadow-[0_30px_90px_rgba(148,145,163,0.25)]`}
          >
            {activeHowBtn === 0 && (
              <ImageWithFallback
                fallbackSrc=""
                layout="fill"
                objectFit="cover"
                src={howImgs[0].url}
                alt="box logo"
              />
            )}

            {activeHowBtn === 1 && (
              <ImageWithFallback
                fallbackSrc=""
                layout="fill"
                objectFit="cover"
                src={howImgs[1].url}
                alt="box logo"
              />
            )}

            {activeHowBtn === 2 && (
              <ImageWithFallback
                fallbackSrc=""
                layout="fill"
                objectFit="cover"
                src={howImgs[2].url}
                alt="box logo"
              />
            )}
          </div>
          <div className="flex flex-col items-start justify-center gap-8">
            <h2 className="font-PPNeueMachina text-[43px] text-black">
              {content.workBarh2a}
            </h2>
            <div className="flex flex-col items-start justify-center cursor-pointer">
              <div
                onClick={() => setActiveHowBtn(0)}
                className={`relative py-4 pl-8 border-l-2 border-[#B9B8BD]/27 ${
                  activeHowBtn >= 0
                    ? 'before:absolute before:top-0 before:-left-[3px] before:bottom-0 before:right-[calc(100%-0px)] before:bg-primary after:absolute after:bottom-0 after:-left-[6px] a after:w-[9px] after:h-[9px] after:rounded-full after:bg-primary'
                    : ''
                }`}
              >
                <h3
                  className={`font-PPNeueMachina text-[25px] ${
                    activeHowBtn === 0 ? 'text-black' : 'text-[#b1b1b1]'
                  }`}
                >
                  {content.workBarH3a}
                </h3>
                <p
                  className={`font-InterRegular text-[14px] ${
                    activeHowBtn === 0 ? 'text-[#676572]' : 'text-[#b1b1b1]'
                  }`}
                >
                  {content.workBarPa}
                </p>
              </div>
              <div
                onClick={() => setActiveHowBtn(1)}
                className={`relative py-4 pl-8 border-l-2 border-[#B9B8BD]/27 ${
                  activeHowBtn >= 1
                    ? 'before:absolute before:top-0 before:-left-[3px] before:bottom-0 before:right-[calc(100%-0px)] before:bg-primary after:absolute after:bottom-0 after:-left-[6px] a after:w-[9px] after:h-[9px] after:rounded-full after:bg-primary'
                    : ''
                }`}
              >
                <h3
                  className={`font-PPNeueMachina text-[25px] ${
                    activeHowBtn === 1 ? 'text-black' : 'text-[#b1b1b1]'
                  }`}
                >
                  {content.workBarH3b}
                </h3>
                <p
                  className={`font-InterRegular text-[14px] ${
                    activeHowBtn === 1 ? 'text-[#676572]' : 'text-[#b1b1b1]'
                  }`}
                >
                  {content.workBarPb}
                </p>
              </div>
              <div
                onClick={() => setActiveHowBtn(2)}
                className={`relative py-4 pl-8 border-l-2 border-[#B9B8BD]/27 ${
                  activeHowBtn === 2
                    ? 'before:absolute before:top-0 before:-left-[3px] before:bottom-0 before:right-[calc(100%-0px)] before:bg-primary after:absolute after:bottom-0 after:-left-[6px] a after:w-[9px] after:h-[9px] after:rounded-full after:bg-primary'
                    : ''
                }`}
              >
                <h3
                  className={`font-PPNeueMachina text-[25px] ${
                    activeHowBtn === 2 ? 'text-black' : 'text-[#b1b1b1]'
                  }`}
                >
                  {content.workBarH3c}
                </h3>
                <p
                  className={`font-InterRegular text-[14px] ${
                    activeHowBtn === 2 ? 'text-[#676572]' : 'text-[#b1b1b1]'
                  }`}
                >
                  {content.workBarPc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BanerExtChrome
        header={content.h3}
        paragraph={content.p2}
        button={content.btn1}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const userId = context?.req?.cookies[COOKIE_NAME] || null;
    const cookieReferral = context?.req?.cookies?.referral || null;
    const userTrackerId = `${userId}:${cookieReferral}`;
    const token = context?.req?.cookies?.token || null;
    const user = token ? jwt.decode(token) : null;
  
    try {
      // referrals click
      const referral = context?.query?.referral || null;
      if (referral) {
        const userAgent = context?.req?.headers['user-agent'] || null;
        const page = `referrals/click`;
        const query = `referral=${encodeURI(referral)}&userAgent=${encodeURI(userAgent)}`;
        backendApi(page, query)
          .catch((err) => {
            RollbarService.warning(`Referrals fetch click counter issue ${err?.message}`, context, err)
          })  
      }
    } catch (err) {
      RollbarService.warning(`Referrals fetch click counter issue ${err?.message}`, context, err)
    }

    const country = context.req?.cookies?.countryCode || 'US';
  
    const PAGE = 'stores';
    const QUERY = `limit=44&sessionId=${userTrackerId}&country=${country}`;
  
    const backendData: IBackendApi = await backendApi(PAGE, QUERY);
    const data = backendData?.data || null;
    if (backendData?.trackerId)
      setCookie(COOKIE_NAME, backendData?.trackerId, {
        expires: moment().add(1, 'year').toDate(),
      });
    const header = prepareHeader(language, context.locale);

    return {
      props: {
        header,
        data: data?.data || null,
        products: data?.products || [],
        user,
      },
    };  
  } catch(err) {
    RollbarService.warn(`Main page issue with message: ${err?.message}`, context, err)
  }
}

export default Index;
