export interface Tag {
  text: string;
  color: 'blue' | 'amber' | 'green' | 'gray';
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'highlight' | 'food' | 'transport' | 'default';
  tags?: Tag[];
}

export interface Day {
  id: number;
  date: string;
  dayName: string;
  label: string;
  activities: Activity[];
  tip?: string;
}

export const TRIP_INFO = {
  title: 'Koppenhága — 5 napos terv',
  subtitle: '4 felnőtt + 1 baba · Április 18–22 · Comwell Portside, Nordhavn',
  hotel: 'Comwell Portside, Alexandriagade 1, Nordhavn',
  dates: 'April 18–22, 2026',
  group: '4 adults + 1 baby',
};

export const itinerary: Day[] = [
  {
    id: 0,
    date: 'Április 18',
    dayName: '1. nap — Péntek',
    label: '1. nap · Április 18 · Érkezés + Nyhavn felfedezés',
    activities: [
      {
        time: '13:15 — Landolás',
        title: 'CPH repülőtér → Hotel',
        description:
          'Terminal 3-ból M2 metró irányba Kongens Nytorv, majd átszállás M4-re Nordhavn felé — kb. 25 perc, 36 DKK/fő. Jegy: vending machine a repülőn, vagy DOT Tickets app. Babakocsi simán fér a metrón, liftje van minden állomásnak.',
        type: 'transport',
        tags: [{ text: 'M2 → Kongens Nytorv → M4 Nordhavn', color: 'green' }],
      },
      {
        time: '~14:30',
        title: 'Bejelentkezés — Comwell Portside',
        description:
          'Alexandriagade 1, Nordhavn. Modern, vízparti szálloda. Csomagok le, frissülés, séta a kikötőben ha a baba bírja.',
        type: 'transport',
      },
      {
        time: '16:00 — 18:00',
        title: 'Nyhavn felfedezés gyalog',
        description:
          'M4 metróval Kongens Nytorv-ra (1 megálló), majd séta a színes házak mentén. A Nyhavn a legfotogénebb utcája a városnak. Babakocsibarát a rakpart.',
        type: 'highlight',
        tags: [{ text: 'Must see', color: 'blue' }],
      },
      {
        time: '18:30 — Vacsora',
        title: "Vacsora Nyhavn környékén — Sticks'n'Sushi",
        description:
          "Sticks'n'Sushi (Nyhavn közelében) — helyi lánc, olcsóbb mint gondolnád, babakocsi barát, nagyon finom. Vagy séta a belváros felé és smørrebrød valahol.",
        type: 'food',
        tags: [{ text: 'Vacsoralehetőség', color: 'amber' }],
      },
    ],
    tip: '💡 Copenhagen Card tipp: Ha 4 napot terveztek városban (a Malmö nap nélkül), a 96 órás Discover kártya 4 felnőttnek kb. 2 500 DKK összesen — beleszámítva a reptéri transzfert, a csatornás hajókirándulást, a Tivoli belépőt és a metrót. Nagyon megéri!',
  },
  {
    id: 1,
    date: 'Április 19',
    dayName: '2. nap — Szombat',
    label: '2. nap · Április 19 · Belváros + Nørrebro + Lille Bakery',
    activities: [
      {
        time: '09:30 — Reggeli után',
        title: 'Lille Bakery — kötelező!',
        description:
          'Refshalevej 213A, Christianshavn. Organikus, sourdough alapú péksütemények, reggeli tányérok. Érdemes korán menni. M1/M2 → Christianshavn megálló.',
        type: 'food',
        tags: [{ text: 'Must-visit pékség', color: 'amber' }],
      },
      {
        time: '11:00',
        title: 'Christianshavn séta + csatornák',
        description:
          'A legmalerősebb negyed Koppenhágában. Szűk utcák, csatornák, színes házak. Babakocsibarát, bár néhol macskakő.',
        type: 'highlight',
      },
      {
        time: '12:30',
        title: 'Torvehallerne piac — ebéd',
        description:
          'Nørreport állomás mellett. 80+ stand, smørrebrød, halételek, sajt, kávé (Coffee Collective itt is!). Ideális a babával — sok hely, rugalmas.',
        type: 'food',
        tags: [
          { text: 'Food hall', color: 'amber' },
          { text: 'Kötelező', color: 'blue' },
        ],
      },
      {
        time: '14:30',
        title: 'Nørrebro negyed felfedezés',
        description:
          'Jægersborggade — a leghangulatosabb utca. Coffee Collective + Assistens Kirkegård temető (H.C. Andersen sírhelye!).',
        type: 'highlight',
        tags: [{ text: 'Must see negyed', color: 'blue' }],
      },
      {
        time: '16:30 — Délutáni kávé',
        title: 'Coffee Collective — Jægersborggade',
        description:
          'A dán third-wave kávés mozgalom alapítója. Juno the Bakery sütiket is árulják.',
        type: 'food',
        tags: [{ text: 'Kávé + süti', color: 'amber' }],
      },
      {
        time: '19:00 — Vacsora',
        title: 'Vacsora Nørrebróban',
        description:
          'Mirabelle (péksütemény + egyszerű vacsora) vagy Kebabistan (legendás, olcsó, nagyon helyi).',
        type: 'food',
      },
    ],
  },
  {
    id: 2,
    date: 'Április 20',
    dayName: '3. nap — Vasárnap',
    label: '3. nap · Április 20 · Malmö — Svédország egy napra',
    activities: [
      {
        time: '09:00 — Reggeli után',
        title: 'Copenhagen Central Station → Malmö C',
        description:
          'Vonat az Øresund hídon át — 35-40 perc, minden 20 percben indul. ~96 DKK/fő egy irányba. Útlevél kötelező! Babakocsi szabad a vonaton.',
        type: 'transport',
        tags: [{ text: 'Vonat · Øresund híd', color: 'green' }],
      },
      {
        time: '10:00 — Érkezés',
        title: 'Malmö fika — svéd reggeli kávészünet',
        description:
          'Kanelbullar (fahéjas csiga) kávé mellé. Az állomás közelében több pékség.',
        type: 'food',
        tags: [{ text: 'Svéd fika hagyomány', color: 'amber' }],
      },
      {
        time: '10:30 — 12:30',
        title: 'Gamla Staden — Malmö óvárosa',
        description:
          'Stortorget tér, Sankt Petri kyrka (700 éves gótikus), Malmöhus kastély. Flat terep, babakocsi barát.',
        type: 'highlight',
        tags: [{ text: 'Óváros séta', color: 'blue' }],
      },
      {
        time: '13:00 — Ebéd',
        title: 'Malmö Saluhall — fedett piac',
        description:
          'Gyönyörűen felújított 1800-as épület, 14 stand. Svéd ételek, Mikkeller ramen-stand.',
        type: 'food',
        tags: [{ text: 'Food hall', color: 'amber' }],
      },
      {
        time: '14:30',
        title: 'Turning Torso + Västra Hamnen',
        description:
          'Skandinávia egyik legismertebb modern épülete. Séta a parton ha az idő engedi.',
        type: 'highlight',
        tags: [{ text: 'Modern építészet', color: 'blue' }],
      },
      {
        time: '17:00 — Visszaút',
        title: 'Malmö C → Koppenhága',
        description:
          'Rugalmas — bármikor indulhattok. Naplemente a hídon vonatból — tényleg szép.',
        type: 'transport',
        tags: [{ text: 'Visszavonat · Rugalmas', color: 'green' }],
      },
    ],
  },
  {
    id: 3,
    date: 'Április 21',
    dayName: '4. nap — Hétfő',
    label: '4. nap · Április 21 · Tivoli + belváros + Nyhavn hajóút',
    activities: [
      {
        time: '10:00 — Délelőtt',
        title: 'Tivoli Gardens',
        description:
          '1843 óta működő park — virágok, pavilonok, bábszínház. Belépő: ~175 DKK/fő (CPH Carddal ingyenes!). Babával ideális.',
        type: 'highlight',
        tags: [
          { text: 'Must see', color: 'blue' },
          { text: 'CPH Card: ingyenes', color: 'green' },
        ],
      },
      {
        time: '12:30 — Ebéd',
        title: 'Aamanns Etablissement — smørrebrød',
        description:
          'Øster Farimagsgade 12 — modern dán nyitott szendvics, megfizethető ebédmenü.',
        type: 'food',
      },
      {
        time: '14:30 — Délután',
        title: 'Nyhavn csatornás hajókirándulás',
        description:
          '1 órás hajóút. Indul: Ved Stranden kikötőtől (nem Nyhavnból!). ~99 DKK/fő (CPH Carddal ingyenes!). Babakocsi felfér, fedett rész is van.',
        type: 'highlight',
        tags: [
          { text: 'Kötelező hajóút', color: 'blue' },
          { text: 'CPH Card: ingyenes', color: 'green' },
        ],
      },
      {
        time: '16:00',
        title: 'Rosenborg kastély kertjei (Kongens Have)',
        description:
          'Ingyenes, gyönyörű tavaszi kert. A kastély belső (koronázási ékszerek) drága, de a kert önmagában is megér egy sétát babával.',
        type: 'highlight',
      },
      {
        time: '19:00 — Különleges vacsora',
        title: 'Luxus este — Høst vagy Kadeau',
        description:
          'Høst (hygge hangulat, modern dán, ~300-400 DKK/fő) vagy Kadeau (szezonális dán konyha). Foglalás előre ajánlott!',
        type: 'food',
        tags: [{ text: 'Különleges este', color: 'amber' }],
      },
    ],
  },
  {
    id: 4,
    date: 'Április 22',
    dayName: '5. nap — Kedd',
    label: '5. nap · Április 22 · Nordhavn séta + indulás',
    activities: [
      {
        time: 'Reggeli után',
        title: 'Andersen & Maillard — Nordhavn',
        description:
          'Göteborg Plads 6 — hotel szomszédja! Cube-shaped croissant, gyönyörű dizájn belső. Az utolsó dán reggeli.',
        type: 'food',
        tags: [{ text: 'Nordhavn kávé ritual', color: 'amber' }],
      },
      {
        time: '10:00 — 12:00',
        title: 'Nordhavn negyed felfedezés',
        description:
          'Modern kikötői negyed — dizájn showroomok, vízparti séta, Audo showroom+kávézó. Igazi Copenhagen 2.0.',
        type: 'highlight',
        tags: [{ text: 'Modern építészet', color: 'blue' }],
      },
      {
        time: '12:30 — Búcsúebéd',
        title: 'Atelier September — Nordhavn',
        description:
          'Århusgade 128D — legendás reggeli/brunch. Noisette kávé, lemon-poppyseed sütemény.',
        type: 'food',
        tags: [{ text: 'Búcsúebéd', color: 'amber' }],
      },
      {
        time: '~12:45 — Indulás',
        title: 'Hotel → CPH repülőtér',
        description:
          'M4 → Kongens Nytorv → M2 Airport — kb. 25 perc. 14:30-as gépre bőven elég. Legkésőbb 12:30-kor érdemes indulni.',
        type: 'transport',
        tags: [{ text: 'M4 → M2 → Airport', color: 'green' }],
      },
    ],
    tip: '💡 A reptértől és az Andersen & Maillard-tól egyaránt 5 perc a hotel — az utolsó nap teljesen stresszmentesen alakítható a baba hangulatának megfelelően.',
  },
];

