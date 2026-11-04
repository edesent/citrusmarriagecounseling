import type { Metadata } from "next";
import Link from "next/link";
import AreaLinks from "@/components/AreaLinks";
import ConsultCard from "@/components/ConsultCard";
import ConsultForm from "@/components/ConsultForm";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { faq } from "@/lib/faqs";
import { serviceNode } from "@/lib/schema";
import { money, pastor, pricing } from "@/lib/site";

const path = "/premarital-counseling";
const description = `Christian premarital counseling in Citrus County, FL with Pastor Brandon Bankert in Hernando, ${money(pricing.premaritalSession)} a session. Free first consultation.`;

export const metadata: Metadata = {
  title: { absolute: "Christian Premarital Counseling in Citrus County, FL – $62.50/Session" },
  description,
  alternates: { canonical: path },
  openGraph: { title: "Premarital Counseling in Citrus County, FL", description, url: path },
};

const topics = [
  ["God’s design for marriage", "What a covenant is, and what you are promising each other."],
  ["Communication", "How each of you talks, listens and shuts down, and what to do about it."],
  ["Handling conflict", "Fighting fair, apologizing, forgiving, and not letting the sun go down on it."],
  ["Money", "Debt, budgets, spending styles, giving, and who handles what."],
  ["Roles and expectations", "Who does what at home, and the expectations you didn’t know you had."],
  ["Family", "In-laws, holidays, boundaries, and leaving and cleaving."],
  ["Children and parenting", "Whether, when and how, and how you were each raised."],
  ["Faith at home", "Praying together, church, and keeping Christ at the center."],
];

export default function Premarital() {
  return (
    <>
      <PageHero
        trail={[{ name: "Premarital counseling", path }]}
        eyebrow="Premarital counseling"
        title="Christian premarital counseling in Citrus County, FL"
        lede={
          <p>
            Get ready for marriage with {pastor.styled} before the wedding, at Bethel Baptist Church in Hernando. Start with a free consultation.
          </p>
        }
      >
        <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-3">
          <p>
            <span className="num block text-6xl font-extrabold tracking-tight text-accent-light">{money(pricing.premaritalSession)}</span>
            <span className="text-white/75">a session</span>
          </p>
        </div>
      </PageHero>

      <section className="bg-paper">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_22rem]">
          <article className="copy max-w-3xl text-lg text-ink/85">
            <p>
              The best time to work on a marriage is before it starts. Premarital counseling gives the two of you {pricing.premaritalSessions} unhurried
              hours with a pastor to talk through the things couples usually fight about later, while it is still easy to talk about them.
            </p>
            <p>
              Pastor Brandon has been married since {pastor.marriedSince}. He will be honest with you, he will open the Bible with you, and he will
              shape the sessions around the two of you rather than a script.
            </p>

            <h2>What premarital counseling covers</h2>
          </article>
          <ConsultCard />
        </div>
        <div className="wrap -mt-6 pb-6 md:-mt-10">
          <ol className="grid max-w-5xl gap-x-10 gap-y-7 sm:grid-cols-2">
            {topics.map(([h, p], i) => (
              <li key={h} className="flex gap-4 border-t border-ink/10 pt-5">
                <span className="num text-sm font-bold text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="display-soft block text-xl">{h}</span>
                  <span className="text-ink/75">{p}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap pb-14 pt-6 md:pb-20">
          <article className="copy max-w-3xl text-lg text-ink/85">
            <h2>Florida’s marriage license and the premarital course</h2>
            <p>
              Florida does not require premarital counseling. But couples who finish a registered premarital preparation course of at least four
              hours, within a year before they apply, pay a smaller marriage license fee, and the three-day waiting period is waived. Citrus County
              couples apply at the{" "}
              <a href="https://www.citrusclerk.org/" rel="noopener">
                Clerk of Court
              </a>{" "}
              in Inverness.
            </p>
            <p>Ask Pastor Brandon about the course certificate at your free consultation.</p>

            <h2>Premarital counseling for second marriages</h2>
            <p>
              Not every engaged couple is young. If one or both of you has been married before, there are grown children, or you are joining two
              households later in life, premarital counseling matters just as much. Those conversations are part of it.
            </p>

            <h2>Already married?</h2>
            <p>
              See <Link href="/christian-marriage-counseling">Christian marriage counseling</Link>. It is never too late to start.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display text-4xl">Book your free consultation</h2>
            <p className="mt-3 text-lg text-ink/75">Tell Pastor Brandon your wedding date and he will help you plan the sessions around it.</p>
          </div>
          <div className="rounded-[1.75rem] bg-paper p-6 ring-1 ring-ink/8 md:p-8">
            <ConsultForm topic="Premarital counseling" />
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <Faq title="Premarital counseling questions" items={[faq.premaritalLaw, faq.cost, faq.sessions, faq.members, faq.where, faq.start]} />
        </div>
      </section>

      <AreaLinks service="Premarital counseling" />
      <CtaBand heading="Build the foundation before the wedding." />
      <JsonLd data={serviceNode("Premarital counseling", path, description, "Premarital counseling")} />
    </>
  );
}
