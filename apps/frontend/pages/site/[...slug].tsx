import getConfig from 'next/config';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

import { COOKIE_NAME } from '../../constants/cookieName';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import backendApi from '../../utils/backendApi';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import IStoreDomainSchema from '../../interfaces/storeDomain';
import BanerExtChrome from '../../components/BanerExtChrome';
// import BoxInfo from '../../components/BoxInfo';
// import BoxInfoOffers from '../../components/BoxInfoOffers';
// import CouponsListItem from '../../components/CouponsListItem';
import CouponsListItem2 from '../../components/CouponsListItem2';
import { IFaq, IOffers, IStore, IWebPage } from '../../utils/jsonLd';
// import styles from './styles/index.module.css';
import {
  NavbarFooterContext,
  UserAvatarImageContext,
  UserBalanceContext,
} from '../../components/Layout';
// import ChromeExtBtn from '../../components/ChromeExtBtn';
// import CopyCoupon from '../../components/Modal/CopyCoupon';
import useScroll from '../../hooks/useScroll';
import ImageWithFallback from '../../components/ImgWithFallback/ImgWithFallback';
import ProductListItem from '../../components/ProductsListItem';
import IProductSchema from '../../interfaces/product';
import IUser from '../../interfaces/user';
import RollbarService from "../../services/rollbar";

interface IProps {
  header: IHeaderSchema;
  data: IStoreDomainSchema;
  products: Array<IProductSchema>;
  user: IUser | null;
}

