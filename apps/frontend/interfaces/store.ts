// import { IFaqMainEntity } from '../utils/jsonLd';
import offerSchema from './offer';
import { IFaq } from './storeDomain';
interface IStoreSchema {
  id: string;
  skimLinksId: number;
  name: string;
  logo: string;
  priority: number;
  domains: Array<string>;
  domain: string;
  countries: Array<string>;
  country: string;
  categories: Array<string>;
  epc: number;
  averageCommissionRate: number;
  averageBasketSize: number ;
  averageConversionRate: number ;
  specialRateType: string;
  offersScore: {
    bestDiscount: string;
    couponCodes: string;
    totalOffers: number;
    avgSavings: string;
    _id: string;
    updatedAt: string;
    createdAt: string;
  };
  offers: Array<offerSchema>;
  stars: number;
  indexing: boolean;
  contentLength: number;
  offersLength: number;
  longTail: string;
  faq: Array<IFaq>;
  description: string;
}

export default IStoreSchema;
