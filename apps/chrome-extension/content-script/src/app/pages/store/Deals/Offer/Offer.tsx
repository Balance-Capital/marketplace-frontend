import { IOffer } from '@monorepo/chrome-extension/msg-bridge';
import CopiedCode from '../../../../components/CopiedCode/CopiedCode';
import DealBtn from '../../../../components/DealBtn/DealBtn';

export default function Offer({ offer }: { offer: IOffer }) {
  return (
    <div className="w-[330px] h-[166px] bg-white-50 rounded-3xl p-4 flex flex-col justify-between">
      <h3 className="twoRowEllipsis font-InterRegular text-base text-black">
        {offer.description}
      </h3>
      <span className="oneRowEllipsis font-InterRegular text-xs text-secondary">
        {offer.description}
      </span>
      {offer.verified ? (
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
            Verified
          </span>
        </div>
      ) : (
        ''
      )}
      {offer.code ? (
        <CopiedCode code={offer.code} redirectUrl={offer.redirectUrl} />
      ) : (
        <DealBtn redirectUrl={offer.redirectUrl} />
      )}
    </div>
  );
}
