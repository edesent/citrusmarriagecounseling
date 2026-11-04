import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { pics } from "@/lib/images";
import { ids } from "@/lib/schema";
import { church, pastor, siteUrl } from "@/lib/site";

const path = "/pastor-brandon-bankert";
const description =
  "Pastor Brandon Bankert of Bethel Baptist Church, Hernando, FL: Bible college graduate, married since 2011, father of three. Christian counseling in Citrus County.";

export const metadata: Metadata = {
  title: { absolute: "Pastor Brandon Bankert – Christian Counselor in Hernando, FL" },
  description,
  alternates: { canonical: path },
  openGraph: { title: "Pastor Brandon Bankert, Christian counselor in Hernando, FL", description, url: path, type: "profile", images: [{ url: pics.pastorFamily.src, width: pics.pastorFamily.w, height: pics.pastorFamily.h, alt: pics.pastorFamily.alt }] },
};

/** His own words, from his pastor page at Bethel. */
const inHisWords = [
  "My wife and I were married in 2011 and we are blessed with our three wonderful children. I was an assistant pastor and Christian school teacher for ten years and have served in various church ministries. I have also served in the bus ministry where we have reached many children for the cause of Christ.",
  "God has given me a heart for the lost and a love for God’s people.",
];

const timeline = [
  { when: "2003", what: `Graduated from ${pastor.college}, Stony Brook, New York` },
  { when: "Ten years", what: "Assistant pastor and Christian school teacher; bus ministry" },
  { when: "2011", what: "Married" },
  { when: "March 2025", what: `Called as pastor of ${church.name}, Hernando` },
  { when: "December 2025", what: "Ordained to the gospel ministry" },
];

export default function About() {
  return (
    <>
      <PageHero
        trail={[{ name: "Pastor Brandon Bankert", path }]}
        eyebrow="Your counselor"
        title="Pastor Brandon Bankert, Christian counselor in Hernando"
        lede={
          <p>
            Pastor of {church.name} in Hernando, husband since {pastor.marriedSince}, father of three, and the counselor you will sit down with.
          </p>
        }
        photo={pics.pastorFamily}
      />

      <section className="bg-paper">
        <div className="wrap grid gap-14 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow text-accent-deep">In his own words</p>
            <div className="mt-4 space-y-5">
              {inHisWords.map((p, i) => (
                <p key={i} className={i === inHisWords.length - 1 ? "serif-italic text-3xl leading-snug text-night-deep" : "text-lg text-ink/85"}>
                  {i === inHisWords.length - 1 ? `“${p}”` : p}
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-accent/30 bg-cream p-5">
              <p className="eyebrow text-accent-deep">Trained for this</p>
              <p className="mt-2 text-ink/85">
                Beyond Bible college and his years as an assistant pastor, Pastor Brandon has completed a number of counseling certifications, and he
                keeps adding to that training. It shapes how he listens, what he asks, and when he says a doctor or a licensed professional needs to
                be part of the picture.
              </p>
              {pastor.certifications.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-ink/85">
                  {pastor.certifications.map((c) => (
                    <li key={c.name} className="flex gap-2">
                      <span className="mt-[0.6em] h-[2px] w-3 shrink-0 bg-accent" aria-hidden />
                      <span>
                        <strong>{c.name}</strong>
                        {c.by && `, ${c.by}`}
                        {c.year && <span className="num text-muted"> · {c.year}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="mt-8 text-lg text-ink/85">
              Pastor Brandon counsels the way he preaches: from the King James Bible, plainly, and with the people in front of him in mind. Couples
              meet with him at the church on North McGee Drive in Hernando, and the first conversation is always free.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/free-consultation" className="btn btn-lime">
                Book a free consultation
              </Link>
              <Link href="/christian-marriage-counseling" className="btn btn-line text-night">
                Christian marriage counseling
              </Link>
            </div>
          </div>
          <div>
            <p className="eyebrow text-accent-deep">Along the way</p>
            <ol className="mt-4 border-l-2 border-accent/40">
              {timeline.map((t) => (
                <li key={t.when} className="relative pb-6 pl-6 last:pb-0">
                  <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-paper" aria-hidden />
                  <span className="num block text-sm font-bold uppercase tracking-wider text-accent-deep">{t.when}</span>
                  <span className="text-ink/85">{t.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap grid gap-6 py-14 md:grid-cols-2 md:py-20">
          <figure className="overflow-hidden rounded-[1.75rem]">
            <Image
              src={pics.pastorPreaching.src}
              alt={pics.pastorPreaching.alt}
              width={pics.pastorPreaching.w}
              height={pics.pastorPreaching.h}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-full w-full object-cover"
            />
          </figure>
          <figure className="overflow-hidden rounded-[1.75rem]">
            <Image
              src={pics.ordination.src}
              alt={pics.ordination.alt}
              width={pics.ordination.w}
              height={pics.ordination.h}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-full max-h-[34rem] w-full object-cover object-top"
            />
          </figure>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap grid gap-10 py-14 md:grid-cols-[1fr_1.3fr] md:py-20">
          <h2 className="display text-4xl md:text-5xl">A ministry of {church.name}</h2>
          <div className="text-lg text-ink/85">
            <p>
              Citrus Marriage Counseling is a ministry of {church.name}, an independent Baptist church in Hernando since {church.founded}. Pastor
              Brandon counsels under the oversight of the church and is accountable to it. That is what makes this Christian counseling from a pastor,
              not licensed therapy.
            </p>
            <p className="mt-4">
              You never have to visit or join Bethel to be counseled. If you would like to, Sunday School is at 10:00 and the morning service at 11:00,
              with lunch together afterward.
            </p>
            <a href={church.url} className="btn btn-line mt-6 text-night" rel="noopener">
              Visit {church.name}’s website
            </a>
          </div>
        </div>
      </section>

      <CtaBand heading="Sit down with Pastor Brandon." />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", url: `${siteUrl}${path}`, mainEntity: { "@id": ids.pastor } }} />
    </>
  );
}
