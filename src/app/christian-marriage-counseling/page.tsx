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

const path = "/christian-marriage-counseling";
const description =
  "Bible-based Christian marriage counseling in Citrus County, FL with Pastor Brandon Bankert in Hernando: communication, trust, money and family. Free consultation.";

export const metadata: Metadata = {
  title: { absolute: "Biblical Marriage Counseling in Hernando, FL | Christian Couples" },
  description,
  alternates: { canonical: path },
  openGraph: { title: "Biblical Marriage Counseling in Hernando, FL", description, url: path },
};

export default function MarriageCounseling() {
  return (
    <>
      <PageHero
        trail={[{ name: "Christian marriage counseling", path }]}
        eyebrow="Christian marriage counseling · Citrus County"
        title="Biblical marriage counseling in Hernando, Florida"
        lede={
          <p>
            Counsel from the Bible for marriages that are hurting, stuck, or simply tired, with {pastor.styled} in Hernando. The first consultation is
            free.
          </p>
        }
        photo={{
          src: "/photos/pastor-preaching.jpg",
          alt: "Pastor Brandon Bankert preaching at Bethel Baptist Church in Hernando",
          w: 1280,
          h: 720,
        }}
      />

      <section className="bg-paper">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_22rem]">
          <article className="copy max-w-3xl text-lg text-ink/85">
            <p>
              Christian marriage counseling starts from what God says about marriage: that it is a covenant, that a husband and wife are one flesh,
              and that “a threefold cord is not quickly broken” (Ecclesiastes 4:12). Pastor Brandon listens to both of you, opens the Bible to the
              situation you are actually in, and helps you take practical steps you can keep at home.
            </p>
            <p>
              It is plain talk from a pastor who has been married since {pastor.marriedSince}, not a technique from a workbook. Couples come from
              Hernando, Inverness, Beverly Hills, Crystal River and every other part of Citrus County.
            </p>

            <h2>What Christian marriage counseling helps with</h2>
            <ul>
              <li>Conversations that keep turning into fights, the silent treatment, harsh words</li>
              <li>Trust after an affair, pornography, lies or a hidden debt</li>
              <li>Money: debt, spending habits, one income or two</li>
              <li>In-laws, stepchildren, blended families and adult children</li>
              <li>Distance and dryness: living like roommates, intimacy that has faded</li>
              <li>A new season: a baby, an empty nest, retirement, illness, caring for a parent</li>
              <li>A husband and wife who don’t share the same faith, or one who has drifted</li>
              <li>Thinking about separating, and wanting to try once more first</li>
            </ul>

            <h2>How marriage counseling sessions work</h2>
            <p>
              It starts with a <Link href="/free-consultation">free consultation</Link>. You tell Pastor Brandon what is going on, and he tells you
              honestly whether and how he can help. If you go ahead, counseling is a set number of sessions of about an hour each at Bethel Baptist
              Church on North McGee Drive in Hernando. You agree on the plan and the cost before the first session, and pay for the set up front, so
              there are no surprises along the way.
            </p>
            <p>
              Between sessions there is usually something to practice at home: a conversation to have, a passage to read together, a habit to start or
              stop. Change happens at home, not in the office.
            </p>

            <h2>Christian counseling, not licensed therapy</h2>
            <p>
              This is Christian counseling from a pastor, under the oversight of Bethel Baptist Church. Pastor Brandon is not a licensed therapist,
              and he will say so when something needs a doctor or a licensed professional, such as an addiction, a mental illness, or thoughts of
              self-harm.
            </p>
            <p>If there is abuse or danger in your home, couples counseling is not the right first step. Get safe first:</p>
            <ul>
              {otherHelp.map((h) => (
                <li key={h.name}>
                  <strong>{h.name}.</strong> {h.detail}
                </li>
              ))}
            </ul>

            <h2>Why couples choose a pastor for marriage counseling</h2>
            <ul>
              <li>Counsel grounded in Scripture, from someone who believes what it says about marriage.</li>
              <li>A local pastor you can meet face to face, not an app or a video call with a stranger.</li>
              <li>A clear plan and price before you start, after a free first conversation.</li>
              <li>A church family behind it, if you ever want one. You never have to join to be counseled.</li>
            </ul>

            <h2>Getting married instead?</h2>
            <p>
              Engaged couples should look at <Link href="/premarital-counseling">premarital counseling</Link>: eight sessions before the wedding. For
              help on your own, see <Link href="/faith-based-counseling">faith-based counseling</Link>.
            </p>
          </article>
          <ConsultCard />
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap pb-16 md:pb-24">
          <Faq title="Christian marriage counseling questions" items={[faq.therapy, faq.members, faq.cost, faq.sessions, faq.confidential, faq.abuse, faq.where]} />
        </div>
      </section>

      <AreaLinks service="Christian marriage counseling" />
      <CtaBand heading="Your marriage is worth one conversation." />
      <JsonLd data={serviceNode("Christian marriage counseling", path, description, "Christian marriage counseling")} />
    </>
  );
}
