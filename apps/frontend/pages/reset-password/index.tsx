import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { NavbarFooterContext } from '../../components/Layout';
import { Toast } from '../../components/Toast';
import { useRollbar } from '@rollbar/react';

export default function Index() {
  const router = useRouter();
  const logger = useRollbar();

  const [isReset, setIsReset] = useState(false);
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);

  const [inputType, setInputType] = useState('password');
  const [inputType1, setInputType1] = useState('password');

  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])

  const toggleInputType = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const toggleInputType1 = () => {
    inputType1 === 'password'
      ? setInputType1('text')
      : setInputType1('password');
  };

  const getBorderCurrentState = (val) => {
    switch (val) {
      case 1:
        return 'border-2 bg-[rgba(116,132,157,0.05)] border-[#37AC82]';
      case 2:
        return 'border-2 bg-[rgba(116,132,157,0.05)] border-[#ff3340]';
      default:
        return 'bg-[#F3F3F4] border-solid border-2 border-[rgba(112,112,112,0.1)]';
    }
  };

  const sendPasswordReset= () => {
    const {resetPasswordToken, sign} = router.query;
    fetch(`/api/reset-password?resetPasswordToken=${resetPasswordToken}&password=${password}&sign=${sign}`)
      .then((result) => {
        if(result?.status === 200) {
          Toast.success('Password is changed'); 
          setIsReset(true);
        } else 
        if(result?.status === 400) {
          Toast.error('Wrong parametrs, password is too short');
        } else
        if(result?.status === 404) {
          Toast.error('The token has expired');
        }
      })
      .catch((error) => {logger.warning(`Client reset password ${error?.message}, ${error?.stack}`, error); Toast.error(`${error?.message}`)});
  }

  return (
    <div className="w-full h-[700px] mx-auto bg-[#f3f3f4] flex items-center justify-center">
      <div className="w-[575px] flex flex-col items-center justify-center bg-[#fafafa] rounded-[50px] shadow[0_50px_90px,rgba(116,132,157,0.1)] p-8">
        <div className="w-full">
          {!isReset ? (
            <div className="font-InterRegular w-[80%] lg:w-[60%] mx-auto flex flex-col items-center justify-center gap-4">
              <h2 className="text-xl lg:text-2xl">Reset your password</h2>
              <label
                className={`w-full h-[70px] p-4 rounded-2xl flex items-center gap-4 ${getBorderCurrentState(
                  1
                )}`}
              >
                <input
                  placeholder="New password"
                  type={inputType}
                  name="newpassword"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-black placeholder-black"
                />
                <button type="button" onClick={() => toggleInputType()}>
                  {inputType === 'password' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.347"
                      height="18.597"
                      viewBox="0 0 23.347 18.597"
                    >
                      <g
                        id="_9041858_eye_no_icon_1_"
                        name="9041858_eye_no_icon (1)"
                        transform="translate(0.5 0.707)"
                      >
                        <path
                          id="Path_4078"
                          name="Path 4078"
                          d="M5.536,2.655A19.253,19.253,0,0,0,0,8.23q5,7.23,11.174,7.23a10.511,10.511,0,0,0,5.371-1.495m2.087-1.5A22.152,22.152,0,0,0,22.347,8.23Q17.345,1,11.174,1a10.2,10.2,0,0,0-3.193.509"
                          transform="translate(0 0.315)"
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          fillRule="evenodd"
                        />
                        <line
                          id="Line_393"
                          name="Line 393"
                          x2="17.089"
                          y2="17.182"
                          transform="translate(2.629)"
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                        />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.697"
                      height="15.686"
                      viewBox="0 0 23.697 15.686"
                    >
                      <g
                        id="_9041858_eye_no_icon_1_"
                        name="9041858_eye_no_icon (1)"
                        transform="translate(0.5 0.5)"
                      >
                        <g
                          id="_9041806_eye_icon_1_"
                          name="9041806_eye_icon (1)"
                        >
                          <path
                            id="Path_4088"
                            name="Path 4088"
                            d="M11.348,14.686q6.268,0,11.348-7.343Q17.616,0,11.348,0T0,7.343Q5.081,14.686,11.348,14.686Z"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            fillRule="evenodd"
                          />
                          <path
                            id="Path_4089"
                            name="Path 4089"
                            d="M9.673,2a4.708,4.708,0,0,1,.725.056,3.248,3.248,0,0,0-.057.612A3.341,3.341,0,0,0,14.289,5.95a4.59,4.59,0,0,1,.057.723A4.673,4.673,0,1,1,9.673,2Z"
                            transform="translate(1.676 0.67)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            fillRule="evenodd"
                          />
                        </g>
                      </g>
                    </svg>
                  )}
                </button>
              </label>
              <label
                className={`w-full h-[70px] p-4 rounded-2xl flex items-center gap-4 ${getBorderCurrentState(
                  password !== password1 ? 2 : 1
                )}`}
              >
                <input
                  placeholder="Confirm password"
                  type={inputType1}
                  name="confirmpassword"
                  onChange={(e) => setPassword1(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-black placeholder-black"
                />
                <button type="button" onClick={() => toggleInputType1()}>
                  {inputType1 === 'password' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.347"
                      height="18.597"
                      viewBox="0 0 23.347 18.597"
                    >
                      <g
                        id="_9041858_eye_no_icon_1_"
                        name="9041858_eye_no_icon (1)"
                        transform="translate(0.5 0.707)"
                      >
                        <path
                          id="Path_4078"
                          name="Path 4078"
                          d="M5.536,2.655A19.253,19.253,0,0,0,0,8.23q5,7.23,11.174,7.23a10.511,10.511,0,0,0,5.371-1.495m2.087-1.5A22.152,22.152,0,0,0,22.347,8.23Q17.345,1,11.174,1a10.2,10.2,0,0,0-3.193.509"
                          transform="translate(0 0.315)"
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          fillRule="evenodd"
                        />
                        <line
                          id="Line_393"
                          name="Line 393"
                          x2="17.089"
                          y2="17.182"
                          transform="translate(2.629)"
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                        />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.697"
                      height="15.686"
                      viewBox="0 0 23.697 15.686"
                    >
                      <g
                        id="_9041858_eye_no_icon_1_"
                        name="9041858_eye_no_icon (1)"
                        transform="translate(0.5 0.5)"
                      >
                        <g
                          id="_9041806_eye_icon_1_"
                          name="9041806_eye_icon (1)"
                        >
                          <path
                            id="Path_4088"
                            name="Path 4088"
                            d="M11.348,14.686q6.268,0,11.348-7.343Q17.616,0,11.348,0T0,7.343Q5.081,14.686,11.348,14.686Z"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            fillRule="evenodd"
                          />
                          <path
                            id="Path_4089"
                            name="Path 4089"
                            d="M9.673,2a4.708,4.708,0,0,1,.725.056,3.248,3.248,0,0,0-.057.612A3.341,3.341,0,0,0,14.289,5.95a4.59,4.59,0,0,1,.057.723A4.673,4.673,0,1,1,9.673,2Z"
                            transform="translate(1.676 0.67)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            fillRule="evenodd"
                          />
                        </g>
                      </g>
                    </svg>
                  )}
                </button>
              </label>
              <p className={`${
                  password !== password1 ? 'text-[#ff3340]' : 'hidden'
                } text-sm self-start`}>
                Password do not match
              </p>
              <p
                className={`${
                  password !== password1 ? 'text-[#ff3340]' : 'text-[#37AC82]'
                } text-sm text-center`}
              >
                Must be at least 8 characters, including an uppercase letter, a
                lowercase letter, and a number.
              </p>
              <button
                onClick={() => sendPasswordReset()}
                className="hover:bg-primary rounded-xl w-full h-[59px] bg-black text-white text-lg"
              >
                Reset password
              </button>
            </div>
          ) : (
            <div className="font-InterRegular w-[80%] lg:w-[60%] mx-auto flex flex-col items-center justify-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="84.261"
                height="84.261"
                viewBox="0 0 84.261 84.261"
              >
                <g
                  id="Group_13496"
                  data-name="Group 13496"
                  transform="translate(-1219.131 -416)"
                >
                  <path
                    id="_7124146_badge_check_icon"
                    data-name="7124146_badge_check_icon"
                    d="M12.455,23.448l9.411,9.411L40.687,14.037"
                    transform="translate(1234.675 434.682)"
                    fill="none"
                    stroke="#37ac82"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <path
                    id="Path_4048"
                    data-name="Path 4048"
                    d="M40.13,0A40.13,40.13,0,1,1,0,40.13,40.13,40.13,0,0,1,40.13,0Z"
                    transform="translate(1221.131 418)"
                    fill="none"
                    stroke="#37ac82"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </g>
              </svg>

              <h2 className="text-xl lg:text-2xl">Password changed</h2>
              <p className="text-secondary text-sm text-center">
                Thank you, go and login.
              </p>
              <Link href="/login-email" legacyBehavior>
                <a className="hover:bg-primary rounded-xl w-full h-[59px] bg-black text-white text-lg flex items-center justify-center">
                  Login
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const token = context?.req?.cookies?.token || null;
  // if (token) context.res.redirect('/affiliate-dashboard')
  // const API_HOST = process.env.API_HOST || null
  // if(!API_HOST) return context.res.status(500).json({'error':'empty API HOST'})
  // else
    return {
      props: {},
    };
}
