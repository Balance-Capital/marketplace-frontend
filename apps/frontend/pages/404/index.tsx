import { useRouter } from 'next/router';
import Error from '../../components/Error';
import SeoHeader from '../../components/SeoHeader';
import IHeaderSchema from '../../interfaces/header';
import { prepareHeader } from '../../utils/prepareHeader';
import language from './locale/index.json';
import getLanguage from '../../utils/getLanguage';
import { useContext, useEffect } from 'react';
import { NavbarFooterContext } from '../../components/Layout';

export function Index() {
  const { setIsNavbar, setIsFooter } = useContext(NavbarFooterContext);
  const router = useRouter();
  const content = getLanguage(language, router.locale).content;
  const header: IHeaderSchema = prepareHeader(language, router.locale);

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
      <Error heading="404" paragraph={content.p1} />
    </>
  );
}

export default Index;
