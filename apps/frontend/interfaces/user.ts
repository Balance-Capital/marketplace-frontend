export enum Roles {
  ADMIN = 'admin',
  USER = 'user'
};

export interface IUser {
  role: Array<Roles>,
  balance: number,
  id: string,
  cookieId: string,
  referralCode: string,
  avatar: string 
}

export default IUser;
