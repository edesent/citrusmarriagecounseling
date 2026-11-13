import { createHmac, timingSafeEqual } from "crypto";
import { after, NextResponse } from "next/server";
import { CHAT } from "@/config/chat";
import { metaRequestContext, sendMetaLead } from "@/lib/meta-capi";
import { block, hasLink, hasTwoNames, hasUnexpectedFields, isCallablePhone, isDuplicate, isEmail, line, looksLikeAMessage, looksLikeAName } from "@/lib/spam";

/**
 * The free-consultation request. Ported from Bethel Baptist Church's form
 * endpoint (same spam defences, same delivery), with one kind of form.
 *
 * Requests go into Bethel's Slack channel through Website Chat (the same
 * connection as the chat bubble; key in src/config/chat.ts), so they reach
 * Pastor Brandon's phone in seconds. Setting FORM_WEBHOOK_URL (a Slack/Teams
 * incoming webhook) overrides that route.
 *
 * Spam defences, in order:
 *  - a signed load-time token (GET) that must be 3 seconds to 6 hours old;
 *    the server measures the time, never the browser;
 *  - two honeypot fields and an allowlist of fields;
 *  - a per-IP rate limit and a repeat-message check;
 *  - no links anywhere, including bare domains;
 *  - a name must be two real words, a phone must be a number he could dial,
 *    an email must look like one, and a note must read like words.
 * A visible mistake gets a visible error. Anything that smells like a bot gets
 * a fake success and is dropped, so the bot never learns what tripped it.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECRET = process.env.FORM_SECRET || process.env.FORM_WEBHOOK_URL || CHAT.apiKey;
const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 1000 * 60 * 60 * 6;

const sign = (ts: string) => createHmac("sha256", SECRET).update(ts).digest("hex");

function tokenOk(token: unknown) {
  if (typeof token !== "string") return false;
  const [ts, sig] = token.split(".");
  if (!ts || !sig || !/^\d+$/.test(ts)) return false;
  const expected = Buffer.from(sign(ts));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  const age = Date.now() - Number(ts);
  return age >= MIN_FILL_MS && age <= MAX_AGE_MS;
}

export async function GET() {
  const ts = String(Date.now());
  return NextResponse.json({ token: `${ts}.${sign(ts)}` }, { headers: { "Cache-Control": "no-store" } });
}

// Best-effort, per serverless instance.
const hits = new Map<string, number[]>();
function rateLimited(key: string, max = 6) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

const fake = () => NextResponse.json({ ok: true });

type Body = Record<string, unknown>;
type Built = { text: string; plain: string; subject: string; name: string; contact: string; email: string; phone: string } | { error: string } | { spam: true };

const TOPICS = ["Marriage counseling", "Premarital counseling", "Addiction recovery", "Depression or anxiety", "Faith-based counseling for me", "Not sure yet"];
const TIMES = ["Mornings", "Afternoons", "Evenings", "Any time"];

function consultationMessage(b: Body): Built {
  if (hasUnexpectedFields(b, ["kind", "token", "website", "company", "name", "partner", "phone", "email", "topic", "when", "note", "page", "eventId"]))
    return { spam: true };
  const name = line(b.name, 80);
  const partner = line(b.partner, 80);
  const phone = line(b.phone, 40);
  const email = line(b.email, 120);
  const topic = TOPICS.includes(line(b.topic, 60)) ? line(b.topic, 60) : "Not sure yet";
  const when = TIMES.includes(line(b.when, 30)) ? line(b.when, 30) : "";
  const note = block(b.note, 2000);
  const page = line(b.page, 120);

  if (!name) return { error: "Please give your first and last name." };
  if (!looksLikeAName(name)) return { spam: true };
  if (!hasTwoNames(name)) return { error: "Please give your first and last name." };
  if (partner && !looksLikeAName(partner)) return { spam: true };
  if (!phone && !email) return { error: "Leave a phone number or an email so Pastor Brandon can reach you." };
  if (phone && !isCallablePhone(phone)) return { error: "That phone number doesn’t look right. Please check it." };
  if (email && !isEmail(email)) return { error: "That email address doesn’t look right." };
  if ([name, partner, note].some(hasLink)) return { spam: true };
  if (note && !looksLikeAMessage(note, 4)) return { spam: true };

  const rows: [string, string][] = [["Name", name]];
  if (partner) rows.push(["Spouse / fiancé(e)", partner]);
  if (phone) rows.push(["Phone", phone]);
  if (email) rows.push(["Email", email]);
  rows.push(["Looking for", topic]);
  if (when) rows.push(["Best time", when]);

  return {
    subject: `💍 Free consultation request: ${topic}`,
    name,
    email,
    phone,
    contact: [phone, email].filter(Boolean).join(" · "),
    // Slack formatting.
    text: ["*💍 Free consultation request — Citrus Marriage Counseling website*", ...rows.map(([k, v]) => `*${k}:* ${v}`), page && `_Sent from ${page}_`]
      .filter(Boolean)
      .concat(note ? ["", note] : [])
      .join("\n"),
    // The same request as a plain email.
    plain: ["Free consultation request from the Citrus Marriage Counseling website", "", ...rows.map(([k, v]) => `${k}: ${v}`)]
      .concat(note ? ["", note] : [])
      .concat(page ? ["", `Sent from ${page}`] : [])
      .join("\n"),
  };
}

/**
 * Emails the request to Pastor Brandon (FORM_EMAIL_TO, comma-separated, to
 * change who gets it). Sent through the team's Resend key from dfd.llc, the
 * only domain that key may send from. Reply goes to the visitor when they
 * left an email address.
 */
