import IOfferSchema from './offer';
import IStoreSchema from './store';

export interface IFaq {
  question: string;
  answer: string;
}

export interface IStoreDomain extends IStoreSchema {
  meta: string
  description: string
  aboutOffers: string
}

export interface ISimilarCoupons {
  name: string;
  domains: Array<string>;
  domain: string;
  categories: Array<string>;
  longTail: string;
  logo: string;
}

export interface IFeatureRetailer {
  name: string;
  domains: Array<string>;
  domain: string;
  longTail: string;
  logo: string;
}

export interface IAaggregateRating {
  '@type': string;
  ratingValue: string;
}

export interface IJsonLDSchema {
  '@context': string;
  '@type': string;
  brand: string;
  name: string;
  image: string;
  description: string;
  aggregateRating: IAaggregateRating;
}

export interface IAvailableOffers {
  bestDiscount: string;
  couponCodes: string;
  totalOffers: number;
  avgSavings: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
}

export default interface IStoreDomainSchema {
  jsonLd: IJsonLDSchema
  availableOffers: IAvailableOffers
  similarCoupons: Array<ISimilarCoupons>
  featureRetailer: Array<IFeatureRetailer>
  store: IStoreDomain
  offers: Array<IOfferSchema>
}
