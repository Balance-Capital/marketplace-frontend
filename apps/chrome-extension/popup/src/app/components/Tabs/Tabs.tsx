import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.css';

export default function Tabs() {
  const pathName = useLocation().pathname.split('/')[1];
  return (
    <div className={styles['container']}>
      <Link
        to="/"
        className={`${styles['tab']} ${
          pathName === ''
            ? '[&>svg>g>*]:stroke-primary'
            : '[&>svg>g>*]:hover:stroke-primary'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24.561"
          height="24.45"
          viewBox="0 0 24.561 24.45"
        >
          <g
            id="Group_14230"
            name="Group 14230"
            transform="translate(-41.006 -23.848)"
          >
            <path
              id="Subtraction_19"
              name="Subtraction 19"
              d="M6.356,21.047,1.4,16.125a4.772,4.772,0,0,1,0-6.754L9.877.953A3.21,3.21,0,0,1,12.16,0h5.606a4.8,4.8,0,0,1,4.8,4.781v5.562a3.239,3.239,0,0,1-.946,2.286l-8.472,8.419a4.805,4.805,0,0,1-6.786,0Z"
              transform="translate(42.006 24.848)"
              fill="none"
              stroke="#101417"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <ellipse
              id="Ellipse_1002"
              name="Ellipse 1002"
              cx="2.265"
              cy="2.253"
              rx="2.265"
              ry="2.253"
              transform="translate(57.073 27.563)"
              fill="none"
              stroke="#101417"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </g>
        </svg>
        <div className="h-[4px] w-[34.206px]">
          {pathName === '' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34.206"
              height="4"
              viewBox="0 0 34.206 4"
            >
              <line
                id="Line_30"
                name="Line 30"
                x2="30.206"
                transform="translate(2 2)"
                fill="none"
                stroke="#6563ff"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
          )}
        </div>
      </Link>
      <Link
        to="/search"
        className={`${styles['tab']} ${
          pathName === 'search'
            ? '[&>svg>path]:fill-primary'
            : '[&>svg>path]:hover:fill-primary'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23.76"
          height="23.617"
          viewBox="0 0 23.76 23.617"
        >
          <path
            id="Union_62"
            name="Union 62"
            d="M-1416.954-508.8l-6.106-6.074a9.739,9.739,0,0,1-6.1,2.105,9.825,9.825,0,0,1-9.839-9.787,9.825,9.825,0,0,1,9.839-9.788,9.826,9.826,0,0,1,9.842,9.788,9.615,9.615,0,0,1-2.1,6.046l6.107,6.075a.252.252,0,0,1,.073.177.251.251,0,0,1-.073.177l-1.289,1.281a.247.247,0,0,1-.176.073A.247.247,0,0,1-1416.954-508.8Zm-19.725-13.756a7.506,7.506,0,0,0,7.518,7.475,7.49,7.49,0,0,0,5.326-2.2,7.41,7.41,0,0,0,2.193-5.278,7.506,7.506,0,0,0-7.52-7.475A7.506,7.506,0,0,0-1436.679-522.552Z"
            transform="translate(1439 532.339)"
            fill="#101417"
          />
        </svg>
        <div className="h-[4px] w-[34.206px]">
          {pathName === 'search' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34.206"
              height="4"
              viewBox="0 0 34.206 4"
            >
              <line
                id="Line_30"
                name="Line 30"
                x2="30.206"
                transform="translate(2 2)"
                fill="none"
                stroke="#6563ff"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
          )}
        </div>
      </Link>
      <Link
        to="/stores"
        className={`${styles['tab']} ${
          pathName === 'stores'
            ? '[&>svg>path]:fill-primary'
            : '[&>svg>path]:hover:fill-primary'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24.811"
          height="23.45"
          viewBox="0 0 24.811 23.45"
        >
          <path
            id="Path_4087"
            data-name="Path 4087"
            d="M24.116,4.8l-.026-.037L21.72,1.015A2.176,2.176,0,0,0,19.875,0H4.934A2.179,2.179,0,0,0,3.088,1.015L.691,4.8a4.272,4.272,0,0,0,1.244,5.9c.027.017.055.035.083.051v9.676A3.009,3.009,0,0,0,4.994,23.45H19.746a2.989,2.989,0,0,0,2.972-3.011V10.808a4.265,4.265,0,0,0,1.4-6M15.859,21.45h-7.2V17.2a2.009,2.009,0,0,1,2.006-2h3.185a2.009,2.009,0,0,1,2.006,2Zm4.859-.982a.98.98,0,0,1-.974.982H17.859V17.2a4.013,4.013,0,0,0-4.006-4H10.668a4.013,4.013,0,0,0-4.006,4v4.25H5.005a1,1,0,0,1-.987-1.01V11.38a4.7,4.7,0,0,0,2.921-.874,4.687,4.687,0,0,0,5.46,0,4.693,4.693,0,0,0,5.466,0,4.689,4.689,0,0,0,2.853.877ZM22.4,8.443a2.231,2.231,0,0,1-1.422.917A2.722,2.722,0,0,1,18.607,8.5a1,1,0,0,0-.739-.33h0a1,1,0,0,0-.738.325c-.063.068-.129.135-.2.2A2.684,2.684,0,0,1,13.142,8.5a1,1,0,0,0-.742-.33h0a1,1,0,0,0-.741.329c-.062.068-.127.133-.194.194A2.684,2.684,0,0,1,7.682,8.5,1,1,0,0,0,6.2,8.5a2.673,2.673,0,0,1-1.98.882,3.358,3.358,0,0,1-.342-.019,2.264,2.264,0,0,1-1.5-3.48l2.4-3.8A.184.184,0,0,1,4.934,2H19.875a.182.182,0,0,1,.155.085l2.4,3.8c.011.019.024.037.036.054a2.265,2.265,0,0,1-.071,2.5"
            fill="#101417"
          />
        </svg>
        <div className="h-[4px] w-[34.206px]">
          {pathName === 'stores' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34.206"
              height="4"
              viewBox="0 0 34.206 4"
            >
              <line
                id="Line_30"
                name="Line 30"
                x2="30.206"
                transform="translate(2 2)"
                fill="none"
                stroke="#6563ff"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
          )}
        </div>
      </Link>
      {/* <div
        className={`${styles['tab']} ${
          pathName === 'wishlist'
            ? '[&>svg>g>path]:stroke-primary'
            : '[&>svg>g>path]:hover:stroke-primary'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25.97"
          height="23.674"
          viewBox="0 0 25.97 23.674"
        >
          <g id="Group_14207" name="Group 14207" transform="translate(1 1.017)">
            <path
              id="_9041831_heart_icon"
              name="9041831_heart_icon"
              d="M11.919,3.61c-.832-4.136-7.226-4.4-9.983-1.655a7.33,7.33,0,0,0,0,9.927l9.983,9.927L21.9,11.883a6.992,6.992,0,0,0,0-9.927C19.323-.609,12.751-.526,11.919,3.61Z"
              transform="translate(0 -0.153)"
              fill="none"
              stroke="#101417"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </g>
        </svg>
        {pathName === 'wishlist' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34.206"
            height="4"
            viewBox="0 0 34.206 4"
          >
            <line
              id="Line_30"
              name="Line 30"
              x2="30.206"
              transform="translate(2 2)"
              fill="none"
              stroke="#6563ff"
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>
        ) : (
          <div></div>
        )}
      </div> */}
      <Link
        to="/profile"
        className={`${styles['tab']} ${
          pathName === 'profile'
            ? '[&>svg>path]:stroke-primary'
            : '[&>svg>path]:hover:stroke-primary'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22.886"
          height="24.255"
          viewBox="0 0 22.886 24.255"
        >
          <path
            id="_9041988_user_male_icon"
            name="9041988_user_male_icon"
            d="M10.943.5A4.463,4.463,0,0,0,6.468,4.951V7.918a4.476,4.476,0,0,0,8.951,0V4.951A4.463,4.463,0,0,0,10.943.5ZM.5,21.271v-1.08c0-4.727,5.5-7.822,10.443-7.822s10.443,3.094,10.443,7.822v1.08a1.488,1.488,0,0,1-1.492,1.484H1.992A1.488,1.488,0,0,1,.5,21.271Z"
            transform="translate(0.5 0.5)"
            fill="none"
            stroke="#101417"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
        <div className="h-[4px] w-[34.206px]">
          {pathName === 'profile' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34.206"
              height="4"
              viewBox="0 0 34.206 4"
            >
              <line
                id="Line_30"
                name="Line 30"
                x2="30.206"
                transform="translate(2 2)"
                fill="none"
                stroke="#6563ff"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
          )}
        </div>
      </Link>
    </div>
  );
}
