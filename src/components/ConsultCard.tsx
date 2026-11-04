import Image from "next/image";
import Link from "next/link";
import { money, phone, place, pricing } from "@/lib/site";

/** Sticky side card on the long pages: who, where, what it costs, and how to start. */
export default function ConsultCard() {
  return (
    <aside className="self-start rounded-[1.75rem] bg-cream p-6 ring-1 ring-ink/8 lg:sticky lg:top-28">
      <div className="flex items-center gap-4">
        <Image src="/photos/pastor-face.jpg" alt="Pastor Brandon Bankert" width={480} height={480} className="h-16 w-16 rounded-full object-cover ring-2 ring-brass" />
        <div>
          <p className="display-soft text-xl">Pastor Brandon Bankert</p>
          <p className="text-sm text-muted">Bethel Baptist Church, Hernando</p>
        </div>
      </div>
      <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-5 text-[0.95rem]">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">First consultation</dt>
          <dd className="font-semibold">Free</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Premarital counseling</dt>
          <dd className="num font-semibold">{money(pricing.premaritalSession)} / session</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Where</dt>
          <dd className="text-right font-semibold">
            {place.street}, {place.city}
          </dd>
        </div>
      </dl>
      <Link href="/free-consultation" className="btn btn-lime mt-6 w-full">
        Book a free consultation
      </Link>
      <a href={`tel:${phone.tel}`} className="mt-3 block text-center font-semibold text-spring">
        or call <span className="num">{phone.display}</span>
      </a>
    </aside>
  );
}
