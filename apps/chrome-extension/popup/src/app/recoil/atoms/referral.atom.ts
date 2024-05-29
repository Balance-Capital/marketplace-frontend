import { IReferral } from '@monorepo/chrome-extension/msg-bridge';
import { atom } from 'recoil';

export const referrals = atom<IReferral>({
  key: 'referrals',
  default: {} as IReferral,
});
