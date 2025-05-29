import React from "react";
import type { Product } from "./products";
import "./App.css";

interface ProductCardProps {
  product: Product;
  isBuying: boolean;
  onBuy: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isBuying,
  onBuy,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      {/* Immagine prodotto */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1 flex-grow">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium text-green-700">
            {product.priceInETH} ETH
          </span>
          <button
            onClick={() => onBuy(product)}
            disabled={isBuying}
            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBuying ? "Acquistando…" : "Acquista"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
