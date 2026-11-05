import Link from "next/link";
import { areas } from "@/lib/areas";
import { church, otherHelp, phone, place } from "@/lib/site";
import Braid, { Mark } from "./Braid";

const services = [
  { href: "/christian-marriage-counseling", label: "Christian marriage counseling" },
  { href: "/premarital-counseling", label: "Premarital counseling" },
  { href: "/christian-addiction-counseling", label: "Addiction counseling" },
  { href: "/christian-counseling-for-depression", label: "Depression & anxiety" },
  { href: "/faith-based-counseling", label: "Faith-based counseling" },
  { href: "/pastor-brandon-bankert", label: "About Pastor Brandon" },
  { href: "/free-consultation", label: "Free consultation" },
];

export default function Footer() {
  return (
    <footer className="bg-night-deep text-white">
      <Braid id="braid-footer" gap="var(--night-deep)" className="block opacity-90" />
      <div className="wrap grid gap-12 py-14 md:grid-cols-2 md:py-16 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Mark gap="var(--night-deep)" colors={["var(--gold)", "var(--gold-light)", "var(--gold-deep)"]} className="h-10 w-auto" />
            <p className="display-soft text-xl">Citrus Marriage Counseling</p>
          </div>
          <p className="mt-3 text-white/75">
            Christian marriage counseling with Pastor Brandon Bankert, a ministry of{" "}
            <a href={church.url} className="link text-white">
              {church.name}
            </a>
            .
          </p>
          <address className="mt-5 not-italic leading-relaxed text-white/85">
            {place.name}
            <br />
            {place.street}
            <br />
            {place.city}, {place.stateCode} <span className="num">{place.zip}</span>
            <br />
            <a href={`tel:${phone.tel}`} className="link num text-white">
              {phone.display}
            </a>
          </address>
          <Link href="/free-consultation" className="btn btn-gold mt-6">
            Book a free consultation
          </Link>
        </div>

        <div>
          <p className="eyebrow text-accent-light">Counseling</p>
          <ul className="mt-4 space-y-2.5 text-white/85">
            {services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="hover:text-accent-light">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-accent-light">Citrus County</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-white/85 lg:grid-cols-1">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="hover:text-accent-light">
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className="hover:text-accent-light">
                All areas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-accent-light">Need help right now?</p>
          <ul className="mt-4 space-y-4 text-white/85">
            {otherHelp.map((h) => (
              <li key={h.name}>
                <span className="block font-semibold text-white">{h.name}</span>
                <span className="text-sm">{h.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-5 text-sm text-white/55">
          <span>
            © {new Date().getFullYear()} {church.name}, Hernando, Florida. Christian counseling under the oversight of the church; not licensed therapy.
          </span>
          <span>
            <a href="https://www.elijahdesent.com/churches" className="hover:text-accent-light" rel="noopener">
              Website development
            </a>{" "}
            by Elijah Desent
          </span>
        </div>
      </div>
    </footer>
  );
}
