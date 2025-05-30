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
    name: "Aloha, Hawaii!",
    description:
      "Due settimane nel paradiso hawaiano con un pacchetto che include voli, soggiorno in hotel e tour sostenibili.",
    priceInETH: "0.001",
    imageUrl:
      "https://gateway.pinata.cloud/ipfs/bafkreihgazicw64iafj2g7t6d2c32ktmuuqiujcuw47lbzg3d5evdj26ra",
  },
  {
    id: "pacco-viaggio-eco2",
    name: "Islanda Verde",
    description: "7 notti in lodge eco-friendly, tour dei vulcani e cascate",
    priceInETH: "0.0015",
    imageUrl:
      "https://gateway.pinata.cloud/ipfs/bafkreicjswsgf5krsmicq7wiqhfj6jxwmouk5xnfqiapqqoewcu6hgbxue",
  },
  {
    id: "pacco-viaggio-eco3",
    name: "Australian Outback",
    description:
      "Un'avventura ad impatto 0 di 10 giorni tra natura selvaggia, fauna unica e cultura aborigena.",
    priceInETH: "0.002",
    imageUrl:
      "https://gateway.pinata.cloud/ipfs/bafkreieewflmjgu7t6fkptcvyu57ahedsxsvf74shsmqmckd7crhrcgufa",
  },
];
