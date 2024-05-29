import getConfig from 'next/config';
import Link from 'next/link';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

interface IProps {
  imageLogo: string;
  name: string;
  domain: string;
  countOffers: number;
}

function StoresCard(props: IProps) {
  const { imageLogo, name, domain, countOffers } = props;
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  return (
    <div>
      <Link href={`/site/${domain}`} legacyBehavior>
        <a className="rounded-2xl shadow-3xl flex items-center gap-4 p-6 flex-grow">
          <div className="relative w-[62px] h-[62px] lg:w-[88px] lg:h-[88px] rounded-[25px]">
            <ImageWithFallback
              fallbackSrc="/assets/imgs/store-default.png"
              src={`${IMAGE_HOST}/${imageLogo}`}
              alt={`${domain} logo`}
              layout="fill"
              objectFit="contain"
              className="rounded-[25px]"
            />
          </div>
          <div>
            <h2 className="font-PPNeueMachina text-base lg:text-2xl text-ellipsis overflow-hidden whitespace-nowrap w-[179px] lg:w-[278px]">
              {name}
            </h2>
            <p className="font-InterRegular text-xs lg:text-lg text-secondary">
              {domain}
            </p>
            <span className="w-fit px-3 py-1 mt-1 flex items-center justify-center gap-2 bg-[rgba(101,99,255,0.1)] rounded-full">
              <div className="relative w-[11px] lg:w-[16px] h-[13px] lg:h-[18px]">
                <ImageWithFallback
                  fallbackSrc=""
                  src={`${IMAGE_HOST}/assets/images/svg/discount-primary.svg`}
                  alt="discount primary"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span className="text-primary text-[9px] lg:text-[14px]">
                {countOffers}
              </span>
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
}
export default StoresCard;
