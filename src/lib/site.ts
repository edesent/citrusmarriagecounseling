/**
 * Everything a person is likely to change lives here: prices, the phone,
 * Pastor Brandon's bio, the church, the navigation. Pages read from this file,
 * so a change here updates every page, the structured data and the sitemap.
 */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.citrusmarriagecounseling.com").replace(/\/$/, "");

export const practice = {
  name: "Citrus Marriage Counseling",
  /** Shown under the wordmark and in titles. */
  tagline: "Christian marriage counseling with Pastor Brandon Bankert",
  county: "Citrus County",
  state: "Florida",
  stateCode: "FL",
};

export const phone = {
  display: "(352) 860-0804",
  tel: "+13528600804",
};

/** Where Pastor Brandon meets people: Bethel Baptist Church. */
export const place = {
  name: "Bethel Baptist Church",
  street: "2289 N McGee Drive",
  city: "Hernando",
  stateCode: "FL",
  zip: "34442",
  lat: 28.896914,
  lng: -82.413731,
  /** Opens directions in Google Maps. */
  directions: "https://www.google.com/maps/dir/?api=1&destination=Bethel+Baptist+Church,+2289+N+McGee+Dr,+Hernando,+FL+34442",
};

export const church = {
  name: "Bethel Baptist Church",
  url: "https://bethelbaptisthernando.org",
  founded: 1984,
};

export const pastor = {
  name: "Brandon Bankert",
  styled: "Pastor Brandon Bankert",
  short: "Pastor Brandon",
  marriedSince: 2011,
  /** From his pastor page at Bethel, in his own words where quoted. */
  college: "International Bible College",
  collegeYear: 2003,
  ordained: "December 2025",
  heartLine: "God has given me a heart for the lost and a love for God’s people.",
};

/**
 * Prices. Premarital counseling is an eight-session package paid at the start;
 * the site shows the per-session price only (Eli, 2026-11-04). Leave
 * marriageSession null until there is a number to publish.
 */
export const pricing = {
  consultation: 0,
  premaritalSession: 62.5,
  premaritalSessions: 8,
  marriageSession: null as number | null,
};

export const money = (n: number) => `$${n % 1 ? n.toFixed(2) : n}`;

/** Places to send people when counseling with a pastor is not the right help. */
export const otherHelp = [
  { name: "Emergency", detail: "Call 911 if anyone is in danger right now." },
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988, any hour." },
  { name: "CASA (Citrus County Abuse Shelter Association)", detail: "24-hour domestic violence hotline, 352-344-8111." },
];

export const nav = [
  { href: "/christian-marriage-counseling", label: "Marriage" },
  { href: "/premarital-counseling", label: "Premarital" },
  { href: "/faith-based-counseling", label: "Faith-based" },
  { href: "/pastor-brandon-bankert", label: "Pastor Brandon" },
  { href: "/areas", label: "Areas" },
];
