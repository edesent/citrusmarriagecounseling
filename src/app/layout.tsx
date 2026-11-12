import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import BethelBar from "@/components/BethelBar";
import ChatPrompt from "@/components/ChatPrompt";
import ConsultPopup from "@/components/ConsultPopup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MetaPixel from "@/components/MetaPixel";
import { siteGraph } from "@/lib/schema";
import { practice, siteUrl } from "@/lib/site";
import "./globals.css";

// Bethel Baptist Church's own type: DM Serif Display, Allura, Figtree.
const dmSerif = localFont({
  src: [
    { path: "../fonts/dm-serif-display-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-serif-display-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-dm-serif",
  display: "swap",
});
const allura = localFont({
  src: "../fonts/allura-400.woff2",
  weight: "400",
  variable: "--font-allura",
  display: "swap",
});
const figtree = localFont({
  src: "../fonts/figtree-300-900.woff2",
  weight: "300 900",
  variable: "--font-figtree",
  display: "swap",
});

const description =
  "Christian marriage counseling and faith-based counseling in Citrus County, FL with Pastor Brandon Bankert of Bethel Baptist Church, Hernando. Free first consultation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Christian Marriage Counseling in Citrus County, FL – Free Consultation",
    template: `%s | ${practice.name}`,
  },
  description,
  applicationName: practice.name,
  authors: [{ name: "Pastor Brandon Bankert", url: `${siteUrl}/pastor-brandon-bankert` }],
  openGraph: {
    type: "website",
    siteName: practice.name,
    locale: "en_US",
    url: siteUrl,
    title: "Christian Marriage Counseling in Citrus County, FL",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pastor Brandon Bankert, Christian marriage counseling in Citrus County, Florida" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0f100f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: BethelBar's inline script may add data-bethel to <html> before React hydrates.
    <html lang="en-US" className={`${dmSerif.variable} ${allura.variable} ${figtree.variable}`} suppressHydrationWarning>
      <body>
        <BethelBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <ConsultPopup />
        <ChatPrompt />
        <Analytics />
        <MetaPixel />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
