import { IStore } from '@monorepo/chrome-extension/msg-bridge';
import { environment } from '../../../../environments/environment';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { homeStores } from '../../../recoil';
import useScroll from '../../../hooks/useScroll';
import ImgWithFallback from '../../../components/ImgWithFallback/ImgWithFallback';
import { onClickPopularStore } from '../../../constants/events';

export function PopularStores() {
  const { slide, scrollRef } = useScroll();
  const stores = useRecoilValue(homeStores).slice(0, 10);

  return (
    <div className={styles['container']}>
      <div className={styles['bgBlack']}></div>
      <div className={styles['topBar']}>
        <h2 className={styles['title']}>
          {chrome.i18n.getMessage('homePageTitle2')}
        </h2>
        <Link className={styles['viewLink']} to="/search">
          {chrome.i18n.getMessage('homePageAnchorTitle')}
        </Link>
      </div>
      <div className="relative">
        <button
          className="absolute rotate-180 w-8 h-8 backdrop-blur-sm bg-white-0/30 rounded-full flex items-center justify-center ml-4 mt-[51px] z-10"
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
          className="relative scrollbar-hide overflow-x-scroll"
        >
          <div className={styles['cards']}>
            {stores.map((store: IStore) => (
              <div className={styles['card']} key={store.id}>
                <ImgWithFallback
                  className={styles['cardCircleImg']}
                  src={`${environment.IMAGE_HOST_CDN}/${store.logo}`}
                  fallback={'/assets/png/store-default.png'}
                  alt={store.name}
                />
                <Link
                  onClick={() =>
                    onClickPopularStore(
                      store.name,
                      store.categories
                    )
                  }
                  to={`/store/${store.domain}`}
                  className={`oneRowEllipsis ${styles['cardTitle']}`}
                >
                  {store.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute w-8 h-8 backdrop-blur-sm bg-white-0/30 rounded-full flex items-center justify-center mr-4 mt-[-77px] right-0"
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
    </div>
  );
}
