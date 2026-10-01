export const instagramUrl = "https://www.instagram.com/thelittle_hairshop/";

export const salonSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "The Little Hair Shop",
  founder: "Sandy DeBoer",
  telephone: "+1-619-403-0551",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1360 Rosecrans St, Suite J",
    addressLocality: "San Diego",
    addressRegion: "CA",
    postalCode: "92106",
    addressCountry: "US",
  },
  sameAs: instagramUrl,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "10",
  },
};

export function pageHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(salonSchema),
      },
    ],
  };
}
