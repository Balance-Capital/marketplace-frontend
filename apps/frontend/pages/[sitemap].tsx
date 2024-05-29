import RollbarService from "../services/rollbar";

export function Index() {
  return (<></>)
}

export async function getServerSideProps(context) {
  const API_HOST = process.env.API_HOST || null
  let PAGE = ''
  try {
    switch(context?.req?.url) {
      case '/sitemap.xml': PAGE = 'sitemap.xml'; break;
      case '/sitemap_static.xml': PAGE = 'sitemap_static.xml'; break;
      case 'sitemap_stores.xml': PAGE = 'sitemap_stores.xml'; break;
      default: PAGE = null;
    }

    if(!PAGE) {
      context?.res?.status(404)?.redirect('404')
    } else if(!API_HOST) {
      context?.res?.status(500)?.redirect('500')
    } else {
      const data = (await fetch(`${API_HOST}/${PAGE}`)
      .then((response) => response.text()))
      ?.toString()
      context?.res?.setHeader('Content-Type', 'application/xml')?.status(200)?.send(data);
    }  
  } catch(err) {
    RollbarService.warning(`Sitemap issue with message: ${err?.message}, ${err?.stack}`, context)
  }
  return {
    props: {
      data: []
    },
  }
}

export default Index
