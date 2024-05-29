import { ISearchSchema } from "../pages/api/searchbar";
import IProductSchema from "./product";
import IStoreSchema from "./store";
import IStoreDomainSchema from "./storeDomain";

export interface IDataWithProducts {
  data: Array<IStoreSchema> | IStoreDomainSchema | ISearchSchema | IStoreDomainSchema;
  products: Array<IProductSchema>;
}
export interface IWithProducts{
  data: IDataWithProducts;
  trackerId: string;
  status: number;
}

export default IWithProducts;
