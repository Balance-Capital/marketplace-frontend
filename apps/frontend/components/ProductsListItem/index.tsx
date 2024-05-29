import getConfig from 'next/config';
import { useRouter } from 'next/router';
import getLanguage from '../../utils/getLanguage';
import language from './locale/index.json';
import IProductSchema from '../../interfaces/product';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

interface IProps {
  data: IProductSchema;
}

function ProductListItem(props: IProps) {
  const { data } = props;
  const router = useRouter();
  const content = getLanguage(language, router.locale);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  const CDNImages = `${IMAGE_HOST}/${data.image}`;

  const onClickOffer = (event) => {
    window.open(data.link, '_blank');
  };

  const discount = data.price.amount !== data.salePrice.amount || false;
  const percent = (
    100 -
    (parseInt(data.salePrice.amount) / parseInt(data.price.amount)) * 100
  ).toPrecision(2);

  return (
    <div
      onClick={(event) => onClickOffer(event)}
      className="cursor-pointer w-[325px] h-[482px] rounded-[30px] flex flex-col gap-4 border-2 border-[#e5e6e861]/20"
    >
      <div className="relative w-full h-[320px] bg-[#E5E6E8] rounded-[30px] p-4">
        <div className="absolute w-[293px] h-[288px] top-4">
          <ImageWithFallback
            fallbackSrc="/assets/imgs/store-default.png"
            src={CDNImages}
            alt={data.brand}
            layout="fill"
            objectFit="contain"
            className="rounded-[20px]"
          />
        </div>

        <div className="relative flex items-start justify-between">
          {/* <span className="font-InterRegular text-[13px] text-[#EAFFF7] rounded-full bg-[#37AC82] px-4 py-2">
            {data.advertiserCountry}
          </span> */}
          {discount ? (
            <span className="font-InterRegular text-[13px] text-white rounded-full bg-black px-4 py-2 flex items-center gap-1">
              <svg
                id="Group_13717"
                data-name="Group 13717"
                xmlns="http://www.w3.org/2000/svg"
                width="16.299"
                height="12.612"
                viewBox="0 0 16.299 12.612"
              >
                <path
                  id="Union_37"
                  data-name="Union 37"
                  d="M2.416,12.612,0,5.115.406,3.766h3.45L6.036,0,7.28.717,5.515,3.767c.834,0,4.629.005,4.617,0h.651L9.019.717,10.263,0l2.179,3.766h3.451L16.3,5.3l-2.416,7.312ZM3.5,11.193h9.29l2.039-6.006H1.465Zm7.6-2.427h-.8V7.138h.751c.026,0,.053,0,.08,0s.054,0,.08,0h.715v.617a.82.82,0,0,1,0,.39v.621H11.1Zm-6.733,0V7.138h.657a.874.874,0,0,1,.146-.018.833.833,0,0,1,.2.018h.621v.6a.82.82,0,0,1,0,.392v.634Z"
                  fill="#fff"
                />
              </svg>
              {`${percent}% Off`}
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="relative flex items-center gap-2 px-4">
        <div className="relative w-[29px] h-[29px]">
          <ImageWithFallback
            fallbackSrc="/assets/imgs/store-default.png"
            src="/assets/imgs/store-default.png"
            alt={data.brand}
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
        </div>
        <h2 className="relative w-52 text-ellipsis overflow-hidden whitespace-nowrap font-InterRegular text-[15px] text-black">
          {data.advertiserName}
        </h2>
      </div>
      <span className="font-InterRegular text-base w-72 text-ellipsis overflow-hidden whitespace-nowrap text-black px-4">
        {data.customTitle}
      </span>
      {/* <span className="font-InterRegular text-base w-72 text-ellipsis overflow-hidden whitespace-nowrap text-black px-4">
        {data.description}
      </span> */}
      <div>
        <span
          className={`font-InterRegular text-[18px] text-black px-4 ${
            discount ? 'line-through' : ''
          }`}
        >
          {content.price} {data.price.amount} {data.price.currency}
        </span>
        {discount ? (
          <span className="font-InterRegular text-[18px] text-primary px-4">
            {content.salePrice} {data.salePrice.amount}{' '}
            {data.salePrice.currency}
          </span>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default ProductListItem;
