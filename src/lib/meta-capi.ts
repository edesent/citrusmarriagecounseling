import { createHash } from "node:crypto";
import { metaPixelId } from "@/lib/site";

/**
 * Meta Conversions API: a server-side copy of the browser pixel's Lead event,
 * so a request still counts when a browser blocks the pixel. Both copies carry
 * the same event_id, so Meta counts the request once.
 *
 * The token lives in the Vercel env META_CAPI_TOKEN (Events Manager →
 * Settings → Conversions API), never in this repo. Without it nothing is sent.
 * META_TEST_EVENT_CODE, when set, routes events to Events Manager → Test Events.
 *
 * Only what Meta needs to match the person to an ad click is sent, each field
 * hashed: email, phone, name. What they asked for help with is never sent.
 */

type UserFields = { email?: string; phone?: string; name?: string };

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
const norm = (v?: string) => v?.trim().toLowerCase() || "";

function hashedUserData(u: UserFields) {
  const out: Record<string, string[]> = {};
  const add = (key: string, value: string) => {
    if (value) out[key] = [sha256(value)];
  };
  add("em", norm(u.email));
  const digits = (u.phone ?? "").replace(/\D/g, "");
  add("ph", digits.length === 10 ? `1${digits}` : digits);
  const names = norm(u.name).split(/\s+/).filter(Boolean);
  add("fn", names[0] ?? "");
  add("ln", names.length > 1 ? names[names.length - 1] : "");
  add("country", "us");
  return out;
}

/** What the event needs from the request, read before the response is sent. */
export function metaRequestContext(req: Request) {
  const cookies = req.headers.get("cookie");
  const cookie = (name: string) => {
    const m = cookies?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
    return m ? decodeURIComponent(m[1]) : undefined;
  };
  return {
    ip: req.headers.get("x-forwarded-for")?.split(",")[0].trim(),
    userAgent: req.headers.get("user-agent") ?? undefined,
    fbp: cookie("_fbp"),
    fbc: cookie("_fbc"),
    sourceUrl: req.headers.get("referer") ?? undefined,
  };
}

export async function sendMetaLead(ctx: ReturnType<typeof metaRequestContext>, eventId: string, user: UserFields) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token || !metaPixelId) return;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: ctx.sourceUrl,
        action_source: "website",
        user_data: {
          ...hashedUserData(user),
          client_ip_address: ctx.ip,
          client_user_agent: ctx.userAgent,
          fbp: ctx.fbp,
          fbc: ctx.fbc,
        },
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${metaPixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error("Meta CAPI Lead", res.status, await res.text());
  } catch (err) {
    console.error("Meta CAPI Lead", err);
  }
}
