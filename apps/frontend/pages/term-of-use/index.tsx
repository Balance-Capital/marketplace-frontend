import { useRouter } from 'next/router';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import { useContext, useEffect } from 'react';
import { NavbarFooterContext } from '../../components/Layout';
interface IProps {
  header: IHeaderSchema;
}

export function Index(props: IProps) {
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const router = useRouter();
  const { header } = props;
  const content = getLanguage(language, router.locale).content;

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

      <section className="max-w-[1920px] mx-auto mt-16 mb-16 lg:mt-32 lg:mb-32">
        <div className="w-[80.9375%] mx-auto">
          <div>
            <h1 className="font-InterSemiBold text-2xl">{content.h1}</h1>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p1}
              <br />
              <br />
              {content.p1a}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p2}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2a}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p3}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2b}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p4}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2c}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p5}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2d}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p6}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2.e}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p7}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2f}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p8}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2g}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p9}
            </p>
          </div>
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
