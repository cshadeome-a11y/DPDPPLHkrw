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
  ogImage = 'https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/615167722_914906660867547_8653945025282446250_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=p-bbk2OOLpsQ7kNvwEyvUGO&_nc_oc=AdmHaT8RtBcUkhiLXaWOdDoBLHxijcRgC0Jq5bn4SDIOVu5o31SRexAmRkPdfjHv_gY&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=6rfRzEihfoaWznYJ-8ai0A&_nc_ss=8&oh=00_Afw4q8oK0t40xl01aITS6bF0spihNkZn7As5KRCsPxT_OA&oe=69B2FF21'
}: SEOProps) {
  const siteTitle = 'DPD KOMNAS PPLH Karawang';
  const fullTitle = `${title} | ${siteTitle}`;
  const baseUrl = 'https://komnaspplhkarawang.my.id';
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;

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
