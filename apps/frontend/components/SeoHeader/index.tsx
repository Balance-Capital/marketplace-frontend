import Head from 'next/head';
import IHeaderSchema from '../../interfaces/header';

function SeoHeader(props: IHeaderSchema) {
  const {
    title,
    description,
    keyWords,
    openGraph,
    metaRobots,
    jsonLd,
    canonicalLink,
    preloadImgLinks,
  } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`/assets/images/icon/favicon-96x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/assets/images/icon/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/assets/images/icon/favicon-16x16.png`}
      />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="keywords" content={keyWords} />
      <link rel="canonical" href={canonicalLink} />
      {metaRobots ? (
        <meta name="robots" content={metaRobots} />
      ) : (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {openGraph ? (
        <>
          <meta property="og:title" content={openGraph.ogTitle} />
          <meta property="og:description" content={openGraph.ogDescription} />
          <meta property="og:image" content={openGraph.ogImage} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={openGraph.ogUrl} />
          <meta property="og:site_name" content={openGraph.ogSiteName} />
        </>
      ) : (
        ''
      )}

      {jsonLd.map((item, index) => {
        return (
          <script
            key={`json-LD-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        );
      })}
      {preloadImgLinks &&
        preloadImgLinks.map((url, index) => (
          <link key={index} rel="preload" as="image" href={url} />
        ))}
    </Head>
  );
}

export default SeoHeader;
