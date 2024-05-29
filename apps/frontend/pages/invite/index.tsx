/* eslint-disable @next/next/no-img-element */
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import { useContext, useEffect } from 'react';
import { NavbarFooterContext } from '../../components/Layout';
import ImageWithFallback from '../../components/ImgWithFallback/ImgWithFallback';

interface IProps {
  header: IHeaderSchema;
}

export function Index(props: IProps) {
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const router = useRouter();
  const { header } = props;
  const content = getLanguage(language, router.locale).content;
  const { publicRuntimeConfig } = getConfig();
  const IMAGE_HOST = publicRuntimeConfig.IMAGE_HOST_CDN;

  useEffect(() => {
    setIsFooter(true);
    setIsNavbar(true);  
  },[setIsFooter,setIsNavbar])
  
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

      <section className="bg-gradient-to-b from-[#5958CB] to-[#4543BD]">
        <div className="max-w-[1920px] mx-auto">
          <div className="w-[80%] py-20 mx-auto flex items-center justify-between">
            <div className="w-[100%] xl:w-[40%] font-InterRegular">
              <h1 className="font-PPNeueMachina text-[#F3F3F4] text-[36px] xl:text-[40px]">
                {content.h1}
              </h1>
              <p className="text-[#CECEF0] text-[18px] xl:text-[20px]">
                {content.p1}
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="inline-block rounded-full bg-black text-white py-4 px-8"
                >
                  {content.a1}
                </a>
                <a href="#" className="px-4 text-[#CECEF0] underline">
                  {content.a2}
                </a>
              </div>
            </div>
            <div className="hidden xl:block w-[40%]">
              <ImageWithFallback
                fallbackSrc=""
                layout="fill"
                objectFit="contain"
                src={`${IMAGE_HOST}/assets/images/png/invite-banner.png`}
                alt="invite banner"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F3F4]">
        <div className="max-w-[1920px] mx-auto">
          <div className="w-[80%] py-10 md:py-20 mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <h2 className="font-PPNeueMachina text-[26px] xl:text-[30px]">
                {content.h2}
              </h2>
              <p className="font-InterRegular text-base text-[#74849D]">
                {content.p2}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex-grow flex flex-col items-center justify-center bg-[#FFC363] rounded-[30px] p-6 md:p-12">
                <div className="relative w-60 h-60">
                  <ImageWithFallback
                    fallbackSrc=""
                    layout="responsive"
                    width={100}
                    height={100}
                    objectFit="cover"
                    src={`${IMAGE_HOST}/assets/images/png/invite-1.png`}
                    alt="invite"
                  />
                </div>
                <div className="w-[240px] md:w-[320px] text-center">
                  <h3 className="font-PPNeueMachina text-[26px]">
                    {content.h3}
                  </h3>
                  <p className="font-InterRegular text-lg mt-4">{content.p3}</p>
                </div>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center bg-[#A381FF] rounded-[30px] p-6 md:p-12">
                <div className="relative w-60 h-60">
                  <ImageWithFallback
                    fallbackSrc=""
                    layout="fill"
                    objectFit="cover"
                    src={`${IMAGE_HOST}/assets/images/png/invite-2.png`}
                    alt="invite two"
                  />
                </div>
                <div className="w-[240px] md:w-[320px] text-center">
                  <h3 className="font-PPNeueMachina text-[26px]">
                    {content.h3a}
                  </h3>
                  <p className="font-InterRegular text-lg mt-4">{content.p4}</p>
                </div>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center bg-[#F8BABA] rounded-[30px] p-6 md:p-12">
                <div className="relative w-60 h-60">
                  <ImageWithFallback
                    fallbackSrc=""
                    layout="fill"
                    objectFit="cover"
                    src={`${IMAGE_HOST}/assets/images/png/invite-3.png`}
                    alt="invite three"
                  />
                </div>
                <div className="w-[240px] md:w-[320px] text-center">
                  <h3 className="font-PPNeueMachina text-[26px]">
                    {content.h3b}
                  </h3>
                  <p className="font-InterRegular text-lg mt-4">{content.p5}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#000]">
        <div className="max-w-[1920px] mx-auto text-center px-6 py-20 border-b-2 border-primary">
          <h2 className="font-PPNeueMachina text-white text-[26px] xl:text-[30px]">
            {content.h2a}
          </h2>
          <p className="font-InterRegular text-[#CECEF0] text-[15px] mt-4">
            {content.p6}
          </p>
          <a
            href="#"
            className="inline-block text-white text-lg bg bg-primary rounded-full px-16 py-4 mt-6"
          >
            {content.a1}
          </a>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const header = prepareHeader(language, context.locale);

  return {
    props: {
      header,
    },
  };
}

export default Index;
