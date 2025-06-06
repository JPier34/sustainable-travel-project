import React, { useState } from "react";
import { type Product } from "./products";
import "./App.css";
import { ChevronRight, Leaf, Star, Calendar } from "lucide-react";

interface ProductCardProps<T = object> {
  product: Product<T>;
  isBuying: boolean;
  onBuy: (product: Product<T>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  isBuying,
  product,
  onBuy,
}) => {
  const [hoveredCard, setHoveredCard] = useState<null | string>(null);

  return (
    <div className="grid gap-8 mb-8">
      <div className="group relative bg-white rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden">
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg">
            {product.badge}
          </span>
        </div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Carbon Offset Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-emerald-600">
              <Leaf className="w-3 h-3 mr-1" />
              {product.carbonOffset} CO2
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Rating */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="font-semibold">{product.rating}</span>
              <span className="ml-1">({product.reviews})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Eco Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.ecoFeatures.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Dates */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Disponibile in data {product.dates}</span>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="text-2xl font-bold text-emerald-600">
                {product.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice}
              </span>
            </div>

            <button
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center"
              onClick={() => onBuy(product)}
              disabled={isBuying}
              onMouseEnter={() => setHoveredCard(String(product.id))}
              onMouseLeave={() => setHoveredCard(null)}
            >
              Acquista
              {hoveredCard === String(product.id) && (
                <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
