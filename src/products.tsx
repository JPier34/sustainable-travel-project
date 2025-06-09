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
} & T;

//  immagini “hostate” su IPFS
export const products: Product[] = [
  {
    id: 1,
    title: "Aloha, Hawaii!",
    description:
      "Due settimane nel paradiso hawaiano con un pacchetto che include voli, soggiorno in hotel e tour sostenibili.",
    image:
      "https://ipfs.io/ipfs/bafybeibjlqvzkk4dhqoyidvtnesn4l45vbphj55cpydhanfeawiiuzhgiu",
    price: "0.001 ETH",
    originalPrice: "0.0015 ETH",
    dates: "01.10-14.10",
    rating: 4.9,
    reviews: 127,
    carbonOffset: "100%",
    ecoFeatures: ["Hotel Eco-Certified", "Trasporti Verdi", "Tour Locali"],
    badge: "Più Popolare",
  },
  {
    id: 2,
    title: "Islanda Eco-Adventure",
    description:
      "7 notti in lodge eco-friendly, tour dei vulcani e cascate con guida naturalistica certificata.",
    image:
      "https://ipfs.io/ipfs/bafybeidjswcmob2kgwrknwgaze5mpczamientodpmgsdruuotcg2rnvavi",
    price: "0.0015 ETH",
    originalPrice: "0.002 ETH",
    dates: "01.09-07.09",
    rating: 4.8,
    reviews: 89,
    carbonOffset: "120%",
    ecoFeatures: ["Energia Geotermica", "Lodge Sostenibile", "Zero Plastica"],
    badge: "Carbon Negative",
  },
  {
    id: 3,
    title: "Australian Outback",
    description:
      "Un'avventura ad impatto 0 di 10 giorni tra natura selvaggia, fauna unica e cultura aborigena.",
    image:
      "https://ipfs.io/ipfs/bafkreiaqbcwox6pffaoxv6znj6f4ighirxszxbrews5yaxj6nobokmzova",
    price: "0.002 ETH",
    originalPrice: "0.0025 ETH",
    dates: "01.11-10.11",
    rating: 4.7,
    reviews: 156,
    carbonOffset: "85%",
    ecoFeatures: ["Comunità Locali", "Wildlife Protection", "Camping Eco"],
    badge: "Avventura",
  },
];
