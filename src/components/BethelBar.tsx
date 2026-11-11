import { church } from "@/lib/site";

/**
 * "Back to Bethel Baptist Church": a black bar above the header for visitors
 * who came here from Bethel's own website (its nav and /counseling page link
 * here). Once someone arrives from there, a cookie keeps the bar on every page
 * they open for 30 days, so they can always find their way back to the church.
 *
 * Everyone else never sees it. The bar is in every page's HTML but hidden
 * (globals.css); the inline script runs before the bar is drawn and turns it on
 * by setting data-bethel on <html>, so it doesn't pop in and push the page down.
 * The pages stay static: nothing reads the cookie on the server.
 *
 * Bethel's links send their address as the referrer (rel="noopener", no
 * referrer policy). If Bethel ever adds rel="noreferrer", this stops working.
 */
const COOKIE = "from_bethel";

const detect = `(function(){try{
var h=document.referrer?new URL(document.referrer).hostname:"";
if(/(^|\\.)bethelbaptisthernando\\.org$/.test(h))document.cookie="${COOKIE}=1;max-age=2592000;path=/;samesite=lax"+(location.protocol==="https:"?";secure":"");
if(/(^|;\\s*)${COOKIE}=1(;|$)/.test(document.cookie))document.documentElement.setAttribute("data-bethel","");
}catch(e){}})();`;

export default function BethelBar() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: detect }} />
      <div className="bethel-bar bg-night-deep text-white">
        <div className="wrap flex h-10 items-center justify-between gap-4 text-sm">
          <a href={church.url} className="group inline-flex items-center gap-2 font-semibold hover:text-accent-light">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-light transition group-hover:-translate-x-0.5" aria-hidden>
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Back to {church.name}
          </a>
          <span className="hidden text-white/60 md:inline">A counseling ministry of {church.name}, Hernando</span>
        </div>
      </div>
    </>
  );
}
