import { areas } from "./areas";
import { church, phone, place, pastor, practice, pricing, siteUrl } from "./site";

/**
 * Structured data (schema.org JSON-LD). The layout prints the practice, the
 * pastor and the church once on every page; pages add their own Service,
 * FAQPage and BreadcrumbList nodes that point back at these by @id.
 */

export const ids = {
  practice: `${siteUrl}/#practice`,
  pastor: `${siteUrl}/#pastor`,
  church: `${church.url}/#church`,
  website: `${siteUrl}/#website`,
};

const address = {
  "@type": "PostalAddress",
  streetAddress: place.street,
  addressLocality: place.city,
  addressRegion: place.stateCode,
  postalCode: place.zip,
  addressCountry: "US",
};

/** Citrus County itself plus every community in it. */
export const areaServed = [
  { "@type": "AdministrativeArea", name: "Citrus County, Florida" },
  ...areas.flatMap((a) => [a.name, ...a.alsoServes]).map((name) => ({ "@type": "Place", name: `${name}, FL` })),
];

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ids.practice,
        name: practice.name,
        alternateName: `${practice.tagline}`,
        description: `Christian marriage counseling, premarital counseling and faith-based counseling for couples and families across ${practice.county}, ${practice.state}, with ${pastor.styled} of ${church.name} in Hernando.`,
        url: siteUrl,
        image: `${siteUrl}/photos/pastor-brandon-bankert.jpg`,
        logo: `${siteUrl}/icon.svg`,
        telephone: phone.tel,
        address,
        geo: { "@type": "GeoCoordinates", latitude: place.lat, longitude: place.lng },
        areaServed,
        founder: { "@id": ids.pastor },
        employee: { "@id": ids.pastor },
        parentOrganization: { "@id": ids.church },
        knowsAbout: ["Christian marriage counseling", "Premarital counseling", "Faith-based counseling", "Biblical counseling"],
        makesOffer: [
          {
            "@type": "Offer",
            name: "Free consultation",
            price: pricing.consultation,
            priceCurrency: "USD",
            url: `${siteUrl}/free-consultation`,
          },
          {
            "@type": "Offer",
            name: "Premarital counseling",
            url: `${siteUrl}/premarital-counseling`,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: pricing.premaritalSession,
              priceCurrency: "USD",
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "session" },
            },
          },
        ],
      },
      {
        "@type": "Person",
        "@id": ids.pastor,
        name: pastor.name,
        honorificPrefix: "Pastor",
        jobTitle: "Pastor and Christian counselor",
        image: `${siteUrl}/photos/pastor-brandon-bankert.jpg`,
        url: `${siteUrl}/pastor-brandon-bankert`,
        worksFor: [{ "@id": ids.church }, { "@id": ids.practice }],
        alumniOf: { "@type": "CollegeOrUniversity", name: pastor.college },
      },
      {
        "@type": "Church",
        "@id": ids.church,
        name: church.name,
        url: church.url,
        foundingDate: String(church.founded),
        address,
        telephone: phone.tel,
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: siteUrl,
        name: practice.name,
        publisher: { "@id": ids.practice },
        inLanguage: "en-US",
      },
    ],
  };
}

export function serviceNode(name: string, path: string, description: string, serviceType: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${siteUrl}${path}`,
    provider: { "@id": ids.practice },
    areaServed,
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export type QA = { q: string; a: string };

export function faqPage(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
