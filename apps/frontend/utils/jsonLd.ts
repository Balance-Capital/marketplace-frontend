import moment from "moment";
export interface IWebSite {
  url: string,
  name: string,
  alternateName: string
}
export const webSite = (params:IWebSite) => ({
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  url: params.url,
  name: params.name,
  alternateName: params.alternateName
})
export interface IBreadcrumbListItem {
    name: string,
    url: string
}
export interface IBreadcrumbList {
    itemListElement: Array<IBreadcrumbListItem>
}
export const BreadcrumbList = (params:IBreadcrumbList) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: params.itemListElement.map((element, index) => ({
        '@type': 'ListItem',
        position: index+1,
        item: {
          '@id': element.url,
          name: element.name
        }
      }))
})
export interface IOrganization {
    name: string,
    url: string,
    logo: string,
    sameAs: Array<string>
}
export const organization = (params:IOrganization) => ({
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: params.name,
    url: params.url,
    logo: params.logo,
    sameAs: params.sameAs
})

export interface IFaqMainEntity {
  acceptedAnswer: {
    text: string
  },
  name: string
}
export interface IFaq {
  mainEntity: Array<IFaqMainEntity>
}
export const faq = (params:IFaq) => ({
  "@context": "http://www.schema.org",
  "@type": "FAQPage",
  "mainEntity": params.mainEntity?.map(item => ({
    "@type": "Question",
    "name": item.name,
    "acceptedAnswer": {
      "@type":"Answer",
      "text": item.acceptedAnswer.text
    }
  }))
})

export interface IOffers {
  makesOffer: Array<IOffer>
}

export interface IOffer {
  validThrough:string,
  url:string,
  name:string,
  description:string
}
export const offers = (params: IOffer[]) => params?.map((item) => ({
    "@type":"Offer",
    "validThrough": moment(item.validThrough).format('YYYY-MM-DD'),
    "url":item.url,
    "name":item.name,
    "description":item.description
}))

export interface IStore {
  sameAs:Array<string>,
  image:string,
  name:string,
  description:string,
  makesOffer: Array<IOffer>
}
export const store = (params: IStore) => ({
  "@type":"Store",
  "sameAs":params.sameAs,
  "image":params.image,
  "name":params.name,
  "description":params.description,
  "makesOffer": offers(params.makesOffer)
})

export interface IWebPage {
  description: string,
  headline: string,
  url: string,
  image: string,
  mainEntity: IStore
}
export const webPage = (params:IWebPage) => ({
  '@context': 'http://schema.org',
  '@type': 'WebPage',
  description: params.description,
  headline: params.headline,
  url: params.url,
  image: params.image,
  mainEntity: store(params.mainEntity)
})
