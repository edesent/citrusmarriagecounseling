import type { QA } from "./schema";
import { money, phone, place, pricing } from "./site";

/**
 * Answers shared across pages, written once so every page says the same
 * thing. Each page picks the questions that fit it. These also become the
 * page's FAQPage structured data, so keep them plain sentences.
 */

const marriageCost =
  pricing.marriageSession != null
    ? `Marriage counseling is ${money(pricing.marriageSession)} a session.`
    : "For marriage counseling, Pastor Brandon goes over the plan and the cost with you at the consultation, before you commit to anything.";

export const faq = {
  therapy: {
    q: "Is this the same as therapy?",
    a: "No. This is Christian counseling from a pastor, built on the Bible. Pastor Brandon is not a licensed therapist, and he will tell you plainly when something needs a doctor or a licensed professional instead.",
  },
  members: {
    q: "Do we have to be members of Bethel, or Christians?",
    a: "No. You do not have to belong to Bethel or any church. The counseling is built on the Bible, and Pastor Brandon is upfront about that from the first conversation.",
  },
  cost: {
    q: "What does it cost?",
    a: `The first consultation is free. Premarital counseling is ${money(pricing.premaritalSession)} a session. ${marriageCost}`,
  },
  where: {
    q: "Where do we meet?",
    a: `At ${place.name}, ${place.street} in ${place.city}, just off CR 486.`,
  },
  confidential: {
    q: "Is what we say kept private?",
    a: "Yes. What you share stays between you and Pastor Brandon. The only exceptions are the ones Florida law requires, such as a child being harmed or someone in danger.",
  },
  start: {
    q: "How do we get started?",
    a: `Ask for a free consultation online, or call ${phone.display}. Pastor Brandon answers himself and will set a time with you.`,
  },
  premaritalLaw: {
    q: "Is premarital counseling required to marry in Florida?",
    a: "No. But couples who finish a registered premarital course of at least four hours before they apply pay a smaller marriage license fee, and the three-day wait is waived. Ask Pastor Brandon about the course certificate at your consultation.",
  },
  abuse: {
    q: "What if there is abuse in our home?",
    a: "Then couples counseling is not the right first step. Call CASA’s 24-hour domestic violence hotline at 352-344-8111, or 911 if anyone is in danger. Pastor Brandon can still talk with you, but your safety comes first.",
  },
  sessions: {
    q: "How long is a session, and how many will we need?",
    a: "Sessions are about an hour. Premarital counseling is eight sessions. For marriage counseling, Pastor Brandon will suggest a number of sessions at the consultation, based on what you are facing.",
  },
  addictionKinds: {
    q: "What kinds of addiction do you help with?",
    a: "Alcohol, drugs, pornography, gambling, and other habits that have taken hold. Pastor Brandon also counsels husbands, wives and parents of someone who is struggling.",
  },
  addictionMedical: {
    q: "Is this instead of detox, rehab or a doctor?",
    a: "No. Stopping alcohol or some drugs suddenly can be dangerous, so anyone who is physically dependent needs a doctor first. Christian counseling works alongside medical care and recovery programs, not instead of them. The SAMHSA National Helpline, 1-800-662-4357, is free and open any hour.",
  },
  depressionMedical: {
    q: "Is this instead of seeing a doctor?",
    a: "No. Keep seeing your doctor and keep any treatment they have given you. Christian counseling works alongside medical care: a pastor to talk with, pray with, and help you take the next right step.",
  },
  depressionCrisis: {
    q: "What if I am thinking about ending my life?",
    a: "Please reach out right now: call or text 988, the Suicide & Crisis Lifeline, any hour, or call 911. Then, when you are safe, Pastor Brandon would be glad to talk with you.",
  },
} satisfies Record<string, QA>;
