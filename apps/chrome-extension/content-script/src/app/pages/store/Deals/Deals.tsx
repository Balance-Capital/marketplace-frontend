import { IOffer, IStore } from '@monorepo/chrome-extension/msg-bridge';
import Badge from './Badge/Badge';
import Offer from './Offer/Offer';
import { Dispatch, SetStateAction, useEffect } from 'react';

export default function Deals({
  selectedFilter,
  setSelectedFilter,
  selectedOffers,
  setSelectedOffers,
  store,
  offers,
}: {
  store: IStore;
  offers: IOffer[];
  selectedFilter: string;
  setSelectedFilter: Dispatch<SetStateAction<string>>;
  selectedOffers: IOffer[];
  setSelectedOffers: Dispatch<SetStateAction<IOffer[]>>;
}) {
  const codes = offers.filter((offer) => !!offer.code);
  const deals = offers.filter((offer) => !offer.code);

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
      <h2 className="bg-black font-PPNeueMachina text-xl text-white-0 p-4 text-ellipsis whitespace-nowrap overflow-hidden">
        {store.name}
      </h2>
      <div className="flex items-center justify-start gap-6 px-4 bg-black font-InterRegular text-white-0">
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
      <div className={`scrollbar-hide h-[412px] overflow-y-scroll`}>
        <div className="flex flex-col gap-4 p-4">
          {selectedOffers.length ? (
            selectedOffers.map((offer) => (
              <Offer key={offer.id} offer={offer} />
            ))
          ) : (
            <h3 className="font-InterRegular text-base text-secondary text-center p-4">
              {chrome.i18n.getMessage('storeNoOffer')}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
