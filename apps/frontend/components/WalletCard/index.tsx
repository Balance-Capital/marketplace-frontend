import moment from 'moment';
import getConfig from 'next/config';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';
import { addressEllipsis } from '../../constants/helper';
import { FORMAT_DATE_TIME_DEFAULT } from '../../constants/formatDateTimeDefault';
interface IProps {
  dateUpdate: Date;
  address: string;
  name: string;
}

function WalletCard(props: IProps) {
  const { dateUpdate, address, name } = props;
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  return (
    <div className="ml-auto min-w-[350px] lg:min-w-[480px] rounded-xl bg-[rgba(116,132,157,0.05)] p-6 pb-20 flex items-start justify-between">
      <div className="flex items-start gap-4">
        <ImageWithFallback
          fallbackSrc=""
          src={`${IMAGE_HOST}/assets/images/png/${name.toLowerCase()}.png`}
          alt="down arrow"
          width={28}
          height={28}
        />
        <div className="flex flex-col gap-2">
          <span className="text-lg">{name}</span>
          <span className="text-lg">{addressEllipsis(address)}</span>
          <span className="text-sm text-secondary">
            Updated {moment(dateUpdate).format(FORMAT_DATE_TIME_DEFAULT)}
          </span>
        </div>
      </div>
      {/* <button className="text-primary text-base">Edit</button> */}
    </div>
  );
}

export default WalletCard;
