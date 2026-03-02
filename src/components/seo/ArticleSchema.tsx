interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
  url: string;
}

export const ArticleSchema = ({
  title,
  description,
  datePublished,
  dateModified,
  author = "QCM Civique",
  image = "https://qcmcivique.fr/assets/logo.png",
  url,
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    author: {
      "@type": "Organization",
      name: author,
      url: "https://qcmcivique.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "QCM Civique",
      logo: {
        "@type": "ImageObject",
        url: "https://qcmcivique.fr/assets/logo.png",
      },
    },
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
