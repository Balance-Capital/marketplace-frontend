import getConfig from 'next/config';
import Link from 'next/link';
import {
  IFeatureRetailer,
  ISimilarCoupons,
} from '../../interfaces/storeDomain';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

interface IProps {
  header: string;
  data: Array<ISimilarCoupons | IFeatureRetailer>;
}

function BoxInfo(props: IProps) {
  const { header, data } = props;
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  return (
    <div className="order-3 md:order-2 1xl:order-3 w-[352px] h-[540px] 1xl:w-[468px] 1xl:h-[637px] rounded-2xl shadow-3xl">
      <span className="flex items-center justify-center w-full p-11 font-PPNeueMachina text-[21px] 1xl:text-[28px] border-b-2 border-[rgba(185,184,189,0.2)]">
        {header}
      </span>
      <div className="flex flex-col pl-12 1xl:pl-16 p-7 1xl:p-12 gap-6">
        {data?.map((v, i) => (
          <Link key={i} href={`/site/${v?.domain}`}>
            <div className="flex items-center gap-4 cursor-pointer">
              <ImageWithFallback
                src={`${IMAGE_HOST}/${v?.logo}`}
                width={55}
                height={55}
                alt="store logo"
                fallbackSrc="/assets/imgs/store-default.png"             
              />
              <span className="font-InterRegular text-[17px] 1xl:text-[20px]">
                {v?.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default BoxInfo;
