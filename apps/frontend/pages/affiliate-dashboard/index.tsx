import getConfig from 'next/config';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import PaginationBar, { IPagination } from '../../components/PaginationBar';
import CalenderDropDown from '../../components/CalenderDropDown';
import ActivityRecord, {
  IActivityRecord,
} from '../../components/Modal/ActivityRecord';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import SideBar from '../../components/SideBar';
import { NavbarFooterContext, UserAvatarImageContext, UserBalanceContext } from '../../components/Layout';
import ImageWithFallback from '../../components/ImgWithFallback/ImgWithFallback';
import IUser from '../../interfaces/user';
import RollbarService from "../../services/rollbar"

export interface IUserDataSchema {
  userName: string;
  availableBalance: number;
  pendingCommission: number;
  linkClicks: number;
  conversions: number;
  activity: Array<IActivityRecord>;
  pagination: IPagination;
  currency: string;
}

interface IProps {
  header: IHeaderSchema;
  userData: IUserDataSchema;
  accessToken: string;
  apiUrl: string;
  pagination: IPagination;
  user: IUser
}

export default function AffiliateDashboard(props: IProps) {
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const { dateStart } = router.query;
  const { header, userData, pagination, user, accessToken, apiUrl } = props;
  const content = getLanguage(language, router.locale).content;
  const [loader, setLoader] = useState(false);
  const [dataList, setDataList] = useState<IUserDataSchema>();
  const [activeRecord, setActiveRecord] = useState(null);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  const { setUserBalance } = useContext(UserBalanceContext);
  const { setUserAvatarImage } = useContext(UserAvatarImageContext);

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])
  
  useEffect(() => {
    setUserBalance(user?.balance || 0)
    setUserAvatarImage(user?.avatar || null);
  },[setUserAvatarImage, setUserBalance, user])
  
  useEffect(() => {
    setActiveRecord(activeRecord)
  },[setActiveRecord, activeRecord])

  useEffect(() => {
    setDataList(userData)
  },[setDataList, userData])

  const onChangeDataPicker = async (date: Date): Promise<void> => {
    setLoader(true);
    const data = await fetch(`${apiUrl}/affiliate-dashboard?dateStart=${date}&page=${pagination.page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((data) => data.json());
    if (data?.activity) {
      setDataList(data);
      setLoader(false);
    }
  }

  const pushPage = (page: number): void => {
    router.push(
      `${router.pathname}?dateStart=${dateStart}&page=${page}`,
      `${router.pathname}?dateStart=${dateStart}&page=${page}`
    );
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
        {modal && <ActivityRecord setModal={setModal} record={activeRecord} />}
        <SideBar user={user} />
        <div className="w-full lg:w-[calc(100%-370px)] px-6 py-12 lg:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-PPNeueMachina text-[26px] lg:text-[30px]">
              {`${content.h2} ${userData?.userName} 👋`}
            </h2>
            {/* <CalenderDropDown onChange={undefined} /> */}
          </div>
          <div className="my-12 font-InterRegular flex flex-wrap items-center text-center lg:text-start gap-12">
            <div className="p-8 bg-white flex-grow rounded-xl">
              <h2 className="text-secondary text-lg">{content.h2a}</h2>
              <p className="text-3xl">{userData?.currency} {userData?.availableBalance?.toPrecision(4)}</p>
            </div>
            <div className="p-8 bg-white flex-grow rounded-xl">
              <h2 className="text-secondary text-lg">{content.h2b}</h2>
              <p className="text-3xl">
                {userData?.currency} {userData?.pendingCommission?.toPrecision(4)}
              </p>
            </div>
            <div className="p-8 bg-white flex-grow rounded-xl">
              <h2 className="text-secondary text-lg">{content.h2c}</h2>
              <p className="text-3xl">{userData?.linkClicks}</p>
            </div>
            <div className="p-8 bg-white flex-grow rounded-xl">
              <h2 className="text-secondary text-lg">{content.h2d}</h2>
              <p className="text-3xl">{userData?.conversions}</p>
            </div>
          </div>
          <div className="my-12">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <h2 className="font-PPNeueMachina text-black text-[26px] lg:text-[30px]">
                {content.activity}
              </h2>
              <CalenderDropDown onChange={onChangeDataPicker} />
            </div>
            {loader ? (
              <div className="w-fit mx-auto">
                <ImageWithFallback
                  fallbackSrc=""
                  alt="spinner"
                  width={100}
                  height={100}
                  src={`${IMAGE_HOST}/assets/images/gif/logo-loader-dark.gif`}
                />
              </div>
            ) : dataList?.activity?.length > 0 ? (
              <>
                <div className="overflow-x-scroll font-InterRegular">
                  <table className="min-w-[1220px] border-separate border-spacing-y-2">
                    <thead className="text-[#74849D] text-lg">
                      <tr className="[&>*]:w-[20%] [&>*]:text-start [&>*]:font-normal [&>*]:p-5">
                        <th>{content.th1}</th>
                        <th>{content.th2}</th>
                        <th>{content.th3}</th>
                        <th>{content.th4}</th>
                        <th>{content.th5}</th>
                        <th>{content.th6}</th>
                      </tr>
                    </thead>
                    <tbody className="text-black">
                      {dataList?.activity?.map((_v, _k) => (
                        <tr className="[&>*]:p-5 [&>*]:bg-white" key={_k}>
                          <td className="flex items-center gap-4 rounded-tl-[25px] rounded-bl-[25px]">
                            <ImageWithFallback
                              fallbackSrc="/assets/imgs/store-default.png"
                              className="rounded-full"
                              width={36}
                              height={36}
                              alt={_v?.merchantDetails?.name}
                              src={`${IMAGE_HOST}/${_v?.merchantDetails?.logo}`}
                            />
                            <p>{_v?.merchantDetails?.name}</p>
                          </td>
                          <td>
                            {_v?.transactionDetails?.currency}{' '}
                            {_v?.transactionDetails?.orderAmount?.toPrecision(4)}
                          </td>
                          <td>
                            {_v?.transactionDetails?.currency}{' '}
                            {_v?.transactionDetails?.publisherAmount?.toPrecision(
                              4
                            )}
                          </td>
                          <td onClick={() => setModal(true)}>
                            <a
                              href="#"
                              onClick={() => setActiveRecord(_v)}
                              className="border-b-2"
                            >
                              Link
                            </a>
                          </td>
                          <td>{moment(_v?.createdAt).format('DD/MM/YYYY')}</td>
                          <td className="rounded-tr-[25px] rounded-br-[25px]">
                            {_v?.transactionDetails?.paymentStatus ===
                            'unpaid' ? (
                              <span className="text-[#BF9B05] px-6 py-3 bg-[rgba(191,155,5,0.05)] rounded-full">
                                {_v?.transactionDetails?.paymentStatus}
                              </span>
                            ) : (
                              <span className="text-[#37AC82] px-6 py-3 bg-[rgba(55,172,130,0.1)] rounded-full">
                                {_v?.transactionDetails?.paymentStatus}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationBar
                  pagination={userData?.pagination}
                  clickPage={() => pushPage(pagination?.page)}
                  clickNextPage={() => pushPage(pagination?.page + 1)}
                  clickBackPage={() => pushPage(pagination?.page - 1)}
                />
              </>
            ) : (
              <div className="font-PPNeueMachina text-secondary text-[20px] xl:text-[26px] text-center my-8">
                {content.notfound}
              </div>
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

    const dateStart = context?.req?.query?.dateStart === undefined
      ? moment().startOf('month').toISOString()
      : moment(context?.req?.query?.dateStart).startOf('month').toISOString();
    const page = context?.req?.query?.page || 1;
    
    const userData: IUserDataSchema = await fetch(
      `${API_HOST}/affiliate-dashboard?dateStart=${dateStart}&page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
    )
    .then(async (response) => {
      if(response.status >=200 && response.status <300) {
        const data = await response.json();
        return data;
      }  
    })
    .catch((err) => RollbarService.error(err, context?.req));
    
    const user = jwt.decode(token);

    return {
      props: {
        header,
        userData,
        accessToken: token,
        pagination: userData?.pagination || null,
        user,
        apiUrl: API_HOST
      },
    };      
  } catch(err) {
    RollbarService.error(`Can't get data for affiliate-dashboard from api ${err?.message}, stack: ${err?.stack}`, context?.req);
  }
}