"use client";

import { useCallback, useEffect, useState } from "react";
import { trackLead } from "@/components/MetaPixel";

export type FormKind = "consultation";

/** Fetches a signed load-time token and posts a form to /api/form. */
export function useForm(kind: FormKind) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/form", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setToken(d.token ?? ""))
      .catch(() => {});
  }, []);

  const submit = useCallback(
    async (fields: Record<string, unknown>) => {
      setStatus("sending");
      setError("");
      // Shared by the browser pixel and the server copy so Facebook counts one Lead.
      const eventId = crypto.randomUUID();
      try {
        const res = await fetch("/api/form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fields, kind, token, eventId }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data.error || "Something went wrong. Please call (352) 860-0804.");
          setStatus("error");
          return false;
        }
        setStatus("sent");
        trackLead(eventId);
        return true;
      } catch {
        setError("We couldn’t reach the server. Please call (352) 860-0804.");
        setStatus("error");
        return false;
      }
    },
    [kind, token],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError("");
  }, []);

  return { submit, status, error, reset };
}