export function Index(props: IProps) {
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  const coupon =
    router.asPath.indexOf('#') != -1 ? router.asPath.split('#')[1] : '';
  const [modal, setModal] = useState(coupon ? true : false);
  const { header, data, products, user } = props;
  const [records, setRecords] = useState([]);
  const content = getLanguage(language, router.locale).content;
  const [active, setActive] = useState([true, false, false]);

  const allOffers = data?.offers?.length || 0;
  const deals = data?.offers?.filter((item) => !item.code).length || 0;
  const coupons = allOffers - deals;
  const offer = data.offers?.filter((v) => v.code === coupon)[0];
  const [toggleFav, setToggleFav] = useState(false);
  const todayBar = useScroll({ isWheel: false });
  const { setUserBalance } = useContext(UserBalanceContext);
  const { setUserAvatarImage } = useContext(UserAvatarImageContext);

  useEffect(() => {
    setUserBalance(user?.balance || 0)
    setUserAvatarImage(user?.avatar || null)
  }, [setUserBalance, setUserAvatarImage, user])

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])

  useEffect(() => {
    setRecords(data.offers);
  }, [data.offers]);

  const reset = () => {
    setActive([true, false, false]);
    setRecords(data?.offers);
  };

  const setDeals = () => {
    setActive([false, true, false]);
    const deals = data?.offers?.filter((item) => !item.code);
    setRecords(deals);
  };

  const setCoupons = () => {
    setActive([false, false, true]);
    const coupons = data?.offers?.filter((item) => item.code);
    setRecords(coupons);
  };

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
      {/* {modal && <CopyCoupon setModal={setModal} offer={offer} />} */}
      {/*<section className="max-w-[1920px] mx-auto mt-16 mb-16 lg:mt-32 lg:mb-32">
        <div className="w-[80.9375%] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="relative border-2 border-[rgba(112,112,112,0.1)] rounded-[25px]">
              <div className="w-[127px] h-[127px] lg:w-[229px] lg:h-[229px]">
                <Image
                  className="rounded-[25px]"
                  layout="fill"
                  objectFit="cover"
                  src={`${IMAGE_HOST}/${data.store?.logo}`}
                  alt={`logo store ${data.store?.name}`}
                />
              </div>
            </div>
            <div>
              <h1 className="font-PPNeueMachina text-[30px] lg:text-[40px]">
                {data.store?.name}
              </h1>
              <p className="font-InterRegular text-[16px] lg:text-[18px] text-secondary">
                {data.store?.description}
              </p>
            </div>
          </div>
          <div className="mt-16 mb-16 flex items-start justify-center flex-wrap gap-8">
            <div className="order-2 1xl:order-1 flex justify-center xl:justify-center flex-row flex-wrap xl:flex-nowrap gap-8">
              <BoxInfoOffers
                bestDiscount={data.availableOffers?.bestDiscount}
                couponCodes={data.availableOffers?.couponCodes}
                averageSaving={data.availableOffers?.avgSavings}
                lastUpdated={data.availableOffers?.updatedAt}
                totalOffers={data.availableOffers?.totalOffers}
              />
              <BoxInfo
                header={content.similarCoupons}
                data={data?.similarCoupons}
              />
              <BoxInfo
                header={content.featuredRetailers}
                data={data?.featureRetailer}
              />
            </div>
            <div className="order-1 1xl:order-2 flex-grow flex flex-col gap-8">
              <div className="flex items-center justify-center md:justify-start flex-wrap gap-4">
                <span className="font-InterRegular text-[17px] 1xl:text-[24px] text-secondary">
                  Sort By
                </span>
                <button
                  onClick={() => reset()}
                  className={`flex font-InterRegular text-[14px] 1xl:text-[20px] ${
                    active[0]
                      ? 'bg-primary text-white'
                      : 'bg-[rgba(185,184,189,0.1)]'
                  }  p-2 pl-4 pr-4 rounded-2xl`}
                >
                  <span className="p-1 pl-3 pr-3 ">{content.all}</span>
                  <span className="p-1 pl-3 pr-3 bg-[rgba(185,184,189,0.2)] rounded-2xl">
                    {allOffers}
                  </span>
                </button>
                <button
                  onClick={() => setDeals()}
                  className={`flex font-InterRegular text-[14px] 1xl:text-[20px] ${
                    active[1]
                      ? 'bg-primary text-white'
                      : 'bg-[rgba(185,184,189,0.1)]'
                  } p-2 pl-4 pr-4 rounded-2xl`}
                >
                  <span className="p-1 pl-3 pr-3 ">{content.deals}</span>
                  <span className="p-1 pl-3 pr-3 bg-[rgba(185,184,189,0.2)] rounded-2xl">
                    {deals}
                  </span>
                </button>
                <button
                  onClick={() => setCoupons()}
                  className={`flex font-InterRegular text-[14px] 1xl:text-[20px] ${
                    active[2]
                      ? 'bg-primary text-white'
                      : 'bg-[rgba(185,184,189,0.1)]'
                  } p-2 pl-4 pr-4 rounded-2xl`}
                >
                  <span className="p-1 pl-3 pr-3 ">{content.coupons}</span>
                  <span className="p-1 pl-3 pr-3 bg-[rgba(185,184,189,0.2)] rounded-2xl">
                    {coupons}
                  </span>
                </button>
              </div>
              <div className="w-full flex flex-col gap-8">
                {(records?.length &&
                  records.map((_v, i) => (
                    <CouponsListItem key={i?.toString()} data={_v} />
                  ))) || (
                  <p className="flex items-center justify-center font-PPNeueMachina text-[24px]">
                    No offer available.
                  </p>
                )}
              </div>
            </div>
          </div>
          {!!data.store.aboutOffers && (
            <div
              className={styles.aboutStore}
              dangerouslySetInnerHTML={{ __html: data.store.aboutOffers }}
            ></div>
          )}
          {!!data.store?.faq?.length && (
            <div className="mt-8 p-6">
              <h2 className="font-PPNeueMachina font-semibold text-primary text-center text-[20px] lg:text-[30px] pb-4">
                FAQ's
              </h2>
              <hr />
              {data.store?.faq?.map((obj, i) => (
                <div className="mt-4 p-2" key={i}>
                  <h3 className="font-PPNeueMachina text-[16px] lg:text-[24px] text-black">
                    <strong>Q:</strong> {obj.question}
                  </h3>
                  <p className="mt-2 font-InterLight text-[14px] lg:text-[20px]">
                    <strong>Ans:</strong> {obj.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section> */}

      <section className="max-w-[1920px] mx-auto my-20">
        <div className="w-[90%] mx-auto border-b-[1px] border-[rgba(116,132,157,0.17)]">
          <div className="flex items-start lg:flex-row flex-col gap-[60px]">
            <div className="shrink-0 w-full md:w-[320px] h-[282px] p-6 flex flex-col justify-between rounded-[25px] shadow-[0_50px_90px_rgba(124,136,144,0.12)]">
              <div className="flex items-start justify-between">
                <div className="relative w-[80px] h-[80px]">
                  <ImageWithFallback
                    fallbackSrc="/assets/imgs/store-default.png"
                    className="rounded-[20px]"
                    layout="fill"
                    objectFit="contain"
                    src={`${IMAGE_HOST}/${data.store?.logo}`}
                    alt={`logo store ${data.store?.name}`}
                  />
                </div>
                {/* {!toggleFav ? (
                  <svg
                    onClick={() => setToggleFav(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="44.217"
                    height="44.212"
                    viewBox="0 0 44.217 44.212"
                  >
                    <g
                      id="Component_113_1"
                      data-name="Component 113 – 1"
                      transform="translate(1 1)"
                    >
                      <rect
                        id="Rectangle_931"
                        data-name="Rectangle 931"
                        width="42.217"
                        height="42.212"
                        rx="21.106"
                        fill="none"
                        stroke="rgba(177,193,201,0.19)"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        id="_9041831_heart_icon"
                        data-name="9041831_heart_icon"
                        d="M10.787,3.265c.745-3.723,6.469-3.957,8.936-1.489a6.625,6.625,0,0,1,0,8.936l-8.936,8.936L1.851,10.712a6.319,6.319,0,0,1,0-8.936C4.159-.533,10.042-.458,10.787,3.265Z"
                        transform="translate(10.25 11.819)"
                        fill="none"
                        stroke="#b1c1c9"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    onClick={() => setToggleFav(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="44.217"
                    height="44.212"
                    viewBox="0 0 44.217 44.212"
                  >
                    <g
                      id="Component_113_1"
                      data-name="Component 113 – 1"
                      transform="translate(1 1)"
                    >
                      <rect
                        id="Rectangle_931"
                        data-name="Rectangle 931"
                        width="42.217"
                        height="42.212"
                        rx="21.106"
                        stroke="#000"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        id="_9041831_heart_icon"
                        data-name="9041831_heart_icon"
                        d="M10.787,3.265c.745-3.723,6.469-3.957,8.936-1.489a6.625,6.625,0,0,1,0,8.936l-8.936,8.936L1.851,10.712a6.319,6.319,0,0,1,0-8.936C4.159-.533,10.042-.458,10.787,3.265Z"
                        transform="translate(10.25 11.819)"
                        fill="#f54a6b"
                        stroke="#f54a6b"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                )} */}
              </div>
              <div>
                <h1 className="font-PPNeueMachina text-2xl text-black oneRowEllipsis">
                  {data.store?.name}
                </h1>
                <div className="font-InterRegular text-sm flex items-start justify-between gap-4">
                  <p className="grow basis-0 text-secondary twoRowEllipsis">
                    {data.store?.categories[0]}
                  </p>
                  {data?.store?.averageConversionRate ? (
                    <span className="grow basis-0 text-primary flex items-center justify-end gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.375"
                        height="13.445"
                        viewBox="0 0 17.375 13.445"
                      >
                        <g
                          id="Group_13766"
                          data-name="Group 13766"
                          transform="translate(-4.151 -2.85)"
                        >
                          <path
                            id="Union_47"
                            data-name="Union 47"
                            d="M2.576,13.445,0,5.453.433,4.015H4.111L6.434,0,7.76.764,5.879,4.016c.89,0,4.935.006,4.922,0H11.5L9.614.764,10.94,0l2.323,4.015h3.678l.433,1.635-2.576,7.8Zm1.16-1.513h9.9l2.174-6.4H1.562Zm8.1-2.587h-.854V7.609h.8c.028,0,.056,0,.085,0s.057,0,.085,0h.762v.658a.875.875,0,0,1,0,.416v.662h-.879Zm-7.178,0V7.609h.7A.932.932,0,0,1,5.51,7.59a.887.887,0,0,1,.215.019h.662v.642a.874.874,0,0,1,0,.418v.676Z"
                            transform="translate(4.151 2.85)"
                            fill="#6563ff"
                          />
                        </g>
                      </svg>
                      Upto {(data?.store?.averageConversionRate * 100).toPrecision(
                        2
                      )}% Cashback
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <a
                href={`https://${data?.store?.domain}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-full h-14 rounded-[20px] font-PPNeueMachina text-lg text-white bg-black"
              >
                Visit store
              </a>
            </div>
            <div className="min-w-0 max-w-full">
              <h2 className="font-PPNeueMachina text-3xl">
                {`${data.store.name}'s Best Cash Back, Coupons & Deals`}
              </h2>
              <div className="mt-10 overflow-x-scroll scrollbar-hide">
                <div className="w-[520px] flex items-center gap-4">
                  <span className="font-InterRegular text-base text-secondary">
                    Sort by
                  </span>
                  <button
                    onClick={() => reset()}
                    className={`flex font-InterRegular text-sm ${
                      active[0]
                        ? 'bg-black text-white'
                        : 'bg-[rgba(185,184,189,0.1)]'
                    }  p-2 pl-4 pr-4 rounded-full`}
                  >
                    <span className="p-1 px-3 ">{content.all}</span>
                    <span className="p-1 px-5 bg-[rgba(185,184,189,0.2)] rounded-full">
                      {allOffers}
                    </span>
                  </button>
                  <button
                    onClick={() => setDeals()}
                    className={`flex font-InterRegular text-sm ${
                      active[1]
                        ? 'bg-black text-white'
                        : 'bg-[rgba(185,184,189,0.1)]'
                    } p-2 px-4 rounded-full`}
                  >
                    <span className="p-1 px-3 ">{content.deals}</span>
                    <span className="p-1 px-5 bg-[rgba(185,184,189,0.2)] rounded-full">
                      {deals}
                    </span>
                  </button>
                  <button
                    onClick={() => setCoupons()}
                    className={`flex font-InterRegular text-sm ${
                      active[2]
                        ? 'bg-black text-white'
                        : 'bg-[rgba(185,184,189,0.1)]'
                    } p-2 px-4 rounded-full`}
                  >
                    <span className="p-1 px-3 ">{content.coupons}</span>
                    <span className="p-1 px-5 bg-[rgba(185,184,189,0.2)] rounded-full">
                      {coupons}
                    </span>
                  </button>
                </div>
              </div>
              <div className="mt-9 flex flex-col gap-7">
                {(records?.length &&
                  records.map((item, i) => (
                    <CouponsListItem2
                      data={item}
                      key={`cli2${i}`}
                      store={data.store}
                    />
                  ))) || (
                  <span className="font-PPNeueMachina text-2xl text-secondary">
                    No offer available.
                  </span>
                )}
              </div>
              <div
                className="mt-9 overflow-x-scroll scrollbar-hide"
                ref={todayBar.scrollRef}
              >
                <div className="w-fit mx-auto flex gap-6 lg:px-0 sm:px-4">
                  {products.map((element, index) => (
                    <ProductListItem data={element} key={`${index}`} />
                  ))}
                </div>
              </div>
              {products?.length > 0 && (
                <div className="w-full block my-9">
                  <div className="w-fit mx-auto">
                    <button
                      onClick={() => todayBar.slide(-400)}
                      className="bg-[#fafafa] w-12 h-12 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19.375"
                        height="20.492"
                        viewBox="0 0 19.375 20.492"
                        className="mx-auto"
                      >
                        <g
                          id="_8666600_arrow_left_icon"
                          data-name="8666600_arrow_left_icon"
                          transform="translate(1 1.414)"
                        >
                          <line
                            id="Line_355"
                            data-name="Line 355"
                            x1="17.375"
                            transform="translate(0 9.1)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            id="Path_3716"
                            data-name="Path 3716"
                            d="M13.832,22.664,5,13.832,13.832,5"
                            transform="translate(-5 -5)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </g>
                      </svg>
                    </button>
                    <button
                      onClick={() => todayBar.slide(+400)}
                      className="bg-[#fafafa] w-12 h-12 rounded-full ml-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19.375"
                        height="20.492"
                        viewBox="0 0 19.375 20.492"
                        className="mx-auto"
                      >
                        <g
                          id="_8666600_arrow_left_icon"
                          name="8666600_arrow_left_icon"
                          transform="translate(1 1.414)"
                        >
                          <line
                            id="Line_355"
                            name="Line 355"
                            x2="17.375"
                            transform="translate(0 9.1)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            id="Path_3716"
                            data-name="Path 3716"
                            d="M5,22.664l8.832-8.832L5,5"
                            transform="translate(3.543 -5)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto my-20">
        <div className="w-[90%] mx-auto">
          <div className="flex items-start md:flex-row flex-col gap-[60px]">
            <div className="shrink-0 w-full md:w-[320px] flex flex-col gap-8">
              {data?.store?.description ? (
                <>
                  <h2 className="font-PPNeueMachina text-3xl">
                    More Information About {data?.store?.name}
                  </h2>
                  <p className="font-InterRegular text-xs p-6 rounded-[25px] shadow-[0_50px_90px_rgba(124,136,144,0.12)]">
                    {data?.store?.description}
                  </p>
                </>
              ) : (
                ''
              )}
              <div className="p-6 rounded-[25px] shadow-[0_50px_90px_rgba(124,136,144,0.12)] flex flex-col gap-6">
                <h2 className="font-PPNeueMachina text-[22px]">
                  About this store
                </h2>
                <div className="grow flex flex-col gap-5 [&>div]:flex [&>div]:items-center [&>div]:justify-between">
                  {data.availableOffers?.bestDiscount ? (
                    <div className="font-InterRegular text-base">
                      <h3 className="text-secondary">Best Discount:</h3>
                      <p>{data.availableOffers?.bestDiscount}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  {data.availableOffers?.couponCodes &&
                  parseInt(data.availableOffers?.couponCodes) > 0 ? (
                    <div className="font-InterRegular text-base">
                      <h3 className="text-secondary">Coupon Codes:</h3>
                      <p>{data.availableOffers?.couponCodes}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  {data.availableOffers?.totalOffers &&
                  data.availableOffers?.totalOffers > 0 ? (
                    <div className="font-InterRegular text-base">
                      <h3 className="text-secondary">Total Offers:</h3>
                      <p>{data.availableOffers?.totalOffers}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  {data.availableOffers?.avgSavings ? (
                    <div className="font-InterRegular text-base">
                      <h3 className="text-secondary">Average Saving:</h3>
                      <p>{data.availableOffers?.avgSavings}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="font-InterRegular text-base">
                    <h3 className="text-secondary">Last Updated:</h3>
                    <p>
                      {moment(data.availableOffers.updatedAt).format(
                        'YYYY-MM-DD'
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {data?.similarCoupons.length > 0 ? (
                <div className="p-6 rounded-[25px] shadow-[0_50px_90px_rgba(124,136,144,0.12)] flex flex-col gap-6">
                  <h2 className="font-PPNeueMachina text-[22px]">
                    Similar stores
                  </h2>
                  <div className="grow flex flex-col gap-5 [&>div]:flex [&>div]:items-center [&>div]:gap-4">
                    {data?.similarCoupons.map((item, i) => (
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/site/${item.domain}`,
                            `/site/${item.domain}`
                          )
                        }
                        key={`similar_${i}`}
                      >
                        <div className="relative w-[42px] h-[42px]">
                          <ImageWithFallback
                            fallbackSrc="/assets/imgs/store-default.png"
                            className="rounded-[12px]"
                            layout="fill"
                            objectFit="cover"
                            src={`${IMAGE_HOST}/${item.logo}`}
                            alt={`logo store ${item.name}`}
                          />
                        </div>
                        <h3 className="font-InterRegular text-base">
                          {item.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            {!!data.store?.faq?.length && (
              <div className="grow">
                <div className="p-12 rounded-[25px] shadow-[0_50px_90px_rgba(124,136,144,0.12)] flex flex-col gap-9">
                  <h2 className="font-PPNeueMachina text-3xl">
                    Frequently Asked Questions
                  </h2>
                  {data.store?.faq?.map((item, i) => (
                    <div key={`faq_${i}`}>
                      <h4 className="font-InterMedium text-lg">
                        {item.question}
                      </h4>
                      <p className="font-InterRegular text-xs text-[#3F4958]">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <BanerExtChrome
        header={content.h3}
        paragraph={content.p1}
        button={content.btn1}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const userId = context?.req?.cookies[COOKIE_NAME] || null;
    const referral = context.req?.cookies?.referral || null;
    const userTrackerId = `${userId}:${referral}`;
  
    const token = context?.req?.cookies?.token || null;
    const user = token ? jwt.decode(token) : null;
  
    const country = context.req?.cookies?.countryCode || 'US';
  
    const slug: string = context?.params?.slug[0] as string;
    const PAGE = `stores/${slug}`;
    const QUERY = `sessionId=${userTrackerId}&country=${country}`;
  
    const dataFromApi = await backendApi(PAGE, QUERY);
    if(dataFromApi?.trackerId) setCookie(COOKIE_NAME,dataFromApi?.trackerId,{expires:moment().add(1,'year').toDate()});
  
    if (dataFromApi?.status > 300) {
      return context?.res?.redirect('/404');
    }
    if (dataFromApi?.status >= 500) {
      return context?.res?.redirect('/500');
    }
    const data = dataFromApi?.data?.data as IStoreDomainSchema;
  
    const headerObject = language;
  
    const offers: IOffers = {
      makesOffer: data?.offers?.map((item) => ({
        validThrough: item.validDate,
        url: `${headerObject[0].canonicalLink}/${item.domain}`,
        name: item.storeName,
        description: item.description,
      })),
    };
  
    const store: IStore = {
      sameAs: [],
      image: `${headerObject[0].canonicalLink.replace(/\/site/, '')}/${
        data?.store?.logo
      }`,
      name: data?.store?.name,
      description: data?.store?.description,
      makesOffer: offers.makesOffer,
    };
  
    const webPage: IWebPage = {
      headline: data.store?.name,
      description: headerObject[0].description || null,
      url: `${headerObject[0].canonicalLink}/${data.store?.domain}`,
      image: `${headerObject[0].canonicalLink.replace(/\/site/, '')}/${
        data.store?.logo
      }`,
      mainEntity: { ...store },
    };
  
    let faq: IFaq;
    if (data.store?.faq) {
      faq = {
        mainEntity: data.store?.faq?.map((item) => ({
          acceptedAnswer: {
            text: item.answer,
          },
          name: item.question,
        })),
      };
    }
  
    headerObject[0]['jsonld'] = { webpage: webPage, faq };
  
    const header = prepareHeader(headerObject, context.locale);
    header.title = `${data.store?.name} ${header?.title}`;
    header.description = data.store?.description || null;
    header.canonicalLink = `${header.canonicalLink}/${data.store?.domain}`;
    header.openGraph.ogUrl = header.canonicalLink;
    header.keyWords = `${header.keyWords}, ${data.store?.name}`;
    header.openGraph.ogImage = `${headerObject[0].canonicalLink.replace(
      /\/site/,
      ''
    )}/${data.store?.logo}`;
  
    return {
      props: {
        header,
        data,
        products: dataFromApi?.data?.products || [],
        user,
      },
    };  
  } catch(err) {
    RollbarService.error(`Can't build site, ${err?.message}, stack: ${err?.stack}`, context?.req);
  }
}

export default Index;
