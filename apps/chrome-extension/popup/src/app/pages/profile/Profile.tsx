import { Outlet } from 'react-router-dom';
import Tabs from '../../components/Tabs/Tabs';
import styles from './index.module.css';

export function Profile() {
  return (
    <div className={styles['container']}>
      <Outlet />
      <Tabs />
    </div>
  );
}
