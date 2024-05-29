import { useRouter } from 'next/router';
import moment from 'moment';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';

interface IProps {
  bestDiscount: string
  couponCodes: string
  averageSaving: string
  lastUpdated: string
  totalOffers: number
}

function BoxInfoOffers(props: IProps) {
  const { lastUpdated, averageSaving, totalOffers, couponCodes, bestDiscount } = props
  const router = useRouter()
  const content = getLanguage(language, router.locale)

  return (
    <div className="order-1 md:order-3 1xl:order-1 w-[352px] h-[385px] 1xl:w-[468px] 1xl:h-[407px] rounded-2xl shadow-3xl">
      <span className="flex items-center justify-center w-full p-11 font-PPNeueMachina text-[21px] 1xl:text-[28px] border-b-2 border-[rgba(185,184,189,0.2)]">
        {content.availableOffers}
      </span>
      <table className="w-full flex flex-col gap-2 p-11 font-InterRegular text-[16px] 1xl:text-[20px]">
        <thead></thead>
        <tbody>
        {bestDiscount !== null ?
        <tr className="flex items-center justify-between">
          <td className="text-secondary">{content.bestDiscount}</td>
          <td className="text-black">{bestDiscount}</td>
        </tr>
        : '' }
        {couponCodes !== null ?
        <tr className="flex items-center justify-between">
          <td className="text-secondary">{content.couponCodes}</td>
          <td className="text-black">{couponCodes}</td>
        </tr>
        : ''}
        {totalOffers !== null ?
        <tr className="flex items-center justify-between">
          <td className="text-secondary">{content.totalOffers}</td>
          <td className="text-black">{totalOffers}</td>
        </tr>
        : ''}
        {averageSaving !==null ?
        <tr className="flex items-center justify-between">
          <td className="text-secondary">{content.averageSaving}</td>
          <td className="text-black">{averageSaving}</td>
        </tr>
        : '' }
        {lastUpdated !== null ?
        <tr className="flex items-center justify-between">
          <td className="text-secondary">{content.lastUpdated}</td>
          <td className="text-black">{moment(lastUpdated).format('YYYY-MM-DD')}</td>
        </tr>
        : ''}
        <tr></tr>
        </tbody>
      </table>
    </div>
  );
}
export default BoxInfoOffers;
