import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultCard from "@/components/ConsultCard";
import CountyMap from "@/components/CountyMap";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { areaBySlug, areas } from "@/lib/areas";
import { faq } from "@/lib/faqs";
import { areaPic } from "@/lib/images";
import { ids } from "@/lib/schema";
import { money, place, pricing, siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (!a) return {};
  const path = `/areas/${a.slug}`;
  const description = `Christian marriage and faith-based counseling for ${a.name}, FL with Pastor Brandon Bankert${
    a.slug === "hernando" ? ", right here in Hernando" : `, ${a.minutes} minutes away in Hernando`
  }. Free first consultation.`;
  return {
    title: { absolute: `Christian Marriage & Faith-Based Counseling in ${a.name}, FL` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `Christian marriage counseling in ${a.name}, FL`,
      description,
      url: path,
      images: [{ url: areaPic(areas.indexOf(a)).src, width: areaPic(areas.indexOf(a)).w, height: areaPic(areas.indexOf(a)).h, alt: areaPic(areas.indexOf(a)).alt }],
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (!a) notFound();
  const path = `/areas/${a.slug}`;
  const here = a.slug === "hernando";
  const served = [a.name, ...a.alsoServes];
  const nearby = a.nearby.map(areaBySlug).filter((n): n is NonNullable<typeof n> => Boolean(n));

  const localFaq = {
    q: here ? "Where in Hernando do you meet?" : `How far is it from ${a.name}?`,
    a: here
      ? `At ${place.name}, ${place.street}, just off CR 486. ${a.route}`
      : `About ${a.miles} miles, roughly ${a.minutes} minutes by car, to ${place.name} at ${place.street} in Hernando. ${a.route}`,
  };

  return (
    <>
      <PageHero
        trail={[
          { name: "Areas", path: "/areas" },
          { name: a.name, path },
        ]}
        eyebrow={`${a.name}, Florida`}
        photo={areaPic(areas.indexOf(a))}
        title={<>Christian marriage counseling in {a.name}, FL</>}
        lede={
          <p>
            {here
              ? "Pastor Brandon Bankert meets couples right here in Hernando, at Bethel Baptist Church on North McGee Drive."
              : `Pastor Brandon Bankert meets ${a.name} couples at Bethel Baptist Church in Hernando, about ${a.minutes} minutes away.`}{" "}
            The first consultation is free.
          </p>
        }
      >
        {a.alsoServes.length > 0 && <p className="mt-4 text-white/70">Also serving {a.alsoServes.join(" and ")}.</p>}
      </PageHero>

      <section className="bg-paper">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_22rem]">
          <article className="copy max-w-3xl text-lg text-ink/85">
            {a.local.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <h2>Christian marriage counseling for {a.name} couples</h2>
            <p>
              Whatever has brought you to this page, whether it is fighting, distance, broken trust, money, family or a new season of life, Pastor
              Brandon will listen to both of you and bring the Bible to bear on it, practically. Counseling is a set number of sessions of about an hour,
              agreed before you start. <Link href="/christian-marriage-counseling">How Christian marriage counseling works</Link>.
            </p>

            <h2>Faith-based counseling for {a.name} families</h2>
            <p>
              Not married, or coming on your own? Pastor Brandon also counsels individuals and families from {served.join(", ")}: grief, a strained
              relationship with a grown child, a hard decision, or questions of faith. <Link href="/faith-based-counseling">Faith-based counseling</Link>.
            </p>

            <h2>Premarital counseling for {a.name} couples</h2>
            <p>
              Getting married? Premarital counseling with Pastor Brandon is <span className="num">{money(pricing.premaritalSession)}</span> a
              session. Florida couples who finish a registered premarital course
              before applying for their license pay a smaller fee and skip the three-day wait
              {a.slug === "inverness" ? "; the Clerk of Court’s office is right here in Inverness" : "; Citrus County licenses are issued by the Clerk of Court in Inverness"}
              . <Link href="/premarital-counseling">Premarital counseling</Link>.
            </p>

            <h2>{here ? "Finding the church" : `Getting to Bethel from ${a.name}`}</h2>
            <p>
              {here ? null : (
                <>
                  <span className="num font-semibold">{a.miles}</span> miles, about <span className="num font-semibold">{a.minutes}</span> minutes.{" "}
                </>
              )}
              {a.route}
            </p>
            <p>
              <strong>{place.name}</strong>, {place.street}, {place.city}, {place.stateCode} <span className="num">{place.zip}</span> ·{" "}
              <a href={place.directions} rel="noopener">
                Directions
              </a>
            </p>
          </article>
          <ConsultCard />
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <CountyMap current={a.slug} id={`map-${a.slug}`} />
          <div>
            <h2 className="display-soft text-3xl">Nearby</h2>
            <ul className="mt-4 space-y-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link href={`/areas/${n.slug}`} className="link text-lg">
                    Christian marriage counseling in {n.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/areas" className="link text-lg">
                  All of Citrus County
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <Faq title={`Questions from ${a.name}`} items={[localFaq, faq.therapy, faq.cost, faq.members, faq.confidential]} />
        </div>
      </section>

      <CtaBand heading={`Start with a free conversation, ${here ? "right here in Hernando" : `${a.minutes} minutes from ${a.name}`}.`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Christian marriage counseling in ${a.name}, FL`,
          serviceType: "Christian marriage counseling",
          url: `${siteUrl}${path}`,
          provider: { "@id": ids.practice },
          areaServed: served.map((name) => ({ "@type": "Place", name: `${name}, FL` })),
        }}
      />
    </>
  );
}
