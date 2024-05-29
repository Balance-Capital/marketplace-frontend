interface IOfferSchema {
  code: string;
  countryCode: Array<string>;
  currency: string;
  description: string;
  domain: string;
  id: string;
  image: string;
  longTail: string;
  offersScore: {
    bestDiscount: string;
    couponCodes: string;
    totalOffers: number;
    avgSavings: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  origin: string;
  originId: number;
  redirectUrl: string;
  seoUrl: string;
  stars: number;
  startDate: string;
  storeDescription: string;
  storeId: string;
  storeLogo: string;
  storeName: string;
  title: string;
  validDate: string;
  value: string;
  valueType: string;
  verified: boolean;
  salesCommission: number;
  offerType: string;
  linkType: string;
  partnerSource: number;
}

export default IOfferSchema;
