import getConfig from 'next/config';
import ImageWithFallback from '../ImgWithFallback/ImgWithFallback';

interface IProps {
  className: string;
  text: string;
}

function ChromeExtBtn(props: IProps) {
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  return (
    <>
      <a
        href={publicRuntimeConfig.EXTENSION_URL}
        target="_blank"
        className={`w-full h-full text-white xl:text-base lg:text-sm text-xs px-2 py-4 flex items-center justify-center rounded-full ${props.className}`}
        rel="noreferrer"
      >
        <div className="relative w-4 h-4 2xl:w-6 2xl:h-6 mr-2">
          <ImageWithFallback
            fallbackSrc=""
            src={`${IMAGE_HOST}/assets/images/svg/chrome-extension.svg`}
            alt="search icon"
            layout="fill"
            objectFit="cover" width={0} height={0}          />
        </div>
        <p>{props.text}</p>
      </a>
    </>
  );
}

export default ChromeExtBtn;
