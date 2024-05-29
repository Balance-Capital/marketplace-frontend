import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import language from './locale/index.json';
import getLanguage from '../../../utils/getLanguage';
import Default from '../Default';

interface IProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  data: { title: string; successDescription: string };
}

export default function ChangePassword({ setModal, data }: IProps) {
  const router = useRouter();  
  const [toggle, setToggle] = useState(true);
  const content = getLanguage(language, router.locale);
  return (
    <>
      <Default setModal={setModal}>
        {toggle ? (
          <div className="font-InterRegular w-[80%] lg:w-[60%] mx-auto pb-10 lg:pb-16 flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl lg:text-2xl">{content.h2} {data.title}</h2>
            <p className="text-secondary text-sm text-center">
             {content.p1}
            </p>
            <div className="w-full flex-grow flex items-center justify-between h-[59px] px-3 rounded-xl bg-[rgba(116,132,157,0.05)] focus:outline-none text-black placeholder-black border-2 border-[#37AC82]">
              johndoe@example.com
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
            </div>
            <button
              onClick={() => setToggle(false)}
              className="hover:bg-primary rounded-xl w-full h-[59px] bg-black text-white text-lg"
            >
              {content.btn1} {data.title} {content.link}
            </button>
          </div>
        ) : (
          <div>
            <div className="font-InterRegular w-[80%] lg:w-[60%] mx-auto pb-10 lg:pb-16 flex flex-col items-center justify-center gap-4">
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
                {data.successDescription}
              </p>
              <button
                onClick={() => setModal(false)}
                className="hover:bg-primary rounded-xl w-full h-[59px] bg-black text-white text-lg"
              >
                {content.done}
              </button>
            </div>
          </div>
        )}
      </Default>
    </>
  );
}
