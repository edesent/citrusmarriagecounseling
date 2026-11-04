import { areas } from "@/lib/areas";
import { faq } from "@/lib/faqs";
import { church, money, otherHelp, pastor, phone, place, pricing, siteUrl } from "@/lib/site";

/**
 * /llms.txt: a plain summary of the practice for AI search tools (ChatGPT,
 * Claude, Perplexity, Google's AI answers). Built from the same data as the
 * pages, so it never disagrees with them.
 */

export const dynamic = "force-static";

export function GET() {
  const pages = [
    ["Christian marriage counseling", "/christian-marriage-counseling", "Biblical marriage counseling for couples: communication, trust, money, family, new seasons."],
    ["Premarital counseling", "/premarital-counseling", `Christian premarital counseling, ${money(pricing.premaritalSession)} a session.`],
    ["Christian addiction counseling", "/christian-addiction-counseling", "Alcohol, drugs, pornography, gambling; help for families too; alongside medical care."],
    ["Christian counseling for depression and anxiety", "/christian-counseling-for-depression", "Hope from Scripture alongside your doctor."],
    ["Faith-based counseling", "/faith-based-counseling", "Christian counseling for individuals and families: grief, family conflict, hard decisions, questions of faith."],
    [pastor.styled, "/pastor-brandon-bankert", "About the counselor."],
    ["Free consultation", "/free-consultation", "Request a free first consultation."],
    ["Areas served", "/areas", "Every community in Citrus County, with drive times to the church."],
  ];
  const text = `# Citrus Marriage Counseling

> Christian marriage counseling, premarital counseling, addiction counseling, counseling for depression and anxiety, and faith-based counseling in Citrus County, Florida, with ${pastor.styled} of ${church.name} in Hernando. The first consultation is free.

## Key facts

- Counselor: ${pastor.styled}, pastor of ${church.name} (${church.url}). ${pastor.college} graduate (${pastor.collegeYear}); ten years an assistant pastor and Christian school teacher; married since ${pastor.marriedSince}; father of three.
- Approach: Christian, Bible-based (King James Bible) counseling from a pastor, under the oversight of ${church.name}. It is not licensed therapy; he refers people to doctors and licensed professionals when that is what they need.
- Location: ${place.name}, ${place.street}, ${place.city}, ${place.stateCode} ${place.zip}, just off CR 486.
- Phone: ${phone.display}
- Cost: free first consultation. Premarital counseling ${money(pricing.premaritalSession)} a session. Marriage counseling cost is explained at the consultation.
- Sessions: about an hour each, at the church.
- You do not need to be a member of ${church.name}, or of any church.
- Service area: all of Citrus County, Florida: ${areas.flatMap((a) => [a.name, ...a.alsoServes]).join(", ")}.
- Safety: ${otherHelp.map((h) => `${h.name}: ${h.detail}`).join(" ")}

## Pages

${pages.map(([name, path, about]) => `- [${name}](${siteUrl}${path}): ${about}`).join("\n")}

## Christian marriage counseling by town

${areas.map((a) => `- [${a.name}, FL](${siteUrl}/areas/${a.slug}): ${a.slug === "hernando" ? "where the church is" : `about ${a.miles} miles, ${a.minutes} minutes to the church`}${a.alsoServes.length ? `; also ${a.alsoServes.join(", ")}` : ""}`).join("\n")}

## Questions and answers

${Object.values(faq).map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
