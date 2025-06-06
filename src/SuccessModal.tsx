import React from "react";
import type { Product } from "./products";

type Props = {
  product: Product;
  txHash: string;
  onClose: () => void;
};

const SuccessModal: React.FC<Props> = ({ product, txHash, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-10 w-full max-w-5xl text-center shadow-2xl">
        <h2 className="text-3xl font-extrabold text-green-600 mb-6">
          🎉 Acquisto completato!
        </h2>

        <img
          src={product.image}
          alt={product.title}
          className="w-48 h-48 object-cover mx-auto rounded-lg mb-6 shadow"
        />

        <p className="text-2xl font-semibold text-gray-800 mb-2">
          {product.title}
        </p>

        <a
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Visualizza su Etherscan
        </a>
        <p className="text-lg text-gray-600 mb-4">{product.price}</p>
        <p className="mt-4 text-lg text-gray-600">
          Grazie per aver scelto un viaggio sostenibile! Il tuo acquisto è stato
          registrato sulla blockchain.
        </p>
        <div className="mt-8">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg"
          >
            Torna alla home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
