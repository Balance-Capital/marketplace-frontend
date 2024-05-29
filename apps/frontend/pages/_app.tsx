import { AppProps } from 'next/app';
import { ErrorBoundary, Provider } from '@rollbar/react';
import getConfig from 'next/config';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Script from 'next/script';
import LoadingLogo from '../components/LoadingLogo/LoadingLogo';
import Layout from '../components/Layout';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      setIsLoading(true);
    });

    Router.events.on('routeChangeComplete', (url) => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', (url) => {
      setIsLoading(false);
    });
  }, []);

  const rollbarConfig = {
    accessToken: publicRuntimeConfig?.ROLLBAR_TOKEN_CLIENT || null,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: publicRuntimeConfig.ENV || 'undefined',
    payload: {
      client: {
        javascript: {
          code_version: '1.0.0',
          source_map_enabled: false,
        },
      },
    },
  };
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <div className="app">
          {isLoading ? (
            <LoadingLogo />
          ) : (
            <Layout>
              <GoogleReCaptchaProvider
                reCaptchaKey={publicRuntimeConfig.GOOGLE_RECAPTCHA_SITE_KEY}
                scriptProps={{
                  async: false,
                  defer: false,
                  appendTo: 'head',
                  nonce: undefined,
                }}
              >
                <Script
                  id="segmentByGoogle"
                  dangerouslySetInnerHTML={{
                    __html: ` !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="${publicRuntimeConfig.SEGMENT_BY_GOOGLE_KEY || undefined}";analytics.SNIPPET_VERSION="4.15.3";
                    analytics.load("${publicRuntimeConfig.SEGMENT_BY_GOOGLE_KEY || undefined}");
                    analytics.page();
                    }}();`,
                  }}
                />
                <Script
                  async
                  id="tagmanager-main"
                  strategy="afterInteractive"
                  src={`https://www.googletagmanager.com/gtag/js?id=${publicRuntimeConfig.TAG_MANAGER_KEY || undefined}`}
                />
                <Script
                  id="tagmanager-setup"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${publicRuntimeConfig.TAG_MANAGER_KEY || undefined}');`,
                  }}
                />
                <Component {...pageProps} />
              </GoogleReCaptchaProvider>
            </Layout>
          )}
        </div>
      </ErrorBoundary>        
    </Provider>
  );
}
export default CustomApp;
