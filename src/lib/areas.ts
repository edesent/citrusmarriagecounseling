/**
 * One page per part of Citrus County (/areas/<slug>). Every community in the
 * county is covered: the larger ones have their own page and the small ones
 * are named on their neighbor's page.
 *
 * Drive times and roads come from OpenStreetMap routing to the church
 * (scripts/routes.py → scripts/routes.json), rounded up. Keep each page's
 * local paragraphs specific to that place: search engines treat pages that
 * only swap the town name as spam.
 */

export type Area = {
  slug: string;
  name: string;
  /** Other places in the county this page also serves. */
  alsoServes: string[];
  /** Key in src/lib/map-data.ts places. */
  mapKey: string;
  miles: number;
  minutes: number;
  /** How you get to the church from here, in plain words. */
  route: string;
  /** Two short paragraphs that belong to this place only. */
  local: [string, string];
  /** Slugs of the neighboring area pages. */
  nearby: string[];
};

export const areas: Area[] = [
  {
    slug: "hernando",
    name: "Hernando",
    alsoServes: [],
    mapKey: "Hernando",
    miles: 3,
    minutes: 7,
    route: "Take CR 486 (Norvell Bryant Highway) west from US 41 and turn onto North McGee Drive.",
    local: [
      "Hernando is where Pastor Brandon meets people. Bethel Baptist Church sits on North McGee Drive, a few minutes off US 41 and CR 486, so for most of Hernando the drive is shorter than the wait at a doctor’s office.",
      "Bethel has been a Hernando church since 1984. Couples who come for counseling are welcome on Sunday too, but nobody has to visit the church, join, or sit through a sales talk to sit down with the pastor.",
    ],
    nearby: ["citrus-hills", "beverly-hills", "inverness", "citrus-springs"],
  },
  {
    slug: "inverness",
    name: "Inverness",
    alsoServes: ["Inverness Highlands North", "Inverness Highlands South"],
    mapKey: "Inverness",
    miles: 9,
    minutes: 17,
    route: "Head north on US 41 out of Inverness, turn left onto CR 486, then right onto North McGee Drive. From Inverness Highlands North, Croft Avenue gets you to CR 486 in about 12 minutes.",
    local: [
      "Inverness is the county seat, and the Clerk of Court’s office there is where Citrus County couples apply for a marriage license. Couples who finish a registered Florida premarital course before they apply pay a smaller license fee and skip the three-day wait.",
      "From Inverness Highlands North the church is actually closer than downtown, about twelve minutes by Croft Avenue. From the Highlands south of town, allow twenty-five.",
    ],
    nearby: ["hernando", "floral-city", "citrus-hills", "lecanto"],
  },
  {
    slug: "floral-city",
    name: "Floral City",
    alsoServes: ["Pineola"],
    mapKey: "Floral City",
    miles: 17,
    minutes: 30,
    route: "Follow US 41 north through Inverness, turn left onto CR 486, then right onto North McGee Drive. From Pineola, add about ten minutes coming up CR 39 to US 41.",
    local: [
      "Floral City sits at the south end of the Tsala Apopka lakes, and US 41 runs straight up the chain to Hernando. It is one road nearly the whole way, about half an hour.",
      "With a half-hour drive each way, it helps to keep sessions on the same day and time every week. Pastor Brandon will set a regular slot that fits around work, so you only plan it once.",
    ],
    nearby: ["inverness", "hernando", "lecanto"],
  },
  {
    slug: "citrus-hills",
    name: "Citrus Hills",
    alsoServes: [],
    mapKey: "Citrus Hills",
    miles: 2,
    minutes: 6,
    route: "Take Essex Avenue to CR 486 and turn onto North McGee Drive. It is the closest neighborhood to the church.",
    local: [
      "Citrus Hills is Bethel’s nearest neighbor: from most streets here the church is closer than the grocery store. A counseling session fits into a lunch hour or an early evening without much planning.",
      "Citrus County is one of the oldest counties in Florida, with a median age near 57, and plenty of marriages here are past the early years: retired, caring for a parent, remarried, or learning to share a house all day for the first time. Those are good reasons to sit down with a pastor too.",
    ],
    nearby: ["hernando", "beverly-hills", "lecanto", "inverness"],
  },
  {
    slug: "beverly-hills",
    name: "Beverly Hills",
    alsoServes: [],
    mapKey: "Beverly Hills",
    miles: 5,
    minutes: 12,
    route: "Take Forest Ridge Boulevard south to Roosevelt Boulevard, follow it to CR 486, then turn onto North McGee Drive.",
    local: [
      "From Beverly Hills the church is about twelve minutes away by Forest Ridge and Roosevelt Boulevards, close enough to come straight from home without a long day out.",
      "Couples here bring every season of marriage: newlyweds, a second marriage, adult children and grandchildren who see things differently, one spouse’s health changing everything. Pastor Brandon counsels from Scripture for all of it.",
    ],
    nearby: ["citrus-hills", "pine-ridge", "hernando", "lecanto"],
  },
  {
    slug: "lecanto",
    name: "Lecanto",
    alsoServes: ["Black Diamond"],
    mapKey: "Lecanto",
    miles: 11,
    minutes: 22,
    route: "Take CR 491 (Lecanto Highway) north to CR 486, head east, then turn onto North McGee Drive. From Black Diamond it is about 15 minutes the same way.",
    local: [
      "Lecanto sits in the middle of the county, where CR 491 crosses SR 44, with the College of Central Florida’s Citrus campus and the county’s schools close by. CR 491 and CR 486 bring you to Hernando in about twenty minutes.",
      "Families with school-age children often find an early-evening session easiest. Pastor Brandon is a father of three himself and will plan around school, practice and church nights.",
    ],
    nearby: ["beverly-hills", "citrus-hills", "homosassa", "crystal-river"],
  },
  {
    slug: "pine-ridge",
    name: "Pine Ridge",
    alsoServes: [],
    mapKey: "Pine Ridge",
    miles: 8,
    minutes: 20,
    route: "Take Mustang Boulevard to Roosevelt Boulevard, continue on Forest Ridge Boulevard to CR 486, then turn onto North McGee Drive.",
    local: [
      "Pine Ridge sits north of Beverly Hills, and the drive to Hernando runs through Beverly Hills on Roosevelt and Forest Ridge Boulevards, about twenty minutes.",
      "Out here a marriage can feel private, with neighbors a long way off. That is no reason to carry a hard season alone. A free first conversation with Pastor Brandon is a quiet place to start.",
    ],
    nearby: ["beverly-hills", "citrus-springs", "citrus-hills", "hernando"],
  },
  {
    slug: "citrus-springs",
    name: "Citrus Springs",
    alsoServes: ["Holder"],
    mapKey: "Citrus Springs",
    miles: 12,
    minutes: 22,
    route: "Take US 41 south toward Hernando, turn right onto CR 486, then right onto North McGee Drive. From Holder it is about 15 minutes down US 41.",
    local: [
      "Citrus Springs is at the north end of the county near the Withlacoochee River, and US 41 runs straight south to Hernando. Holder is on the way.",
      "A new baby, a new job or a new house can strain any marriage, and the early years are when good habits are easiest to build. Premarital and marriage counseling with Pastor Brandon is close enough to fit around all of it.",
    ],
    nearby: ["hernando", "pine-ridge", "beverly-hills", "inverness"],
  },
  {
    slug: "crystal-river",
    name: "Crystal River",
    alsoServes: ["Meadowcrest", "Red Level"],
    mapKey: "Crystal River",
    miles: 12,
    minutes: 22,
    route: "Take SR 44 east from US 19, turn left onto CR 486 and follow it about eight miles, then turn onto North McGee Drive. From Red Level, come south on US 19 first, about half an hour in all.",
    local: [
      "Crystal River is the county’s other city, on Kings Bay at the Gulf side of the county. SR 44 and CR 486 bring you across the county to Hernando in a little over twenty minutes.",
      "If you would rather not run into someone you know in the parking lot, counseling across the county in Hernando gives you that privacy.",
    ],
    nearby: ["homosassa", "lecanto", "citrus-hills", "hernando"],
  },
  {
    slug: "homosassa",
    name: "Homosassa",
    alsoServes: ["Homosassa Springs", "Chassahowitzka"],
    mapKey: "Homosassa Springs",
    miles: 13,
    minutes: 27,
    route: "Take CR 490 east to CR 491, go north to CR 486, then east to North McGee Drive. From Homosassa on the river, allow about 40 minutes; from Chassahowitzka, about the same.",
    local: [
      "Homosassa and Homosassa Springs sit along the Homosassa River in the southwest of the county, home to the wildlife state park and its manatees. CR 490, CR 491 and CR 486 make the drive to Hernando in under half an hour from the Springs.",
      "If the drive is the hard part, ask about scheduling two sessions back to back, or meeting at a time that avoids US 19 traffic. Pastor Brandon will work with you.",
    ],
    nearby: ["sugarmill-woods", "lecanto", "crystal-river"],
  },
  {
    slug: "sugarmill-woods",
    name: "Sugarmill Woods",
    alsoServes: [],
    mapKey: "Sugarmill Woods",
    miles: 27,
    minutes: 42,
    route: "Head north on US 98 and CR 491 to CR 486, then east to North McGee Drive. Allow about 45 minutes.",
    local: [
      "Sugarmill Woods is at the southwest corner of the county off US 98, the farthest drive on this list at about 45 minutes.",
      "Ask about a regular weekly time, or two sessions back to back, so the drive is planned once and the counseling stays on track.",
    ],
    nearby: ["homosassa", "lecanto", "crystal-river"],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

/** Every community in Citrus County, mapped to the page that serves it. */
export const allPlaces = areas
  .flatMap((a) => [{ name: a.name, slug: a.slug }, ...a.alsoServes.map((n) => ({ name: n, slug: a.slug }))])
  .sort((a, b) => a.name.localeCompare(b.name));
