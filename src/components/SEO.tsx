import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title, 
  description = "DPD KOMNAS PPLH Karawang adalah lembaga pengawas lingkungan hidup yang menerima pengaduan pencemaran dan kerusakan lingkungan di Karawang.",
  keywords = "pengaduan lingkungan karawang, lapor limbah karawang, komnas pplh karawang, pencemaran lingkungan",
  image = "https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/615167722_914906660867547_8653945025282446250_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=p-bbk2OOLpsQ7kNvwEyvUGO&_nc_oc=AdmHaT8RtBcUkhiLXaWOdDoBLHxijcRgC0Jq5bn4SDIOVu5o31SRexAmRkPdfjHv_gY&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=6rfRzEihfoaWznYJ-8ai0A&_nc_ss=8&oh=00_Afw4q8oK0t40xl01aITS6bF0spihNkZn7As5KRCsPxT_OA&oe=69B2FF21",
  url = "https://dpdkomnaspplh.vercel.app"
}: SEOProps) {
  const siteTitle = "DPD KOMNAS PPLH Karawang";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
