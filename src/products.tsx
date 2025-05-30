export type Product<T = object> = {
  id: string;
  name: string;
  description: string;
  date: string; // "01.09-08.09", "01.10-15.10", etc.
  priceInETH: string; // "0.001, "0.0015", etc.
  imageUrl: string; // URL IPFS
} & T;

//  immagini “hostate” su IPFS
export const PRODUCTS: Product[] = [
  {
    id: "pacco-viaggio-eco1",
    name: "Aloha, Hawaii!",
    description:
      "Due settimane nel paradiso hawaiano con un pacchetto che include voli, soggiorno in hotel e tour sostenibili.",
    date: "01.10-14.10",
    priceInETH: "0.001",
    imageUrl:
      "https://ipfs.io/ipfs/bafkreihgazicw64iafj2g7t6d2c32ktmuuqiujcuw47lbzg3d5evdj26ra",
  },
  {
    id: "pacco-viaggio-eco2",
    name: "Islanda Verde",
    description: "7 notti in lodge eco-friendly, tour dei vulcani e cascate",
    date: "01.09-07.09",
    priceInETH: "0.0015",
    imageUrl:
      "https://ipfs.io/ipfs/bafkreicjswsgf5krsmicq7wiqhfj6jxwmouk5xnfqiapqqoewcu6hgbxue",
  },
  {
    id: "pacco-viaggio-eco3",
    name: "Australian Outback",
    description:
      "Un'avventura ad impatto 0 di 10 giorni tra natura selvaggia, fauna unica e cultura aborigena.",
    date: "01.11-10.11",
    priceInETH: "0.002",
    imageUrl:
      "https://ipfs.io/ipfs/bafkreieewflmjgu7t6fkptcvyu57ahedsxsvf74shsmqmckd7crhrcgufa",
  },
];
