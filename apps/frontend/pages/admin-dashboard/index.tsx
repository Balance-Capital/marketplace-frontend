import { useContext, useEffect } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import RollbarService from "../../services/rollbar";
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import SideBar from '../../components/SideBar';
import { IAdminDashboard } from '../../interfaces/adminDashboard';
import IUser from '../../interfaces/user';
import {
  UserAvatarImageContext,
  UserBalanceContext
} from '../../components/Layout';

interface IProps {
  header: IHeaderSchema;
  data: IAdminDashboard;
  user: IUser;
}
export function Index(props: IProps) {
  const router = useRouter();

  const { header, data, user } = props;

  const content = getLanguage(language, router.locale).content;

  const { setUserBalance } = useContext(UserBalanceContext);
  const { setUserAvatarImage } = useContext(UserAvatarImageContext);
  
  useEffect(() => {
    setUserBalance(user?.balance || 0)
    setUserAvatarImage(user?.avatar || null);
  },[setUserAvatarImage, setUserBalance, user])
  
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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-PPNeueMachina text-[26px] lg:text-[30px]">
              {content.dashboard}
            </h2>
          </div>
          <div>
            <div className="my-12 font-InterRegular flex flex-wrap items-center text-center lg:text-start gap-12">
              {data?.dashboard[0]?.groupBySource?.map((item, indx) => (
                <div key={indx} className="p-8 bg-white flex-grow rounded-xl">
                  <h2 className="text-secondary text-lg">{item?.name}</h2>
                  <p className="text-3xl">
                    {item?.length?.toLocaleString('en-US')}
                  </p>
                </div>
              ))}
            </div>
            <div className="overflow-x-scroll font-InterRegular flex scrollbar-hide">
              <table className="min-w-[1220px] flex-grow border-separate border-spacing-y-2">
                <thead className="text-[#74849D] text-lg">
                  <tr className="[&>*]:w-[20%] [&>*]:text-start [&>*]:font-normal [&>*]:p-5">
                    <th>{content.allOffers}</th>
                    <th>{content.validOffers}</th>
                    <th>{content.siteMapOffers}</th>
                    <th>{content.siteMapStores}</th>
                    <th>{content.storesWithoutLogo}</th>
                    <th>{content.storesWithoutDescription}</th>
                    <th>{content.storesWithoutFaq}</th>
                    <th>{content.storesWithoutCommission}</th>
                    <th>{content.storesWithoutCategories}</th>
                    <th>All stores</th>
                    <th>All active stores</th>
                    <th>All products</th>
                    <th>Checked products</th>
                    <th>Checked offers</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  <tr className="[&>*]:p-5 [&>*]:bg-white">
                    <td className="rounded-tl-[25px] rounded-bl-[25px]">
                      {data.dashboard[0]?.allOffers || 0}
                    </td>
                    <td>{data.dashboard[0]?.validOffers || 0}</td>
                    <td>{data.dashboard[0]?.siteMapOffers || 0}</td>
                    <td>{data.dashboard[0]?.siteMapStores || 0}</td>
                    <td>{data.dashboard[0]?.storesWithoutLogo || 0}</td>
                    <td>{data.dashboard[0]?.storesWithoutDescription || 0}</td>
                    <td>{data.dashboard[0]?.storesWithoutFaq || 0}</td>
                    <td>{data.dashboard[0]?.storesWithoutCommission || 0}</td>
                    <td>{data.dashboard[0]?.storesWithoutCategories || 0}</td>
                    <td>{data.dashboard[0]?.allStores || 0}</td>
                    <td>{data.dashboard[0]?.allActiveStores || 0}</td>
                    <td>{data.dashboard[0]?.allProducts || 0}</td>
                    <td>{data.dashboard[0]?.checkedProducts || 0}</td>
                    <td className="rounded-tr-[25px] rounded-br-[25px]">
                      {data.dashboard[0]?.checkedOffers || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
  
    const dateStart = context?.req?.query?.dateStart || moment().toISOString();
    const page = context?.req?.query?.page || 1;
  
    const data: IAdminDashboard = await fetch(
      `${API_HOST}/admin-dashboard?dateStart=${dateStart}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    ).then(async (response) => {
      if(response.status >=200 && response.status <300) {
        const data:IAdminDashboard = await response.json();
        return data;
      }  
    });
  
    const user = jwt.decode(token);
  
    return {
      props: {
        header,
        data,
        user,
      },
    };  
  } catch (err) {
    RollbarService.error(`Can't get data for admin-dashboard from api ${err?.message}, stack: ${err?.stack}`, context?.req);
  }
}

export default Index;
