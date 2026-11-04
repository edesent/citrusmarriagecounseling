import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Braid from "@/components/Braid";
import CountyMap from "@/components/CountyMap";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import { allPlaces } from "@/lib/areas";
import { pics } from "@/lib/images";
import { faq } from "@/lib/faqs";
import { church, money, pastor, phone, place, pricing, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

/** What people actually say when they call, and what Pastor Brandon helps with. */
const struggles = [
  { said: "We can’t talk without it turning into a fight.", about: "Communication and conflict: learning to listen, to answer softly, and to settle things before the sun goes down." },
  { said: "I don’t know if I can trust you again.", about: "After an affair, lies or a secret: repentance, forgiveness, and the slow work of rebuilding trust." },
  { said: "Money is tearing us apart.", about: "Debt, spending, one earner or two: getting on the same page and making a plan you both keep." },
  { said: "We’re living like roommates.", about: "Distance and dryness: finding your way back to friendship, tenderness and intimacy." },
  { said: "His family, her family, our kids.", about: "In-laws, stepchildren, adult children and grandchildren: whose voice comes first, and how to say so kindly." },
  { said: "Retirement changed everything.", about: "A new season: sharing a house all day, a health crisis, caring for a parent, or a second marriage later in life." },
  { said: "One of us is far from God.", about: "Faith differences: loving a spouse who doesn’t share your faith, or who has drifted from it." },
  { said: "We’re getting married.", about: "Premarital counseling: eight sessions to lay a foundation before the wedding." },
];

const steps = [
  {
    n: "1",
    h: "A free consultation",
    p: "Tell Pastor Brandon what is going on. He will tell you honestly whether and how he can help, and what it would involve. There is no cost and nothing to sign.",
  },
  {
    n: "2",
    h: "A set of sessions",
    p: "Counseling is a set number of sessions, about an hour each, at Bethel Baptist Church in Hernando. You know the plan and the cost before you begin.",
  },
  {
    n: "3",
    h: "Counsel from Scripture",
    p: "Each session brings the Bible to bear on your situation, practically, with things to work on at home between sessions.",
  },
];

const glance: [string, React.ReactNode][] = [
  ["What it is", "Christian, Bible-based marriage counseling, premarital counseling and faith-based counseling. A ministry of Bethel Baptist Church; not licensed therapy."],
  [
    "Counselor",
    `${pastor.styled}, pastor of ${church.name}. ${pastor.college} graduate (${pastor.collegeYear}), married since ${pastor.marriedSince}, father of three.`,
  ],
  ["Where", `${place.name}, ${place.street}, ${place.city}, ${place.stateCode} ${place.zip}, just off CR 486.`],
  ["Who it serves", "Couples, engaged couples, individuals and families across Citrus County: Inverness, Hernando, Crystal River, Beverly Hills, Lecanto, Homosassa, Floral City and more."],
  [
    "Cost",
    `The first consultation is free. Premarital counseling is ${money(pricing.premaritalSession)} a session. Marriage counseling costs are explained at the consultation.`,
  ],
  [
    "How to start",
    <>
      <Link href="/free-consultation" className="link">
        Book a free consultation
      </Link>{" "}
      or call{" "}
      <a href={`tel:${phone.tel}`} className="link num whitespace-nowrap">
        {phone.display}
      </a>
      .
    </>,
  ],
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="wrap grid items-end gap-10 pt-10 md:pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div className="pb-10 lg:pb-20">
            <p className="eyebrow text-accent-light">Hernando · Inverness · all of Citrus County</p>
            <h1 className="display mt-4 text-[2.75rem] sm:text-6xl lg:text-[4.6rem]">
              Christian marriage counseling in Citrus County, Florida
            </h1>
            {/* Bethel's gold script, one line: Ecclesiastes 4:12, the threefold cord. */}
            <p className="script mt-3 text-[2rem] text-accent-light sm:text-[2.6rem]">A threefold cord is not quickly broken.</p>
            <p className="mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
              Sit down with {pastor.styled} at Bethel Baptist Church in Hernando. Honest, Bible-based counsel for couples who are struggling, and for
              couples getting ready to marry. Your first consultation is free.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/free-consultation" className="btn btn-lime text-base">
                Book a free consultation
              </Link>
              <a href={`tel:${phone.tel}`} className="btn btn-line text-white">
                Call <span className="num">{phone.display}</span>
              </a>
            </div>
            <p className="mt-6 text-white/70">
              Premarital counseling <span className="num font-semibold text-white">{money(pricing.premaritalSession)}</span> a session
            </p>
            <p className="mt-1 text-white/70">
              <Link href="/faith-based-counseling" className="link text-white/90">
                Faith-based counseling
              </Link>{" "}
              for individuals and families too
            </p>
          </div>
          <figure className="relative mx-auto w-full max-w-md self-end lg:max-w-none">
            <div className="relative overflow-hidden rounded-t-[2.5rem] ring-1 ring-white/10">
              {/* The family photo cropped tall: 63% across keeps the children, his wife and him in frame. */}
              <Image
                src={pics.pastorFamily.src}
                alt={pics.pastorFamily.alt}
                width={pics.pastorFamily.w}
                height={pics.pastorFamily.h}
                priority
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
                className="aspect-[5/6] w-full object-cover"
                style={{ objectPosition: "63% 50%" }}
              />
            </div>
            {/* Under the photo on phones (it would cover the children); a card over the corner from sm up. */}
            <figcaption className="bg-night-deep p-4 text-sm sm:absolute sm:bottom-5 sm:right-5 sm:max-w-[17rem] sm:rounded-2xl sm:bg-night-deep/92 sm:shadow-xl sm:ring-1 sm:ring-white/10">
              <span className="display-soft block text-lg text-white">{pastor.styled}</span>
              <span className="text-white/75">
                Married since <span className="num">{pastor.marriedSince}</span>, father of three, pastor of Bethel Baptist Church
              </span>
            </figcaption>
          </figure>
        </div>
        <Braid id="braid-home-hero" gap="var(--night)" className="block" />
      </section>

      {/* At a glance: plain facts, written to be quoted by search engines and AI answers. */}
      <section className="border-b border-ink/8 bg-paper" aria-labelledby="glance">
        <div className="wrap py-12 md:py-14">
          <h2 id="glance" className="eyebrow text-accent-deep">
            Citrus Marriage Counseling at a glance
          </h2>
          <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {glance.map(([dt, dd]) => (
              <div key={dt} className="border-l-2 border-lime pl-4">
                <dt className="text-sm font-bold uppercase tracking-wider text-muted">{dt}</dt>
                <dd className="mt-1 text-ink/85">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What people bring */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow text-accent-deep">What couples bring to him</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">You are not the first to say it out loud.</h2>
              <p className="mt-4 text-lg text-ink/75">
                Most couples wait years before they ask for help. Here is what couples say when they finally do, and what Christian marriage
                counseling with Pastor Brandon works on.
              </p>
            </div>
            <figure className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-50px_rgba(7,8,7,0.8)]">
              <Image src={pics.marriageCouple.src} alt={pics.marriageCouple.alt} width={pics.marriageCouple.w} height={pics.marriageCouple.h} sizes="(min-width: 1024px) 40vw, 100vw" className="h-auto w-full" />
            </figure>
          </div>
          <ul className="mt-12 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {struggles.map((s) => (
              <li key={s.said} className="border-t-2 border-accent/40 pt-5">
                <p className="serif-italic text-2xl leading-snug text-night-deep md:text-[1.7rem]">“{s.said}”</p>
                <p className="mt-2 text-ink/75">{s.about}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12">
            <Link href="/christian-marriage-counseling" className="btn btn-night">
              How Christian marriage counseling works
            </Link>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow text-accent-deep">How it works</p>
          <h2 className="display mt-3 max-w-3xl text-4xl md:text-5xl">Three steps, and the first one is free.</h2>
          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <figure className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-50px_rgba(7,8,7,0.8)]">
              <Image src={pics.praying.src} alt={pics.praying.alt} width={pics.praying.w} height={pics.praying.h} sizes="(min-width: 1024px) 40vw, 100vw" className="h-auto w-full" />
            </figure>
            <ol className="space-y-8">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="display w-12 shrink-0 text-6xl leading-none text-accent">{s.n}</span>
                  <span>
                    <h3 className="display-soft text-2xl">{s.h}</h3>
                    <p className="mt-1.5 text-ink/75">{s.p}</p>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Premarital */}
      <section className="bg-paper">
        <div className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <figure className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-50px_rgba(7,8,7,0.8)]">
            <Image
              src={pics.engagedCouple.src}
              alt={pics.engagedCouple.alt}
              width={pics.engagedCouple.w}
              height={pics.engagedCouple.h}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </figure>
          <div>
            <p className="eyebrow text-accent-deep">Premarital counseling</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Getting married in Citrus County?</h2>
            <p className="mt-5 flex items-baseline gap-3">
              <span className="num text-5xl font-extrabold tracking-tight text-night">{money(pricing.premaritalSession)}</span>
              <span className="text-lg text-ink/70">a session</span>
            </p>
            <p className="mt-5 text-lg text-ink/80">
              Talk through the things couples fight about later while it is still easy: how you will handle money, conflict, family, children, faith and
              the roles you each expect, with a pastor who has been married since {pastor.marriedSince}.
            </p>
            <p className="mt-4 text-ink/75">
              In Florida, couples who finish a registered premarital course before they apply for a license pay a smaller fee and skip the three-day
              wait. Ask Pastor Brandon about the course certificate at your consultation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/premarital-counseling" className="btn btn-night">
                Premarital counseling
              </Link>
              <Link href="/free-consultation" className="btn btn-line text-night">
                Free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-night-deep text-white">
        <div className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow text-accent-light">Your counselor</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">A pastor who is a husband and a father first.</h2>
            <p className="mt-5 text-lg text-white/85">
              Brandon Bankert graduated from {pastor.college} in {pastor.collegeYear} and served ten years as an assistant pastor and Christian school
              teacher before Bethel Baptist Church called him as pastor. He and his wife have been married since {pastor.marriedSince} and are raising
              three children.
            </p>
            <blockquote className="serif-italic mt-6 border-l-2 border-accent pl-5 text-2xl leading-snug text-accent-pale">“{pastor.heartLine}”</blockquote>
            <Link href="/pastor-brandon-bankert" className="btn btn-lime mt-8">
              About Pastor Brandon
            </Link>
          </div>
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <Image
              src={pics.pastorPreaching.src}
              alt={pics.pastorPreaching.alt}
              width={pics.pastorPreaching.w}
              height={pics.pastorPreaching.h}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      {/* Faith-based counseling */}
      <section className="bg-paper">
        <div className="wrap grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1fr]">
          <figure className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-50px_rgba(7,8,7,0.8)]">
            <Image src={pics.motherDaughter.src} alt={pics.motherDaughter.alt} width={pics.motherDaughter.w} height={pics.motherDaughter.h} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />
          </figure>
          <div className="text-lg text-ink/80">
            <p className="eyebrow text-accent-deep">Faith-based counseling</p>
            <h2 className="display mt-3 text-4xl text-ink md:text-5xl">Not married, or coming on your own?</h2>
            <p className="mt-5">
              Pastor Brandon also offers faith-based counseling for individuals and families: grief, a hard decision, a strained relationship with a
              grown child, or questions about God that won’t go away. It is the same free first conversation, the same Bible, and the same plain talk.
            </p>
            <Link href="/faith-based-counseling" className="btn btn-line mt-6 text-night">
              Faith-based counseling
            </Link>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="bg-cream">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow text-accent-deep">Where</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">Christian counseling for every part of Citrus County.</h2>
              <p className="mt-4 text-lg text-ink/75">
                Pastor Brandon meets couples at Bethel Baptist Church on North McGee Drive in Hernando, minutes from Citrus Hills and Beverly Hills and
                about twenty from Inverness, Lecanto and Crystal River.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[0.95rem]">
                {allPlaces.map((p) => (
                  <li key={p.name}>
                    <Link href={`/areas/${p.slug}`} className="link">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <CountyMap id="home-map" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <Faq title="Questions about Christian marriage counseling" items={[faq.therapy, faq.members, faq.cost, faq.where, faq.confidential, faq.start]} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
