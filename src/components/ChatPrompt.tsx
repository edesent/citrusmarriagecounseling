"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { CHAT } from "@/config/chat";

/**
 * The corner chat bubble: Website Chat, backed by Slack. The widget shows its
 * own greeting from Pastor Brandon a few seconds after the page loads; a
 * visitor who writes gets an answer from his phone. If the widget script ever
 * fails to load, a plain button points at the consultation page instead.
 *
 * Closing the bubble hides it until the next visit (data-dismiss-until-reload).
 * Don't use data-dismiss-days="0" for that: the widget reads 0 as "not set" and
 * hides it for 7 days.
 */
export default function ChatPrompt() {
  const [failed, setFailed] = useState(false);

  if (!failed)
    return (
      <Script
        id="wbc-chat"
        src={`${CHAT.origin}/widget/wbc-chat.js`}
        data-api={CHAT.origin}
        data-key={CHAT.apiKey}
        data-accent-color={CHAT.accentColor}
        data-brand-color={CHAT.brandColor}
        data-agent-icon={CHAT.agentIcon}
        data-greeting={CHAT.greeting}
        data-form-subtitle={CHAT.formSubtitle}
        data-dismiss-until-reload="true"
        strategy="afterInteractive"
        onError={() => setFailed(true)}
      />
    );

  return (
    <div className="fixed bottom-4 right-4 z-[45] sm:bottom-6 sm:right-6">
      <Link
        href="/free-consultation"
        className="flex items-center gap-2.5 rounded-full bg-night py-3 pl-4 pr-5 text-sm font-bold text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] ring-2 ring-white/70 hover:bg-night-deep"
      >
        Message Pastor Brandon
      </Link>
    </div>
  );
}
