import type { QA } from "@/lib/schema";
import { faqPage } from "@/lib/schema";
import JsonLd from "./JsonLd";

/** Questions and answers as open/close rows, plus the matching FAQPage structured data. */
export default function Faq({ items, title = "Questions people ask", id = "questions" }: { items: QA[]; title?: string; id?: string }) {
  return (
    <section id={id} className="faq">
      <h2 className="display-soft text-3xl md:text-4xl">{title}</h2>
      <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {items.map((it) => (
          <details key={it.q} className="group py-1">
            <summary className="flex items-start justify-between gap-6 py-4 text-lg font-semibold">
              <span>{it.q}</span>
              <span className="faq-plus mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brass/60 text-brass-deep transition-transform" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 1.5v9M1.5 6h9" />
                </svg>
              </span>
            </summary>
            <p className="max-w-3xl pb-5 text-ink/80">{it.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqPage(items)} />
    </section>
  );
}
