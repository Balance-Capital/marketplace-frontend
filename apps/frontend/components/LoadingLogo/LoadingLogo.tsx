import getConfig from 'next/config';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

export default function LoadingLogo() {
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative  w-fit">
        <ImageWithFallback
          fallbackSrc=""
          alt="spinner"
          width={100}
          height={100}
          src={`${IMAGE_HOST}/assets/images/gif/logo-loader-dark.gif`}
        />
      </div>
    </div>
  );
}
