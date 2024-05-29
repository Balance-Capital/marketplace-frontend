import getConfig from 'next/config';
import { useRouter } from 'next/router';
import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

interface IProps {
  imageLogo: string;
  imageLogoAlt: string;
  title: string;
  description: string;
  code: string;
  redirectUrl: string;
  domainUrl: string;
}

export default function OfferCard(props: IProps) {
  const {
    imageLogo,
    imageLogoAlt,
    title,
    description,
    code,
    redirectUrl,
    domainUrl,
  } = props;
  const { locale } = useRouter();
  const content = getLanguage(language, locale);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  return (
    <div
      onClick={() => {
        window.open(code ? domainUrl + `#${code}` : redirectUrl, '_blank');
        window.open(code ? redirectUrl : domainUrl, '_self');
      }}
      className="flex-grow flex flex-col md:flex-row items-center justify-center md:justify-start rounded-[2.70rem] shadow-3xl"
    >
      <div className="relative w-[120px] h-[120px] m-8 rounded-[2.70rem] shadow-3xl">
        <ImageWithFallback
          fallbackSrc="/assets/imgs/store-default.png"
          src={`${IMAGE_HOST}/${imageLogo}`}
          alt={imageLogoAlt}
          layout="fill"
          objectFit="cover"
          className="rounded-[2.70rem]"
        />
      </div>
      <div className="text-center md:text-start">
        {!code ? (
          <span className="p-2 px-3 rounded-full bg-[rgba(101,99,255,0.08)] text-sm font-InterRegular text-[#6563FF]">
            {content.deal}
          </span>
        ) : (
          <span className="p-2 px-3 rounded-full bg-[rgba(73,180,142,0.08)] text-sm font-InterRegular text-[#49B48E]">
            {content.coupon}
          </span>
        )}
        <h4 className="font-InterMedium text-[20px] mx-auto mt-3 md:m-0 md:mt-3 text-ellipsis overflow-hidden w-[300px] md:w-[350px] whitespace-nowrap">
          {title}
        </h4>
        <p className="font-InterRegular text-[14px] text-ellipsis overflow-hidden w-[280px] md:w-[330px] lg:w-[400px] whitespace-nowrap text-secondary mx-auto md:mx-0">
          {description}
        </p>
        {!code ? (
          <a
            href={redirectUrl}
            onClick={(e) => e.preventDefault()}
            rel="nofollow"
            className="inline-block font-InterRegular text-[14px] bg-black text-white mb-3 md:mb-0 mt-3 p-2 px-4 rounded-full border-2 border-black hover:text-white hover:bg-primary hover:border-primary"
          >
            {content.getdeal}
          </a>
        ) : (
          <a
            href={redirectUrl}
            onClick={(e) => e.preventDefault()}
            rel="nofollow"
            className="inline-block mt-3 mb-3 md:mb-0 ml-[-20px] md:ml-0"
          >
            <span className="absolute -z-10 inline-block font-InterRegular text-[14px] text-secondary ml-[20px] p-2 pl-16 pr-3 rounded-full border-dashed border-t-2 border-r-2 border-b-2 border-[rgba(185,184,189,0.5)]">
              {code.slice(0, 3)}
            </span>
            <span className="inline-block font-InterRegular text-[14px] bg-black text-white p-2 px-4 rounded-full border-2 border-black hover:text-white hover:bg-primary hover:border-primary">
              {content.coupon}
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
