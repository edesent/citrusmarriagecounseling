import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="wrap py-24 text-center md:py-32">
        <p className="eyebrow text-accent-deep">Page not found</p>
        <h1 className="display mt-3 text-5xl">That page isn’t here.</h1>
        <p className="mt-4 text-lg text-muted">Pastor Brandon is, though. The first conversation is free.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/free-consultation" className="btn btn-gold">
            Book a free consultation
          </Link>
          <Link href="/" className="btn btn-line text-night">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
