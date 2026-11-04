import Image from "next/image";
import Link from "next/link";
import { phone } from "@/lib/site";

/** The closing invitation on every page: a free first conversation with Pastor Brandon. */
export default function CtaBand({ heading = "Start with a free conversation.", children }: { heading?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-cream">
      <div className="wrap py-16 md:py-20">
        <div className="grid items-center gap-8 rounded-[2rem] bg-night-deep p-7 text-white shadow-[0_40px_80px_-50px_rgba(7,8,7,0.9)] md:grid-cols-[auto_1fr_auto] md:p-10">
          <Image
            src="/photos/pastor-brandon-bankert-headshot.jpg"
            alt="Pastor Brandon Bankert"
            width={480}
            height={480}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-accent/70 md:h-28 md:w-28"
          />
          <div>
            <h2 className="display-soft text-3xl md:text-4xl">{heading}</h2>
            <p className="mt-2 max-w-2xl text-white/80">
              {children ??
                "Sit down with Pastor Brandon, tell him what is going on, and hear how he would help. No cost and no commitment. He answers requests himself."}
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/free-consultation" className="btn btn-lime">
              Book a free consultation
            </Link>
            <a href={`tel:${phone.tel}`} className="text-center font-semibold text-accent-light md:text-right">
              or call <span className="num">{phone.display}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
