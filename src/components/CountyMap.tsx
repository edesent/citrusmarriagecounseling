import Link from "next/link";
import { areas } from "@/lib/areas";
import { MAP } from "@/lib/map-data";

/**
 * Citrus County drawn from Census TIGER data (land, the Gulf, the Tsala Apopka
 * lakes and the Withlacoochee), with every community the site serves and the
 * church in Hernando. Each area's dot links to its page. `current` highlights
 * one area.
 */
/** Labels sit to the right of their dot unless they would collide with a neighbor. */
const LABEL: Record<string, { side: "left" | "right"; dy?: number }> = {
  "citrus-hills": { side: "left", dy: 20 },
  "pine-ridge": { side: "left" },
  "beverly-hills": { side: "right", dy: -8 },
  "crystal-river": { side: "left" },
};

export default function CountyMap({ current, id = "county" }: { current?: string; id?: string }) {
  const [cx, cy] = MAP.church;
  const labelled = new Set(areas.map((a) => a.mapKey));
  return (
    <figure>
      <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="h-auto w-full" role="img" aria-label="Map of Citrus County, Florida, showing the communities served and the church in Hernando">
        <defs>
          <clipPath id={`${id}-clip`}>
            <path d={MAP.county} />
          </clipPath>
        </defs>
        <path d={MAP.county} fill="var(--cream-deep)" stroke="var(--spring)" strokeOpacity="0.35" strokeWidth="1.5" />
        <path d={MAP.water} fill="var(--spring-pale)" clipPath={`url(#${id}-clip)`} />
        <text x={70} y={MAP.height - 120} className="serif-italic" fontSize="22" fill="var(--spring-mid)" opacity="0.7">
          Gulf of America
        </text>

        {/* Lines from each area to the church, faint. */}
        {areas.map((a) => {
          const p = MAP.places[a.mapKey];
          if (!p) return null;
          return (
            <line
              key={`l-${a.slug}`}
              x1={p[0]}
              y1={p[1]}
              x2={cx}
              y2={cy}
              stroke={a.slug === current ? "var(--brass)" : "var(--spring)"}
              strokeOpacity={a.slug === current ? 0.9 : 0.12}
              strokeWidth={a.slug === current ? 2.5 : 1.2}
              strokeDasharray={a.slug === current ? "6 5" : undefined}
            />
          );
        })}

        {/* Small places named on a neighbor's page. */}
        {Object.entries(MAP.places)
          .filter(([name]) => !labelled.has(name))
          .map(([name, [x, y]]) => (
            <circle key={name} cx={x} cy={y} r={4} fill="var(--spring-mid)" opacity="0.55">
              <title>{name}</title>
            </circle>
          ))}

        {areas.map((a) => {
          const p = MAP.places[a.mapKey];
          if (!p) return null;
          const on = a.slug === current;
          const left = (LABEL[a.slug]?.side ?? "right") === "left";
          const dy = LABEL[a.slug]?.dy ?? 0;
          return (
            <Link key={a.slug} href={`/areas/${a.slug}`} aria-label={`Christian marriage counseling in ${a.name}`}>
              <g className="cursor-pointer">
                <circle cx={p[0]} cy={p[1]} r={on ? 9 : 6.5} fill={on ? "var(--brass)" : "var(--spring)"} stroke="var(--paper)" strokeWidth="2.5" />
                <text
                  x={p[0] + (left ? -12 : 12)}
                  y={p[1] + 5 + dy}
                  textAnchor={left ? "end" : "start"}
                  fontSize={on ? 21 : 17}
                  fontWeight={on ? 700 : 600}
                  fill={on ? "var(--brass-deep)" : "var(--ink)"}
                  stroke="var(--cream-deep)"
                  strokeWidth="4"
                  paintOrder="stroke"
                  fontFamily="var(--font-sans)"
                >
                  {a.name}
                </text>
              </g>
            </Link>
          );
        })}

        {/* The church. */}
        <g>
          <circle cx={cx} cy={cy} r={15} fill="var(--brass)" opacity="0.22" />
          <path d={`M${cx} ${cy - 11}l3.2 7.2 7.8.6-6 5.1 1.9 7.6-6.9-4.1-6.9 4.1 1.9-7.6-6-5.1 7.8-.6z`} fill="var(--brass-deep)" stroke="var(--paper)" strokeWidth="1.5" />
        </g>
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <svg width="16" height="16" viewBox="-11 -11 22 22" aria-hidden>
            <path d="M0 -11l3.2 7.2 7.8.6-6 5.1 1.9 7.6-6.9-4.1-6.9 4.1 1.9-7.6-6-5.1 7.8-.6z" fill="var(--brass-deep)" />
          </svg>
          Bethel Baptist Church, Hernando, where Pastor Brandon meets with you
        </span>
        <span>Tap a town for directions and drive time.</span>
      </figcaption>
    </figure>
  );
}
