import { IStore } from '@monorepo/chrome-extension/msg-bridge';
import { Link } from 'react-router-dom';
import { environment } from '../../../environments/environment';
import ImgWithFallback from '../ImgWithFallback/ImgWithFallback';
import styles from './index.module.css';
import { onClickStore } from '../../constants/events';

export default function StoreCard({ store }: { store: IStore }) {
  return (
    <div className={styles['card']}>
      <ImgWithFallback
        src={`${environment.IMAGE_HOST_CDN}/${store.logo}`}
        fallback={'/assets/png/store-default.png'}
        alt={store.name}
        className="object-contain"
      />
      <Link
        onClick={() =>
          onClickStore(store.name, store.categories)
        }
        to={`/store/${store.domain}`}
        className={`oneRowEllipsis ${styles['cardTitle']}`}
      >
        {store.name}
      </Link>
      <span className={styles['badge']}>
        <svg
          id="Group_12516"
          name="Group 12516"
          xmlns="http://www.w3.org/2000/svg"
          width="9.294"
          height="9.304"
          viewBox="0 0 9.294 9.304"
        >
          <path
            id="Subtraction_19"
            name="Subtraction 19"
            d="M4.019,9.3a1.974,1.974,0,0,1-1.4-.585L.578,6.684a1.982,1.982,0,0,1,0-2.8L4.07.395A1.32,1.32,0,0,1,5.01,0H7.319A1.98,1.98,0,0,1,9.294,1.98v2.3a1.348,1.348,0,0,1-.39.951L5.415,8.719A1.969,1.969,0,0,1,4.019,9.3ZM6.635,1.541a.934.934,0,1,0,.93.934A.934.934,0,0,0,6.635,1.541Z"
            fill="#fff"
          />
        </svg>
        {store?.offersLength}
      </span>
    </div>
  );
}
