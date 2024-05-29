/* eslint-disable @next/next/no-html-link-for-pages */
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import moment from 'moment';
import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
import IOfferSchema from '../../interfaces/offer';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

interface IProps {
  data: IOfferSchema;
}

function CouponsListItem(props: IProps) {
  const { data } = props;
  const router = useRouter();
  const content = getLanguage(language, router.locale);
  const daysLeft = moment(data.validDate).diff(moment(), 'days') + 1;
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  const onClickOffer = (event) => {

    if (data.code) {
      router.push(data.redirectUrl, data.redirectUrl);
    }

    window.open(
      data.code ? `${data.domain}#${data.code}` : data.redirectUrl,
      '_blank'
    );
  };

  return (
    <div
      onClick={onClickOffer}
      className="w-full bg-white rounded-2xl shadow-3xl flex flex-col md:flex-row items-center cursor-pointer"
    >
      <div className="bg-black w-full md:w-[229px] h-[185px] 1xl:h-[229px] rounded-2xl flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-1 font-PPNeueMachina text-[#f3f3f4]">
          <span className="text-[29px] 1xl:text-[40px]">
            {data.value ? data.value : content.best}
            {data.valueType === 'percentage'
              ? '%'
              : data.value
              ? data.currency
              : ''}
          </span>
          {data.code === null ? (
            <span className="text-[14px] 1xl:text-[20px]">{content.deal}</span>
          ) : (
            <span className="text-[14px] 1xl:text-[20px]">
              {content.coupon}
            </span>
          )}
          <span className="flex items-center gap-2 bg-[#f4f4f5] text-black font-InterRegular text-[13px] 1xl:text-[20px] p-1 pl-2 pr-2 rounded-full">
            <div className="relative w-[14px] h-[14px] 1xl:w-[20px] 1xl:h-[20px]">
              <ImageWithFallback
                fallbackSrc=""
                src={`${IMAGE_HOST}/assets/images/svg/star.svg`}
                alt="star icon"
                layout="fill"
                objectFit="cover" width={0} height={0}              />
            </div>
            <span>{data.stars}</span>
          </span>
        </div>
      </div>
      <div className="font-InterRegular p-8 text-start">
        <h2 className="text-ellipsis overflow-hidden w-[300px] md:w-[350px] whitespace-nowrap text-[18px] 1xl:text-[28px] text-black">
          {data.description}
        </h2>
        <p className="text-[14px] 1xl:text-[22px] text-secondary">
          {`${data.title.substring(0, 70)}...`}
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center mb-2 md:mb-0 gap-4">
          {data.code === null ? (
            <a
              href={'#'}
              rel="nofollow"
              className="inline-block font-InterRegular text-[20px] bg-[#14161A] text-white p-2 pl-8 pr-8 rounded-full border-2 border-[#14161A] hover:text-white hover:bg-primary hover:border-primary"
            >
              {content.getDeal}
            </a>
          ) : (
            <a
              rel="nofollow"
              href={'#'}
              className="inline-block w-[191px] mr-2"
            >
              <span className="flex items-center justify-center font-InterRegular text-[20px] text-secondary p-2 pl-8 pr-8 rounded-full border-dashed border-2 border-[rgba(185,184,189,0.5)]">
                {data.code}
              </span>
            </a>
          )}
          <span className="flex items-center gap-2">
            <div className="relative w-[20px] h-[20px] md:w-[23px] md:h-[23px]">
              <ImageWithFallback
                fallbackSrc=""
                src={`${IMAGE_HOST}/assets/images/svg/clock.svg`}
                alt="clock icon"
                layout="fill"
                objectFit="cover" width={0} height={0}              />
            </div>
            <span className="font-InterMedium text-[14px] md:text-[19px] text-[rgba(116,132,157,0.56)]">
              {daysLeft < 0
                ? content.expired
                : `${daysLeft} ${content.daysLeft}`}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default CouponsListItem;
