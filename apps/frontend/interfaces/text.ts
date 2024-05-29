import {
  IBreadcrumbListItem,
  IFaq,
  IOffers,
  IOrganization,
  IStore,
  IWebPage,
  IWebSite
} from '../utils/jsonLd';
import IHeaderSchema from './header';

interface IText extends IHeaderSchema {
  jsonld: {
    website: IWebSite,
    breadcrumb: Array<IBreadcrumbListItem>,
    organization: IOrganization,
    store: IStore,
    offers: IOffers,
    webpage: IWebPage,
    faq: IFaq
  };
}

export default IText;
