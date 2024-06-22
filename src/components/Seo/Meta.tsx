// components/Meta.tsx

import Head from "next/head";
import { NextPage } from "next";

type PageType =
  | "home"
  | "product"
  | "catalog"
  | "category"
  | "brend"
  | "search"
  | "service";

type MetaProps = {
  pageType: PageType;
};

import metadata from "./seo-metadata.json";

const Meta: NextPage<MetaProps> = ({ pageType }) => {

  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogSiteName,
  } = metadata[pageType];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
    </Head>
  );
};

export default Meta;
