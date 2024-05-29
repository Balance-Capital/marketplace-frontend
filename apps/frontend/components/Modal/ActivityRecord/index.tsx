import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import getLanguage from '../../../utils/getLanguage';
import useClickOutSide from '../../../hooks/useClickOutSide';
import language from './locale/index.json';
import moment from 'moment';
import ImageWithFallback from '../../ImgWithFallback/ImgWithFallback';
export interface IActivityRecord {
  merchantDetails: {
    id: string;
    name: string;
    logo: string;
  };
  transactionDetails: {
    commissionType: string;
    currency: string;
    items: number;
    orderAmount: number;
    publisherAmount: number;
    invoiceId: string;
    lastUpdated: Date;
    paymentStatus: string;
    status: string;
    transactionDate: Date;
  };
  _id: string;
  userCountry: string;
  customId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function ActivityRecord({ setModal, record }) {
  const modalRef = useRef(null);
  const router = useRouter();
  const activeRecord: IActivityRecord = record;
  const text = getLanguage(language, router.locale);
  useClickOutSide(modalRef, setModal);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-60"></div>

      <div className="flex items-center justify-end fixed inset-0 z-10">
        <div
          className="w-full overflow-auto md:w-[500px] mt-[20vh] md:mt-0 h-[80vh] md:h-screen bg-white rounded-tl-[25px] rounded-tr-[25px] md:rounded-none"
          ref={modalRef}
        >
          <div className="md:hidden flex justify-end p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => setModal(false)}
            >
              <rect
                id="Rectangle_806"
                data-name="Rectangle 806"
                width="53"
                height="53"
                rx="26.5"
                fill="rgba(177,193,201,0.1)"
              />
              <g id="g2246" transform="translate(19.284 19.284)">
                <path
                  id="path1419"
                  d="M-1479.2-17.007l15.079-15.079"
                  transform="translate(1479.199 32.087)"
                  fill="none"
                  stroke="#0a0b0e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  id="path1421"
                  d="M-1479.2-32.087l15.079,15.079"
                  transform="translate(1479.199 32.087)"
                  fill="none"
                  stroke="#0a0b0e"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>
          <div className="px-12 py-0 md:p-12">
            <div className="font-InterRegular flex flex-col gap-3 pb-8 border-solid border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-lg text-secondary">{text.commission}</h2>
              <p className="flex items-center gap-4 text-2xl">
                {activeRecord.transactionDetails.currency}&nbsp; 
                {activeRecord.transactionDetails.publisherAmount.toPrecision(
                  4
                )}
                
                {activeRecord.transactionDetails.paymentStatus === 'unpaid' 
                  ? (<span className="text-[#BF9B05] text-base px-4 py-2 bg-[rgba(191,155,5,0.05)] rounded-full">{activeRecord.transactionDetails.paymentStatus}</span>)
                  : (<span className="text-[#37AC82] text-base px-4 py-2 bg-[rgba(55,172,130,0.1)] rounded-full">{activeRecord.transactionDetails.paymentStatus}</span>)
                }
                  
              </p>
            </div>
            <div className="font-InterRegular flex flex-col gap-3 py-8 border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-2xl flex items-center gap-2">
                <ImageWithFallback
                  fallbackSrc="/assets/imgs/store-default.png"
                  className="rounded-full"
                  width={36}
                  height={36}
                  alt={activeRecord.merchantDetails.name}
                  src={`${IMAGE_HOST}/${activeRecord.merchantDetails.logo}`}
                />
                {activeRecord.merchantDetails.name}
              </h2>
              <table className="w-full text-lg">
                <tbody className="[&>*]:flex [&>*]:items-center [&>*]:justify-between [&>tr>td:first-child]:text-secondary">
                  <tr>
                    <td>{text.td1}</td>
                    <td>
                      {activeRecord.transactionDetails.currency}{' '}
                      {activeRecord.transactionDetails.orderAmount.toPrecision(4)}
                    </td>
                  </tr>
                  <tr>
                    <td>{text.td2}</td>
                    <td>{activeRecord.transactionDetails.items}</td>
                  </tr>
                  <tr>
                    <td>{text.td3}</td>
                    <td>
                      {activeRecord.transactionDetails.currency}{' '}
                      {activeRecord.transactionDetails.publisherAmount.toPrecision(
                        4
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="font-InterRegular flex flex-col gap-3 py-8 border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-secondary text-lg">{text.h2a}</h2>
              <table className="w-full text-lg">
                <tbody className="[&>*]:flex [&>*]:items-center [&>*]:justify-between [&>tr>td:first-child]:text-secondary">
                  <tr>
                    <td>{text.location}</td>
                    <td className="flex items-center gap-2">
                      <div className="relative w-8 h-8">
                        {activeRecord.userCountry === 'US' ? (
                          <ImageWithFallback
                            fallbackSrc="/assets/imgs/store-default.png"
                            src={`${IMAGE_HOST}/assets/images/svg/us.svg`}
                            alt={`us flag`}
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      {activeRecord.userCountry}
                    </td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.5"
                        height="15"
                        viewBox="0 0 16.5 15"
                      >
                        <g
                          id="Group_13531"
                          data-name="Group 13531"
                          transform="translate(0.347 0.75)"
                        >
                          <line
                            id="Line_378"
                            data-name="Line 378"
                            y2="3"
                            transform="translate(7.382 10.5)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <rect
                            id="Rectangle_921"
                            data-name="Rectangle 921"
                            width="15"
                            height="10"
                            rx="1"
                            transform="translate(0.403)"
                            fill="#fff"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <line
                            id="Line_379"
                            data-name="Line 379"
                            x1="5.118"
                            transform="translate(4.941 13.5)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </g>
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="font-InterRegular flex flex-col gap-3 py-8 border-b-2 border-[rgba(112,112,112,0.1)]">
              <h2 className="text-secondary text-lg">{text.h2b}</h2>
              <ol className="flex flex-col gap-8">
                <li className="h-12 flex items-center gap-2 before:flex before:items-center before:justify-center before:content-['1'] before:rounded-full before:bg-black before:text-white before:p-[2px_10px]">
                  <div className="w-full flex items-center justify-between text-lg text-secondary">
                    {text.clicked}
                    <div className="text-right">
                      <h3 className="text-lg text-black">
                        {moment(activeRecord.transactionDetails.transactionDate).format('YYYY-MM-DD')}
                      </h3>
                      <h4 className="text-sm text-secondary">
                        {moment(activeRecord.transactionDetails.transactionDate).format('hh:mm:ss')}
                      </h4>
                    </div>
                  </div>
                </li>
                <li
                  className="h-12 relative flex items-center gap-2 before:flex before:items-center before:justify-center before:content-['2'] before:rounded-full before:bg-black before:text-white before:p-[2px_9px]
                after:top-0 after:left-0 after:absolute after:ml-[12px] after:-mt-9 after:bg-black after:w-[2px] after:h-[38px]"
                >
                  <div className="w-full flex items-center justify-between text-lg text-secondary">
                    {text.converted}
                    <div className="text-right">
                      <h3 className="text-lg text-black">{moment(activeRecord.updatedAt).format('YYYY-MM-DD')}</h3>
                      <h4 className="text-sm text-secondary">{moment(activeRecord.updatedAt).format('hh:mm:ss')}</h4>
                    </div>
                  </div>
                </li>
                {/* <li
                  className="h-12 relative flex items-center gap-2  before:flex before:items-center before:justify-center before:content-['3'] before:rounded-full before:bg-secondary before:bg-opacity-30 before:text-secondary before:text-opacity-50 before:p-[2px_9px]
                after:top-0 after:left-0 after:absolute after:ml-[12px] after:-mt-9 after:bg-secondary after:bg-opacity-30 after:w-[2px] after:h-[38px]"
                >
                  <div className="w-full flex items-center justify-between text-lg text-secondary text-opacity-30">
                    {text.completed}
                    <div className="text-right">
                      <h3 className="text-lg text-black">{moment(activeRecord.date).format('YYYY-MM-DD')}</h3>
                      <h4 className="text-sm text-secondary">{moment(activeRecord.date).format('hh:mm:ss')}</h4>
                    </div>
                  </div>
                </li> */}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
