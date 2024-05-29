export interface IProduct {
  advertiserName: string;
  advertiserCountry: string;
  image: string;
  brand: string;
  customTitle: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  salePrice: {
    amount: number;
    currency: string;
  };
  link: string;
}
