import { environment } from '../../../../../environments/environment';
import { Link } from 'react-router-dom';
import { TopBar } from '../../../../components/TopBar/TopBar';
import styles from './index.module.css';
import {
  Generic,
  PopupBroker,
  Segment,
  To,
} from '@monorepo/chrome-extension/msg-bridge';

export default function Settings() {
  const onLogout = () => {
    chrome.storage.local.set({ [Generic.GetAuthToken]: null });
    chrome.storage.local.get([Generic.UserInfo], function (result) {
      if (Object.keys(result).length && result[Generic.UserInfo]) {
        PopupBroker.dispatch(
          Generic.PostSegment,
          {
            url: Segment.TRACK_API,
            info: {
              userId: result[Generic.UserInfo]?.userId,
              event: Segment.LOGGED_OUT_EVENT,
            },
          },
          To.Background,
          false
        );
      }
      chrome.storage.local.set({ [Generic.UserInfo]: null });
    });
  };

  return (
    <div className={styles['container']}>
      <TopBar
        hexColor="#F3F3F4"
        title={chrome.i18n.getMessage('settingsPageTitle')}
        titleColor="text-white-100"
        isBack={true}
        bgColor="bg-black"
      />
      <div className="h-[480px] overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col items-center justify-center font-InterRegular text-base text-black">
          <Link
            to="user-profile"
            className="w-full h-[71px] bg-white-50 border-solid border-b-2 border-[rgba(112,112,112,0.1)] flex items-center gap-4 px-4 [&>svg>path]:hover:stroke-primary hover:text-primary cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.98"
              height="23.443"
              viewBox="0 0 21.98 23.443"
            >
              <path
                id="_9041988_user_male_icon"
                name="9041988_user_male_icon"
                d="M10.74.5A4.389,4.389,0,0,0,6.351,4.889V7.814a4.389,4.389,0,0,0,8.777,0V4.889A4.389,4.389,0,0,0,10.74.5ZM.5,20.98V19.915C.5,15.253,5.893,12.2,10.74,12.2s10.24,3.051,10.24,7.712V20.98a1.463,1.463,0,0,1-1.463,1.463H1.963A1.463,1.463,0,0,1,.5,20.98Z"
                transform="translate(0.25 0.25)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
            <span>Profile</span>
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="8.374"
              height="15.247"
              viewBox="0 0 8.374 15.247"
            >
              <path
                id="_9041783_chevron_left_icon"
                data-name="9041783_chevron_left_icon"
                d="M6.563,13.126,0,6.563,6.563,0"
                transform="translate(7.624 14.187) rotate(180)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
          <Link
            to="rewards"
            className="w-full h-[71px] bg-white-50 border-solid border-b-2 border-[rgba(112,112,112,0.1)] flex items-center gap-4 px-4 [&>svg>g>path]:hover:stroke-primary [&>svg>path]:hover:stroke-primary hover:text-primary cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25.088"
              height="20.926"
              viewBox="0 0 25.088 20.926"
            >
              <g
                id="_9041697_coins_icon_3_"
                name="9041697_coins_icon (3)"
                transform="translate(0.75 0.75)"
              >
                <path
                  id="Path_4084"
                  name="Path 4084"
                  d="M22.926,8.5v4.163c0,1.8-4.349,4.163-9.713,4.163S3.5,14.466,3.5,12.663V9.194"
                  transform="translate(0.663 2.6)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_4085"
                  name="Path 4085"
                  d="M3.794,10.414C4.994,12.007,8.706,13.5,13.1,13.5c5.364,0,9.713-2.227,9.713-4.143,0-1.075-1.369-2.253-3.519-3.08"
                  transform="translate(0.777 1.739)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_4086"
                  name="Path 4086"
                  d="M19.926,3.5V7.663c0,1.8-4.349,4.163-9.713,4.163S.5,9.466.5,7.663V3.5"
                  transform="translate(-0.5 0.663)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_4087"
                  name="Path 4087"
                  d="M10.213,8.8c5.364,0,9.713-2.227,9.713-4.143S15.577.5,10.213.5.5,2.744.5,4.659,4.849,8.8,10.213,8.8Z"
                  transform="translate(-0.5 -0.5)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
              </g>
            </svg>
            <span>Rewards</span>
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="8.374"
              height="15.247"
              viewBox="0 0 8.374 15.247"
            >
              <path
                id="_9041783_chevron_left_icon"
                name="9041783_chevron_left_icon"
                d="M6.563,13.126,0,6.563,6.563,0"
                transform="translate(7.624 14.187) rotate(180)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
          <Link
            to="referrals"
            className="w-full h-[71px] bg-white-50 border-solid border-b-2 border-[rgba(112,112,112,0.1)] flex items-center gap-4 px-4 [&>svg>g>path]:hover:stroke-primary [&>svg>path]:hover:stroke-primary hover:text-primary cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24.938"
              height="24.008"
              viewBox="0 0 24.938 24.008"
            >
              <g
                id="Group_14064"
                name="Group 14064"
                transform="translate(0.75 0.785)"
              >
                <path
                  id="Path_3964"
                  name="Path 3964"
                  d="M1.5,6.5H21.59v8.371a3.348,3.348,0,0,1-3.348,3.348H4.848A3.348,3.348,0,0,1,1.5,14.871Z"
                  transform="translate(0.174 4.254)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3965"
                  name="Path 3965"
                  d="M7.5,3.5V20.242"
                  transform="translate(4.219 2.231)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3966"
                  name="Path 3966"
                  d="M7.2,5.808h5.022V2.46C12.219-.052,8.5-.522,7.2.785A3.706,3.706,0,0,0,7.2,5.808Zm10.045,0H12.219V2.46c0-2.511,3.715-2.982,5.022-1.674A3.706,3.706,0,0,1,17.242,5.808Zm-15.067,0h20.09a1.674,1.674,0,0,1,1.674,1.674V9.156a1.674,1.674,0,0,1-1.674,1.674H2.174A1.674,1.674,0,0,1,.5,9.156V7.482A1.674,1.674,0,0,1,2.174,5.808Z"
                  transform="translate(-0.5 -0.077)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
              </g>
            </svg>
            <span>Referrals</span>
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="8.374"
              height="15.247"
              viewBox="0 0 8.374 15.247"
            >
              <path
                id="_9041783_chevron_left_icon"
                name="9041783_chevron_left_icon"
                d="M6.563,13.126,0,6.563,6.563,0"
                transform="translate(7.624 14.187) rotate(180)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
          {/* <div className="w-full h-[71px] bg-white-50 border-solid border-b-2 border-[rgba(112,112,112,0.1)] flex items-center gap-4 px-4 [&>svg>g>g>path:nth-child(2)]:hover:fill-primary [&>svg>g>g]:hover:stroke-primary [&>svg>path]:hover:stroke-primary hover:text-primary cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23.975"
              height="23.974"
              viewBox="0 0 23.975 23.974"
            >
              <g
                id="Group_14070"
                name="Group 14070"
                transform="translate(1.5 1.5)"
              >
                <g
                  id="Path_3967"
                  name="Path 3967"
                  transform="translate(-0.5 -0.5)"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillRule="evenodd"
                >
                  <path
                    d="M10.987.5a10.572,10.572,0,0,1,1.549.114L13.3,2.92a8.341,8.341,0,0,1,1.889.8l2.187-1.054a10.549,10.549,0,0,1,2.044,2.08L18.325,6.917a8.337,8.337,0,0,1,.769,1.9l2.292.8a10.622,10.622,0,0,1-.025,2.919l-2.306.761a8.341,8.341,0,0,1-.8,1.889l1.054,2.187a10.549,10.549,0,0,1-2.08,2.044l-2.168-1.093a8.337,8.337,0,0,1-1.9.769l-.8,2.292a10.622,10.622,0,0,1-2.919-.025l-.761-2.306a8.341,8.341,0,0,1-1.889-.8L4.6,19.307a10.549,10.549,0,0,1-2.044-2.08l1.093-2.168a8.337,8.337,0,0,1-.769-1.9l-2.292-.8A10.622,10.622,0,0,1,.614,9.438L2.92,8.677a8.341,8.341,0,0,1,.8-1.889L2.668,4.6a10.549,10.549,0,0,1,2.08-2.044L6.917,3.649a8.337,8.337,0,0,1,1.9-.769l.8-2.292A10.586,10.586,0,0,1,10.987.5Z"
                    stroke="none"
                  />
                  <path
                    d="M 10.98729228973389 0.5 C 10.52371215820312 0.5 10.06714248657227 0.5300807952880859 9.619462013244629 0.5883903503417969 L 8.8197021484375 2.880149841308594 C 8.148542404174805 3.059141159057617 7.510501861572266 3.319259643554688 6.916702270507812 3.649351119995117 L 4.748531341552734 2.556680679321289 C 3.963811874389648 3.138349533081055 3.263141632080078 3.826971054077148 2.668062210083008 4.600990295410156 L 3.722202301025391 6.788350105285645 C 3.381523132324219 7.376510620117188 3.110231399536133 8.009880065917969 2.919502258300781 8.677240371704102 L 0.6136322021484375 9.438100814819336 C 0.5387725830078125 9.94364070892334 0.5000019073486328 10.46094036102295 0.5000019073486328 10.98729038238525 C 0.5000019073486328 11.45087051391602 0.5300827026367188 11.90743064880371 0.5883922576904297 12.35512065887451 L 2.880151748657227 13.15488052368164 C 3.05914306640625 13.82604026794434 3.31926155090332 14.46409034729004 3.64935302734375 15.05788040161133 L 2.556692123413086 17.22605133056641 C 3.138351440429688 18.01078033447266 3.826972961425781 18.71145057678223 4.601001739501953 19.30652046203613 L 6.788352012634277 18.25238990783691 C 7.376522064208984 18.59305953979492 8.009881973266602 18.86434936523438 8.677242279052734 19.05508995056152 L 9.438102722167969 21.3609504699707 C 9.943642616271973 21.43581008911133 10.46094226837158 21.47458076477051 10.98729228973389 21.47458076477051 C 11.45139217376709 21.47458076477051 11.90845203399658 21.4444408416748 12.35662269592285 21.38599967956543 L 13.1563720703125 19.09403038024902 C 13.82699203491211 18.91506004333496 14.46453285217285 18.65508079528809 15.05788230895996 18.32522964477539 L 17.22605133056641 19.41790008544922 C 18.01078224182129 18.83623123168945 18.71145248413086 18.14760971069336 19.30652236938477 17.37359046936035 L 18.25239181518555 15.18622970581055 C 18.59306335449219 14.59807014465332 18.86435317993164 13.9647102355957 19.05508232116699 13.29734039306641 L 21.36095237731934 12.53647994995117 C 21.43581199645996 12.03094005584717 21.47458267211914 11.51364994049072 21.47458267211914 10.98729038238525 C 21.47458267211914 10.52319049835205 21.44443321228027 10.06613063812256 21.3859920501709 9.61797046661377 L 19.09403228759766 8.818210601806641 C 18.91505241394043 8.147600173950195 18.65508270263672 7.510050773620605 18.32523155212402 6.91670036315918 L 19.41790199279785 4.748529434204102 C 18.83623123168945 3.963809967041016 18.14761161804199 3.263139724731445 17.37358283996582 2.668060302734375 L 15.18623161315918 3.722200393676758 C 14.59807205200195 3.38153076171875 13.96470260620117 3.1102294921875 13.29734230041504 2.919500350952148 L 12.5364818572998 0.6136302947998047 C 12.0309419631958 0.5387802124023438 11.51364231109619 0.5 10.98729228973389 0.5 M 10.98729228973389 -1 C 11.57929229736328 -1 12.1744327545166 -0.956329345703125 12.75617218017578 -0.8701896667480469 C 13.31710243225098 -0.787139892578125 13.78325271606445 -0.3948802947998047 13.96094226837158 0.1436100006103516 L 14.48592185974121 1.734619140625 C 14.73246955871582 1.827905654907227 14.9752025604248 1.931062698364258 15.21363925933838 2.043888092041016 L 16.72237205505371 1.316789627075195 C 17.23291206359863 1.07075309753418 17.83853149414062 1.133462905883789 18.28783226013184 1.478879928588867 C 19.17273330688477 2.159200668334961 19.95838165283203 2.958740234375 20.6229419708252 3.855300903320312 C 20.96048164367676 4.310661315917969 21.01251220703125 4.917409896850586 20.75741195678711 5.423589706420898 L 20.00379180908203 6.918991088867188 C 20.11206436157227 7.158692359924316 20.21071815490723 7.402677536010742 20.29942893981934 7.650130271911621 L 21.88018226623535 8.201720237731934 C 22.41572189331055 8.388590812683105 22.80005264282227 8.861560821533203 22.8734016418457 9.424010276794434 C 22.94054222106934 9.93889045715332 22.97458267211914 10.46485042572021 22.97458267211914 10.98729038238525 C 22.97458267211914 11.57937049865723 22.93091201782227 12.17452049255371 22.84477233886719 12.75620079040527 C 22.7617130279541 13.31712055206299 22.36945152282715 13.78326034545898 21.83097267150879 13.96094036102295 L 20.23996925354004 14.48591804504395 C 20.14668273925781 14.73246669769287 20.04352188110352 14.9752082824707 19.93069839477539 15.21364402770996 L 20.65779304504395 16.72238922119141 C 20.90383148193359 17.23291969299316 20.84112167358398 17.83854103088379 20.49570274353027 18.28783988952637 C 19.81538200378418 19.1727409362793 19.01584243774414 19.9583911895752 18.11928176879883 20.62294960021973 C 17.66391372680664 20.96047973632812 17.05717277526855 21.01251029968262 16.55099296569824 20.75741004943848 L 15.05559539794922 20.00379180908203 C 14.81588649749756 20.11206817626953 14.57191371917725 20.21072006225586 14.324462890625 20.29943084716797 L 13.77288246154785 21.88018035888672 C 13.58600234985352 22.41572952270508 13.11303234100342 22.80006980895996 12.55057239532471 22.87341117858887 C 11.45233249664307 23.0166130065918 10.31336498260498 23.00692367553711 9.218381881713867 22.84477043151855 C 8.657462120056152 22.76171112060547 8.191322326660156 22.36944961547852 8.013642311096191 21.83098030090332 L 7.48865795135498 20.23996543884277 C 7.242158889770508 20.14669609069824 6.999334335327148 20.04349708557129 6.760945320129395 19.93070030212402 L 5.252212524414062 20.65779113769531 C 4.741672515869141 20.90382957458496 4.136064529418945 20.84112167358398 3.686761856079102 20.4957103729248 C 2.801841735839844 19.81538963317871 2.016191482543945 19.01584053039551 1.351633071899414 18.11927032470703 C 1.01411247253418 17.66390037536621 0.9620914459228516 17.05717086791992 1.217172622680664 16.55099105834961 L 1.970788955688477 15.05558395385742 C 1.86229133605957 14.81538391113281 1.76344108581543 14.57085990905762 1.674589157104492 14.32288551330566 L 0.0941619873046875 13.77136039733887 C -0.441436767578125 13.58445072174072 -0.8257770538330078 13.1113805770874 -0.8990478515625 12.54885005950928 C -0.9660282135009766 12.0345401763916 -0.9999980926513672 11.50915050506592 -0.9999980926513672 10.98729038238525 C -0.9999980926513672 10.39521026611328 -0.9563274383544922 9.800060272216797 -0.8701877593994141 9.218379974365234 C -0.7871284484863281 8.65746021270752 -0.394866943359375 8.191320419311523 0.1436119079589844 8.013640403747559 L 1.734622955322266 7.488659858703613 C 1.827892303466797 7.242154121398926 1.931089401245117 6.999329566955566 2.043888092041016 6.760937690734863 L 1.316791534423828 5.252201080322266 C 1.07075309753418 4.741661071777344 1.133462905883789 4.136030197143555 1.478891372680664 3.686729431152344 C 2.159212112426758 2.801839828491211 2.958751678466797 2.016201019287109 3.855302810668945 1.351640701293945 C 4.310663223266602 1.01409912109375 4.917411804199219 0.9620723724365234 5.423591613769531 1.217170715332031 L 6.91899299621582 1.970790863037109 C 7.159193992614746 1.862295150756836 7.40372371673584 1.76344108581543 7.65169620513916 1.674592971801758 L 8.203222274780273 0.09416007995605469 C 8.390131950378418 -0.4414386749267578 8.863202095031738 -0.8257789611816406 9.425722122192383 -0.8990497589111328 C 9.940032005310059 -0.9660301208496094 10.46542263031006 -1 10.98729228973389 -1 Z"
                    stroke="none"
                    fill="#000"
                  />
                </g>
                <g
                  id="Ellipse_960"
                  name="Ellipse 960"
                  transform="translate(5.957 5.957)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <ellipse
                    cx="4.539"
                    cy="4.539"
                    rx="4.539"
                    ry="4.539"
                    stroke="none"
                  />
                  <ellipse
                    cx="4.539"
                    cy="4.539"
                    rx="3.789"
                    ry="3.789"
                    fill="none"
                  />
                </g>
              </g>
            </svg>
            <span>Settings</span>
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="8.374"
              height="15.247"
              viewBox="0 0 8.374 15.247"
            >
              <path
                id="_9041783_chevron_left_icon"
                name="9041783_chevron_left_icon"
                d="M6.563,13.126,0,6.563,6.563,0"
                transform="translate(7.624 14.187) rotate(180)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div> */}
          <a
            href={environment.SUPPORT_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full h-[71px] bg-white-50 border-solid border-b-2 border-[rgba(112,112,112,0.1)] flex items-center gap-4 px-4 [&>svg>g>path]:hover:stroke-primary [&>svg>path]:hover:stroke-primary hover:text-primary cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18.655"
              height="23.802"
              viewBox="0 0 18.655 23.802"
            >
              <g
                id="Group_14072"
                name="Group 14072"
                transform="translate(0.75 0.75)"
              >
                <path
                  id="Path_3968"
                  name="Path 3968"
                  d="M.5,21.371V2.5"
                  transform="translate(-0.5 0.931)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3969"
                  name="Path 3969"
                  d="M.5,3.931A5.5,5.5,0,0,1,5.647.5c3.431,0,3.431,3.431,6.862,3.431a6.99,6.99,0,0,0,5.147-1.716V12.509a6.99,6.99,0,0,1-5.147,1.716c-3.431,0-3.431-3.431-6.862-3.431A5.5,5.5,0,0,0,.5,14.224Z"
                  transform="translate(-0.5 -0.5)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
              </g>
            </svg>
            <span>Support</span>
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="8.374"
              height="15.247"
              viewBox="0 0 8.374 15.247"
            >
              <path
                id="_9041783_chevron_left_icon"
                name="9041783_chevron_left_icon"
                d="M6.563,13.126,0,6.563,6.563,0"
                transform="translate(7.624 14.187) rotate(180)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </a>
          <a
            href={environment.EXTENSION_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full h-[71px] bg-white-50 border-solid border-b-2 border-[rgba(112,112,112,0.1)] flex items-center gap-4 px-4 [&>svg>g>path:nth-child(2)]:hover:fill-primary [&>svg>path]:hover:stroke-primary hover:text-primary cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23.627"
              height="23.77"
              viewBox="0 0 23.627 23.77"
            >
              <g
                id="_9041922_star_icon"
                name="9041922_star_icon"
                transform="translate(1 1)"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M10.814,16.82,3.447,21.27l2.947-7.612L.5,7.918H7.867L10.814.5,13.76,7.918h7.367l-5.893,5.934L18.18,21.27Z"
                  stroke="none"
                />
                <path
                  d="M 18.18033981323242 21.27048110961914 L 15.23361015319824 13.85245132446289 L 21.12705993652344 7.918031692504883 L 13.76025009155273 7.918031692504883 L 10.81352996826172 0.5000014901161194 L 7.866809844970703 7.918031692504883 L 0.4999999701976776 7.918031692504883 L 6.393449783325195 13.65810108184814 L 3.446719884872437 21.27048110961914 L 10.81352996826172 16.81966209411621 L 18.18033981323242 21.27048110961914 M 3.446981430053711 22.7704906463623 C 3.102115154266357 22.77049255371094 2.759210586547852 22.65179252624512 2.482320070266724 22.41936111450195 C 1.990859985351562 22.00682067871094 1.816239953041077 21.32737159729004 2.047869920730591 20.7289924621582 L 4.636759757995605 14.04103183746338 L -0.5465900301933289 8.992581367492676 C -0.9837800264358521 8.56676197052002 -1.119400024414062 7.918521404266357 -0.8895700573921204 7.353151321411133 C -0.6597500443458557 6.787791728973389 -0.11029002815485 6.418031692504883 0.4999999701976776 6.418031692504883 L 6.848651885986328 6.418031692504883 L 9.419489860534668 -0.05375849083065987 C 9.64640998840332 -0.6250084638595581 10.1988697052002 -0.9999985098838806 10.81352996826172 -0.9999985098838806 C 11.42819023132324 -0.9999985098838806 11.98064994812012 -0.6250084638595581 12.20757007598877 -0.05375849083065987 L 14.77840805053711 6.418031692504883 L 21.12705993652344 6.418031692504883 C 21.73280906677246 6.418031692504883 22.27910041809082 6.782371520996094 22.51188087463379 7.341611385345459 C 22.74465942382812 7.90084171295166 22.61823081970215 8.545201301574707 22.1913890838623 8.975011825561523 L 16.9904842376709 14.21207237243652 L 19.57438087463379 20.71671104431152 C 19.81216049194336 21.31529235839844 19.64126968383789 21.99885177612305 19.1497802734375 22.41511154174805 C 18.65829849243164 22.83137130737305 17.95593070983887 22.88740730285645 17.40465927124023 22.55435180664062 L 10.81352996826172 18.57217597961426 L 4.222400188446045 22.55435180664062 C 3.982627868652344 22.69921493530273 3.714214563369751 22.7704906463623 3.446981430053711 22.7704906463623 Z"
                  stroke="none"
                  fill="#000"
                />
              </g>
            </svg>
            <span>Rate us</span>
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="8.374"
              height="15.247"
              viewBox="0 0 8.374 15.247"
            >
              <path
                id="_9041783_chevron_left_icon"
                name="9041783_chevron_left_icon"
                d="M6.563,13.126,0,6.563,6.563,0"
                transform="translate(7.624 14.187) rotate(180)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </a>
          <div
            onClick={() => onLogout()}
            className="w-full h-[71px] bg-white-50 border-solid border-b-2 border-[rgba(112,112,112,0.1)] flex items-center gap-4 px-4 [&>svg>g>path]:hover:stroke-primary [&>svg>path]:hover:stroke-primary hover:text-primary cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22.587"
              height="24.204"
              viewBox="0 0 22.587 24.204"
            >
              <g
                id="Group_14243"
                name="Group 14243"
                transform="translate(-15.25 -520.271)"
              >
                <path
                  id="Path_3978"
                  name="Path 3978"
                  d="M10.6,14.232l4.712-4.866L10.6,4.5"
                  transform="translate(21.78 523.009)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3979"
                  name="Path 3979"
                  d="M19.1,7.5H4.5"
                  transform="translate(17.988 524.875)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3980"
                  name="Path 3980"
                  d="M16.721.5,3.744.5A3.247,3.247,0,0,0,.5,3.749V19.96A3.244,3.244,0,0,0,3.744,23.2H16.875"
                  transform="translate(15.5 520.521)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fillRule="evenodd"
                />
              </g>
            </svg>
            <span>Logout</span>
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="8.374"
              height="15.247"
              viewBox="0 0 8.374 15.247"
            >
              <path
                id="_9041783_chevron_left_icon"
                name="9041783_chevron_left_icon"
                d="M6.563,13.126,0,6.563,6.563,0"
                transform="translate(7.624 14.187) rotate(180)"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="w-full h-[71px] bg-white-50 flex items-center justify-center text-xs text-TxtColor">
            {chrome.i18n.getMessage('copyRight')}
          </div>
        </div>
      </div>
    </div>
  );
}
