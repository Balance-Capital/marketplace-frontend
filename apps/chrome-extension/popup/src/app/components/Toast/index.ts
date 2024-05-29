import { toast } from 'react-toastify';
import { ErrorIcon, InfoIcon, SuccessIcon, WarnIcon } from './icons';

function success(msg: string) {
  toast(msg, {
    icon: SuccessIcon,
    bodyClassName:
      '[&>div]:first-letter:uppercase text-base text-[#fff] font-InterRegular',
    progressClassName: 'bg-[#37AC82]',
    className: '!bg-[#14161A] items-center',
  });
}

function error(msg: string) {
  toast(msg, {
    icon: ErrorIcon,
    bodyClassName:
      '[&>div]:first-letter:uppercase text-base text-[#fff] font-InterRegular',
    progressClassName: 'bg-[#F54A6B]',
    className: '!bg-[#14161A] items-center',
  });
}

function warn(msg: string) {
  toast(msg, {
    icon: WarnIcon,
    bodyClassName:
      '[&>div]:first-letter:uppercase text-base text-[#fff] font-InterRegular',
    progressClassName: 'bg-[#FFB763]',
    className: '!bg-[#14161A] items-center',
  });
}

function info(msg: string) {
  toast(msg, {
    icon: InfoIcon,
    bodyClassName:
      '[&>div]:first-letter:uppercase text-base text-[#fff] font-InterRegular',
    progressClassName: 'bg-primary',
    className: '!bg-[#14161A] items-center',
  });
}

export const Toast = { success, info, error, warn };
