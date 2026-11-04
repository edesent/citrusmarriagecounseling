import Link from "next/link";
import { areas } from "@/lib/areas";

/** Links to every area page, for the service pages: "<service> in <town>". */
export default function AreaLinks({ service, exclude }: { service: string; exclude?: string }) {
  return (
    <section className="bg-cream">
      <div className="wrap py-14 md:py-16">
        <h2 className="display-soft text-3xl md:text-4xl">{service} near you</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas
            .filter((a) => a.slug !== exclude)
            .map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="group flex items-baseline justify-between gap-3 border-b border-ink/10 pb-3">
                  <span className="font-semibold group-hover:text-brass-deep">
                    {service} in {a.name}
                  </span>
                  <span className="num shrink-0 text-sm text-muted">{a.minutes} min</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
