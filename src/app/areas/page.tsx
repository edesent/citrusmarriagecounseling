import type { Metadata } from "next";
import Link from "next/link";
import CountyMap from "@/components/CountyMap";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { areas } from "@/lib/areas";

const path = "/areas";
const description =
  "Christian marriage and faith-based counseling for every Citrus County community: Inverness, Hernando, Crystal River, Beverly Hills, Lecanto, Homosassa and more.";

export const metadata: Metadata = {
  title: { absolute: "Christian Marriage Counseling Across Citrus County, FL | Areas Served" },
  description,
  alternates: { canonical: path },
  openGraph: { title: "Christian marriage counseling across Citrus County, FL", description, url: path },
};

export default function Areas() {
  return (
    <>
      <PageHero
        trail={[{ name: "Areas", path }]}
        eyebrow="Areas served"
        title="Christian marriage counseling near you in Citrus County"
        lede={
          <p>
            Pastor Brandon Bankert meets couples and families from every part of the county at Bethel Baptist Church in Hernando. Find your town for
            the drive and what to expect.
          </p>
        }
      />
      <section className="bg-cream">
        <div className="wrap py-12 md:py-16">
          <CountyMap id="areas-map" />
        </div>
      </section>
      <section className="bg-paper">
        <div className="wrap py-14 md:py-20">
          <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2">
            {[...areas]
              .sort((a, b) => a.minutes - b.minutes)
              .map((a) => (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className="group flex items-baseline justify-between gap-4 border-b border-ink/10 py-4">
                    <span>
                      <span className="display-soft block text-2xl group-hover:text-accent-deep">{a.name}</span>
                      {a.alsoServes.length > 0 && <span className="text-sm text-muted">Also {a.alsoServes.join(", ")}</span>}
                    </span>
                    <span className="num shrink-0 text-right text-sm text-muted">
                      {a.miles} mi · about {a.minutes} min
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