async function emailRequest(built: { subject: string; plain: string; name: string; email: string }) {
  const key = process.env.FORM_RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const to = (process.env.FORM_EMAIL_TO ?? "bethelbaptist2289@gmail.com").split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || !to.length) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.FORM_FROM_EMAIL ?? "Citrus Marriage Counseling website <noreply@dfd.llc>",
      to,
      ...(built.email ? { reply_to: built.email } : {}),
      subject: `${built.subject.replace(/^\S+\s/, "")} (${built.name})`,
      text: built.plain,
    }),
  }).catch(() => null);
  if (!r?.ok) console.error("form email", r?.status, await r?.text().catch(() => ""));
  return !!r?.ok;
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 8_000) return NextResponse.json({ error: "Too long." }, { status: 413 });

  let body: Body;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  if (body.website || body.company) return fake();
  if (!tokenOk(body.token)) return fake();

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`consult:${ip}`, 4)) return fake();

  if (body.kind !== "consultation") return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  const built = consultationMessage(body);
  if ("spam" in built) return fake();
  if ("error" in built) return NextResponse.json({ error: built.error }, { status: 400 });
  if (isDuplicate(built.text)) return fake();

  const webhook = process.env.FORM_WEBHOOK_URL;
  const notConnected = NextResponse.json(
    { error: "Online requests aren’t connected yet. Please call (352) 860-0804; Pastor Brandon will be glad to hear from you." },
    { status: 503 },
  );
  const failed = NextResponse.json({ error: "That didn’t send just now. Please call (352) 860-0804 instead." }, { status: 502 });

  // Slack and email go out together; the request counts as sent if either arrives.
  const slack = (async () => {
    const res = webhook
      ? await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: built.text }) })
      : await fetch(`${CHAT.origin}/api/chat/contact-form`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey: CHAT.apiKey, subject: built.subject, name: built.name, contact: built.contact, message: built.text }),
        });
    if (!res.ok) console.error("form slack", res.status);
    return res.status;
  })().catch(() => 0);
  const [slackStatus, emailed] = await Promise.all([slack, emailRequest(built)]);
  const slackOk = slackStatus >= 200 && slackStatus < 300;
  if (!slackOk && !emailed) return slackStatus === 503 ? notConnected : failed;

  // Tell Facebook a request came in (server-side twin of the browser's Lead).
  const eventId = typeof body.eventId === "string" && /^[\w-]{8,64}$/.test(body.eventId) ? body.eventId : "";
  if (eventId) {
    const ctx = metaRequestContext(request);
    after(() => sendMetaLead(ctx, eventId, { email: built.email, phone: built.phone, name: built.name }));
  }
  return NextResponse.json({ ok: true });
}
