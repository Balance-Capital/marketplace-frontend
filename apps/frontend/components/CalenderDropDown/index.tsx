import getConfig from 'next/config';
import { useState, useRef } from 'react';
import moment from 'moment';
import useClickOutSide from '../../hooks/useClickOutSide';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

interface IProps {
  onChange: any;
}

export default function CalenderDropDown(props: IProps) {
  const { onChange } = props;
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  const allowDateReport = [];
  for (let z = 0; z < 13; z++) {
    const date = moment()
      .startOf('month')
      .subtract(z, 'month')
      .format('MMM YYYY');
    allowDateReport.push(date);
  }
  const menuRef = useRef(null);
  const [show, setShow] = useState(false);
  const [dateStart, setDateStart] = useState(
    allowDateReport.filter((item) =>
      moment(item).startOf('month').isSame(moment().startOf('month'))
    )
  );

  useClickOutSide(menuRef, setShow);

  const showDropDown = (e) => {
    setShow(!show);
  };

  const onClickItem = async (value) => {
    setShow(false);
    setDateStart(value);
    const date = allowDateReport.filter((item) => item === value);
    if (date) {
      if (onChange) {
        onChange(moment(date[0]).startOf('month').toDate());
      }
    }
  };

  return (
    <>
      <div className="relative w-[180.47px]" ref={menuRef}>
        <button
          onClick={(e) => {
            showDropDown(e);
          }}
          className="flex items-center gap-3 p-3 rounded-[20px] border-solid border-2 border-[rgba(112,112,112,0.3)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="29.503"
            viewBox="0 0 28 29.503"
          >
            <path
              id="Union_50"
              data-name="Union 50"
              d="M-20794.883-6952.5a4.061,4.061,0,0,1-4.119-3.988v-19.136a4.056,4.056,0,0,1,4.119-3.983h1.648V-6981a1,1,0,0,1,1-1h1.3a1,1,0,0,1,1,1v1.394h9.881V-6981a1,1,0,0,1,1-1h1.295a1,1,0,0,1,1,1v1.394h1.639a4.056,4.056,0,0,1,4.119,3.983v19.136a4.061,4.061,0,0,1-4.119,3.988Zm-2.469-3.988a2.43,2.43,0,0,0,2.469,2.391h19.762a2.436,2.436,0,0,0,2.475-2.391v-15.148h-24.705Zm17.293-3.189a1.617,1.617,0,0,1,1.645-1.592,1.618,1.618,0,0,1,1.648,1.592,1.623,1.623,0,0,1-1.648,1.6A1.622,1.622,0,0,1-20780.059-6959.678Zm-6.588,0a1.617,1.617,0,0,1,1.645-1.592,1.617,1.617,0,0,1,1.648,1.592,1.621,1.621,0,0,1-1.648,1.6A1.622,1.622,0,0,1-20786.646-6959.678Zm-6.588,0a1.617,1.617,0,0,1,1.645-1.592,1.619,1.619,0,0,1,1.65,1.592,1.623,1.623,0,0,1-1.65,1.6A1.622,1.622,0,0,1-20793.234-6959.678Zm13.176-6.378a1.621,1.621,0,0,1,1.645-1.592,1.622,1.622,0,0,1,1.648,1.592,1.622,1.622,0,0,1-1.648,1.6A1.621,1.621,0,0,1-20780.059-6966.056Zm-6.588,0a1.621,1.621,0,0,1,1.645-1.592,1.62,1.62,0,0,1,1.648,1.592,1.621,1.621,0,0,1-1.648,1.6A1.621,1.621,0,0,1-20786.646-6966.056Zm-6.588,0a1.621,1.621,0,0,1,1.645-1.592,1.622,1.622,0,0,1,1.65,1.592,1.623,1.623,0,0,1-1.65,1.6A1.621,1.621,0,0,1-20793.234-6966.056Z"
              transform="translate(20799.002 6982.003)"
              fill="rgba(116,132,157,0.5)"
            />
          </svg>
          <p className="font-InterRegular text-lg text-[#74849D]">
            {dateStart}
          </p>
          <ImageWithFallback
            fallbackSrc=""
            src={`${IMAGE_HOST}/assets/images/svg/down-arrow.svg`}
            alt="down arrow"
            width={12}
            height={6} 
          />
        </button>
        {show && (
          <div className="absolute w-full bg-white shadow-3xl rounded-2xl p-3 mt-2 font-InterRegular text-lg text-[#74849D] z-10">
            <div className="w-fit mx-auto [&>*]:py-1">
              {allowDateReport.map((item, key) => (
                <p
                  key={key}
                  className="hover:text-primary cursor-pointer"
                  onClick={() => onClickItem(item)}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
