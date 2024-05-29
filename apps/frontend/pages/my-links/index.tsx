import getConfig from 'next/config';
import { useContext, useState } from 'react';
import jwt from 'jsonwebtoken';
import PaginationBar, { IPagination } from '../../components/PaginationBar';
import SideBar from '../../components/SideBar';
import CreateAffiliateLink from '../../components/CreateAffiliateLink';
import AffiliateLink from '../../components/Modal/AffiliateLink';
import RecentActivityRecord from '../../components/Modal/RecentActivityRecord';
import { NavbarFooterContext } from '../../components/Layout';
import ImageWithFallback from '../../components/ImgWithFallback/ImgWithFallback';
import IUser from '../../interfaces/user';

interface IProps {
  user: IUser;
}

export default function Index(props: IProps) {
  const { user } = props;
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  setIsFooter(true);
  setIsNavbar(true);
  const pagination: IPagination = {
    page: 1,
    limit: 2,
    pages: 1,
    total: 1,
    next: null,
    prev: null,
  };
  const [modal, setModal] = useState(false);
  const [recentModal, setRecentModal] = useState(false);
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  return (
    <section className="max-w-[1920px] mx-auto flex flex-col lg:flex-row bg-[#F3F3F4]">
      {modal && <AffiliateLink setModal={setModal} />}
      {recentModal && <RecentActivityRecord setModal={setRecentModal} />}
      <SideBar user={user} />
      <div className="w-full lg:w-[calc(100%-370px)] px-6 py-12 lg:p-12">
        <h2 className="flex items-center justify-between gap-4 flex-wrap font-PPNeueMachina text-[26px] lg:text-[30px]">
          My Links
          <button
            onClick={() => setModal(true)}
            className="block lg:hidden bg-primary text-white font-InterRegular text-lg rounded-[20px] w-44 py-4"
          >
            + Create link
          </button>
        </h2>
        <div className="my-12 p-12 hidden lg:block rounded-[25px] bg-black">
          <CreateAffiliateLink />
        </div>
        <div className="my-12">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <h2 className="font-PPNeueMachina text-black text-[26px] lg:text-[30px]">
              Recent links
            </h2>
            <div className="flex items-center px-2 py-4 rounded-[20px] border-solid border-2 border-[rgba(112,112,112,0.3)]">
              <div className="ml-1">
                <div className="relative w-6 h-6 self-center">
                  <ImageWithFallback
                    fallbackSrc=""
                    src={`${IMAGE_HOST}/assets/images/svg/search-icon.svg`}
                    alt="searchicon"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <input
                type="text"
                id="default-search"
                className="w-full ml-3 bg-transparent focus:outline-none text-secondary placeholder-secondary"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="overflow-x-scroll font-InterRegular">
            <table className="min-w-[1220px] border-separate border-spacing-y-2">
              <thead className="text-[#74849D] text-lg">
                <tr className="[&>*]:text-start [&>*]:font-normal [&>*]:p-5">
                  <th className="w-[5%]">Store</th>
                  <th className="w-[55%]">Page URL</th>
                  <th className="w-[10%]">Clicks</th>
                  <th className="w-[10%]">Converted</th>
                  <th className="w-[10%]">Commission</th>
                  <th className="w-[10%]">Page status</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {[1, 2, 3, 4, 5].map((_v) => (
                  <tr className="[&>*]:p-5 [&>*]:bg-white" key={_v}>
                    <td className="rounded-tl-[25px] rounded-bl-[25px]">
                      <div className="flex items-center justify-center">
                        <ImageWithFallback
                          fallbackSrc="/assets/imgs/store-default.png"
                          className="rounded-full"
                          width={36}
                          height={36}
                          alt=""
                          src={`${IMAGE_HOST}/assets/images/png/Canon coupons vouchers code 2022.png`}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="w-[552px] flex flex-col text-ellipsis overflow-hidden whitespace-nowrap">
                        <span
                          className="hover:text-primary cursor-pointer"
                          onClick={() => setRecentModal(true)}
                        >
                          Today’s Top Deals & Offers on Coffee — Starbucks
                          Stores
                        </span>
                        <span className="text-sm text-secondary">
                          https://starbucks.com/dealspage.en-gb.html?label=gen173asdqweasdqwe
                        </span>
                      </div>
                    </td>
                    <td>32</td>
                    <td>1</td>
                    <td>$12.54</td>
                    <td className="rounded-tr-[25px] rounded-br-[25px]">
                      {_v === 1 ? (
                        <span className="w-fit flex gap-2 items-center text-[#BF9B05] px-6 py-3 bg-[rgba(191,155,5,0.05)] rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                          >
                            <circle
                              id="Ellipse_986"
                              data-name="Ellipse 986"
                              cx="4.5"
                              cy="4.5"
                              r="4.5"
                              fill="#BF9B05"
                            />
                          </svg>
                          Inactive
                        </span>
                      ) : (
                        <span className="w-fit flex gap-2 items-center text-[#37AC82] px-6 py-3 bg-[rgba(55,172,130,0.1)] rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                          >
                            <circle
                              id="Ellipse_986"
                              data-name="Ellipse 986"
                              cx="4.5"
                              cy="4.5"
                              r="4.5"
                              fill="#37ac82"
                            />
                          </svg>
                          Active
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationBar
          pagination={pagination}
          clickPage={undefined}
          clickNextPage={undefined}
          clickBackPage={undefined}
        />
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const token = context?.req?.cookies?.token || null;
  if (!token) return context.res.status(401).redirect('/401');

  // const host = context?.req?.headers?.host;
  // const header = prepareHeader(language, context.locale);

  // const startDate = moment().toISOString();

  // const data = await fetch(
  //   `http://${host}/api/myrewards?startDate=${startDate}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // ).then((data) => data.json());

  const user = jwt.decode(token);
  
  return {
    props: {
      // header,
      // data,
      user
    },
  };
}
