import {
  Generic,
  IProduct,
  IStore,
  PopupBroker,
  Segment,
  To,
} from '@monorepo/chrome-extension/msg-bridge';
import { useEffect } from 'react';
import { TitleBar } from './TitleBar/TitleBar';
import { PopularStores } from './PopularStores/PopularStores';
import { TodayDeals } from './TodayDeals/TodayDeals';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  homeProducts,
  homeStores,
  selectedCategory,
  storesByCategory,
  storesCategories,
} from '../../recoil';
import styles from './index.module.css';
import LoaderImg from '../../components/LoaderImg/LoaderImg';
import Tabs from '../../components/Tabs/Tabs';
import { Link } from 'react-router-dom';
import StoreCard from '../../components/StoreCard/StoreCard';
import useScroll from '../../hooks/useScroll';
import { TrendingDeals } from './TrendingDeals/TrendingDeals';
import { Toast } from '../../components/Toast';
import { ToastMsg } from '../../constants/messages';

export function Home() {
  const { slide, scrollRef } = useScroll();
  const [stores, setStores] = useRecoilState(homeStores);
  const setProducts = useSetRecoilState(homeProducts);
  const [getSelectedCategory, setSelectedCategory] =
    useRecoilState(selectedCategory);
  const [getStoresByCategory, setStoresByCategory] =
    useRecoilState(storesByCategory);
  const categories = useRecoilValue(storesCategories);

  useEffect(() => {
    PopupBroker.dispatch(Generic.GetStores, null, To.Background, true)
      ?.then((response: IStore[]) => {
        setStores(response);
      })
      .catch((error) => {
        if (error.status === 401) {
          Toast.error(ToastMsg.TOKEN_EXPIRED);
        }
      });
    PopupBroker.dispatch(Generic.GetProducts, null, To.Background, true)?.then(
      (response: IProduct[]) => {
        setProducts(response);
      }
    );
  }, []);

  useEffect(() => {
    if (categories.length) setSelectedCategory(categories[0]);
  }, [categories]);

  useEffect(() => {
    if (getSelectedCategory !== '') {
      setStoresByCategory(
        stores.filter((store) =>
          store?.categories?.includes(getSelectedCategory)
        )
      );
    }
  }, [getSelectedCategory]);

  const onClickCategory = (name: string) => {
    setSelectedCategory(name);
    chrome.storage.local.get([Generic.UserInfo], function (result) {
      if (Object.keys(result).length && result[Generic.UserInfo]) {
        PopupBroker.dispatch(
          Generic.PostSegment,
          {
            url: Segment.TRACK_API,
            info: {
              userId: result[Generic.UserInfo]?.userId,
              event: Segment.CATEGORY_CLICKED_EVENT,
              properties: {
                storeCategory: getSelectedCategory,
              },
            },
          },
          To.Background,
          false
        );
      }
    });
  };

  return (
    <div className={styles['container']}>
      {stores.length ? (
        <>
          <TitleBar />
          <div className="h-[480px] overflow-y-auto scrollbar-hide">
            <PopularStores />
            <TodayDeals />
            <TrendingDeals />
            <div className="p-4 mt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-PPNeueMachina text-xl">
                  {chrome.i18n.getMessage('homePageTitle4')}
                </h2>
                <Link
                  className="font-InterRegular text-sm text-secondary"
                  to="/search"
                >
                  {chrome.i18n.getMessage('homePageAnchorTitle')}
                </Link>
              </div>
              <div className="relative">
                <button
                  className="absolute rotate-180 w-8 h-8 backdrop-blur-sm bg-white-0/30 rounded-full flex items-center justify-center ml-2 z-10"
                  onClick={() => slide(-200)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13.436"
                    height="10.273"
                    viewBox="0 0 13.436 10.273"
                  >
                    <g
                      id="Group_13792"
                      name="Group 13792"
                      transform="translate(0.625 0.884)"
                    >
                      <line
                        id="Line_1"
                        name="Line 1"
                        x2="12.186"
                        transform="translate(0 4.187)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.25"
                      />
                      <path
                        id="Path_2922"
                        name="Path 2922"
                        d="M5,13.505,9.253,9.253,5,5"
                        transform="translate(2.923 -5)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.25"
                      />
                    </g>
                  </svg>
                </button>
                <div
                  ref={scrollRef}
                  className="mt-4 scrollbar-hide overflow-x-scroll"
                >
                  <div className="flex items-center gap-2 scrollbar-hide">
                    {categories.map((str, i) => (
                      <button
                        onClick={() => onClickCategory(str)}
                        className={`cursor-pointer whitespace-nowrap px-6 py-2 font-PPNeueMachina text-xs rounded-full ${
                          getSelectedCategory === str
                            ? 'bg-black text-white-0'
                            : 'bg-white-50'
                        }`}
                        key={i}
                      >
                        <span>{str}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="absolute w-8 h-8 backdrop-blur-sm bg-white-0/30 rounded-full  flex items-center justify-center mr-2 mt-[-32px] right-0"
                  onClick={() => slide(+200)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13.436"
                    height="10.273"
                    viewBox="0 0 13.436 10.273"
                  >
                    <g
                      id="Group_13792"
                      name="Group 13792"
                      transform="translate(0.625 0.884)"
                    >
                      <line
                        id="Line_1"
                        name="Line 1"
                        x2="12.186"
                        transform="translate(0 4.187)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.25"
                      />
                      <path
                        id="Path_2922"
                        name="Path 2922"
                        d="M5,13.505,9.253,9.253,5,5"
                        transform="translate(2.923 -5)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.25"
                      />
                    </g>
                  </svg>
                </button>
              </div>
              <div className="mt-4 flex items-center justify-around flex-wrap gap-4">
                {getStoresByCategory.map((store, i) => (
                  <StoreCard store={store} key={i} />
                ))}
              </div>
            </div>
          </div>
          <Tabs />
        </>
      ) : (
        <div className={styles['loader']}>
          <LoaderImg />
        </div>
      )}
    </div>
  );
}
