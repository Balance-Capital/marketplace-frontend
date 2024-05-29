import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '../../../components/CloseIcon/CloseIcon';
import ImgWithFallback from '../../../components/ImgWithFallback/ImgWithFallback';
import { environment } from '../../../../environments/environment';

export function TitleBar({
  storeName,
  storeLogo,
  setToggleRef,
}: {
  storeName: string;
  storeLogo: string;
  setToggleRef: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={'h-[64px] flex items-center justify-between bg-black p-4'}>
      <div className="w-[26.624px]"></div>
      <ImgWithFallback
        className="w-[44px] h-[44px] rounded-xl"
        src={`${environment.IMAGE_HOST_CDN}/${storeLogo}`}
        fallback={'/assets/png/store-default.png'}
        alt={storeName}
      />
      <CloseIcon hexColor="#f3f3f4" setToggleRef={setToggleRef} />
    </div>
  );
}
