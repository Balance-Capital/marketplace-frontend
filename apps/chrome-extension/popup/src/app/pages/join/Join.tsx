import { ConnectPanel } from './ConnectPanel/ConnectPanel';
import { TopBar } from '../../components/TopBar/TopBar';
import styles from './index.module.css';

export default function Join() {
  return (
    <div className={styles['container']}>
      <TopBar hexColor="#000" isBack={false} bgColor="bg-white-100" />
      <ConnectPanel />
    </div>
  );
}
