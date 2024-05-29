import { useEffect, useState } from 'react';
import Tabs from '../../components/Tabs/Tabs';
import { TitleBar } from './TitleBar/TitleBar';
import {
  Generic,
  IStore,
  PopupBroker,
  To,
} from '@monorepo/chrome-extension/msg-bridge';
import { ToastMsg } from '../../constants/messages';
import { Toast } from '../../components/Toast';
import StoreCard from '../../components/StoreCard/StoreCard';
import LoaderImg from '../../components/LoaderImg/LoaderImg';

export default function Stores() {
  const [getStores, setStores] = useState<IStore[]>([]);
  const [activeAlphabet, setActiveAlphabet] = useState<string>('a');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    PopupBroker.dispatch(
      Generic.GetStoresByAlphabet,
      activeAlphabet.toLowerCase(),
      To.Background,
      true
    )
      ?.then((response: IStore[]) => {
        setStores(response);
      })
      .catch((error) => {
        if (error.status === 401) {
          Toast.error(ToastMsg.TOKEN_EXPIRED);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeAlphabet]);

  return (
    <div className="w-[362px] h-[600px] bg-white-100">
      <TitleBar />
      <div className="flex justify-between">
        <div className="h-[480px] w-[320px] overflow-y-auto scrollbar-hide">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <LoaderImg />
            </div>
          ) : (
            <div className="flex items-center justify-around flex-wrap gap-2 my-2">
              {getStores.map((store, i) => (
                <StoreCard store={store} key={i} />
              ))}
            </div>
          )}
        </div>
        <div className="h-[480px] overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-2 my-2 mx-1">
            {Array(26)
              .fill(0)
              .map((_v, i) => (
                <button
                  onClick={() =>
                    setActiveAlphabet(
                      `${String.fromCharCode(i + 65).toLowerCase()}`
                    )
                  }
                  key={i}
                  className={`flex justify-center items-center rounded-full text-[12px] w-[30px] h-[30px] ${
                    activeAlphabet === String.fromCharCode(i + 65).toLowerCase()
                      ? 'bg-primary text-white-0'
                      : 'bg-[rgba(185,184,189,0.1)] text-secondary'
                  } active:bg-primary active:text-white-0`}
                >
                  {String.fromCharCode(i + 65)}
                </button>
              ))}
            <button
              onClick={() => setActiveAlphabet('%23')}
              className={`flex justify-center items-center rounded-full text-[12px] w-[30px] h-[30px] ${
                activeAlphabet === '%23'
                  ? 'bg-primary text-white-0'
                  : 'bg-[rgba(185,184,189,0.1)] text-secondary'
              } active:bg-primary active:text-white-0`}
            >
              #
            </button>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
}
