import { IWallet } from './wallet.interface';

export interface ISettings {
  userId: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  wallets: IWallet[];
}
