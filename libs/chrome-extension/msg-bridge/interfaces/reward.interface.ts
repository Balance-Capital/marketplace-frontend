export interface ITransaction {
  type: string;
  amount: number;
  date: Date;
  transactionID: string;
  status: string;
}

export interface IReward {
  availableEarnings: number;
  pendingEarnings: number;
  totalEarnings: number;
  transactions: Array<ITransaction>;
  currency: string;
}
