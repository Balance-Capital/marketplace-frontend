import { IOffer } from './offer.interface';
import { IOffersScore } from './offers-score.interface';

export interface IStore {
  id: string;
  name: string;
  logo: string;
  domain: string;
  categories: string[];
  offersScore: IOffersScore;
  domains: Array<string>;
  offers: Array<IOffer>;
  stars: number;
  aboutOffers?: string;
  priority: number;
  offersLength: number;
  averageConversionRate: number;
}
