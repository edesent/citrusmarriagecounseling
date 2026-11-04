import Image from "next/image";
import Link from "next/link";
import { breadcrumbs } from "@/lib/schema";
import Braid from "./Braid";
import JsonLd from "./JsonLd";

type Crumb = { name: string; path: string };

/** Top of every inner page: a visible breadcrumb trail (and its structured data), the H1 and a lede. */
export default function PageHero({
  trail,
  eyebrow,
  title,
  lede,
  photo,
  children,
}: {
  trail: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  photo?: { src: string; alt: string; w: number; h: number; position?: string; fadeLeft?: boolean };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cream text-ink">
      <div className={`wrap grid gap-10 pb-14 pt-8 md:pb-20 md:pt-10 ${photo ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-end" : ""}`}>
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-accent-deep">
                  Home
                </Link>
              </li>
              {trail.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  <span aria-hidden>/</span>
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-ink/80">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="hover:text-accent-deep">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow mt-8 text-accent-deep md:mt-12">{eyebrow}</p>
          <h1 className="display mt-3 max-w-4xl text-[2.6rem] sm:text-5xl md:text-6xl">{title}</h1>
          <div className="mt-5 max-w-2xl text-lg text-ink/80 md:text-xl">{lede}</div>
          {children}
        </div>
        {photo && (
          <figure className="relative overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-40px_rgba(7,8,7,0.55)] ring-1 ring-ink/8">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full object-cover"
              style={photo.position ? { objectPosition: photo.position } : undefined}
            />
            {photo.fadeLeft && <span className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-cream to-transparent" aria-hidden />}
          </figure>
        )}
      </div>
      <Braid id={`braid-hero-${trail[trail.length - 1]?.path.replace(/\W/g, "") || "x"}`} gap="var(--cream)" className="block" />
      <JsonLd data={breadcrumbs(trail)} />
    </section>
  );
}
