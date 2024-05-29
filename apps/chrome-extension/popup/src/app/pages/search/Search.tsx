import {
  Generic,
  IProduct,
  IStore,
  PopupBroker,
  To,
} from '@monorepo/chrome-extension/msg-bridge';
import { useEffect } from 'react';
import { SearchResults } from './SearchResults/SearchResults';
import { TitleBar } from './TitleBar/TitleBar';
import styles from './index.module.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentRadioValue,
  searchPopularProducts,
  searchPopularStores,
  searchProducts,
  searchStore,
  searchText,
} from '../../recoil';
import Tabs from '../../components/Tabs/Tabs';
import { SortBy } from '../../enums/sort-by.enum';
import _ from 'lodash';
import moment from 'moment';
import { Toast } from '../../components/Toast';
import { ToastMsg } from '../../constants/messages';
import { onSearched } from '../../constants/events';

export function Search() {
  const [getStores, setStores] = useRecoilState(searchPopularStores);
  const [getSearchedStores, setSearchedStores] = useRecoilState(searchStore);
  const setSearchedProducts = useSetRecoilState(searchProducts);
  const setProducts = useSetRecoilState(searchPopularProducts);
  const [getCurrentRadioValue] = useRecoilState(currentRadioValue);
  const [searchTxt] = useRecoilState(searchText);

  useEffect(() => {
    PopupBroker.dispatch(Generic.GetStores, null, To.Background, true)
      ?.then((response: IStore[]) => {
        setStores(handleSort(response));
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
    if (searchTxt !== '') {
      PopupBroker.dispatch(
        Generic.GetStoresBySearchText,
        searchTxt,
        To.Background,
        true
      )
        ?.then((response: IStore[]) => {
          setSearchedStores(handleSort(response));
        })
        .catch(() => {
          setSearchedStores([] as IStore[]);
        })
        .finally(() => {
          onSearched(searchTxt);
        });
      PopupBroker.dispatch(
        Generic.GetProductsBySearchText,
        searchTxt,
        To.Background,
        true
      )
        ?.then((response: IProduct[]) => {
          setSearchedProducts(response);
        })
        .catch(() => {
          setSearchedProducts([] as IProduct[]);
        });
    } else {
      setSearchedProducts([] as IProduct[]);
      setSearchedStores([] as IStore[]);
    }
  }, [searchTxt]);

  const handleSort = (stores: IStore[]): IStore[] => {
    const arr = [...stores];
    switch (getCurrentRadioValue) {
      case SortBy.Popular:
        // ascending order
        return arr.sort((a, b) => a.priority - b.priority);
      case SortBy.Deals:
        // descending order
        return arr.sort((a, b) => b.offers.length - a.offers.length);
      case SortBy.Recently:
        // ascending order
        return arr.sort(
          (a, b) =>
            moment(a.offersScore.updatedAt).unix() -
            moment(b.offersScore.updatedAt).unix()
        );
      case SortBy.Savings:
        // descending order
        return arr.sort(
          (a, b) =>
            (+b.offersScore.bestDiscount?.replace(/\D/g, '') || 0) -
            (+a.offersScore.bestDiscount?.replace(/\D/g, '') || 0)
        );
      default:
        return stores;
    }
  };

  useEffect(() => {
    if (getSearchedStores.length) {
      setSearchedStores(handleSort(getSearchedStores));
    } else if (getStores.length) {
      setStores(handleSort(getStores));
    }
  }, [getCurrentRadioValue, !!getSearchedStores.length]);

  return (
    <div className={styles['container']}>
      <TitleBar />
      <SearchResults />
      <Tabs />
    </div>
  );
}
