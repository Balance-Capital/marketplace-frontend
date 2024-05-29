import { Dispatch, SetStateAction, useState } from 'react';
import IOfferSchema from '../../../interfaces/offer';
import Default from '../Default';

interface IProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  offer: IOfferSchema;
}

export default function CopyCoupon({ setModal, offer }: IProps) {
  const [className, setClassName] = useState(
    'bg-[rgba(101,99,255,0.05)] text-lg text-[#6563FF] border-[#6563FF]'
  );
  const [copyText, setCopyText] = useState('Copy');
  const [copiedClassName, setCopiedClassName] = useState(
    'bg-black hover:bg-[#6563FF]'
  );

  const onClickCopy = () => {
    navigator?.clipboard?.writeText(offer.code);
    setClassName(
      'bg-[rgba(55,172,130,0.05)] text-lg text-[#37AC82] border-[#37AC82]'
    );
    setCopiedClassName('bg-[#37AC82] hover:bg-[#37AC82]');
    setCopyText('Copied');
  };

  return (
    <>
      <Default setModal={setModal}>
        <div className="font-InterRegular flex flex-col items-center justify-center gap-6 mb-6">
          <h2 className=" text-black text-2xl px-2 text-center">
            {offer.description}
          </h2>
          <div
            className={`w-[80%] p-3 flex items-center justify-end gap-6 md:gap-8 rounded-lg border-dashed border-2 ${className}`}
          >
            <span className="text-center">{offer.code}</span>
            <button
              onClick={() => {
                onClickCopy();
              }}
              className={`rounded-full bg-black hover:bg-[#6563FF] text-sm text-white py-3 px-10 ${copiedClassName}`}
            >
              {copyText}
            </button>
          </div>
          <p className="text-base">
            Copy and paste this code at{' '}
            <a
              target="_blank"
              className="text-[#6563FF]"
              href={offer.redirectUrl}
              rel="noreferrer"
            >
              {offer.storeName}
            </a>
          </p>
          <p className="text-xs text-[#74849D]">Terms and conditions apply.</p>
        </div>
        <div className="h-[140px] px-5 flex items-center justify-end bg-copyModal bg-center bg-no-repeat bg-cover">
          <div className="w-[55%]">
            <p className="font-PPNeueMachina text-lg text-black">
              Share and earn
            </p>
            <p className="font-InterRegular text-xs text-[#707095]">
              Refer friends to us and earn 10%.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <a href="#">
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  width="59"
                  height="59"
                  viewBox="0 0 59 59"
                >
                  <g
                    id="Group_12701"
                    data-name="Group 12701"
                    transform="translate(-1502 -1218)"
                  >
                    <g
                      id="Rectangle_22"
                      data-name="Rectangle 22"
                      transform="translate(1502 1218)"
                      fill="#4a83fa"
                      stroke="#4a83fa"
                      strokeWidth="1"
                    >
                      <rect width="59" height="59" rx="29.5" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="58"
                        height="58"
                        rx="29"
                        fill="none"
                      />
                    </g>
                    <g
                      id="Group_250"
                      data-name="Group 250"
                      transform="translate(1519.139 1233.095)"
                    >
                      <g
                        id="_317727_facebook_social_media_social_icon"
                        data-name="317727_facebook_social media_social_icon"
                        transform="translate(6.428 3.361)"
                      >
                        <path
                          id="f"
                          d="M20.581,26.7V17.056h3.369l.842-4.019H20.581V11.43q0-2.411,2.527-2.411h1.685V5H21.424c-3.1,0-5.054,2.315-5.054,5.626v2.411H13v4.019h3.369V26.7Z"
                          transform="translate(-13 -5)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
              <a href="#">
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  width="59"
                  height="59"
                  viewBox="0 0 59 59"
                >
                  <g
                    id="Group_12698"
                    data-name="Group 12698"
                    transform="translate(-1614 -1218)"
                  >
                    <g id="Group_12700" data-name="Group 12700">
                      <g
                        id="Rectangle_22"
                        data-name="Rectangle 22"
                        transform="translate(1614 1218)"
                        fill="#60b6e3"
                        stroke="#60b6e3"
                        strokeWidth="1"
                      >
                        <rect width="59" height="59" rx="29.5" stroke="none" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="58"
                          height="58"
                          rx="29"
                          fill="none"
                        />
                      </g>
                      <path
                        id="_104501_twitter_bird_icon"
                        data-name="104501_twitter_bird_icon"
                        d="M24.536,12.342a8.557,8.557,0,0,1-2.47.677,4.308,4.308,0,0,0,1.891-2.379,8.609,8.609,0,0,1-2.731,1.044A4.3,4.3,0,0,0,13.9,15.606a12.21,12.21,0,0,1-8.864-4.493,4.306,4.306,0,0,0,1.331,5.742,4.288,4.288,0,0,1-1.948-.538c0,.018,0,.036,0,.054a4.3,4.3,0,0,0,3.45,4.217,4.324,4.324,0,0,1-1.133.151,4.261,4.261,0,0,1-.809-.077,4.305,4.305,0,0,0,4.017,2.987,8.678,8.678,0,0,1-6.367,1.781A12.23,12.23,0,0,0,22.4,15.125q0-.28-.012-.557A8.71,8.71,0,0,0,24.536,12.342Z"
                        transform="translate(1629.426 1228.674)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </svg>
              </a>
              <a href="#">
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  width="59"
                  height="59"
                  viewBox="0 0 59 59"
                >
                  <g
                    id="Group_12699"
                    data-name="Group 12699"
                    transform="translate(-1654 -1218)"
                  >
                    <g
                      id="Rectangle_22"
                      data-name="Rectangle 22"
                      transform="translate(1654 1218)"
                      fill="#6563ff"
                      stroke="#6563ff"
                      strokeWidth="1"
                    >
                      <rect width="59" height="59" rx="29.5" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="58"
                        height="58"
                        rx="29"
                        fill="none"
                      />
                    </g>
                    <g
                      id="_9041767_mail_icon"
                      data-name="9041767_mail_icon"
                      transform="translate(1671.504 1238.808)"
                    >
                      <path
                        id="Subtraction_17"
                        data-name="Subtraction 17"
                        d="M20.218,18.377H3.785A3.612,3.612,0,0,1,0,14.978V3.392A3.609,3.609,0,0,1,3.785,0H20.218A3.608,3.608,0,0,1,24,3.392V14.978A3.611,3.611,0,0,1,20.218,18.377ZM4.759,4.84A1,1,0,0,0,4.247,6.7l7.243,4.343a.99.99,0,0,0,1.027,0L19.76,6.7A1.011,1.011,0,0,0,20.1,5.327a1,1,0,0,0-1.376-.343L12,9.021,5.273,4.985A.983.983,0,0,0,4.759,4.84Z"
                        transform="translate(-0.504 -0.496)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </svg>
              </a>
              <a
                href="#"
                className="font-InterRegular text-xs text-[#707095] underline"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </Default>
    </>
  );
}
