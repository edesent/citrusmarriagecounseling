import type { Metadata } from "next";
import Link from "next/link";
import AreaLinks from "@/components/AreaLinks";
import ConsultCard from "@/components/ConsultCard";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { faq } from "@/lib/faqs";
import { pics } from "@/lib/images";
import { serviceNode } from "@/lib/schema";
import { otherHelp, pastor } from "@/lib/site";

const path = "/christian-addiction-counseling";
const description =
  "Christian addiction counseling in Citrus County, FL with Pastor Brandon Bankert in Hernando: alcohol, drugs, pornography, gambling, and help for families. Free first consultation.";

export const metadata: Metadata = {
  title: { absolute: "Christian Addiction Counseling in Citrus County, FL | Faith-Based Recovery" },
  description,
  alternates: { canonical: path },
  openGraph: {
    title: "Christian Addiction Counseling in Citrus County, FL",
    description,
    url: path,
    images: [{ url: pics.recovery.src, width: pics.recovery.w, height: pics.recovery.h, alt: pics.recovery.alt }],
  },
};

export default function AddictionCounseling() {
  return (
    <>
      <PageHero
        trail={[{ name: "Christian addiction counseling", path }]}
        eyebrow="Addiction recovery · Citrus County"
        title="Christian addiction counseling in Citrus County, FL"
        lede={
          <p>
            Faith-based help to get free and stay free, with {pastor.styled} in Hernando, for the one who is struggling and for the family beside
            them. The first consultation is free.
          </p>
        }
        photo={pics.recovery}
      />

      <section className="bg-paper">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_22rem]">
          <article className="copy max-w-3xl text-lg text-ink/85">
            <p>
              Addiction promises relief and takes everything: money, trust, marriages, health, years. Christian addiction counseling deals honestly
              with the habit and with what is underneath it, and points to the One who can actually set a person free. Pastor Brandon will not shame
              you, and he will not pretend it is easy.
            </p>

            <h2>What Christian addiction counseling helps with</h2>
            <ul>
              <li>Alcohol and drugs, including prescription pills</li>
              <li>Pornography and sexual sin that is wrecking a marriage</li>
              <li>Gambling, spending and debt that keep getting worse</li>
              <li>Relapse: starting again after you thought it was over</li>
              <li>Husbands, wives and parents of someone who is addicted: what to say, what not to fix, and how to keep loving them</li>
              <li>Rebuilding trust in a marriage after the truth comes out</li>
            </ul>

            <h2>How addiction counseling works</h2>
            <p>
              It starts with a <Link href="/free-consultation">free consultation</Link> at Bethel Baptist Church in Hernando. Pastor Brandon will
              tell you honestly how he can help and what it would involve, including the cost, before you commit to anything. Sessions are about an
              hour, with practical steps between them: accountability, a plan for the hard hours, and counsel from Scripture.
            </p>

            <h2>Alongside medical care, not instead of it</h2>
            <p>
              Stopping alcohol or some drugs suddenly can be dangerous. If you are physically dependent, see a doctor or a treatment program first,
              and keep counseling alongside it. Pastor Brandon is a pastor, not a licensed therapist or a doctor, and he will tell you plainly when
              you need more than he can give.
            </p>
            <ul>
              {otherHelp.map((h) => (
                <li key={h.name}>
                  <strong>{h.name}.</strong> {h.detail}
                </li>
              ))}
            </ul>

            <h2>When it is your marriage too</h2>
            <p>
              Addiction rarely hurts only one person. <Link href="/christian-marriage-counseling">Christian marriage counseling</Link> can run alongside
              recovery, and <Link href="/christian-counseling-for-depression">counseling for depression and anxiety</Link> helps when the two come
              together.
            </p>
          </article>
          <ConsultCard />
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap pb-16 md:pb-24">
          <Faq
            title="Christian addiction counseling questions"
            items={[faq.addictionKinds, faq.addictionMedical, faq.members, faq.cost, faq.confidential, faq.start]}
          />
        </div>
      </section>

      <AreaLinks service="Christian addiction counseling" />
      <CtaBand heading="Freedom starts with one honest conversation." />
      <JsonLd data={serviceNode("Christian addiction counseling", path, description, "Christian addiction counseling", pics.recovery)} />
    </>
  );
}
