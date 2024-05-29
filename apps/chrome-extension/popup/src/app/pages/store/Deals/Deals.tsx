import { IOffer, IStore } from '@monorepo/chrome-extension/msg-bridge';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { singleStore, storeOffers } from '../../../recoil';
import Badge from './Badge/Badge';
import styles from './index.module.css';
import Offer from './Offer/Offer';

export default function Deals() {
  const store = useRecoilValue<IStore>(singleStore);
  const offers = useRecoilValue<IOffer[]>(storeOffers);
  const codes = offers.filter((offer) => !!offer.code);
  const deals = offers.filter((offer) => !offer.code);

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedOffers, setSelectedOffers] = useState<IOffer[]>(offers);

  const badges = [
    {
      label: 'All',
      count: offers.length,
    },
    {
      label: 'Codes',
      count: codes.length,
    },
    {
      label: 'Deals',
      count: deals.length,
    },
  ];

  useEffect(() => {
    if (selectedFilter === 'All') {
      setSelectedOffers(offers);
    } else if (selectedFilter === 'Codes') {
      setSelectedOffers(codes);
    } else {
      setSelectedOffers(deals);
    }
  }, [selectedFilter]);

  return (
    <div>
      <h2 className={styles['title']}>{store.name}</h2>
      {store.averageConversionRate ? (
        <p className="bg-black font-InterRegular text-sm text-primary px-4">
          <span className="bg-primary/20 p-2 rounded-md">
            Upto {(store.averageConversionRate * 100).toPrecision(2)}% Cashback
          </span>
        </p>
      ) : null}
      <div className={styles['filterBar']}>
        {badges.map((obj, i) => (
          <Badge
            key={i}
            count={obj.count}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            label={obj.label}
          />
        ))}
      </div>
      <div
        className={`scrollbar-hide ${styles['container']} ${
          store.averageConversionRate ? 'h-[336px]' : 'h-[356px]'
        }`}
      >
        <div>
          {selectedOffers.length ? (
            selectedOffers.map((offer) => (
              <Offer key={offer.id} offer={offer} store={store} />
            ))
          ) : (
            <h3 className={styles['storeNoOffer']}>
              {chrome.i18n.getMessage('storeNoOffer')}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
