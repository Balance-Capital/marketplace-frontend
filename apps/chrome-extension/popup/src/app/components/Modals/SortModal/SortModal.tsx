import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
} from 'react';
import { useRecoilState } from 'recoil';
import { SortBy } from '../../../enums/sort-by.enum';
import useClickOutSide from '../../../hooks/useClickOutSide';
import { currentRadioValue } from '../../../recoil';
import styles from './index.module.css';

export default function SortModal({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [getCurrentRadioValue, setCurrentRadioValue] =
    useRecoilState(currentRadioValue);

  useClickOutSide(modalRef as MutableRefObject<HTMLDivElement>, setModal);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.target.value);
  };

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
          <h3 className={styles['container__h3']}>Sort by</h3>
          <table className={styles['container__table']}>
            <thead></thead>
            <tbody>
              <tr>
                <td>{chrome.i18n.getMessage('sortModalOption1')}</td>
                <td>
                  <input
                    className={styles['container__table--td']}
                    type="radio"
                    name={SortBy.Popular}
                    id={SortBy.Popular}
                    value={SortBy.Popular}
                    onChange={handleRadioChange}
                    checked={getCurrentRadioValue === SortBy.Popular}
                  />
                </td>
              </tr>
              <tr>
                <td>{chrome.i18n.getMessage('sortModalOption2')}</td>
                <td>
                  <input
                    className={styles['container__table--td']}
                    type="radio"
                    name={SortBy.Savings}
                    id={SortBy.Savings}
                    value={SortBy.Savings}
                    onChange={handleRadioChange}
                    checked={getCurrentRadioValue === SortBy.Savings}
                  />
                </td>
              </tr>
              <tr>
                <td>{chrome.i18n.getMessage('sortModalOption3')}</td>
                <td>
                  <input
                    className={styles['container__table--td']}
                    type="radio"
                    name={SortBy.Recently}
                    id={SortBy.Recently}
                    value={SortBy.Recently}
                    onChange={handleRadioChange}
                    checked={getCurrentRadioValue === SortBy.Recently}
                  />
                </td>
              </tr>
              <tr>
                <td>{chrome.i18n.getMessage('sortModalOption4')}</td>
                <td>
                  <input
                    className={styles['container__table--td']}
                    type="radio"
                    name={SortBy.Deals}
                    id={SortBy.Deals}
                    value={SortBy.Deals}
                    onChange={handleRadioChange}
                    checked={getCurrentRadioValue === SortBy.Deals}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
