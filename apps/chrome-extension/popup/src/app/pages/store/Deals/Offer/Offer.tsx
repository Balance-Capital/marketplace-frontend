import { IOffer, IStore } from '@monorepo/chrome-extension/msg-bridge';
import CopiedCode from '../../../../components/CopiedCode/CopiedCode';
import styles from './index.module.css';
import DealBtn from '../../../../components/DealBtn/DealBtn';
import { onClickStoreDeal } from '../../../../constants/events';

export default function Offer({
  offer,
  store,
}: {
  offer: IOffer;
  store: IStore;
}) {
  return (
    <div className={styles['card']}>
      <h3 className="twoRowEllipsis">{offer.description}</h3>
      <span className="oneRowEllipsis">{offer.description}</span>
      {offer.verified ? (
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.934"
            height="10.402"
            viewBox="0 0 13.934 10.402"
          >
            <path
              id="Path_3973"
              data-name="Path 3973"
              d="M4.5,7.869l3.222,3.222L16.313,2.5"
              transform="translate(-3.439 -1.439)"
              fill="none"
              stroke="#37ac82"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              fillRule="evenodd"
            />
          </svg>
          <span className="font-InterRegular text-sm text-secondary">
            Verified
          </span>
        </div>
      ) : null}
      <div
        onClick={() =>
          onClickStoreDeal(store.name, store.categories, offer.title)
        }
      >
        {offer.code ? (
          <CopiedCode code={offer.code} redirectUrl={offer.redirectUrl} />
        ) : (
          <DealBtn redirectUrl={offer.redirectUrl} />
        )}
      </div>
    </div>
  );
}
