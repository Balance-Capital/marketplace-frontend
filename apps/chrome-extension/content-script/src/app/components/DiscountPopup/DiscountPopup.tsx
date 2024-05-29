import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '../CloseIcon/CloseIcon';
import ImgWithFallback from '../ImgWithFallback/ImgWithFallback';
import { environment } from '../../../environments/environment';
import { IOffer } from '@monorepo/chrome-extension/msg-bridge';

export default function DiscountPopup({
  storeLogo,
  storeName,
  codes,
  setToggleRef,
}: {
  storeLogo: string;
  storeName: string;
  codes: IOffer[];
  setToggleRef: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed right-3 top-3 rounded-[30px] bg-black p-8">
      <div className="flex items-center gap-80">
        <svg
          id="Group_526"
          data-name="Group 526"
          xmlns="http://www.w3.org/2000/svg"
          width="106.953"
          height="21.744"
          viewBox="0 0 106.953 21.744"
        >
          <path
            id="Union_32"
            data-name="Union 32"
            d="M61.705,16.43V14.554a4.684,4.684,0,0,0,1.135.154c1.033,0,1.394-.512,1.755-1.3l.207-.495L61.1,3.634h2.426l2.426,6.4,2.409-6.4h2.444l-4.078,10.22c-.723,1.791-1.876,2.832-3.631,2.832A3.326,3.326,0,0,1,61.705,16.43Zm-20.081-.1V3.634h2.117V4.726a3.77,3.77,0,0,1,3.011-1.3,4.709,4.709,0,0,1,4.715,4.846,4.691,4.691,0,0,1-4.732,4.846,3.91,3.91,0,0,1-2.856-1.092v4.3Zm2.254-8.053a2.63,2.63,0,1,0,5.248,0,2.65,2.65,0,0,0-2.65-2.8A2.62,2.62,0,0,0,43.878,8.275Zm8.328,2.184c0-1.535,1.032-2.61,3.235-2.969l2.788-.444V6.739c0-.8-.688-1.4-1.721-1.4a2.219,2.219,0,0,0-2.1,1.4l-1.841-.887a4.171,4.171,0,0,1,4.026-2.423c2.289,0,3.889,1.365,3.889,3.31v6.176H58.35v-.989a3.778,3.778,0,0,1-2.925,1.194C53.463,13.121,52.207,12.1,52.207,10.459Zm3.665-1.314c-.895.171-1.325.563-1.325,1.229,0,.648.534,1.041,1.29,1.041a2.266,2.266,0,0,0,2.392-2.286V8.753ZM16.261,8.258a4.629,4.629,0,0,1,4.646-4.829,4.336,4.336,0,0,1,4.56,4.539,3.11,3.11,0,0,1-.12.938H18.6a2.4,2.4,0,0,0,2.5,2.252,2.372,2.372,0,0,0,2.168-1.194l1.824.887a4.208,4.208,0,0,1-4.009,2.269A4.694,4.694,0,0,1,16.261,8.258ZM18.653,7.2h4.405a2.061,2.061,0,0,0-2.151-1.928A2.23,2.23,0,0,0,18.653,7.2ZM0,6.552A6.286,6.286,0,0,1,6.4,0a5.582,5.582,0,0,1,5.4,3.344l-2.1.972a3.429,3.429,0,0,0-3.3-2.2c-2.409,0-4.061,1.791-4.061,4.436C2.34,9.213,3.992,11,6.4,11a3.429,3.429,0,0,0,3.3-2.2l2.1.973a5.582,5.582,0,0,1-5.4,3.344A6.31,6.31,0,0,1,0,6.552Zm35.533,6.364V3.634h2.116V4.948a2.474,2.474,0,0,1,2.53-1.416h.551V5.511h-.809a2.031,2.031,0,0,0-2.134,2.235v5.17Zm-6.315,0L25.535,3.634H28l2.22,6.057,2.22-6.057H34.9l-3.682,9.282Zm-16.312,0V0H15.16V12.916Zm59.586-6.9a1.359,1.359,0,0,1-.416-1,1.344,1.344,0,0,1,.416-.993,1.438,1.438,0,0,1,2.011,0,1.344,1.344,0,0,1,.416.993,1.423,1.423,0,0,1-2.427,1Zm.145-1.856a1.169,1.169,0,0,0-.354.857,1.215,1.215,0,1,0,2.429,0,1.215,1.215,0,0,0-2.075-.857Zm.352,1.45a.813.813,0,0,1-.226-.6.866.866,0,0,1,.2-.587.671.671,0,0,1,.533-.236.828.828,0,0,1,.373.082.559.559,0,0,1,.313.491h-.234a.417.417,0,0,0-.122-.249.409.409,0,0,0-.3-.105.423.423,0,0,0-.406.249A.746.746,0,0,0,73.038,5a.731.731,0,0,0,.131.442.439.439,0,0,0,.378.179.417.417,0,0,0,.265-.083.44.44,0,0,0,.149-.243h.234a.623.623,0,0,1-.226.4.684.684,0,0,1-.435.143A.743.743,0,0,1,72.988,5.611Z"
            transform="translate(32.035 5.058)"
            fill="#f3f3f4"
          />
          <path
            id="Union_37"
            data-name="Union 37"
            d="M3.868,20.189,0,8.188.65,6.029H6.173L9.661,0l1.991,1.147L8.828,6.03c1.336,0,7.41.009,7.39,0h1.043L14.436,1.147,16.427,0l3.488,6.029h5.523l.65,2.455-3.868,11.7Zm1.742-2.272h14.87L23.743,8.3H2.346Zm12.157-3.884H16.485V11.426h1.2c.042,0,.085-.006.128-.006s.086,0,.128.006h1.144v.988a1.313,1.313,0,0,1,0,.625v.993h-1.32Zm-10.778,0V11.426H8.041a1.4,1.4,0,0,1,.233-.029,1.333,1.333,0,0,1,.323.029h.994v.964a1.313,1.313,0,0,1,0,.627v1.015Z"
            transform="translate(0 0)"
            fill="#f3f3f4"
          />
        </svg>
        <CloseIcon hexColor="#f3f3f4" setToggleRef={setToggleRef} />
      </div>
      <div className="mt-5 flex items-center gap-8">
        <div className="inline-block p-7 bg-blackLight rounded-full">
          <ImgWithFallback
            className="w-[96px] h-[96px] rounded-full"
            src={`${environment.IMAGE_HOST_CDN}/${storeLogo}`}
            fallback={'/assets/png/store-default.png'}
            alt={storeName}
          />
        </div>
        <div className="font-InterRegular text-white-0 flex flex-col gap-4">
          <h2 className="text-xl">
            {codes.length} {codes.length > 1 ? 'discounts' : 'discount'} found!
          </h2>
          <p className="w-56 text-xs">
            We’ll test them and apply coupons that work to your cart
            immediately.
          </p>
          <div className="text-sm text-white-0">
            <button className=" bg-primary px-8 py-4 rounded-full">
              Apply {codes.length > 1 ? 'discounts' : 'discount'}
            </button>
            <button className="bg-transparent underline ml-3">
              No, thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
