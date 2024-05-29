interface IUses {
  refBonus: string;
  satus: string;
  referral: string;
  clickUrl: string;
  created: Date;
}

export interface IReferral {
  availableRewards: number;
  clicked: number;
  joined: number;
  pagination: {
    page: number;
    limit: number;
    pages: number;
    total: number;
    next: number;
    prev: number;
  };
  pendingRewards: number;
  referral: string;
  uses: Array<IUses>;
}
