export interface IDashboard {
  allStores : number,
  allOffers : number,
  validOffers : number,
  expiredOffers : number,
  siteMapOffers : number,
  siteMapStores : number,
  storesWithoutLogo: number,
  storesWithoutDescription: number,
  storesWithoutFaq: number,
  storesWithoutCommission: number,
  storesWithoutCategories: number,
  updatedAt : Date
  groupBySource: Array<{
    name: string,
    length: number
  }>,
  allActiveStores: number,
  checkedOffers: number,
  allProducts: number,
  checkedProducts: number
};

export interface IImport {
  storeDomain: string,
  countOffers: number,
  countNewOffers: number,
  countIncomeOffers: number,
  countIncomeDuplicate: number,
  updatedAt: Date
};

export interface IAdminDashboard {
  dashboard: IDashboard,
  imort: IImport
};
