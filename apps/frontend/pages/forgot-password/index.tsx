import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Toast } from '../../components/Toast';
import Link from 'next/link';

import { NavbarFooterContext } from '../../components/Layout';

export default function Index() {
  const regExEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [isValid, setIsValid] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  
  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(regExEmailValid)?.length > 0
      ? true
      : false;
  };

  const checkEmailValid = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value);
    const valid = validateEmail(e.target.value);
    if (valid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const resetPassword = async () => {
    try {
      const result = await fetch(`/api/forgot-password?email=${emailAddress}`);
      if (result?.status >= 500) {
        Toast.error('internal error');
      }
      else if (result?.status === 404) {
        Toast.error('wrong e-mail address');
      }
      else if (result?.status === 409) {
        Toast.error('reset link was sent already.');
      }
      else {
        Toast.success('e-mail with reset password token was sent.');
        setIsReset(true);
      }
    } catch (error) {
      Toast.error(error?.toString());
    }
  };

  return (
    <div className="w-full h-[700px] mx-auto bg-[#f3f3f4] flex items-center justify-center">
      <div className="w-[575px] h-[430px] bg-[#fafafa] rounded-[50px] shadow[0_50px_90px,rgba(116,132,157,0.1)] p-4">
        <Link href="/login-email" legacyBehavior>
          <a className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-[rgba(177,193,201,0.1)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23.799"
              height="23.799"
              viewBox="0 0 23.799 23.799"
            >
              <g
                id="_9041645_right_top_arrow"
                data-name="9041645_right_top_arrow"
                transform="translate(21.799 11.899) rotate(135)"
              >
                <path
                  id="Path_4097"
                  data-name="Path 4097"
                  d="M12.25,0V12.25H0"
                  transform="translate(1.75 1.75)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  fillRule="evenodd"
                />
                <path
                  id="Path_4098"
                  data-name="Path 4098"
                  d="M14,14,0,0"
                  transform="translate(0 0)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  fillRule="evenodd"
                />
              </g>
            </svg>
          </a>
        </Link>
        <div className="w-full h-[calc(100%-92px)] flex items-center justify-center">
          {!isReset ? (
            <div className="font-InterRegular w-[80%] lg:w-[60%] mx-auto flex flex-col items-center justify-center gap-4">
              <h2 className="text-xl lg:text-2xl">Reset your password</h2>
              <p className="text-secondary text-sm text-center">
                We’ll send a link to the email below. Don’t have access to this
                email? Reach out to support.
              </p>
              <label
                className={`w-full flex-grow flex items-center justify-between h-[59px] px-3 rounded-xl focus:outline-none text-black placeholder-black ${
                  isValid
                    ? 'border-2 bg-[rgba(116,132,157,0.05)] border-[#37AC82]'
                    : 'bg-[#F3F3F4] border-solid border-2 border-[rgba(112,112,112,0.1)]'
                }`}
              >
                <input
                  type="text"
                  onChange={(e) => checkEmailValid(e)}
                  placeholder="Email"
                  className="text-base bg-transparent focus:outline-none"
                />
                {isValid ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                  >
                    <g
                      id="Group_13495"
                      data-name="Group 13495"
                      transform="translate(-1220 -417)"
                    >
                      <path
                        id="_7124146_badge_check_icon"
                        data-name="7124146_badge_check_icon"
                        d="M12.455,17.2l3.166,3.166,6.332-6.332"
                        transform="translate(1216.797 414.297)"
                        fill="none"
                        stroke="#37ac82"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        id="Path_4048"
                        data-name="Path 4048"
                        d="M13.5,0A13.5,13.5,0,1,1,0,13.5,13.5,13.5,0,0,1,13.5,0Z"
                        transform="translate(1221 418)"
                        fill="none"
                        stroke="#37ac82"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                ) : (
                  <></>
                )}
              </label>
              <button
                onClick={() => resetPassword()}
                className={`${
                  !isValid ? 'hidden' : ''
                } hover:bg-primary rounded-xl w-full h-[59px] bg-black text-white text-lg`}
              >
                Send reset password link
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

              <h2 className="text-xl lg:text-2xl">Check your email</h2>
              <p className="text-secondary text-sm text-center">
                You should get an email with instructions on how to change your
                password.
              </p>
              {/* <button className="hover:bg-primary rounded-xl w-full h-[59px] bg-black text-white text-lg">
                Done
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
    return {
      props: {},
    };
}
