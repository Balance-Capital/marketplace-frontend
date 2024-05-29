import { useState } from 'react';
import { useRouter } from 'next/router';
import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
import IOfferSchema from '../../interfaces/offer';
import IStoreSchema from '../../interfaces/store';

interface IProps {
  data: IOfferSchema;
  store: IStoreSchema;
}

function CouponsListItem2(props: IProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { data, store } = props;
  const router = useRouter();
  const content = getLanguage(language, router.locale);

  const onClickOffer = (event) => {
    if (data.code) {
      navigator.clipboard.writeText(data.code);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        window.open(data.redirectUrl, '_blank').blur();
      }, 1000);
    } else {
      window.open(data.redirectUrl, '_blank');
    }
  };

  return (
    <div className="cursor-pointer w-full h-[280px] md:h-[170px] p-7 xl:p-14 shadow-[0_50px_90px_rgba(124,136,144,0.12)] rounded-[25px] flex md:flex-row flex-col items-start md:items-center">
      <h2 className="hidden pr-7 h-full xl:flex items-center font-PPNeueMachina text-2xl text-black">
        {data.value ? data.value : 'Best'}
        {data.valueType === 'percentage'
          ? '%'
          : data.value
          ? data.currency
          : ''}
      </h2>
      <div className="grow px-0 xl:px-7 flex flex-col gap-4 border-l-0 xl:border-l-[1px] border-[rgba(116,132,157,0.07)]">
        <div className="font-PPNeueMachina text-xs">
          {data.code === null ? (
            <span className="text-primary">{content.deal}</span>
          ) : (
            <span className="text-[#37AC82]">{content.coupon}</span>
          )}
        </div>
        <span className="font-InterRegular text-lg oneRowEllipsis">
          {data.title}
        </span>
        <div className="flex flex-wrap items-center gap-4 1xl:gap-10">
          {data.verified ? (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13.934"
                height="10.402"
                viewBox="0 0 13.934 10.402"
              >
                <path
                  id="Path_3973"
                  data-name="Path 3973"
                  d="M4.5,7.869l3.222,3.222L16.313,2.5"
                  transform="translate(-3.439 -1.439)"
                  fill="none"
                  stroke="#37ac82"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
              </svg>
              <span className="font-InterRegular text-sm text-secondary">
                {content.p1}
              </span>
            </div>
          ) : (
            ''
          )}
          {store?.averageConversionRate && data.partnerSource === 1 ? (
            <span className="text-primary flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.375"
                height="13.445"
                viewBox="0 0 17.375 13.445"
              >
                <g
                  id="Group_13766"
                  data-name="Group 13766"
                  transform="translate(-4.151 -2.85)"
                >
                  <path
                    id="Union_47"
                    data-name="Union 47"
                    d="M2.576,13.445,0,5.453.433,4.015H4.111L6.434,0,7.76.764,5.879,4.016c.89,0,4.935.006,4.922,0H11.5L9.614.764,10.94,0l2.323,4.015h3.678l.433,1.635-2.576,7.8Zm1.16-1.513h9.9l2.174-6.4H1.562Zm8.1-2.587h-.854V7.609h.8c.028,0,.056,0,.085,0s.057,0,.085,0h.762v.658a.875.875,0,0,1,0,.416v.662h-.879Zm-7.178,0V7.609h.7A.932.932,0,0,1,5.51,7.59a.887.887,0,0,1,.215.019h.662v.642a.874.874,0,0,1,0,.418v.676Z"
                    transform="translate(4.151 2.85)"
                    fill="#6563ff"
                  />
                </g>
              </svg>
              {`Earn upto ${(store?.averageConversionRate * 100).toPrecision(
                2
              )}% Cashback`}
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
      {data.code ? (
        <button
          onClick={(event) => onClickOffer(event)}
          className={`min-w-[192px] h-[60px] text-white hover:bg-primary ${
            isCopied ? 'bg-primary' : 'bg-black'
          } rounded-[18px]`}
        >
          {isCopied ? data.code : content.p2}
        </button>
      ) : (
        <button
          onClick={(event) => onClickOffer(event)}
          className="min-w-[192px] h-[60px] text-white bg-black hover:bg-primary rounded-[18px]"
        >
          {content.p3}
        </button>
      )}
    </div>
  );
}

export default CouponsListItem2;
