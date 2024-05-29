import { FC } from 'react';
import LoaderImg from '../../components/LoaderImg/LoaderImg';
import styles from './index.module.css';

export const NetworkIssue: FC = () => {
  return (
    <div className={styles['container']}>
      <span className={styles['title']}>
        <LoaderImg />
        {chrome.i18n.getMessage('networkIssue')}
      </span>
    </div>
  );
};
