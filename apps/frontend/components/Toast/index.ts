import { toast } from 'react-toastify';
import { ErrorIcon, InfoIcon, SuccessIcon, WarnIcon } from './icons';

function success(msg: string) {
  toast.success(msg, {
    position: 'bottom-left',
    progressClassName: 'h-[10px] bg-[#37AC82]',
    icon: SuccessIcon,
    className:
      'w-full md:w-[440px] h-[85px] lg:h-[95px] bg-[#14161A] font-InterRegular text-base text-white rounded-[10px] m-0 mb-2 items-center',
  });
}

function error(msg: string) {
  toast.error(msg, {
    position: 'bottom-left',
    progressClassName: 'h-[10px] bg-[#F54A6B]',
    icon: ErrorIcon,
    className:
      'w-full md:w-[440px] h-[85px] lg:h-[95px] bg-[#14161A] font-InterRegular text-base text-white rounded-[10px] m-0 mb-2 items-center',
  });
}

function warn(msg: string) {
  toast.warn(msg, {
    position: 'bottom-left',
    progressClassName: 'h-[10px] bg-[#FFB763]',
    icon: WarnIcon,
    className:
      'w-full md:w-[440px] h-[85px] lg:h-[95px] bg-[#14161A] font-InterRegular text-base text-white rounded-[10px] m-0 mb-2 items-center',
  });
}

function info(msg: string) {
  toast.info(msg, {
    position: 'bottom-left',
    progressClassName: 'h-[10px] bg-primary',
    icon: InfoIcon,
    className:
      'w-full md:w-[440px] h-[85px] lg:h-[95px] bg-[#14161A] font-InterRegular text-base text-white rounded-[10px] m-0 mb-2 items-center',
  });
}

export const Toast = { success, info, error, warn };
