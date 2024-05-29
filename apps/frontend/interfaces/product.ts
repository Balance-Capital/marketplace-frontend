interface IProductSchema {
  advertiserName: string,
  advertiserCountry: string,
  image: string,
  brand: string,
  customTitle: string,
  description: string,    
  price: {
    amount: string,
    currency: string
  },
  salePrice: {
    amount: string,
    currency: string
  },
  link: string
}

export default IProductSchema;
