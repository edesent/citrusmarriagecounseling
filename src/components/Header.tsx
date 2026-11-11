"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, phone } from "@/lib/site";
import Braid, { Mark } from "./Braid";

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark
        gap={dark ? "var(--night-deep)" : "var(--paper)"}
        colors={dark ? ["var(--gold)", "var(--gold-light)", "var(--gold-deep)"] : undefined}
        className="h-10 w-auto shrink-0 md:h-12"
      />
      <span className={`display-soft whitespace-nowrap text-[0.94rem] leading-none min-[390px]:text-[1.04rem] sm:text-[1.3rem] md:text-[1.45rem] ${dark ? "text-white" : "text-night-deep"}`}>
        Citrus Marriage Counseling
      </span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    // globals.css locks the page scroll and hides the chat bubble on this
    // attribute. Not an inline overflow style: the consultation popup sets that
    // one, and the menu closing as the popup opens would clear the popup's lock.
    const html = document.documentElement;
    if (open) html.dataset.menu = "open";
    else delete html.dataset.menu;
  }, [open]);

  // Any tap on a link in the phone menu closes it. Closing on a path change
  // alone misses Home on the home page (the path doesn't change, so the menu
  // stayed open and Home looked dead) and the consultation link, whose popup
  // swallows the click. Listening on the document in the capture phase still
  // runs when the popup stops the click there.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("#phone-menu a");
      if (!(a instanceof HTMLAnchorElement)) return;
      setOpen(false);
      const url = new URL(a.href, location.href);
      if (url.origin === location.origin && url.pathname === location.pathname && !url.hash) window.scrollTo({ top: 0 });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);

  return (
    <>
      {/* Cream bar with dark type; the threefold cord runs underneath it as a slim rule. */}
      <header className="sticky top-0 z-40 bg-paper/97 shadow-[0_12px_30px_-26px_rgba(7,8,7,0.5)] backdrop-blur">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-2 sm:gap-4 md:h-20">
          <Link href="/" aria-label="Citrus Marriage Counseling, home">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            <Link href="/" className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[0.92rem] font-semibold transition hover:bg-night/6 ${path === "/" ? "text-accent-deep" : "text-ink"}`}>
              Home
            </Link>
            {nav.filter((n) => n.href !== "/").map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[0.92rem] font-semibold transition hover:bg-night/6 ${path.startsWith(n.href) ? "text-accent-deep" : "text-ink"}`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/free-consultation" className="btn btn-gold ml-2 whitespace-nowrap px-5 py-3 text-sm">
              Free consultation
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-night/70 px-3 py-2 text-sm font-bold text-night min-[375px]:px-4 xl:hidden"
            aria-expanded={open}
            aria-controls="phone-menu"
          >
            Menu
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
        <Braid id="braid-header" gap="var(--paper)" height={10} period={44} width={2.6} className="block" />
      </header>

      {/* A sibling of the header, not a child: a fixed layer inside a sticky bar gets trapped on some phones. */}
      <div
        id="phone-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-night-deep text-white transition-opacity duration-200 xl:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between">
          <Wordmark dark />
          <button type="button" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-4 py-2 text-sm font-bold">
            Close
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="wrap flex flex-1 flex-col justify-start gap-0.5 overflow-y-auto py-6 [@media(min-height:720px)]:justify-center" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="display border-b border-white/12 py-2.5 text-[1.75rem] min-[400px]:py-3 min-[400px]:text-[2rem]" tabIndex={open ? 0 : -1}>
              {n.label}
            </Link>
          ))}
          <Link href="/free-consultation" className="btn btn-gold mt-8" tabIndex={open ? 0 : -1}>
            Book a free consultation
          </Link>
          <a href={`tel:${phone.tel}`} className="mt-4 text-center font-semibold text-accent-light" tabIndex={open ? 0 : -1}>
            Or call <span className="num">{phone.display}</span>
          </a>
        </nav>
      </div>
    </>
  );
}
