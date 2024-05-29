import { IProduct } from '@monorepo/chrome-extension/msg-bridge';
import ImgWithFallback from '../ImgWithFallback/ImgWithFallback';
import { environment } from '../../../environments/environment';
import { onClickTrendingDeal } from '../../constants/events';

export function ProductCard({
  product,
  size,
}: {
  product: IProduct;
  size: 'small' | 'large';
}) {
  const isDiscount = (priceAmount: number, salePriceAmount: number) =>
    +priceAmount !== +salePriceAmount;

  const calcPercentage = (salePriceAmount: number, priceAmount: number) => {
    return (100 - (+salePriceAmount / +priceAmount) * 100).toPrecision(2);
  };

  return (
    <a
      href={product.link}
      target="_blank"
      className={`block ${size === 'large' ? 'w-[216px] h-[300px]' : 'w-[157px] h-[258px]'
        } cursor-pointer rounded-[20px] bg-white-0`}
      rel="noreferrer"
    >
      <div
        className={`relative w-full ${size === 'large' ? 'h-[199px]' : 'h-[155px]'
          } bg-white-200 rounded-[20px] overflow-hidden`}
      >
        <ImgWithFallback
          className="absolute max-w-full max-h-full inset-0 mx-auto"
          src={`${environment.IMAGE_HOST_CDN}/${product.image}`}
          fallback={'/assets/png/store-default.png'}
          alt={product.brand}
        />
        <div className="relative flex items-center justify-between">
          {isDiscount(product.price.amount, product.salePrice.amount) && (
            <span className="m-3 font-InterRegular text-white-0 bg-colorGreen rounded-full p-[5px_10px]">
              {calcPercentage(product.salePrice.amount, product.price.amount)}%
              off
            </span>
          )}
          {/* <span className="m-3 font-InterRegular text-white-0 bg-black rounded-full p-[5px_10px] flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.922"
                height="10"
                viewBox="0 0 12.922 10"
              >
                <path
                  id="Union_37"
                  data-name="Union 37"
                  d="M1.916,10,0,4.056.322,2.986H3.058L4.785,0l.986.568-1.4,2.419c.662,0,3.67,0,3.661,0h.516L7.15.568,8.137,0,9.864,2.986H12.6L12.922,4.2,11.006,10Zm.863-1.125h7.365L11.76,4.112H1.162ZM8.8,6.95H8.165V5.659h.6l.063,0,.063,0h.567v.489a.65.65,0,0,1,0,.309V6.95H8.8Zm-5.338,0V5.659h.521A.693.693,0,0,1,4.1,5.645a.66.66,0,0,1,.16.014H4.75v.478a.65.65,0,0,1,0,.311v.5Z"
                  fill="#fff"
                />
              </svg>
              Earn 10%
            </span> */}
        </div>
      </div>
      <div className="font-InterRegular p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ImgWithFallback
            className="w-5 h-5 rounded-lg"
            src="/assets/png/store-default.png"
            fallback="/assets/png/store-default.png"
            alt={product.brand}
          />
          <span onClick={() =>
            onClickTrendingDeal(
              product.advertiserName,
              [],
              product.customTitle
            )
          } className="text-black oneRowEllipsis text-xs oneRowEllipsis">
            {product.advertiserName}
          </span>
        </div>
        <span className="text-[#14161A] oneRowEllipsis text-sm oneRowEllipsis">
          {product.customTitle}
        </span>
        <div>
          {isDiscount(product.price.amount, product.salePrice.amount) ? (
            <div className="flex items-center gap-2">
              <span
                className={`text-black ${size === 'large' ? 'text-base' : 'text-sm'
                  }`}
              >
                {product.salePrice.amount} {product.salePrice.currency}
              </span>
              <span className="text-secondary text-xs line-through">
                {product.price.amount} {product.price.currency}
              </span>
            </div>
          ) : (
            <span
              className={`text-black ${size === 'large' ? 'text-base' : 'text-sm'
                }`}
            >
              {product.price.amount} {product.price.currency}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
