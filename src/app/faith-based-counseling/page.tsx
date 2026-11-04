import type { Metadata } from "next";
import Link from "next/link";
import AreaLinks from "@/components/AreaLinks";
import ConsultCard from "@/components/ConsultCard";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { faq } from "@/lib/faqs";
import { serviceNode } from "@/lib/schema";
import { otherHelp, pastor } from "@/lib/site";

const path = "/faith-based-counseling";
const description =
  "Faith-based Christian counseling in Citrus County, FL for individuals and families: grief, family conflict, hard decisions. Pastor Brandon Bankert, Hernando.";

export const metadata: Metadata = {
  title: { absolute: "Faith-Based Christian Counseling in Citrus County, FL" },
  description,
  alternates: { canonical: path },
  openGraph: { title: "Faith-Based Counseling in Citrus County, FL", description, url: path },
};

export default function FaithBased() {
  return (
    <>
      <PageHero
        trail={[{ name: "Faith-based counseling", path }]}
        eyebrow="Faith-based counseling"
        title="Faith-based Christian counseling in Citrus County, FL"
        lede={
          <p>
            Christian counseling for individuals and families with {pastor.styled} in Hernando: grief, family conflict, hard decisions and questions of
            faith. The first consultation is free.
          </p>
        }
        photo={{
          src: "/photos/ordination.jpg",
          alt: "Pastors laying hands on Brandon Bankert at his ordination at Bethel Baptist Church, December 2025",
          w: 1188,
          h: 1280,
          position: "center 30%",
        }}
      />

      <section className="bg-paper">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_22rem]">
          <article className="copy max-w-3xl text-lg text-ink/85">
            <p>
              Faith-based counseling means bringing your situation to God’s Word with a pastor beside you. It is for anyone carrying something heavy,
              married or not, a member of a church or not. Pastor Brandon listens first, then helps you see what the Bible says about where you are and
              what to do next.
            </p>

            <h2>What faith-based counseling helps with</h2>
            <ul>
              <li>Grief: losing a husband or wife, a parent, a child, a friend</li>
              <li>Family conflict: a grown child who has gone their own way, a falling-out between siblings, a strained relationship with a parent</li>
              <li>Parenting: discipline, a teenager in trouble, raising children in the faith</li>
              <li>Guilt, shame and forgiveness, giving it and receiving it</li>
              <li>Worry, discouragement and fear, alongside your doctor when one is needed</li>
              <li>Habits and addictions you want to be free of, alongside a recovery program or doctor when one is needed</li>
              <li>A big decision: a move, a job, caring for an aging parent</li>
              <li>Questions about God, the Bible and salvation that won’t go away</li>
            </ul>

            <h2>How faith-based counseling works</h2>
            <p>
              It starts with a <Link href="/free-consultation">free consultation</Link> at Bethel Baptist Church in Hernando. Pastor Brandon will tell
              you honestly how he can help and what it would involve, including the cost, before you commit to anything. Sessions are about an hour.
            </p>

            <h2>When you need more than a pastor</h2>
            <p>
              Pastor Brandon is a pastor, not a licensed therapist or a doctor. He will tell you plainly when something needs medical care or a licensed
              professional, and he can keep counseling you from Scripture alongside that care. If you are in danger or crisis right now:
            </p>
            <ul>
              {otherHelp.map((h) => (
                <li key={h.name}>
                  <strong>{h.name}.</strong> {h.detail}
                </li>
              ))}
            </ul>

            <h2>Married?</h2>
            <p>
              Couples should look at <Link href="/christian-marriage-counseling">Christian marriage counseling</Link> or, before the wedding,{" "}
              <Link href="/premarital-counseling">premarital counseling</Link>.
            </p>
          </article>
          <ConsultCard />
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap pb-16 md:pb-24">
          <Faq title="Faith-based counseling questions" items={[faq.therapy, faq.members, faq.cost, faq.confidential, faq.where, faq.start]} />
        </div>
      </section>

      <AreaLinks service="Faith-based counseling" />
      <CtaBand heading="You don’t have to carry it alone." />
      <JsonLd data={serviceNode("Faith-based counseling", path, description, "Christian counseling")} />
    </>
  );
}
