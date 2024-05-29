import getConfig from 'next/config';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Image from 'next/image';
import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';
import IStoreSchema from '../../interfaces/store';
import IOfferSchema from '../../interfaces/offer';

interface IProps {
  imageLogo: string;
  imageLogoAlt: string;
  discount: string;
  sign: string;
  discountType: string;
  link: string;
}

export default function PromoCard(props: IProps) {
  const { imageLogo, imageLogoAlt, discount, sign, discountType, link } = props;
  const { locale } = useRouter();
  const content = getLanguage(language, locale);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  let value =
    discountType === 'percentage'
      ? `${discount}% OFF`
      : `${sign}${discount} OFF`;
  if (!discount) {
    value = content.bestdeal;
  }

  return (
    <div className="flex-grow cursor-pointer">
      <Link href={link}>
        <div className="relative w-[140px] h-[157px] md:w-[167px] md:h-[169px] lg:w-[179px] lg:h-[181px] mx-auto">
          <div className="absolute rounded-[2.70rem] left-0 bottom-0 w-[140px] h-[140px] md:w-[152px] md:h-[152px] lg:w-[164px] lg:h-[164px] border-2 border-[rgba(112,112,112,0.1)]">
            <ImageWithFallback
              fallbackSrc="/assets/imgs/store-default.png"
              src={`${IMAGE_HOST}/${imageLogo}`}
              alt={imageLogoAlt}
              layout="fill"
              objectFit="cover"
              className="rounded-[2.70rem]"
            />
          </div>
          <span className="absolute ml-[40px] md:ml-[50px] lg:ml-[60px] left-0 top-0 w-[120px] h-[35px] bg-black text-white flex items-center justify-center gap-2 rounded-full">
            <div className="relative w-5 h-5">
              <ImageWithFallback
                fallbackSrc=""
                layout="fill"
                objectFit="cover"
                src={`${IMAGE_HOST}/assets/images/svg/discount.svg`}
                alt="discount"
              />
            </div>
            <span className="text-[85%]">{value}</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

export const getSliceOffers = (stores: Array<IStoreSchema>, start, limit): Array<IOfferSchema|any> => {
  return stores && stores.length > 0 
    ? stores.slice(start, limit).map((item) => {
        return item.offers && item.offers.length > 0 && item.offers[0] || [];
      })
    : [];
};
