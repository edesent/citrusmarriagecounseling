"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, phone } from "@/lib/site";
import { Mark } from "./Braid";

function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark
        gap={dark ? "var(--spring-deep)" : "var(--paper)"}
        colors={dark ? ["var(--brass-light)", "var(--spring-pale)", "var(--brass)"] : undefined}
        className="h-[1.35rem] w-auto shrink-0 md:h-6"
      />
      <span className={`display-soft whitespace-nowrap text-[0.94rem] leading-none min-[390px]:text-[1.04rem] sm:text-[1.3rem] md:text-[1.45rem] ${dark ? "text-white" : "text-spring-deep"}`}>
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
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/97 shadow-[0_12px_30px_-26px_rgba(11,43,40,0.6)]">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-2 sm:gap-4 md:h-20">
          <Link href="/" aria-label="Citrus Marriage Counseling, home">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3 py-2 text-[0.95rem] font-semibold transition hover:bg-spring/6 ${path.startsWith(n.href) ? "text-brass-deep" : "text-ink"}`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/free-consultation" className="btn btn-spring ml-3 px-5 py-3 text-sm">
              Free consultation
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-spring/70 px-3 py-2 text-sm font-bold text-spring min-[375px]:px-4 lg:hidden"
            aria-expanded={open}
            aria-controls="phone-menu"
          >
            Menu
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* A sibling of the header, not a child: a fixed layer inside a sticky bar gets trapped on some phones. */}
      <div
        id="phone-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-spring-deep text-white transition-opacity duration-200 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
        <nav className="wrap flex flex-1 flex-col justify-center gap-0.5 pb-10" aria-label="Main">
          {[{ href: "/", label: "Home" }, ...nav].map((n) => (
            <Link key={n.href} href={n.href} className="display border-b border-white/12 py-3.5 text-[2.1rem]" tabIndex={open ? 0 : -1}>
              {n.label}
            </Link>
          ))}
          <Link href="/free-consultation" className="btn btn-brass mt-8" tabIndex={open ? 0 : -1}>
            Book a free consultation
          </Link>
          <a href={`tel:${phone.tel}`} className="mt-4 text-center font-semibold text-brass-light" tabIndex={open ? 0 : -1}>
            Or call <span className="num">{phone.display}</span>
          </a>
        </nav>
      </div>
    </>
  );
}
