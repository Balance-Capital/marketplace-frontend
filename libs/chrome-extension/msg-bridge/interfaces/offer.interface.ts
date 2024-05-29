export interface IOffer {
  id: string;
  code: string;
  currency: string;
  description: string;
  title: string;
  stars: number;
  startDate: string;
  validDate: string;
  value: number;
  valueType: string;
  verified: boolean;
  saving: string;
  savingType: string;
  redirectUrl: string;
}
