import type { Metadata } from "next";
import ConsultForm from "@/components/ConsultForm";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { ids } from "@/lib/schema";
import { phone, place, siteUrl } from "@/lib/site";

const path = "/free-consultation";
const description =
  "Book a free consultation with Pastor Brandon Bankert for Christian marriage, premarital or faith-based counseling in Citrus County, FL.";

export const metadata: Metadata = {
  title: { absolute: "Free Consultation | Christian Marriage Counseling in Citrus County, FL" },
  description,
  alternates: { canonical: path },
  openGraph: { title: "Book a free consultation with Pastor Brandon Bankert", description, url: path },
};

const next = [
  ["You send this form", "or call. It goes straight to Pastor Brandon’s phone."],
  ["He gets back to you", "himself, to set a time that works for both of you."],
  ["You sit down together", `at ${place.name} in ${place.city}. You talk; he listens and tells you honestly how he can help. No cost, nothing to sign.`],
];

export default function FreeConsultation() {
  return (
    <>
      <PageHero
        trail={[{ name: "Free consultation", path }]}
        eyebrow="Free consultation"
        title="Book a free consultation"
        lede={<p>One conversation with Pastor Brandon Bankert, at no cost, before you decide anything.</p>}
      />
      <section className="bg-paper">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.75rem] bg-cream p-6 ring-1 ring-ink/8 md:p-8">
            <ConsultForm />
          </div>
          <div>
            <h2 className="display-soft text-3xl">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {next.map(([h, p], i) => (
                <li key={h} className="flex gap-4">
                  <span className="display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-night text-xl text-white">{i + 1}</span>
                  <p className="pt-1.5 text-ink/80">
                    <strong className="text-ink">{h}</strong> {p}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-2xl border border-ink/10 p-5">
              <p className="font-semibold">Rather call?</p>
              <a href={`tel:${phone.tel}`} className="num display-soft mt-1 block text-3xl text-night">
                {phone.display}
              </a>
              <p className="mt-4 font-semibold">Where you will meet</p>
              <address className="not-italic text-ink/80">
                {place.name}
                <br />
                {place.street}, {place.city}, {place.stateCode} <span className="num">{place.zip}</span>
              </address>
              <a href={place.directions} className="link mt-2 inline-block font-semibold text-night" rel="noopener">
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: `${siteUrl}${path}`, about: { "@id": ids.practice } }} />
    </>
  );
}
