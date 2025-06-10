export type Product<T = object> = {
  id: T extends { id: infer U } ? U : number;
  title: string;
  image: string;
  price: string;
  originalPrice: string;
  dates: string; // "01.10-14.10", "01.09-07.09", etc.
  rating: number; // 4.5, 4.8, etc.
  reviews: number; // 127, 89, etc.
  carbonOffset: string; // "100%", "120%", etc.
  ecoFeatures: string[]; // ["Hotel Eco-Certified", "Trasporti Verdi", "Tour Locali"]
  badge?: string; // "Più Popolare", "Carbon Negative", etc.
  description: string;
  additionalImages?: string[];
  detailedDescription?: string;
  itinerary?: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  sustainability?: {
    carbonReduction: string;
    localCommunities: string[];
    conservationProjects: string[];
  };
  accommodation?: {
    type: string;
    certification: string;
    description: string;
  };
  included?: string[];
  excluded?: string[];
  difficulty?: "Facile" | "Medio" | "Difficile";
  season?: string;
  groupSize?: string;
  localInsights?: {
    guides: string[];
    culturalTips: string[];
    practicalAdvice: string[];
  };
} & T;

//  immagini “hostate” su IPFS
export const products: Product[] = [
  {
    id: 1,
    title: "Aloha, Hawaii!",
    description:
      "Due settimane nel paradiso hawaiano con un pacchetto che include voli, soggiorno in hotel e tour sostenibili.",
    detailedDescription:
      "Immergiti nella cultura hawaiana autentica attraverso un viaggio che rispetta profondamente l'ambiente e le tradizioni locali. Dalle spiagge incontaminate di Maui alle foreste pluviali di Big Island, ogni momento è progettato per minimizzare l'impatto ambientale massimizzando l'esperienza culturale.",
    image:
      "https://ipfs.io/ipfs/bafybeibjlqvzkk4dhqoyidvtnesn4l45vbphj55cpydhanfeawiiuzhgiu",
    additionalImages: [
      "https://ipfs.io/ipfs/bafkreiaqjhhz2pln4m67g4qf7xzmt44bqvvrpl2ixbq6t3g73n6kjnbhoq",
      "https://ipfs.io/ipfs/bafybeie6rcaarvavw7tbbq3nn6xs3e3ywley6odyjrp5s22p7nylv75j7m",
    ],
    price: "0.001 ETH",
    originalPrice: "0.0015 ETH",
    dates: "01.10-14.10",
    rating: 4.9,
    reviews: 127,
    carbonOffset: "100%",
    ecoFeatures: ["Hotel Eco-Certified", "Trasporti Verdi", "Tour Locali"],
    badge: "Più Popolare",
    difficulty: "Facile",
    season: "Tutto l'anno",
    groupSize: "Max 12 persone",
    itinerary: [
      {
        day: 1,
        title: "Arrivo a Honolulu",
        description: "Accoglienza all'aeroporto e trasferimento eco-friendly",
        activities: [
          "Check-in hotel sostenibile",
          "Orientamento culturale",
          "Cena tradizionale",
        ],
      },
      {
        day: 2,
        title: "Pearl Harbor e cultura hawaiana",
        description: "Storia e tradizioni con guide locali",
        activities: [
          "Visita Pearl Harbor",
          "Museo cultura hawaiana",
          "Workshop lei making",
        ],
      },
      {
        day: 3,
        title: "Escursione a Diamond Head",
        description: "Trekking con vista panoramica",
        activities: [
          "Trekking guidato",
          "Picnic con prodotti locali",
          "Relax in spiaggia",
        ],
      },
      {
        day: 4,
        title: "Maui e la Road to Hana",
        description: "Tour panoramico con focus sulla sostenibilità",
        activities: [
          "Visita cascate locali",
          "Degustazione frutta tropicale",
          "Incontro con agricoltori locali",
        ],
      },
      {
        day: 5,
        title: "Snorkeling a Molokini Crater",
        description: "Esplorazione della fauna marina protetta",
        activities: [
          "Snorkeling guidato",
          "Educazione sulla barriera corallina",
          "Pranzo a bordo eco-friendly",
        ],
      },
      {
        day: 6,
        title: "Cultura e danza hula",
        description: "Workshop di danza tradizionale e musica",
        activities: [
          "Lezione di hula con esperti locali",
          "Cena con spettacolo di danza",
          "Cerimonia del tramonto hawaiano",
        ],
      },
      {
        day: 7,
        title: "Giornata libera a Kauai",
        description: "Relax o attività opzionali sostenibili",
        activities: [
          "Kayak nel fiume Wailua",
          "Visita giardini botanici locali",
          "Shopping artigianato locale",
        ],
      },
      {
        day: 8,
        title: "Ritorno a Honolulu",
        description: "Ultimo giorno di esplorazione e relax",
        activities: [
          "Visita mercato contadino",
          "Workshop cucina hawaiana",
          "Trasferimento all'aeroporto",
        ],
      },
      {
        day: 9,
        title: "Escursione a Big Island",
        description: "Scopri i vulcani e la biodiversità unica",
        activities: [
          "Visita Parco Nazionale dei Vulcani",
          "Tour della lava e crateri",
          "Incontro con scienziati locali",
        ],
      },
      {
        day: 10,
        title: "Cultura e tradizioni hawaiane",
        description: "Approfondimento sulla storia e cultura locale",
        activities: [
          "Visita al centro culturale Polynesian",
          "Laboratorio artigianato tradizionale",
          "Cena di chiusura con danze locali",
        ],
      },
      {
        day: 11,
        title: "Ritorno a casa",
        description: "Trasferimento all'aeroporto e partenza",
        activities: [
          "Check-out hotel",
          "Trasferimento eco-friendly all'aeroporto",
        ],
      },
      {
        day: 12,
        title: "Giornata di relax a Lanai",
        description:
          "Scopri l'isola meno conosciuta e le sue bellezze naturali",
        activities: [
          "Visita spiagge nascoste",
          "Tour in jeep con guida locale",
          "Pranzo in ristorante sostenibile",
        ],
      },
      {
        day: 13,
        title: "Avventura in kayak a Oahu",
        description: "Esplora le baie e le grotte marine",
        activities: [
          "Kayak tra le isole",
          "Snorkeling in acque cristalline",
          "Picnic su spiaggia remota",
        ],
      },
      {
        day: 14,
        title: "Ritorno a Honolulu e partenza",
        description: "Ultimi momenti di relax prima del volo di ritorno",
        activities: [
          "Visita mercato locale per souvenir",
          "Relax in spiaggia",
          "Trasferimento all'aeroporto",
        ],
      },
    ],
    sustainability: {
      carbonReduction:
        "100% compensato attraverso progetti locali di riforestazione",
      localCommunities: [
        "Supporto a 5 famiglie native hawaiane",
        "Partnership con cooperative locali",
      ],
      conservationProjects: [
        "Protezione tartarughe marine",
        "Ripristino barriera corallina",
      ],
    },
    accommodation: {
      type: "Eco-resort certificato LEED Gold",
      certification: "Green Key e Hawaii Green Business",
      description:
        "Resort alimentato al 100% da energia rinnovabile con programmi di conservazione dell'acqua",
    },
    included: [
      "Voli carbon-neutral",
      "14 notti in eco-resort",
      "Tutti i pasti con prodotti locali",
      "Tour guidati con esperti locali",
      "Attrezzatura snorkeling",
      "Assicurazione viaggio completa",
    ],
    excluded: [
      "Spese personali",
      "Bevande alcoliche",
      "Escursioni opzionali",
      "Mance",
    ],
    localInsights: {
      guides: [
        "Kailani - Guida culturale nativa",
        "Marcus - Biologo marino certificato",
      ],
      culturalTips: [
        "Rispetta i siti sacri",
        "Impara il saluto 'Aloha' tradizionale",
        "Partecipa alle cerimonie del tramonto",
      ],
      practicalAdvice: [
        "Porta crema solare reef-safe",
        "Scarpe da trekking leggere",
        "Costume e asciugamano in microfibra",
      ],
    },
  },
  {
    id: 2,
    title: "Islanda Eco-Adventure",
    description:
      "7 notti in lodge eco-friendly, tour dei vulcani e cascate con guida naturalistica certificata.",
    detailedDescription:
      "Scopri l'Islanda più autentica attraverso un'avventura che sfrutta l'energia geotermica naturale e supporta le comunità rurali. Un viaggio che va oltre il turismo tradizionale per offrirti un'esperienza trasformativa nel rispetto della natura artica.",
    image:
      "https://ipfs.io/ipfs/bafybeidjswcmob2kgwrknwgaze5mpczamientodpmgsdruuotcg2rnvavi",
    additionalImages: [
      "https://ipfs.io/ipfs/bafkreif2oj2tw2ynaqrp6cnqragogh2kimnrlhp2imkgu7fkyems2ccn2u",
      "https://ipfs.io/ipfs/bafkreicgp47hfkzeweo53jv2aqdvqrofac7aqnnn57bl7j4223rez3kgnm",
    ],
    price: "0.0015 ETH",
    originalPrice: "0.002 ETH",
    dates: "01.09-07.09",
    rating: 4.8,
    reviews: 89,
    carbonOffset: "120%",
    ecoFeatures: ["Energia Geotermica", "Lodge Sostenibile", "Zero Plastica"],
    badge: "Carbon Negative",
    difficulty: "Medio",
    season: "Settembre - Ottobre",
    groupSize: "Max 8 persone",
    itinerary: [
      {
        day: 1,
        title: "Arrivo a Reykjavik",
        description: "Trasferimento eco-friendly al lodge",
        activities: [
          "Check-in lodge geotermico",
          "Orientamento culturale",
          "Cena con ingredienti locali",
        ],
      },
      {
        day: 2,
        title: "Cascate e vulcani",
        description: "Visita alle cascate Gullfoss e vulcano Hekla",
        activities: [
          "Escursione guidata",
          "Picnic con prodotti biologici",
          "Relax in sorgenti termali naturali",
        ],
      },
      {
        day: 3,
        title: "Geysir e cultura islandese",
        description: "Scopri il fenomeno dei geyser e la storia locale",
        activities: [
          "Visita Geysir e Strokkur",
          "Laboratorio artigianato locale",
          "Cena tradizionale con musica folk",
        ],
      },
      {
        day: 4,
        title: "Parco Nazionale Thingvellir",
        description: "Esplora il parco patrimonio dell'umanità",
        activities: [
          "Trekking guidato",
          "Visita fessura tettonica",
          "Osservazione fauna selvatica",
        ],
      },
      {
        day: 5,
        title: "Laguna Blu e relax",
        description: "Giornata di benessere nella famosa laguna geotermica",
        activities: [
          "Bagno nella Laguna Blu",
          "Trattamenti spa con prodotti naturali",
          "Cena in ristorante sostenibile",
        ],
      },
      {
        day: 6,
        title: "Cultura e tradizioni islandesi",
        description: "Approfondimento sulla storia e cultura locale",
        activities: [
          "Visita museo culturale",
          "Laboratorio cucina tradizionale",
          "Cerimonia del fuoco islandese",
        ],
      },
      {
        day: 7,
        title: "Ritorno a casa",
        description: "Trasferimento all'aeroporto e partenza",
        activities: [
          "Check-out lodge",
          "Trasferimento eco-friendly all'aeroporto",
        ],
      },
    ],
    sustainability: {
      carbonReduction: "120% - Surplus investito in progetti eolici locali",
      localCommunities: [
        "Partnership con allevatori di pecore locali",
        "Supporto ad artigiani tradizionali",
      ],
      conservationProjects: [
        "Protezione pulcinelle di mare",
        "Monitoraggio ghiacciai",
      ],
    },
    accommodation: {
      type: "Lodge geotermico off-grid",
      certification: "Nordic Swan Ecolabel",
      description:
        "Strutture riscaldate naturalmente con sorgenti termali e pannelli solari",
    },
    included: [
      "Voli compensati",
      "7 notti in lodge eco",
      "Tutti i pasti biologici",
      "Trasporti elettrici",
      "Equipaggiamento tecnico",
      "Guide specializzate",
    ],
    excluded: [
      "Bevande alcoliche",
      "Acquisti personali",
      "Assicurazione annullamento",
      "Bagagli extra",
    ],
  },
  {
    id: 3,
    title: "Australian Outback",
    description:
      "Un'avventura ad impatto 0 di 10 giorni tra natura selvaggia, fauna unica e cultura aborigena.",
    detailedDescription:
      "Vivi un'esperienza autentica nell'Outback australiano, immerso nella cultura aborigena più antica del mondo. Un viaggio che celebra la connessione profonda tra l'uomo e la natura, guidato da custodi tradizionali della terra.",
    image:
      "https://ipfs.io/ipfs/bafkreiaqbcwox6pffaoxv6znj6f4ighirxszxbrews5yaxj6nobokmzova",
    additionalImages: [
      "https://ipfs.io/ipfs/bafkreiheii3fvgtz535zawfbxrllsxtwxqkzwwkvzdj24ke7s4vkozl36u",
      "https://ipfs.io/ipfs/bafybeihqn3t5rouemluhezh5ous62jfv4djxev7442lwaaa7d36q5267ai",
    ],
    price: "0.002 ETH",
    originalPrice: "0.0025 ETH",
    dates: "01.11-10.11",
    rating: 4.7,
    reviews: 156,
    carbonOffset: "85%",
    ecoFeatures: ["Comunità Locali", "Wildlife Protection", "Camping Eco"],
    badge: "Avventura",
    difficulty: "Difficile",
    season: "November - March",
    groupSize: "Max 6 persone",
    itinerary: [
      {
        day: 1,
        title: "Arrivo a Alice Springs",
        description: "Trasferimento eco-friendly al campo base",
        activities: [
          "Check-in eco-camp",
          "Orientamento culturale",
          "Cena con piatti tradizionali",
        ],
      },
      {
        day: 2,
        title: "Uluru e Kata Tjuta",
        description: "Visita ai luoghi sacri aborigeni",
        activities: [
          "Escursione guidata a Uluru",
          "Workshop di arte aborigena",
          "Osservazione tramonto su Uluru",
        ],
      },
      {
        day: 3,
        title: "Cultura Anangu e bush tucker",
        description: "Scopri la cucina tradizionale e le pratiche sostenibili",
        activities: [
          "Lezione di bush tucker con guide locali",
          "Picnic con prodotti locali",
          "Cerimonia del fuoco tradizionale",
        ],
      },
      {
        day: 4,
        title: "Kings Canyon e Watarrka National Park",
        description: "Trekking tra canyon e formazioni rocciose uniche",
        activities: [
          "Trekking guidato nel canyon",
          "Picnic con vista panoramica",
          "Osservazione fauna selvatica locale",
        ],
      },
      {
        day: 5,
        title: "Deserto di Simpson e fauna selvatica",
        description: "Esplora il deserto e la sua biodiversità unica",
        activities: [
          "Safari fotografico nel deserto",
          "Incontro con ranger locali",
          "Cena sotto le stelle nel deserto",
        ],
      },
      {
        day: 6,
        title: "Cultura aborigena e musica tradizionale",
        description: "Approfondimento sulla musica e danza aborigena",
        activities: [
          "Lezione di didgeridoo con esperti locali",
          "Spettacolo di danza tradizionale",
          "Cerimonia del fumo per benedizione della terra",
        ],
      },
      {
        day: 7,
        title: "Ritorno a Alice Springs e partenza",
        description:
          "Ultimo giorno di esplorazione e relax prima del volo di ritorno",
        activities: [
          "Visita mercato locale per souvenir",
          "Relax in piscina del campo",
          "Trasferimento all'aeroporto",
        ],
      },
      {
        day: 8,
        title: "Escursione a Kata Tjuta",
        description:
          "Scopri le formazioni rocciose uniche e la loro importanza culturale",
        activities: [
          "Trekking tra le guglie di Kata Tjuta",
          "Picnic con prodotti locali",
          "Osservazione fauna selvatica",
        ],
      },
      {
        day: 9,
        title: "Cultura Anangu e bush tucker avanzato",
        description:
          "Approfondimento sulla cucina tradizionale e pratiche sostenibili",
        activities: [
          "Lezione avanzata di bush tucker",
          "Cerimonia del fuoco tradizionale",
          "Cena con piatti tipici aborigeni",
        ],
      },
      {
        day: 10,
        title: "Ritorno a casa",
        description: "Trasferimento all'aeroporto e partenza",
        activities: [
          "Check-out eco-camp",
          "Trasferimento eco-friendly all'aeroporto",
        ],
      },
    ],
    sustainability: {
      carbonReduction: "85% attraverso trasporti sostenibili e energia solare",
      localCommunities: [
        "Progetti educativi con 3 comunità aborigene",
        "Training guide locali",
      ],
      conservationProjects: [
        "Protezione bilby del deserto",
        "Restauro habitat kanguro rosso",
      ],
    },
    accommodation: {
      type: "Eco-camp e lodge tradizionali",
      certification: "EarthCheck Silver",
      description:
        "Strutture temporanee a impatto zero con energia solare e sistemi di raccolta acqua piovana",
    },
    included: [
      "Voli interni compensati",
      "10 giorni di avventura",
      "Campeggio e lodge eco",
      "Pasti tradizionali",
      "Guide aborigene certificate",
      "Attrezzatura campeggio",
    ],
    excluded: [
      "Voli internazionali",
      "Assicurazione medica",
      "Equipaggiamento personale",
      "Lavanderia",
    ],
    localInsights: {
      guides: [
        "Billy - Custode tradizionale Anangu",
        "Sarah - Biologa wildlife",
      ],
      culturalTips: [
        "Rispetta i siti sacri Uluru",
        "Impara il dot painting tradizionale",
        "Partecipa alle cerimonie del fuoco",
      ],
      practicalAdvice: [
        "Cappello e protezione solare",
        "Scarpe da trekking robuste",
        "Sacco a pelo per temperature desertiche",
      ],
    },
  },
];
