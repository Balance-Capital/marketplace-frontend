import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';
import useClickOutSide from '../../../hooks/useClickOutSide';
import { TopBar } from '../../TopBar/TopBar';
import styles from './index.module.css';

export default function RewardTipModal({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutSide(modalRef as MutableRefObject<HTMLDivElement>, setModal);

  return (
    <div
      className={styles['modal']}
      aria-labelledby="modal-sort"
      role="dialog"
      aria-modal="true"
    >
      <div className={styles['modal__bg']}></div>

      <div className={styles['modal__body']}>
        <div ref={modalRef} className={styles['body__container']}>
          <TopBar
            isBack={false}
            hexColor="#000"
            bgColor="bg-colorGreen"
            title=" "
          />
          <div className={styles['container__body']}>
            <img
              src={chrome.runtime.getURL('assets/png/reward-tip.png')}
              alt=""
            />
            <div>
              <p className={styles['container__body--p1']}>
                {chrome.i18n.getMessage('rewardsModalTitle')}
              </p>
              <p className={styles['container__body--p2']}>
                {chrome.i18n.getMessage('rewardsModalDescription')}
              </p>
            </div>
            <button
              className={styles['container__body--btn']}
              onClick={() => setModal(false)}
            >
              {chrome.i18n.getMessage('rewardsModalBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
