import { useRouter } from 'next/router';
import Link from 'next/link';
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
              {content.p1}{' '}
              <Link href="https://XXX" legacyBehavior>
                <a className="text-primary">{content.orgName}</a>
              </Link>{' '}
              {content.p1a}
              <br />
              <br />
              {content.p1b}{' '}
              <Link href={`mailto:${content.mailto}`} legacyBehavior>
                <a className="text-primary">{content.mailto}</a>
              </Link>
              {content.p1c}
              <br />
              <br />
              {content.p1d}
              <br />
              <br />
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p2}
              <br />
              {content.p2a}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2a}</h2>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p3}
            </p>
            <ul className="list-disc pl-5 font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.li1.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p3a}
            </p>
            <ul className="list-disc pl-5 font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.li2.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p4}
            </p>
            <ul className="list-disc pl-5 font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.li3.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p4a}
              <br />
              <br />
              {content.p4b}
              <br />
              <br />
              {content.p4c}
              <br />
              <br />
              {content.p4d}
              <br />
              <br />
              {content.p4e}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2b}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p5}
            </p>
            <ul className="list-disc pl-5 font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.li4.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2c}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p6}
              <br />
              <br />
              {content.p6a}
              <br />
              <br />
              {content.p6b}
              <br />
              <br />
              {content.p6c}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2d}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p7}
            </p>
          </div>
          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2e}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p8}
            </p>
          </div>

          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2f}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p9}
            </p>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3b}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p10}
            </p>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3c}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p11}{' '}
              <Link href="https://preferences-mgr.truste.com/" legacyBehavior>
                <a className="text-primary">{content.trustarc}</a>
              </Link>
              {content.p11a}{' '}
              <Link href="https://aboutads.info/choices/" legacyBehavior>
                <a className="text-primary">{content.youradchoices}</a>
              </Link>
              , or the{' '}
              <Link href="https:/networkadvertising.org/choices/" legacyBehavior>
                <a className="text-primary">{content.nai}</a>
              </Link>{' '}
              {content.p11b}
            </p>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3d}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p12}{' '}
              <Link href="https://support.google.com/analytics/answer/181881?hl=enor" legacyBehavior>
                <a className="text-primary">{content.p12a} </a>
              </Link>{' '}
              {content.p12b}
              <Link href="https://tools.google.com/dlpage/gaoptout" legacyBehavior>
                <a className="text-primary"> {content.p12c}</a>
              </Link>
              .
            </p>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3e}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p13}
            </p>

            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3f}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p14}
              <br />
              <br />
              {content.p14a}
            </p>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3g}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p15}
            </p>
            <br />
            <ul className="list-disc pl-5 font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.li5.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>

            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3h}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p16}
            </p>

            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3i}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p17}
            </p>

            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3j}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p18}
            </p>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3k}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p19}
            </p>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3l}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p20}{' '}
              <Link href="mailto:privacyofficer@XXX" legacyBehavior>
                <a className="text-primary">{content.p20a}</a>
              </Link>
              .
            </p>
          </div>

          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2g}</h2>
            <h3 className="font-InterSemiBold text-xl mt-4">{content.h3m}</h3>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              <strong>
                <em>{content.p21}</em>
              </strong>
              <br />
              <br />
              {content.p21a}
              <br />
              <br />
              {content.p21b} {content.p21c}
              <br />
              <br />
              {content.p21d}
              <Link href="mailto:privacyofficer@XXX" legacyBehavior>
                <a className="text-primary"> privacyofficer@XXX </a>
              </Link>
              {content.p21e}
            </p>
          </div>

          <div className="mt-16">
            <h2 className="font-InterSemiBold text-2xl">{content.h2h}</h2>
            <p className="font-InterRegular text-lg leading-7 mt-4 text-[#3F4958]">
              {content.p22}
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
