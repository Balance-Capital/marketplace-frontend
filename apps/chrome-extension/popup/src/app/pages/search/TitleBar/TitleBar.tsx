import { useRef } from 'react';
import CloseIcon from '../../../components/CloseIcon/CloseIcon';
import styles from './index.module.css';
import debounce from 'lodash/debounce';
import { useRecoilState } from 'recoil';
import { searchText } from '../../../recoil';

export function TitleBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTxt, setSearchTxt] = useRecoilState(searchText);

  const changeHandler = () => {
    setSearchTxt(inputRef.current?.value as string);
  };

  const debouncedChangeHandler = debounce(changeHandler, 1000);

  return (
    <form className={styles['container']}>
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20.781"
          height="22.781"
          viewBox="0 0 20.781 22.781"
        >
          <g
            id="Group_13950"
            name="Group 13950"
            transform="translate(-31.794 -27.23)"
          >
            <path
              id="Ellipse_344"
              name="Ellipse 344"
              d="M7.817-1A8.817,8.817,0,1,1-1,7.817,8.827,8.827,0,0,1,7.817-1Zm0,15.114a6.3,6.3,0,1,0-6.3-6.3A6.3,6.3,0,0,0,7.817,14.114Z"
              transform="translate(32.794 28.23)"
              fill="#74849d"
            />
            <path
              id="Line_2"
              name="Line 2"
              d="M5.622,6.881a1.256,1.256,0,0,1-.891-.369L-.631,1.15A1.26,1.26,0,0,1,1.15-.631L6.513,4.731a1.26,1.26,0,0,1-.891,2.15Z"
              transform="translate(45.694 43.129)"
              fill="#74849d"
            />
          </g>
        </svg>
        <input
          ref={inputRef}
          defaultValue={searchTxt}
          onChange={debouncedChangeHandler}
          placeholder={chrome.i18n.getMessage('searchBarPlaceholder')}
          type="text"
          name="search-bar"
        />
      </label>
      <CloseIcon hexColor="#101417" />
    </form>
  );
}
