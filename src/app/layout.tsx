import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import ChatPrompt from "@/components/ChatPrompt";
import ConsultPopup from "@/components/ConsultPopup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { siteGraph } from "@/lib/schema";
import { practice, siteUrl } from "@/lib/site";
import "./globals.css";

const newsreader = localFont({
  src: [
    { path: "../fonts/newsreader-200-800.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/newsreader-200-800-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-newsreader",
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
    default: "Christian Marriage Counseling in Citrus County, FL | Pastor Brandon Bankert",
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
  themeColor: "#12403c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${newsreader.variable} ${figtree.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ConsultPopup />
        <ChatPrompt />
        <Analytics />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
