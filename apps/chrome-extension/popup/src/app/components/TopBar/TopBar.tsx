import { environment } from '../../../environments/environment';
import BackIcon from '../BackIcon/BackIcon';
import CloseIcon from '../CloseIcon/CloseIcon';
import styles from './index.module.css';

export function TopBar({
  isBack,
  hexColor,
  bgColor,
  title,
  titleColor,
}: {
  isBack: boolean;
  hexColor: string;
  bgColor: string;
  title?: string;
  titleColor?: string;
}) {
  return (
    <div className={`${bgColor} ${styles['container']}`}>
      {isBack ? (
        <BackIcon hexColor={hexColor} />
      ) : (
        <div className="w-[26.624px]"></div>
      )}
      {title ? (
        <h1 className={`font-PPNeueMachina text-xl pt-1 ${titleColor}`}>
          {title}
        </h1>
      ) : (
        <a href={environment.SITE_URL} target="_blank" rel="noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="24.763"
            viewBox="0 0 32 24.763"
          >
            <path
              id="Union_61"
              data-name="Union 61"
              d="M4.744,24.763,0,10.043.8,7.4H7.572L11.85,0l2.443,1.407L10.827,7.4c1.638,0,9.089.011,9.065,0h1.279L17.707,1.407,20.149,0l4.278,7.4H31.2l.8,3.01L27.256,24.763Zm2.137-2.787H25.119l4-11.793H2.877Zm13.338-4.764v-3.2H23.41v3.2Zm-11.647,0v-3.2h3.192v3.2Z"
              fill="#000"
            />
          </svg>
        </a>
      )}
      <CloseIcon hexColor={hexColor} />
    </div>
  );
}
