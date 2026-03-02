"use client";

import Head from "next/head";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
  h1?: string;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * SEO Component for managing page-level meta tags
 * Each page should use this component with unique title and description
 * Supports multilingual SEO with proper lang attributes
 * 
 * IMPORTANT: 
 * - Canonical URLs are auto-generated from current path if not provided
 * - Use noIndex={true} for private/admin pages that should not be indexed
 */
export const SEO = ({
  title,
  description,
  canonical,
  type = "website",
  image = "https://qcmcivique.fr/assets/logo.png",
  noIndex = false,
  keywords,
  publishedTime,
  modifiedTime,
  author = "QCM Civique",
}: SEOProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  
  const fullTitle = title.includes("Examen Civique") || title.includes("QCM Civique") 
    ? title 
    : `${title} | Examen Civique France`;
  const siteUrl = "https://qcmcivique.fr";

  // Normalize canonical to avoid indexing parameterized/hash variants.
  const normalizePath = (path: string) => {
    const [withoutHash] = path.split("#");
    const [withoutQuery] = withoutHash.split("?");
    if (!withoutQuery) return "/";
    return withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  };

  // Auto-generate canonical from current path if not explicitly provided.
  // Always strip query params/hash to keep a single canonical URL per page.
  const currentPath = normalizePath(location.pathname);
  const canonicalPath = normalizePath(canonical || currentPath);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  // Language-specific alternate URLs for hreflang
  const alternateUrls = {
    fr: `${siteUrl}${canonicalPath}`,
    en: `${siteUrl}/en${canonicalPath}`,
    ar: `${siteUrl}/ar${canonicalPath}`,
    es: `${siteUrl}/es${canonicalPath}`,
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Robots - noIndex prop for private/admin pages */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical - ALWAYS present for SEO */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang for multilingual SEO - only for indexed pages */}
      {!noIndex && (
        <>
          <link rel="alternate" hrefLang="fr" href={alternateUrls.fr} />
          <link rel="alternate" hrefLang="x-default" href={alternateUrls.fr} />
        </>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : language === 'ar' ? 'ar_SA' : language === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:site_name" content="QCM Civique France" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@qcmcivique" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#1e40af" />
    </Head>
  );
};
