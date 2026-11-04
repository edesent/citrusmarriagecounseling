"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { phone } from "@/lib/site";
import ConsultForm, { topics } from "./ConsultForm";

/**
 * "Free consultation" opens as a popup. Every link to /free-consultation on the
 * site stays a real link (search engines, no-JavaScript visitors, and
 * cmd/ctrl-click into a new tab still get the page); this catches the plain
 * clicks and opens the form in a <dialog> instead. Mounted once in the layout.
 */
export default function ConsultPopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const topic: (typeof topics)[number] = path.startsWith("/premarital")
    ? "Premarital counseling"
    : path.startsWith("/faith-based")
      ? "Faith-based counseling for me"
      : "Marriage counseling";

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== "/free-consultation") return;
      if (location.pathname === "/free-consultation") return;
      // Caught on the way down (capture), before next/link's own handler can navigate.
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Navigating away (a link inside the form's page, the back button) closes it.
  useEffect(() => setOpen(false), [path]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="consult-title"
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      className="consult-dialog m-auto w-[calc(100%-1.5rem)] max-w-2xl rounded-[1.75rem] bg-paper p-0 text-ink shadow-2xl"
    >
      {open && (
        <div className="max-h-[calc(100dvh-1.5rem)] overflow-y-auto p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image src="/photos/pastor-brandon-bankert-headshot.jpg" alt="Pastor Brandon Bankert" width={480} height={480} className="h-14 w-14 rounded-full object-cover ring-2 ring-accent" />
              <div>
                <h2 id="consult-title" className="display-soft text-2xl sm:text-3xl">
                  Book a free consultation
                </h2>
                <p className="text-sm text-muted">With Pastor Brandon Bankert · no cost, no commitment</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/70 hover:bg-ink/5"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="mt-6">
            <ConsultForm topic={topic} />
          </div>
          <p className="mt-6 border-t border-ink/10 pt-4 text-sm text-muted">
            Rather call?{" "}
            <a href={`tel:${phone.tel}`} className="link num font-semibold text-night">
              {phone.display}
            </a>
          </p>
        </div>
      )}
    </dialog>
  );
}
