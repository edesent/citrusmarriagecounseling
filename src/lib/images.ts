/**
 * Every picture on the site, in one place, so the file name, size and alt text
 * stay the same wherever it appears (and in the sitemap and structured data).
 *
 * File names describe the picture in plain words; alt text says what is in it
 * and why it is on a counseling page, without stuffing town names in.
 *
 * Two kinds of picture:
 *  - real photos of Pastor Brandon and his family (from Bethel Baptist Church);
 *  - illustrations of counseling situations, made with ChatGPT (gpt-image-2) at
 *    Eli's request on 2026-11-04. They show no one from Bethel, so never caption
 *    them as clients, members or the church.
 */

export type Pic = { src: string; w: number; h: number; alt: string };

export const pics = {
  // Real photos
  pastorPortrait: {
    src: "/photos/pastor-brandon-bankert-christian-counselor-hernando-fl.jpg",
    w: 840,
    h: 1050,
    alt: "Pastor Brandon Bankert, Christian counselor and pastor of Bethel Baptist Church in Hernando, Florida",
  },
  pastorFamily: {
    src: "/photos/pastor-brandon-bankert-family-hernando-fl.jpg",
    w: 1800,
    h: 1350,
    alt: "Pastor Brandon Bankert with his wife and children in front of the cross at Bethel Baptist Church, Hernando",
  },
  pastorPreaching: {
    src: "/photos/pastor-brandon-bankert-preaching-bethel-baptist-hernando.jpg",
    w: 1280,
    h: 720,
    alt: "Pastor Brandon Bankert preaching at Bethel Baptist Church in Hernando, Florida",
  },
  ordination: {
    src: "/photos/pastor-brandon-bankert-ordination-bethel-baptist-church.jpg",
    w: 1188,
    h: 1280,
    alt: "Pastors laying hands on Brandon Bankert at his ordination at Bethel Baptist Church, December 2025",
  },
  headshot: {
    src: "/photos/pastor-brandon-bankert-headshot.jpg",
    w: 480,
    h: 480,
    alt: "Pastor Brandon Bankert",
  },

  // Illustrations
  marriageCouple: {
    src: "/photos/christian-marriage-counseling-couple-citrus-county-fl.webp",
    w: 1536,
    h: 1024,
    alt: "A husband and wife holding hands on a sofa during Christian marriage counseling, an open Bible and coffee mugs on the table",
  },
  engagedCouple: {
    src: "/photos/christian-premarital-counseling-engaged-couple-florida.webp",
    w: 1536,
    h: 1024,
    alt: "An engaged couple laughing as they work through a premarital counseling workbook beside an open Bible",
  },
  motherDaughter: {
    src: "/photos/faith-based-counseling-mother-daughter-florida-porch.webp",
    w: 1536,
    h: 1024,
    alt: "A mother holding her grown daughter's hand on a screened Florida porch after a hard conversation",
  },
  olderCouple: {
    src: "/photos/older-married-couple-live-oaks-citrus-county-florida.webp",
    w: 1536,
    h: 1024,
    alt: "An older married couple walking hand in hand on a quiet Florida street lined with live oaks and Spanish moss",
  },
  praying: {
    src: "/photos/christian-couple-praying-together-bible.webp",
    w: 1536,
    h: 1024,
    alt: "A husband and wife praying together, hands joined over an open Bible at the kitchen table",
  },
} satisfies Record<string, Pic>;

/** The hero picture for each area page, so the eleven pages don't all show the same one. */
const areaRotation: Pic[] = [pics.olderCouple, pics.marriageCouple, pics.praying, pics.engagedCouple, pics.motherDaughter];
export const areaPic = (index: number) => areaRotation[index % areaRotation.length];

/** Pictures on each page, for the image sitemap. */
export const pagePics: Record<string, Pic[]> = {
  "": [pics.pastorFamily, pics.marriageCouple, pics.praying, pics.engagedCouple, pics.pastorPreaching, pics.motherDaughter],
  "/christian-marriage-counseling": [pics.marriageCouple],
  "/premarital-counseling": [pics.engagedCouple],
  "/faith-based-counseling": [pics.motherDaughter],
  "/pastor-brandon-bankert": [pics.pastorPortrait, pics.pastorFamily, pics.ordination],
  "/areas": [pics.olderCouple],
};
