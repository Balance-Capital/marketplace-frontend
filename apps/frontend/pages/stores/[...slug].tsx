import Link from 'next/link';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import moment from 'moment';

import IHeaderSchema from '../../interfaces/header';
import IStore from '../../interfaces/store';
import SeoHeader from '../../components/SeoHeader';
import backendApi from '../../utils/backendApi';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import StoresCard from '../../components/StoresCard';
import { useContext, useEffect, useState } from 'react';
import IUser from '../../interfaces/user';
import { UserAvatarImageContext, UserBalanceContext } from '../../components/Layout';
import { COOKIE_NAME } from '../../constants/cookieName';
import RollbarService from "../../services/rollbar";
interface IProps {
  header: IHeaderSchema;
  data: Array<IStore>;
  user: IUser | null;
}

export function Index(props: IProps) {
  const router = useRouter();
  const { header, data, user } = props;
  const [win, setWin] = useState({} as Window);
  const content = getLanguage(language, router.locale).content;
  const { setUserBalance } = useContext(UserBalanceContext);
  const { setUserAvatarImage } = useContext(UserAvatarImageContext);
  
  useEffect(() => {
    setUserBalance(user?.balance || 0)
    setUserAvatarImage(user?.avatar || null)
  }, [setUserBalance, setUserAvatarImage, user])

  useEffect(() => {
    setWin(window);
  }, []);
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

      <section className="w-full mt-16 mb-16 lg:mt-32 lg:mb-32">
        <div className="w-[80.9375%] mx-auto">
          <h1 className="font-PPNeueMachina text-3xl">{content.h1}</h1>
          <div className="p-6 flex items-center justify-center flex-wrap gap-2 rounded-2xl shadow-3xl mt-8">
            <span className="text-base lg:text-2xl text-secondary">
              {content.filter}
            </span>
            {Array(26)
              .fill(0)
              .map((_v, i) => (
                <Link href={`${String.fromCharCode(i + 65)}`} key={i}>
                  <a
                    className={`flex justify-center items-center rounded-full text-[14px] lg:text-[17px] w-[38px] h-[38px] lg:w-[45px] lg:h-[45px]  ${
                      win?.location?.pathname?.includes(
                        String.fromCharCode(i + 65)
                      )
                        ? 'bg-primary text-white'
                        : 'bg-[rgba(185,184,189,0.1)] text-secondary'
                    } active:bg-primary active:text-white`}
                  >
                    {String.fromCharCode(i + 65)}
                  </a>
                </Link>
              ))}
            <Link href="0">
              <a className="flex justify-center items-center rounded-full text-[14px] lg:text-[17px] w-[38px] h-[38px] lg:w-[45px] lg:h-[45px] text-secondary bg-[rgba(185,184,189,0.1)] active:bg-primary active:text-white">
                #
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
            {(data.length &&
              data?.map((_v, i) => (
                <StoresCard
                  key={`stores_${i}`}
                  imageLogo={_v?.logo}
                  name={_v?.name}
                  domain={_v?.domain}
                  countOffers={_v?.offersLength}
                />
              ))) || (
              <span className="font-PPNeueMachina text-2xl text-secondary">
                No stores available.
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="w-full mt-32 mb-16 flex items-center justify-center">
        <div className="w-[80.9375%] flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="font-PPNeueMachina text-3xl">{content.h3}</h3>
            <p className="font-InterRegular text-lg lg:text-xl text-[#3F4958] leading-7 lg:leading-10 mt-8">
              {content.p1}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const userId = context?.req?.cookies[COOKIE_NAME] || null;
    const referral = context?.req?.cookies?.referral || null;
    const userTrackerId = `${userId}:${referral}`;

    const token = context?.req?.cookies?.token || null;
    const user = token ? jwt.decode(token) : null;

    const country = context?.req?.cookies?.countryCode || 'US';
    const PAGE = 'stores';
    const letter: string = context?.params?.slug[0] === '0' ? '%23' : context?.params?.slug[0];

    const QUERY = letter
      ? `filter=${letter.toLocaleLowerCase(
          context.locale
        )}&sessionId=${userTrackerId}&country=${country}`
      : `sessionId=${userTrackerId}&country=${country}`;

    const data = await backendApi(PAGE, QUERY);
    
    if(data?.trackerId) setCookie(COOKIE_NAME,data?.trackerId,{expires:moment().add(1,'year').toDate()});

    const header = prepareHeader(language, context.locale);

    return {
      props: {
        header,
        data: data?.data || [],
        user
      },
    };
  } catch(err) {
    RollbarService.error(`Can't build stores, ${err?.message}, stack: ${err?.stack}`, context?.req);
  }
}

export default Index;
