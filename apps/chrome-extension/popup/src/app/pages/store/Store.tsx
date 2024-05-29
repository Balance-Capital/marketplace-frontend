import {
  Generic,
  IOffer,
  IStore,
  PopupBroker,
  To,
} from '@monorepo/chrome-extension/msg-bridge';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import LoaderImg from '../../components/LoaderImg/LoaderImg';
import Tabs from '../../components/Tabs/Tabs';
import { singleStore, storeLoader, storeOffers } from '../../recoil';
import Deals from './Deals/Deals';
import styles from './index.module.css';
import { TitleBar } from './TitleBar/TitleBar';
import { Toast } from '../../components/Toast';
import { ToastMsg } from '../../constants/messages';

export function Store() {
  const setStore = useSetRecoilState<IStore>(singleStore);
  const setOffers = useSetRecoilState<IOffer[]>(storeOffers);
  const [isLoading, setIsLoading] = useRecoilState(storeLoader);
  const { domain } = useParams();

  useEffect(() => {
    setStore({} as IStore);
    setOffers([] as IOffer[]);
    setIsLoading(true);
    PopupBroker.dispatch(Generic.GetStore, domain, To.Background, true)
      ?.then((response: { store: IStore; offers: IOffer[] }) => {
        setStore(response.store);
        setOffers(response.offers);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.status === 401) {
          Toast.error(ToastMsg.TOKEN_EXPIRED);
        }
      });
  }, []);

  return (
    <div className={styles['container']}>
      {isLoading ? (
        <div className={styles['loader']}>
          <LoaderImg />
        </div>
      ) : (
        <>
          <TitleBar />
          <Deals />
          <Tabs />
        </>
      )}
    </div>
  );
}
