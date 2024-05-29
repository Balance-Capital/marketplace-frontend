import { ITransaction } from '@monorepo/chrome-extension/msg-bridge';
import moment from 'moment';

export function Transaction({
  transactionID,
  date,
  amount,
  status,
}: ITransaction) {
  return (
    <div className="w-full h-[70px] rounded-[20px] bg-white-50 flex items-center gap-4 p-4">
      <img
        className="w-9 h-9 rounded-full"
        src={chrome.runtime.getURL('assets/png/default-profile.png')}
        alt=""
      />
      <div className="font-InterRegular flex flex-col gap-2">
        <span className="w-[170px] text-xs break-words">
          {transactionID}
        </span>
        <span className="text-xs text-secondary">
          {moment(date).format('DD/MM/YYYY')}
        </span>
      </div>
      <div className="font-InterRegular flex flex-col items-end gap-2 ml-auto">
        <span className="text-sm">+${amount}</span>
        <span
          className={`text-xs ${
            status === 'done' ? 'text-colorGreen' : 'text-colorYellow'
          }`}
        >
          {status === 'done' ? 'Done' : 'Pending'}
        </span>
      </div>
    </div>
  );
}
