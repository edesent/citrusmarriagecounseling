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

const path = "/christian-counseling-for-depression";
const description =
  "Christian counseling for depression and anxiety in Citrus County, FL with Pastor Brandon Bankert in Hernando, alongside your doctor. Hope from Scripture. Free first consultation.";

export const metadata: Metadata = {
  title: { absolute: "Christian Counseling for Depression & Anxiety in Citrus County, FL" },
  description,
  alternates: { canonical: path },
  openGraph: {
    title: "Christian Counseling for Depression & Anxiety in Citrus County, FL",
    description,
    url: path,
    images: [{ url: pics.hope.src, width: pics.hope.w, height: pics.hope.h, alt: pics.hope.alt }],
  },
};

export default function DepressionCounseling() {
  return (
    <>
      <PageHero
        trail={[{ name: "Christian counseling for depression", path }]}
        eyebrow="Depression & anxiety · Citrus County"
        title="Christian counseling for depression and anxiety in Citrus County, FL"
        lede={
          <p>
            When the heaviness won’t lift or the worry won’t stop, sit down with {pastor.styled} in Hernando. Hope from God’s Word, alongside your
            doctor. The first consultation is free.
          </p>
        }
        photo={pics.hope}
      />

      <section className="bg-paper">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_22rem]">
          <article className="copy max-w-3xl text-lg text-ink/85">
            <p>
              Depression and anxiety are not a lack of faith. David wrote “Why art thou cast down, O my soul?” (Psalm 42:11), and Elijah asked God to
              take his life (1 Kings 19:4). God met them both. Christian counseling for depression gives you a pastor to talk with, someone to pray
              with you, and steady help with the next right step.
            </p>

            <h2>What Christian counseling for depression helps with</h2>
            <ul>
              <li>Heaviness, hopelessness and losing interest in things you used to love</li>
              <li>Worry and anxiety that keep you up at night or keep you home</li>
              <li>Grief that has settled in and won’t move</li>
              <li>Loneliness, especially after a loss, a move or retirement</li>
              <li>Guilt and shame that the Bible says Christ has already carried</li>
              <li>Depression or anxiety putting strain on a marriage or a family</li>
            </ul>

            <h2>How counseling for depression works</h2>
            <p>
              It starts with a <Link href="/free-consultation">free consultation</Link> at Bethel Baptist Church in Hernando. Pastor Brandon will
              listen first, then tell you honestly how he can help and what it would involve, including the cost, before you commit to anything.
              Sessions are about an hour.
            </p>

            <h2>Alongside your doctor, not instead of it</h2>
            <p>
              Keep seeing your doctor and keep any treatment they have given you. Pastor Brandon is a certified marriage counselor who works
              alongside medical care and will tell you plainly when additional care is needed.
            </p>
            <p>
              <strong>If you are thinking about ending your life, please reach out now.</strong>
            </p>
            <ul>
              {otherHelp
                .filter((h) => !h.name.startsWith("SAMHSA") && !h.name.startsWith("CASA"))
                .map((h) => (
                  <li key={h.name}>
                    <strong>{h.name}.</strong> {h.detail}
                  </li>
                ))}
            </ul>

            <h2>More help</h2>
            <p>
              If it is tangled up with drinking or another habit, see <Link href="/christian-addiction-counseling">Christian addiction counseling</Link>
              . If it is weighing on your marriage, see <Link href="/christian-marriage-counseling">Christian marriage counseling</Link>.
            </p>
          </article>
          <ConsultCard />
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap pb-16 md:pb-24">
          <Faq
            title="Christian counseling for depression: questions"
            items={[faq.depressionMedical, faq.depressionCrisis, faq.members, faq.cost, faq.confidential, faq.start]}
          />
        </div>
      </section>

      <AreaLinks service="Christian counseling for depression" />
      <CtaBand heading="There is hope, and you don’t have to find it alone." />
      <JsonLd
        data={serviceNode("Christian counseling for depression and anxiety", path, description, "Christian counseling for depression and anxiety", pics.hope)}
      />
    </>
  );
}
