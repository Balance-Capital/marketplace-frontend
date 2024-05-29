import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import getConfig from 'next/config';

import { Toast } from '../../components/Toast';
import ChangePassword from '../../components/Modal/ChangePassword';
import SideBar from '../../components/SideBar';
import AddCard from '../../components/Modal/AddCard';

import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import {
  NavbarFooterContext,
  UserAvatarImageContext,
  UserBalanceContext,
} from '../../components/Layout';
import ImageWithFallback from '../../components/ImgWithFallback/ImgWithFallback';
import IUser from '../../interfaces/user';
import WalletConnect, { IWallets } from '../../utils/wallet';
import WalletCard from '../../components/WalletCard';
import { ToastMsg } from '../../constants/messages';
import RollbarService from '../../services/rollbar';
import { useRollbar } from '@rollbar/react';
import sleep from '../../utils/sleep';

export interface ISettingsSchema {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  wallets: Array<IWallets>;
}

interface IProps {
  header: IHeaderSchema;
  userData: ISettingsSchema;
  apiHost: string;
  accessToken: string;
  user: IUser;
}

export function Index(props: IProps) {
  const { header, userData, apiHost, accessToken, user } = props;
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const router = useRouter();
  const [data, setData] = useState({ title: '', successDescription: '' });
  const [wallets, setWallets] = useState(props.userData.wallets);
  const content = getLanguage(language, router.locale).content;
  const [modalChangePassword, setChangePasswordModal] = useState(false);
  const [modalAddCard, setModalAddCard] = useState(false);
  const form = {
    lastName: userData?.lastName || undefined,
    firstName: userData?.firstName || undefined,
    avatar: userData?.avatar || undefined,
    password: undefined,
    email: userData?.email || undefined,
  };
  const [formData, setFormData] = useState(form);

  const [createObjectURL, setCreateObjectURL] = useState(null);
  const { publicRuntimeConfig } = getConfig();

  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;
  const { setUserBalance } = useContext(UserBalanceContext);
  const { setUserAvatarImage } = useContext(UserAvatarImageContext);

  const logger = useRollbar();
  let imageData = null;

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);
  }, [setIsFooter, setIsNavbar]);

  useEffect(() => {
    setUserBalance(user?.balance || 0);
    setUserAvatarImage(user?.avatar || null);
  }, [setUserBalance, setUserAvatarImage, user]);

  const uploadImageToClient = async (event) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const image = event.target.files[0];
        imageData = image;
        setCreateObjectURL(URL.createObjectURL(image));
        setForm(event);
        // setUserAvatarImage(createObjectURL);
        await updateProfile();
      }
    } catch (err) {
      Toast.warn('Something went wrong while upload image');
      logger.warn(
        `Upload image with message ${err?.message}, ${err?.stack}`,
        err
      );
    }
  };

  const uploadImage = () => document.getElementById('avatar').click();

  const deleteImage = () => {
    try {
      fetch(`/api/settings-delete?file=${formData?.avatar}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: undefined,
      }).then(async () => {
        formData.avatar = undefined;
        imageData = null;
        setCreateObjectURL(null);
        setUserAvatarImage(null);
        setFormData(formData);
        Toast.success('Image removed');
        await sleep(1500);
        window?.location?.reload();
      });
    } catch (err) {
      Toast.warn('Something went wrong while removing image');
      logger.warn(
        `Delete image with message ${err?.message}, ${err?.stack}`,
        err
      );
    }
  };

  const setForm = (event: any) => {
    form.lastName =
      event.target.id === 'lastName' ? event.target.value : form.lastName;
    form.firstName =
      event.target.id === 'firstName' ? event.target.value : form.firstName;
    form.email = event.target.id === 'email' ? event.target.value : form.email;
    if (event.target.id === 'avatar') {
      form.avatar = (event.target.files && event.target.files[0].name) || null;
    }
    setFormData(form);
  };

  const sendToServer = async (bodyJson) => {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyJson),
      };

      const data = await fetch(`/api/settings`, options);
      return await data.json();
    } catch (err) {
      Toast.warn('Something went wrong while updating data');
      logger.warning(
        `Sent to server, with message ${err?.message}, ${err?.stack}`,
        err
      );
    }
  };

  const updateProfile = async () => {
    try {
      if (!accessToken) router.push('/401', '/401');
      const bodyJson = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        avatar: formData.avatar,
        file: null,
      };
      if (imageData) {
        const r = new FileReader();
        r.readAsBinaryString(imageData);
        r.onload = async function () {
          const file = r.result;
          bodyJson.file = file;
          return await sendToServer(bodyJson)
            .then(async (respnse) => {
              Toast.success('Profile updated');
              await sleep(1500);
              window?.location?.reload();
            })
            .catch((err) => {
              Toast.warn('Something went wrong');
              logger.warn(
                `Update profile with message ${err?.message}, ${err?.stack}`,
                err
              );
            });
        };
      } else {
        return await sendToServer(bodyJson)
          .then(() => Toast.success('Profile updated'))
          .catch((err) => {
            Toast.warn('Something went wrong');
            logger.warn(
              `Update profile with message ${err?.message}, ${err?.stack}`,
              err
            );
          });
      }
    } catch (err) {
      Toast.warn('Something went wrong');
      logger.warn(
        `Update profile with message ${err?.message}, ${err?.stack}`,
        err
      );
    }
  };

  const connectAddWallet = async () => {
    try {
      const wallet = await WalletConnect(accessToken);
      if (wallet === 'ok') {
        Toast.success(ToastMsg.WALLET_CONNECTED);
        setTimeout(() => {
          router.reload();
        }, 1000);
      } else if (wallet === 'conflict') {
        Toast.warn(ToastMsg.WALLET_CONFLICT);
      } else {
        Toast.error(ToastMsg.WALLET_POPUP_CLOSE);
      }
    } catch (err) {
      Toast.error(ToastMsg.WALLET_CONNECTIVITY_FAILED);
    }
  };

  const deleteWallet = async () => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };
      const wallets = userData.wallets[0].address;
      const data = await fetch(
        `/api/walletDelete?wallet=${wallets}`,
        options
      ).then((results) => results.json());
      console.log(data);
      if (data?.deleted) {
        Toast.success('Wallet removed');
        await sleep(1500);
        window?.location?.reload();
      } else {
        Toast.error('Somethings went wrong, try again.');
        logger.warn('Can not, remove the wallet', wallets);
      }
    } catch (err) {
      Toast.warn('Something went wrong while updating data');
      logger.warn(
        `Sent to server, with message ${err?.message}, ${err?.stack}`,
        err
      );
    }
  };

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
        {modalChangePassword && (
          <ChangePassword setModal={setChangePasswordModal} data={data} />
        )}
        {modalAddCard && <AddCard setModal={setModalAddCard} />}
        <SideBar user={user} />
        <div className="w-full lg:w-[calc(100%-370px)] px-6 py-12 lg:p-12">
          <h2 className="font-PPNeueMachina text-[26px] lg:text-[30px]">
            {content.h1}
          </h2>
          <div className="my-12 font-InterRegular flex flex-wrap items-start gap-12">
            <div className="max-w-[300px]">
              <h2 className="text-black text-lg">{content.h2}</h2>
              <p className="text-secondary text-sm mt-2">{content.p1}</p>
            </div>
            <div className="flex gap-[27px]">
              {createObjectURL || formData.avatar ? (
                <ImageWithFallback
                  fallbackSrc={`${IMAGE_HOST}/assets/images/avatars/default-avatar.png`}
                  width={82}
                  height={82}
                  alt="avatar"
                  layout="fixed"
                  src={createObjectURL || `${IMAGE_HOST}/${formData.avatar}`}
                  className="rounded-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="77.338"
                  height="82.862"
                  viewBox="0 0 77.338 82.862"
                  className="bg-[rgba(116,132,157,0.1)] rounded-full pt-2 w-24 h-24"
                >
                  <path
                    id="_9041988_user_male_icon"
                    data-name="9041988_user_male_icon"
                    d="M39.169.5A16.572,16.572,0,0,1,55.742,17.072V28.121a16.572,16.572,0,0,1-33.145,0V17.072A16.572,16.572,0,0,1,39.169.5ZM77.838,77.838V73.815c0-17.6-20.364-29.122-38.669-29.122S.5,56.213.5,73.815v4.023a5.524,5.524,0,0,0,5.524,5.524h66.29A5.524,5.524,0,0,0,77.838,77.838Z"
                    transform="translate(-0.5 -0.5)"
                    fill="#74849d"
                  />
                </svg>
              )}
              <div className="flex flex-col">
                <input
                  id="avatar"
                  hidden
                  type="file"
                  onChange={uploadImageToClient}
                />
                <button
                  onClick={() => uploadImage()}
                  className="border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl w-[178px] h-[49px]"
                >
                  {content.btn1}
                </button>
                <button
                  onClick={() => deleteImage()}
                  className="text-primary w-[178px] h-[49px]"
                >
                  {content.btn2}
                </button>
              </div>
            </div>
            <div className="grow flex">
              <div className="grow">
                <div className="grow flex gap-[27px] flex-wrap">
                  {userData.firstName && (
                    <div className="grow min-w-[300px] flex flex-col gap-2">
                      <span className="text-secondary text-sm">
                        {content.l1}
                      </span>
                      {/* <input
                      type="text"
                      id="firstName"
                      placeholder={userData.firstName}
                      onChange={setForm}
                      className="flex-grow h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                    /> */}
                      <div className="grow flex items-center h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent text-black">
                        {`${userData.firstName}  ${userData.lastName || ''}`}
                      </div>
                    </div>
                  )}
                  <div className="grow min-w-[300px] flex flex-col gap-2">
                    <div className="flex gap-4 items-center justify-between">
                      <span className="text-secondary text-sm">
                        {content.l3}
                      </span>
                    </div>
                    <div className="flex-grow flex items-center h-[59px] px-3 rounded-xl bg-[rgba(116,132,157,0.05)] focus:outline-none text-black placeholder-black">
                      {userData.email}
                    </div>
                  </div>
                  {/* <div className="flex-grow flex flex-col gap-2">
                    <label
                      className="text-secondary text-sm"
                      htmlFor="lastName"
                    >
                      {content.l2}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder={userData.lastName}
                      onChange={setForm}
                      className="flex-grow h-[59px] px-3 border-solid border-2 border-[rgba(112,112,112,0.1)] rounded-xl bg-transparent focus:outline-none text-black placeholder-black"
                    />
                  </div> */}
                </div>
                {/* <div className="flex-grow flex gap-12 flex-wrap">
                  <div className="flex-grow flex flex-col gap-2">
                    <div className="flex gap-4 items-center justify-between">
                      <span className="text-secondary text-sm">
                        {content.l3}
                      </span>
                      <button
                        onClick={() => {
                          setChangePasswordModal(true);
                          setData({
                            title: content.btn3title,
                            successDescription: content.btn3description,
                          });
                        }}
                        className="text-primary"
                      >
                        {content.btn4}
                      </button>
                    </div>
                    <div className="flex-grow flex items-center h-[59px] px-3 rounded-xl bg-[rgba(116,132,157,0.05)] focus:outline-none text-black placeholder-black">
                      {userData.email}
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col gap-2">
                    <div className="flex gap-4 items-center justify-between">
                      <span className="text-secondary text-sm">
                        {content.password}
                      </span>
                      <button
                        className="text-primary"
                        onClick={() => {
                          setChangePasswordModal(true);
                          setData({
                            title: content.btn5title,
                            successDescription: content.btn5description,
                          });
                        }}
                      >
                        {content.btn5}
                      </button>
                    </div>
                    <div className="flex-grow flex items-center h-[59px] px-3 rounded-xl bg-[rgba(116,132,157,0.05)] focus:outline-none text-black placeholder-black">
                      •••••••••
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="w-full flex items-center justify-end">
              <button
                onClick={() => updateProfile()}
                className="hover:bg-primary rounded-xl w-[244px] h-[59px] bg-black text-white text-lg"
              >
                {content.btn6}
              </button>
            </div>
          </div>
          <hr />
          <div className="my-12 font-InterRegular flex flex-wrap items-start gap-12">
            <div className="min-w-[300px]">
              <h2 className="text-black text-lg">Payout method</h2>
              <p className="text-secondary text-sm mt-2">
                Add and manage your payout method.
              </p>
              {userData.wallets.length > 0 ? (
                <div className="pt-5 w-full flex items-center justify-start">
                  <button
                    onClick={() => deleteWallet()}
                    className="hover:bg-primary rounded-xl w-[244px] h-[59px] bg-black text-white text-lg"
                  >
                    {' '}
                    - Remove wallet address
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>

            {userData.wallets.length ? (
              userData.wallets.map((wallet, indx) => (
                <WalletCard
                  key={indx}
                  dateUpdate={wallet.lastUpdate}
                  address={wallet.address}
                  name={wallet.name}
                />
              ))
            ) : (
              <div className="w-full flex items-center justify-end">
                <button
                  onClick={() => connectAddWallet()}
                  className="hover:bg-primary rounded-xl w-[244px] h-[59px] bg-black text-white text-lg"
                >
                  + Add wallet address
                </button>
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

    const API_HOST = process.env.API_HOST || null;
    if (!API_HOST)
      return context.res.status(500).json({ error: 'empty API HOST' });

    const host = context?.req?.headers?.host;
    const header = prepareHeader(language, context.locale);
    const userData = await fetch(`${API_HOST}/settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.json());
    userData.host = host;
    const user = jwt.decode(token);
    return {
      props: {
        header,
        userData,
        apiHost: API_HOST,
        accessToken: token,
        user,
      },
    };
  } catch (err) {
    RollbarService.error(
      `Can't get data  for settings from api ${err?.message}, stack: ${err?.stack}`,
      context?.req
    );
    return null;
  }
}

export default Index;
