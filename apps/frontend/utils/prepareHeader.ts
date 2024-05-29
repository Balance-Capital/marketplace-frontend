import IHeaderSchema from '../interfaces/header';
import IText from '../interfaces/text';
import { BreadcrumbList, IBreadcrumbList, organization, webPage, webSite, faq } from './jsonLd';
import getLanguage from './getLanguage';

export const prepareHeader = (language: Array<object>, locale: string): IHeaderSchema => {
  const text: IText = getLanguage(language, locale);

  const header: IHeaderSchema = {
    title: text.title || null,
    description: text.description || null,
    keyWords: text.keyWords || null,
    openGraph: text.openGraph || null,
    metaRobots: text.metaRobots || null,
    canonicalLink: text.canonicalLink || null,
    jsonLd: [],
  };

  if (text.jsonld?.organization) {
    header.jsonLd.push(organization(text.jsonld.organization));
  }

  if (text.jsonld?.website) {
    header.jsonLd.push(webSite(text.jsonld.website));
  }

  if (text.jsonld?.webpage) {
    header.jsonLd.push(webPage(text.jsonld.webpage));
  }

  if(text.jsonld?.faq) {
    header.jsonLd.push(faq(text.jsonld.faq));
  }

  if (text.jsonld?.breadcrumb) {
    const breadcrumbList: IBreadcrumbList = {
      itemListElement: text.jsonld.breadcrumb,
    };
    header.jsonLd.push(BreadcrumbList(breadcrumbList));
  }

  return header;
}
