import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import PaginationBar, { IPagination } from '../../components/PaginationBar';
import SideBar from '../../components/SideBar';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import { NavbarFooterContext, UserAvatarImageContext, UserBalanceContext } from '../../components/Layout';
import IUser from '../../interfaces/user';
import { Toast } from '../../components/Toast';
import RollbarService from "../../services/rollbar";

interface ITransaction {
  type: string;
  amount: number;
  date: number;
  transactionID: number;
  status: string;
}

interface IMyRewardsSchema {
  totalEarnings: number;
  pendingEarnings: number;
  availableEarnings: number;
  transactions: Array<ITransaction>;
  currency: string
}

interface IProps {
  header: IHeaderSchema;
  data: IMyRewardsSchema;
  user: IUser;
  token: string;
}

export default function MyRewardsDashboard(props: IProps) {
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const router = useRouter();
  const content = getLanguage(language, router.locale).content;
  const { header, data, user, token } = props;
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { setUserBalance } = useContext(UserBalanceContext);
  const { setUserAvatarImage } = useContext(UserAvatarImageContext);
  
  const pagination: IPagination = {
    page: 1,
    limit: 2,
    pages: 1,
    total: 1,
    next: null,
    prev: null,
  };

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])

  useEffect(() => {
    setTransactions(transactions);
  }, [setTransactions, transactions]);

  useEffect(() => {
    setTransactions(data?.transactions);
  }, [setTransactions, data]);

  useEffect(() => {
    setUserBalance(user?.balance || 0);
    setUserAvatarImage(user?.avatar || null);  
  }, [setUserAvatarImage, setUserBalance, user]);

  const clickPage = () => {
    console.log('not implemented yet');
  };
  const clickNextPage = () => {
    console.log('not implemented yet');
  };
  const clickBackPage = () => {
    console.log('not implemented yet');
  };

  const withdrawButton = () => {

    fetch(
      `/api/withdraw`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((data) => {
      if(data.status === 200) Toast.success('withdraw success')
      if(data.status === 409) Toast.info('Operation in progress, wait for the result.')
      if(data.status === 400) Toast.error('problem with parameters, did you add wallet address?')
    })
    .catch((error) => Toast.error(JSON.stringify(error)));
  }

  return (
    <>
      <SeoHeader
        title={header.title}
        description={header.description}
        keyWords={header.keyWords}
        openGraph={header.openGraph}
        canonicalLink={header.canonicalLink}
        metaRobots={header.metaRobots}
        jsonLd={header.jsonLd}
      />
      <section className="max-w-[1920px] mx-auto flex flex-col lg:flex-row bg-[#F3F3F4]">
        <SideBar user={user} />
        <div className="w-full lg:w-[calc(100%-370px)] px-6 py-12 lg:p-12">
          <h2 className="font-PPNeueMachina text-[26px] lg:text-[30px]">
            {content.h2}
          </h2>
          <div className="my-12 font-InterRegular flex flex-wrap items-center text-center lg:text-start gap-12">
            <div className="p-8 bg-black flex-grow rounded-xl">
              <h2 className="text-secondary text-lg">{content.total}</h2>
              <p className="text-3xl text-white">
                {data?.currency} {data?.totalEarnings?.toPrecision(4) || 0}
              </p>
            </div>
            <div className="p-8 bg-black flex-grow rounded-xl">
              <h2 className="text-secondary text-lg">{content.pending}</h2>
              <p className="text-3xl text-white">
              {data?.currency} {data?.pendingEarnings?.toPrecision(4) || 0}
              </p>
            </div>
            <div className="p-8 bg-black flex-grow rounded-xl flex items-center justify-center md:justify-between gap-8 flex-wrap">
              <div>
                <h2 className="text-secondary text-lg">{content.available}</h2>
                <p className="text-3xl text-white">
                {data?.currency} {data?.availableEarnings?.toPrecision(4) || 0}
                </p>
              </div>
              <button disabled={data?.availableEarnings ? false : true} onClick={withdrawButton} className="text-white bg-primary text-lg w-44 py-4 rounded-full">
                {content.withdraw}
              </button>
            </div>
          </div>
          <div className="my-12">
            <h2 className="font-PPNeueMachina text-black text-[26px] lg:text-[30px]">
              {content.transactions}
            </h2>
            {transactions?.length === 0 ? (
              <div className="font-PPNeueMachina text-secondary text-[20px] xl:text-[26px] text-center my-8">
                {content.notfound}
              </div>
            ) : (
              <>
                <div className="overflow-x-scroll font-InterRegular flex">
                  <table className="min-w-[1220px] flex-grow border-separate border-spacing-y-2">
                    <thead className="text-[#74849D] text-lg">
                      <tr className="[&>*]:w-[20%] [&>*]:text-start [&>*]:font-normal [&>*]:p-5">
                        <th>{content.th1}</th>
                        <th>{content.th2}</th>
                        <th>{content.th3}</th>
                        <th>{content.th4}</th>
                        <th>{content.th5}</th>
                      </tr>
                    </thead>
                    <tbody className="text-black">
                      {transactions?.map((_v, _k) => (
                        <tr className="[&>*]:p-5 [&>*]:bg-white" key={_k}>
                          <td className="rounded-tl-[25px] rounded-bl-[25px]">
                            {_v.type === 'WITHDRAW' ? (
                              <div className="flex items-center gap-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="27.5"
                                  height="27.5"
                                  viewBox="0 0 27.5 27.5"
                                >
                                  <g
                                    id="Group_13597"
                                    data-name="Group 13597"
                                    transform="translate(-578.25 -656.25)"
                                  >
                                    <g
                                      id="Group_13596"
                                      data-name="Group 13596"
                                      transform="translate(600.95 670.181) rotate(135)"
                                    >
                                      <path
                                        id="Path_2948"
                                        data-name="Path 2948"
                                        d="M12.4,0H0"
                                        transform="translate(0 6.456)"
                                        fill="none"
                                        stroke="#f54a6b"
                                        strokeWidth="1.5"
                                      />
                                      <path
                                        id="Path_2947"
                                        data-name="Path 2947"
                                        d="M6.455,12.911,0,6.455,6.455,0"
                                        transform="translate(0.204 0)"
                                        fill="none"
                                        stroke="#f54a6b"
                                        strokeWidth="1.5"
                                      />
                                    </g>
                                    <circle
                                      id="Ellipse_987"
                                      data-name="Ellipse 987"
                                      cx="13"
                                      cy="13"
                                      r="13"
                                      transform="translate(579 657)"
                                      fill="none"
                                      stroke="#f54a6b"
                                      strokeWidth="1.5"
                                    />
                                  </g>
                                </svg>
                                <p className="text-[#F54A6B]">
                                  Withdraw
                                </p>
                              </div>
                            ) : (
                              <div className="flex items-center gap-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="27.5"
                                  height="27.5"
                                  viewBox="0 0 27.5 27.5"
                                >
                                  <g
                                    id="Group_13597"
                                    data-name="Group 13597"
                                    transform="translate(-578.25 -656.25)"
                                  >
                                    <g
                                      id="Group_13596"
                                      data-name="Group 13596"
                                      transform="translate(624.43 1666.152) rotate(-135)"
                                    >
                                      <path
                                        id="Path_2948"
                                        data-name="Path 2948"
                                        d="M19.911,0H7.512"
                                        transform="translate(713.605 681.455)"
                                        fill="none"
                                        stroke="#37ac82"
                                        strokeWidth="1.5"
                                      />
                                      <path
                                        id="Path_2947"
                                        data-name="Path 2947"
                                        d="M18.455,5,12,11.455l6.455,6.455"
                                        transform="translate(709.321 670)"
                                        fill="none"
                                        stroke="#37ac82"
                                        strokeWidth="1.5"
                                      />
                                    </g>
                                    <circle
                                      id="Ellipse_987"
                                      data-name="Ellipse 987"
                                      cx="13"
                                      cy="13"
                                      r="13"
                                      transform="translate(579 657)"
                                      fill="none"
                                      stroke="#37ac82"
                                      strokeWidth="1.5"
                                    />
                                  </g>
                                </svg>
                                <p className="text-[#37ac82]">
                                Deposit
                                </p>
                              </div>
                            )}
                          </td>

                          <td>${_v.amount.toPrecision(4)}</td>
                          <td>
                            {moment(_v.date).format('YYYY-MM-DD HH:mm:ss')}
                          </td>
                          <td>#{_v.transactionID?.toString().substring(10)}</td>
                          <td className="rounded-tr-[25px] rounded-br-[25px]">
                            {_v.status === 'unpaid' ? (
                              <span className="text-[#BF9B05] px-6 py-3 bg-[rgba(191,155,5,0.05)] rounded-full">
                                Pending
                              </span>
                            ) : (
                              <span className="text-[#37AC82] px-6 py-3 bg-[rgba(55,172,130,0.1)] rounded-full">
                                Paid
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationBar
                  pagination={pagination}
                  clickPage={() => clickPage}
                  clickNextPage={() => clickNextPage}
                  clickBackPage={() => clickBackPage}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const token = context?.req?.cookies?.token || null;
    if (!token) return context.res.status(401).redirect('/401');

    const API_HOST = process.env.API_HOST || null
    if(!API_HOST) return context.res.status(500).json({'error':'empty API HOST'})
  
    const header = prepareHeader(language, context.locale);
  
    const startDate = moment().toISOString();
  
    const data = await fetch(
      `${API_HOST}/myrewards?startDate=${encodeURI(startDate)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    ).then((data) => data.json());
    const user = jwt.decode(token);
    return {
      props: {
        header,
        data,
        user,
        token
      },
    };  
  } catch (err) {
    RollbarService.error(`Can't get data for my-rewards from api ${err?.message}, stack: ${err?.stack}`, context?.req);
  }
}