export function buildSystemPrompt(currentDayIndex: number = 0): string {
  const now = new Date();
  const cphTime = new Intl.DateTimeFormat('hu-HU', {
    timeZone: 'Europe/Copenhagen',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  const currentDay = itinerary[currentDayIndex];

  let itineraryText = '';
  for (const day of itinerary) {
    const isCurrent = day.id === currentDayIndex;
    itineraryText += `\n### ${day.dayName} (${day.date})${isCurrent ? ' ← MA' : ''}\n`;
    for (const activity of day.activities) {
      itineraryText += `- **${activity.time}**: ${activity.title}\n  ${activity.description}\n`;
    }
    if (day.tip) {
      itineraryText += `\n${day.tip}\n`;
    }
  }

  return `Te egy személyes utazási asszisztens vagy egy koppenhágai családi utazáson.

**Az utazó csoport:** 4 felnőtt + 1 baba
**Szálloda:** Comwell Portside, Alexandriagade 1, Nordhavn
**Utazás dátumai:** 2026. április 19–23.
**Jelenlegi idő (Koppenhága):** ${cphTime}
**Mai nap:** ${currentDay?.dayName} (${currentDay?.date})

---

## Teljes program:
${itineraryText}

---

## Praktikus infók:
- **Metró:** M2 és M4 — babakocsibarát, lift minden állomáson. M4: Nordhavn ↔ Kongens Nytorv ↔ belváros
- **Copenhagen Card:** 96 órás, 4 főnek ~2500 DKK — tartalmazza: metró, Tivoli, hajókirándulás, múzeumok
- **Hoteltől menetidők (közelítő):**
  - Nyhavn: ~10 perc (M4 1 megálló + gyalog)
  - Christianshavn / Lille Bakery: ~20 perc (M4 → M1/M2)
  - Belváros / Torvehallerne: ~15 perc (M4 → Nørreport)
  - Tivoli: ~25 perc (M4 → M1/M2 Vesterport)
  - Nørrebro: ~30 perc (M4 → M2 → gyalog)
  - Malmö: ~60 perc (M4 → S-tog → Øresund vonat)
  - CPH Airport: ~25 perc (M4 → M2)
- **Malmö:** Útlevél kötelező! Jegy: ~96 DKK/fő egyirányba. Øresund vonat 20 percenként.
- **Tivoli:** ~175 DKK/fő (CPH Carddal ingyenes)
- **Canal Tours (hajókirándulás):** ~99 DKK/fő, indul Ved Stranden-től (nem Nyhavnból!)
- **Valuta:** DKK (dán korona) — ~55 DKK ≈ 1 EUR
- **Babakocsi:** minden metróállomáson lift, a legtöbb látványosság babakocsi-barát
- **Április időjárás:** általában 8–14°C, néha szeles — öltözzenek rétegesen

## Hogyan segíts:
1. Légy **konkrét és tömör** — adj 1–3 átgondolt javaslatot, ne legyen túl hosszú
2. Mindig vedd figyelembe a **babát** (babakocsi, pihenő, szoptatás helye, hideg/szél)
3. Ha a terv megváltozik (visszamennek a hotelbe, valaki fáradt, késnek), adj **adaptált alternatívát**
4. Ismerd a **logisztikát**: melyik metróvonal, sétaidők, közelség
5. Ha helyszínről kérdeznek, adj **pontos infót** (cím, mi jó ott, mire figyeljenek)
6. **Válaszolj abban a nyelvben, amiben kérdeznek** — ha magyarul kérdeznek, magyarul válaszolj; ha angolul, angolul
7. Légy barátságos és praktikus — mint egy helyi barát aki jól ismeri a várost
8. Ha valaki leírja az aktuális helyzetet ("most itt vagyunk", "visszamentünk a hotelbe"), mindig adj konkrét következő lépést

Ne kezdj minden választ azzal hogy "Természetesen!" vagy "Persze!" — legyen természetes és közvetlen.`;
}
