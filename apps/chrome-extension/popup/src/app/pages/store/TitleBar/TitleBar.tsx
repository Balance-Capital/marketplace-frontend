import { IStore } from '@monorepo/chrome-extension/msg-bridge';
import { useRecoilValue } from 'recoil';
import { environment } from '../../../../environments/environment';
import BackIcon from '../../../components/BackIcon/BackIcon';
import CloseIcon from '../../../components/CloseIcon/CloseIcon';
import ImgWithFallback from '../../../components/ImgWithFallback/ImgWithFallback';
import { singleStore } from '../../../recoil';
import styles from './index.module.css';

export function TitleBar() {
  const store = useRecoilValue<IStore>(singleStore);
  return (
    <div className={styles['container']}>
      <BackIcon hexColor="#f3f3f4" />
      <ImgWithFallback
        src={`${environment.IMAGE_HOST_CDN}/${store.logo}`}
        fallback={'/assets/png/store-default.png'}
        alt={store.name}
      />
      <CloseIcon hexColor="#f3f3f4" />
    </div>
  );
}
