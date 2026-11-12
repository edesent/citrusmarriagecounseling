import type { Metadata } from "next";
import Link from "next/link";
import ConsultCard from "@/components/ConsultCard";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { phone, place, pastor, siteUrl } from "@/lib/site";
import { breadcrumbs, serviceNode } from "@/lib/schema";

const path = "/virtual-counseling";
const description =
  "Learn about virtual Christian counseling with Pastor Brandon Bankert at Citrus Marriage Counseling. Ask about meeting by video for marriage and faith-based counseling in Florida.";

export const metadata: Metadata = {
  title: { absolute: "Virtual Christian Counseling in Florida | Citrus Marriage Counseling" },
  description,
  alternates: { canonical: path },
  openGraph: {
    title: "Virtual Christian Counseling | Citrus Marriage Counseling",
    description,
    url: path,
  },
};

const steps = [
  {
    number: "1",
    title: "Start with a free conversation",
    body: "Tell Pastor Brandon what you are looking for and where you are located. He will discuss whether virtual meetings are a suitable option for your situation.",
  },
  {
    number: "2",
    title: "Discuss the details",
    body: "Before scheduling, you can talk through availability, fees, the video platform, privacy, and any practical requirements. You will know what to expect before making a decision.",
  },
  {
    number: "3",
    title: "Meet by video",
    body: "When virtual counseling is appropriate and arrangements are confirmed, you can meet from a private place using a phone, tablet, or computer with a camera, microphone, and reliable internet connection.",
  },
];

const benefits = [
  {
    title: "Convenience",
    body: "Meet from a private, comfortable location without making the drive to Hernando.",
  },
  {
    title: "A familiar setting",
    body: "Choose a quiet place where you can speak openly and without unnecessary interruptions.",
  },
  {
    title: "More flexibility",
    body: "Ask about available appointment times and whether video meetings can fit around work, family, and other responsibilities.",
  },
  {
    title: "Personal connection",
    body: "Meet face to face by video with Pastor Brandon, rather than relying only on text or email.",
  },
  {
    title: "Bible-based counsel",
    body: "The conversation remains rooted in Scripture and practical steps you can consider between meetings.",
  },
  {
    title: "A clear first step",
    body: "Begin with a free consultation to discuss your needs, ask questions, and determine what kind of support may be appropriate.",
  },
];

const topics = [
  "Marriage and relationship concerns",
  "Communication, conflict, and rebuilding trust",
  "Premarital questions and preparing for marriage",
  "Faith, family difficulties, and difficult decisions",
  "Grief, worry, and life changes",
];

const questions = [
  {
    q: "Is virtual counseling available to everyone?",
    a: "Virtual meetings are considered case by case. Availability may depend on your location, the kind of help you are seeking, and whether a video meeting is appropriate. Contact Pastor Brandon before scheduling so these details can be discussed.",
  },
  {
    q: "Is this the same as licensed online therapy?",
    a: "No. Citrus Marriage Counseling offers Christian, Bible-based counseling with Pastor Brandon Bankert, a certified marriage counselor. It is not a licensed mental-health therapy practice, and it does not replace medical care or licensed mental-health treatment.",
  },
  {
    q: "What do I need for a video meeting?",
    a: "You will need a reliable internet connection, a phone, tablet, or computer with a working camera and microphone, and a private place where you can speak without being overheard. The video platform and connection instructions will be discussed before an appointment is confirmed.",
  },
  {
    q: "How do I receive the video meeting link?",
    a: "After a virtual appointment is agreed upon, Pastor Brandon will explain how you will receive the meeting details and how to join. Do not send sensitive personal information through an ordinary email or website form.",
  },
  {
    q: "What does virtual counseling cost?",
    a: "The first consultation is free. Any ongoing counseling fees and payment arrangements will be explained before you decide to schedule. There is no insurance billing advertised by this practice.",
  },
  {
    q: "Can a couple join the same video session from different places?",
    a: "Ask Pastor Brandon during the initial conversation. Whether this is practical and appropriate depends on the circumstances and the technology available to each person.",
  },
  {
    q: "What if video counseling is not the right fit?",
    a: "Pastor Brandon can discuss meeting at Bethel Baptist Church in Hernando or suggest that you seek additional local, licensed, or medical support when that is more appropriate.",
  },
  {
    q: "Is virtual counseling for emergencies?",
    a: "No. This website and virtual counseling are not crisis or emergency services. If someone is in immediate danger, call 911. For suicide or emotional crisis support in the United States, call or text 988.",
  },
];

