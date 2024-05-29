import { useRecoilValue } from 'recoil';
import useScroll from '../../../hooks/useScroll';
import { homeProducts } from '../../../recoil';
import { IProduct } from '@monorepo/chrome-extension/msg-bridge';
import { ProductCard } from '../../../components/ProductCard/ProductCard';

export function TrendingDeals() {
  const { slide, scrollRef } = useScroll();
  const products = useRecoilValue(homeProducts);

  return (
    <div className="mt-2">
      <h2 className="font-PPNeueMachina text-xl p-4">
        {chrome.i18n.getMessage('homePageTitle5')}
      </h2>
      <div className="relative">
        <div ref={scrollRef} className="scrollbar-hide overflow-x-scroll">
          <div className="px-4 w-fit flex items-center gap-4">
            {products.map((product: IProduct, i: number) => (
              <ProductCard size='large' key={`product-${i}`} product={product} />
            ))}
          </div>
        </div>
        <button
          className="absolute ml-4 top-[calc(50%-16px)] rotate-180 w-8 h-8 backdrop-blur-sm bg-white-0/30 rounded-full flex items-center justify-center"
          onClick={() => slide(-200)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.436"
            height="10.273"
            viewBox="0 0 13.436 10.273"
          >
            <g
              id="Group_13792"
              name="Group 13792"
              transform="translate(0.625 0.884)"
            >
              <line
                id="Line_1"
                name="Line 1"
                x2="12.186"
                transform="translate(0 4.187)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              />
              <path
                id="Path_2922"
                name="Path 2922"
                d="M5,13.505,9.253,9.253,5,5"
                transform="translate(2.923 -5)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              />
            </g>
          </svg>
        </button>
        <button
          className="absolute right-4 top-[calc(50%-16px)] w-8 h-8 backdrop-blur-sm bg-white-0/30 rounded-full flex items-center justify-center"
          onClick={() => slide(+200)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.436"
            height="10.273"
            viewBox="0 0 13.436 10.273"
          >
            <g
              id="Group_13792"
              name="Group 13792"
              transform="translate(0.625 0.884)"
            >
              <line
                id="Line_1"
                name="Line 1"
                x2="12.186"
                transform="translate(0 4.187)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              />
              <path
                id="Path_2922"
                name="Path 2922"
                d="M5,13.505,9.253,9.253,5,5"
                transform="translate(2.923 -5)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
