"use client";

import { usePathname } from "next/navigation";
import { useForm } from "./useForm";

const field =
  "mt-1 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";
const label = "block text-sm font-semibold text-ink/80";

export const topics = [
  "Marriage counseling",
  "Premarital counseling",
  "Addiction recovery",
  "Depression or anxiety",
  "Faith-based counseling for me",
  "Not sure yet",
] as const;

/** Days a person can tick for the free consultation. Sunday is church. */
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

/** The free-consultation request. Lands in Pastor Brandon's Slack through /api/form. */
export default function ConsultForm({ topic = "Marriage counseling" }: { topic?: (typeof topics)[number] }) {
  const { submit, status, error } = useForm("consultation");
  const page = usePathname();

  if (status === "sent")
    return (
      <div className="rounded-2xl bg-night-pale p-6">
        <p className="display-soft text-2xl text-night-deep">Thank you. Your request is with Pastor Brandon.</p>
        <p className="mt-2 text-ink/80">He answers himself and will get back to you to set a time for your free consultation.</p>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // Several days can be ticked; they travel as one comma-separated field.
        submit({ ...Object.fromEntries(data.entries()), days: data.getAll("days").join(", "), page });
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="f-name">
            Your name
          </label>
          <input id="f-name" name="name" required className={field} autoComplete="name" placeholder="First and last" />
        </div>
        <div>
          <label className={label} htmlFor="f-partner">
            Spouse or fiancé(e) <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="f-partner" name="partner" className={field} autoComplete="off" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="f-phone">
            Phone
          </label>
          <input id="f-phone" name="phone" type="tel" className={field} autoComplete="tel" />
        </div>
        <div>
          <label className={label} htmlFor="f-email">
            Email
          </label>
          <input id="f-email" name="email" type="email" className={field} autoComplete="email" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="f-topic">
            Looking for
          </label>
          <select id="f-topic" name="topic" className={field} defaultValue={topic}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="f-when">
            Best time to reach you
          </label>
          <select id="f-when" name="when" className={field} defaultValue="Any time">
            <option>Mornings</option>
            <option>Afternoons</option>
            <option>Evenings</option>
            <option>Any time</option>
          </select>
        </div>
      </div>
      <fieldset>
        <legend className={label}>
          Which days work for you? <span className="font-normal text-muted">(pick any that do)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {days.map((d) => (
            <label
              key={d}
              className="cursor-pointer select-none rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink/80 transition has-[:checked]:border-accent-deep has-[:checked]:bg-accent-deep has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/40"
            >
              <input type="checkbox" name="days" value={d} className="sr-only" />
              {d}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className={label} htmlFor="f-note">
          Anything you want him to know first? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="f-note" name="note" rows={4} className={field} />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Ask for a free consultation"}
        </button>
        <p className="text-sm text-muted">It goes straight to Pastor Brandon.</p>
      </div>
      {status === "error" && <p className="rounded-xl bg-red-50 p-3 text-red-800">{error}</p>}
    </form>
  );
}
