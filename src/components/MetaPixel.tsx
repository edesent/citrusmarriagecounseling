"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { metaPixelId } from "@/lib/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Tells Facebook a free-consultation request was sent. Called by useForm on success. */
export function trackLead() {
  if (metaPixelId && typeof window !== "undefined") window.fbq?.("track", "Lead");
}

/**
 * Meta (Facebook) Pixel for the ads. Counts a PageView on every page and a
 * Lead when the free-consultation form is sent (see trackLead). Renders
 * nothing until metaPixelId is filled in src/lib/site.ts. Not loaded on the
 * private /stats page.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);
  const off = !metaPixelId || pathname.startsWith("/stats");

  useEffect(() => {
    // The first PageView is sent by the inline script below.
    if (first.current) {
      first.current = false;
      return;
    }
    if (!off) window.fbq?.("track", "PageView");
  }, [pathname, off]);

  if (off) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
    </Script>
  );
}
