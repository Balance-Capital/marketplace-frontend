import { IReward } from '@monorepo/chrome-extension/msg-bridge';
import { atom } from 'recoil';

export const rewards = atom<IReward>({
  key: 'rewards',
  default: {} as IReward,
});
