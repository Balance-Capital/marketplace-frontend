import { useEffect, useState } from 'react';
import {
  ContentBroker,
  Generic,
  IOffer,
  IStore,
} from '@monorepo/chrome-extension/msg-bridge';
import { getDomainName } from '../../helpers';
import { TitleBar } from './TitleBar/TitleBar';
import Deals from './Deals/Deals';
import { IMG_PATHS } from '../../constants/constants';
// import DiscountPopup from '../../components/DiscountPopup/DiscountPopup';
// import CheckOutModal from '../../components/Modals/CheckOutModal/CheckOutModal';

export default function Store() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [store, setStore] = useState<IStore>({} as IStore);
  const [offers, setOffers] = useState<IOffer[]>([] as IOffer[]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedOffers, setSelectedOffers] = useState<IOffer[]>(offers);
  // const [toggleDiscount, setToggleDiscount] = useState(false);
  // const [toggleCheckout, setToggleCheckout] = useState(true);
  const [codes, setCodes] = useState<IOffer[]>(offers);

  useEffect(() => {
    ContentBroker.dispatch(Generic.GetStore, getDomainName(), true)?.then(
      (response: { store: IStore; offers: IOffer[] }) => {
        setStore(response.store);
        setOffers(response.offers);
        ContentBroker.dispatch(
          Generic.ToolBarIconAndBadgeValue,
          {
            icon16: IMG_PATHS.icon16_active,
            offersCount: response.offers.length.toString(),
          },
          false
        );
      }
    );
  }, []);

  useEffect(() => {
    ContentBroker.on(Generic.CheckStore, (details: any) => {
      const domainName = getDomainName();
      if (Array.isArray(offers) && offers.length) {
        details.sendResponse({ success: { domainName } });
      }
    });
    setCodes((prev) => offers.filter((offer) => !!offer.code));
    // if (codes.length) {
    //   setToggleDiscount(true);
    // }
  }, [offers]);

  return (
    <div>
      {Object.keys(store).length ? (
        <>
          <div
            className="fixed right-0 top-[calc(50%-24px)] bg-black rounded-l-[14px] p-[10px] w-[48px] transition-all duration-300 hover:w-[61px]
        hover:bg-gradient-to-br from-[#6563ff] to-[#333280] [&>div]:hover:bg-black"
            onClick={() => setIsActive(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31.286"
              height="24.211"
              viewBox="0 0 31.286 24.211"
            >
              <path
                id="Union_63"
                data-name="Union 63"
                d="M4.638,24.211,0,9.819.78,7.23H7.4L11.586,0l2.388,1.376L10.586,7.232c1.6,0,8.886.01,8.863,0H20.7L17.312,1.376,19.7,0l4.183,7.23h6.623l.78,2.944L26.648,24.211Zm2.088-2.725H24.559l3.915-11.53H2.813Zm14.58-4.658H19.769V13.7h1.442c.05,0,.1-.007.153-.007s.1,0,.153.007h1.372v1.185a1.575,1.575,0,0,1,0,.749v1.191H21.306Zm-12.925,0V13.7H9.643a1.678,1.678,0,0,1,.279-.035,1.6,1.6,0,0,1,.388.035H11.5v1.157a1.575,1.575,0,0,1,0,.752v1.217Z"
                fill="#f3f3f4"
              />
            </svg>
            <div className="absolute mt-[-42px] ml-[-16px] text-[10px] p-[4px_7px] leading-none rounded-full bg-[#6563FF] text-white-0">
              {offers.length}
            </div>
          </div>
          {/* {toggleDiscount ? (
            <DiscountPopup
              storeLogo={store.logo}
              storeName={store.name}
              codes={codes}
              setToggleRef={setToggleDiscount}
            />
          ) : null}
          {toggleCheckout ? (
            <CheckOutModal
              storeLogo={store.logo}
              storeName={store.name}
              setModal={setToggleCheckout}
            />
          ) : null} */}
        </>
      ) : null}
      {isActive ? (
        <div className="fixed w-[362px] h-[600px] bg-white-100 right-3 top-3 rounded-[25px] overflow-hidden">
          <TitleBar
            storeLogo={store.logo}
            storeName={store.name}
            setToggleRef={setIsActive}
          />
          <Deals
            offers={offers}
            store={store}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedOffers={selectedOffers}
            setSelectedOffers={setSelectedOffers}
          />
        </div>
      ) : null}
    </div>
  );
}
