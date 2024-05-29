export interface IOpenGraphSchema {
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
  ogUrl: string;
  ogSiteName: string;
}
interface IHeaderSchema {
  title: string;
  description: string;
  keyWords: string;
  openGraph: IOpenGraphSchema;
  metaRobots: string;
  jsonLd: Array<object>;
  canonicalLink: string;
  preloadImgLinks?: string[];
}

export default IHeaderSchema;
