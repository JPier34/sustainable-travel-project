export type Product = {
  id: string;
  name: string;
  description: string;
  priceInETH: string; // es. "0.01"
  imageUrl: string; // URL IPFS (o link statico)
};

//  immagini “hostate” su IPFS
export const PRODUCTS: Product[] = [
  {
    id: "pacco-viaggio-eco1",
    name: "Pacchetto Eco Azzurro",
    description:
      "3 notti in eco-resort, visita comunitaria e trekking sostenibile",
    priceInETH: "0.01",
    imageUrl: "https://ipfs.io/ipfs/QmExampleHash1", // sostituisci con hash reale IPFS
  },
  {
    id: "pacco-viaggio-eco2",
    name: "Pacchetto Foresta Verde",
    description: "2 notti in lodge eco-friendly, incontro con artigiani locali",
    priceInETH: "0.015",
    imageUrl: "https://ipfs.io/ipfs/QmExampleHash2", // sostituisci con hash reale IPFS
  },
  {
    id: "pacco-viaggio-eco3",
    name: "Pacchetto Montagna Pulita",
    description: "Weekend in rifugio sostenibile con guida ambientale",
    priceInETH: "0.02",
    imageUrl: "https://ipfs.io/ipfs/QmExampleHash3", // sostituisci con hash reale IPFS
  },
];