export default function VirtualCounselingPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "Virtual counseling", path }]}
        eyebrow="Christian counseling by video"
        title="Christian counseling from the place you feel most comfortable."
        lede={
          <p>
            Looking for Bible-based counsel but cannot easily make the trip to Hernando? Ask about meeting with {pastor.styled} by video. Start with a free conversation to discuss your situation, your location, and whether a virtual meeting is a good fit.
          </p>
        }
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/free-consultation" className="btn btn-gold">
            Ask about virtual counseling
          </Link>
          <a href={`tel:${phone.tel}`} className="btn btn-line text-night">
            Call <span className="num">{phone.display}</span>
          </a>
        </div>
        <p className="mt-4 max-w-xl text-sm text-ink/65">
          Virtual appointments are not automatic or guaranteed. Please contact us first to confirm availability and whether your location and needs can be accommodated.
        </p>
      </PageHero>

      <section className="bg-paper">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_22rem]">
          <article className="copy max-w-3xl text-lg text-ink/85">
            <p>
              Sometimes getting to an office is the hardest part of asking for help. Work schedules, family responsibilities, transportation, distance, or simply wanting to talk from a familiar place can make an in-person visit difficult.
            </p>
            <p>
              Virtual counseling uses a live video conversation so you and Pastor Brandon can see and hear one another while talking through the concerns on your mind. The goal is still personal, practical, Scripture-centered counsel; the difference is that you connect remotely.
            </p>

            <h2>How virtual counseling works</h2>
            <p>
              We begin by making sure a virtual meeting is suitable. Because this is a church-based Christian counseling ministry—not a licensed telehealth clinic—availability depends on your location, the nature of your concerns, and the kind of support that would best serve you. No appointment is confirmed until those details have been discussed.
            </p>
            <ol className="mt-6 space-y-7 !pl-0">
              {steps.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span className="display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-night text-2xl text-white">{step.number}</span>
                  <div>
                    <h3 className="!mt-0 display-soft text-2xl text-ink">{step.title}</h3>
                    <p className="mt-2">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2>Why consider meeting online?</h2>
            <div className="not-prose mt-6 grid gap-5 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-ink/10 bg-cream p-5">
                  <h3 className="display-soft text-2xl text-night">{benefit.title}</h3>
                  <p className="mt-2 text-base text-ink/75">{benefit.body}</p>
                </div>
              ))}
            </div>

            <h2>What can we talk about?</h2>
            <p>
              Virtual meetings may be considered for concerns such as:
            </p>
            <ul>
              {topics.map((topic) => <li key={topic}>{topic}</li>)}
            </ul>
            <p>
              Learn more about <Link href="/christian-marriage-counseling">Christian marriage counseling</Link>, <Link href="/premarital-counseling">premarital counseling</Link>, and <Link href="/faith-based-counseling">faith-based counseling</Link>. If your situation calls for licensed mental-health care, medical treatment, or specialized support, that care should come from an appropriately qualified provider.
            </p>

            <h2>Preparing for your video meeting</h2>
            <p>For a smoother conversation, plan to:</p>
            <ul>
              <li>Choose a private room where you can speak freely.</li>
              <li>Use a device with a working camera and microphone.</li>
              <li>Check that your internet connection is steady.</li>
              <li>Use headphones if they help keep the conversation private.</li>
              <li>Join from a safe, stationary place—not while driving.</li>
              <li>Let Pastor Brandon know beforehand if you have questions about the technology.</li>
            </ul>

            <h2>Privacy and your well-being</h2>
            <p>
              Please use a private setting and a device you trust. Before a virtual appointment, ask which video service will be used and how the meeting will be handled. Do not assume that an ordinary video call, email, or website form has the same privacy protections as a licensed healthcare platform. Virtual counseling is not appropriate for every concern, and it is not an emergency service.
            </p>

            <h2>Prefer to meet in person?</h2>
            <p>
              Pastor Brandon also meets by appointment at {place.name}, {place.street}, {place.city}, Florida. Read more about <Link href="/christian-marriage-counseling">marriage counseling</Link> or request a <Link href="/free-consultation">free consultation</Link> to talk through the options.
            </p>
          </article>
          <ConsultCard />
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap pb-16 md:pb-24">
          <Faq title="Questions about virtual counseling" items={questions} />
        </div>
      </section>

      <CtaBand heading="Let's talk about whether virtual counseling is right for you.">
        Start with a free conversation with Pastor Brandon. Ask about availability, your location, and what meeting by video would involve.
      </CtaBand>
      <JsonLd data={serviceNode("Virtual Christian counseling", path, description, "Virtual Christian counseling")} />
    </>
  );
}
