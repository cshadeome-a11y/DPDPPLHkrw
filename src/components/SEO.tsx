import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogType = 'website',
  ogImage = 'https://i.postimg.cc/Z5D0H7Q6/LOGO-PPLH-KRW.png'
}: SEOProps) {
  const siteTitle = 'DPD KOMNAS PPLH Karawang';
  const fullTitle = `${title} | ${siteTitle}`;
  const baseUrl = 'https://komnaspplhkarawang.my.id';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const url = canonical ? `${baseUrl}${canonical}` : `${baseUrl}${currentPath === '/' ? '/' : currentPath}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
