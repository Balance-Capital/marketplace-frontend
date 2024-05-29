import { get, post } from './fetch';

export const getStores = <T>(): Promise<T> => get<T>('stores?limit=44&', false);

export const getStoresBySearch = <T>(text: string): Promise<T> =>
  get<T>(`search-ext/${text}?`, false);

export const getStore = <T>(domain: string): Promise<T> =>
  get<T>(`stores/${domain}?`, false);

export const getStoresByAlphabet = <T>(str: string): Promise<T> =>
  get<T>(`stores?filter=${str}&`, false);

export const getReferrals = <T>(): Promise<T> => get<T>(`referrals?`, false);
export const getRewards = <T>(): Promise<T> => get<T>(`myrewards?`, false);
export const getSettings = <T>(): Promise<T> => get<T>(`settings?`, false);
export const getWallets = <T>(): Promise<T> => get<T>(`wallets?`, false);

export const getProducts = <T>(): Promise<T> =>
  get<T>(`products?limit=20&`, false);

export const getProductsBySearch = <T>(text: string): Promise<T> =>
  get<T>(`products?search=${text}&`, false);

export const postLogin = <T>(data: {
  email: string;
  password: string;
}): Promise<T> => post<T>(`auth/login/email/ext`, data);
