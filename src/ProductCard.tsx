import React, { useState } from "react";
import { type Product } from "./products";
import "./App.css";
import {
  ChevronRight,
  Leaf,
  Star,
  Calendar,
  ChevronDown,
  MapPin,
  Users,
  Thermometer,
  Clock,
  CheckCircle,
  XCircle,
  Heart,
  Camera,
  Info,
} from "lucide-react";
import IPFSImage from "./IPFSImage";

interface ProductCardProps<T = object> {
  product: Product<T>;
  isBuying: boolean;
  isHighlighted?: boolean;
  onBuy: (product: Product<T>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  isBuying,
  product,
  onBuy,
  isHighlighted = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "itinerary" | "sustainability" | "accommodation" | "included"
  >("itinerary");
  const [showFullItinerary, setShowFullItinerary] = useState(false);

  const renderItinerary = () => {
    const visibleItinerary = showFullItinerary
      ? product.itinerary
      : product.itinerary?.slice(0, 3);

    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-gray-800 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-emerald-600" />
          Itinerario Dettagliato
        </h4>

        {visibleItinerary?.map((day, index) => (
          <div key={index} className="border-l-2 border-emerald-200 pl-4 pb-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-semibold text-emerald-700">
                {day.day}
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-gray-800">{day.title}</h5>
                <p className="text-sm text-gray-600 mt-1">{day.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {day.activities.slice(0, 2).map((activity, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {product.itinerary && product.itinerary.length > 3 && (
          <button
            onClick={() => setShowFullItinerary((prev) => !prev)}
            className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white italic hover:underline"
          >
            {showFullItinerary
              ? "Mostra meno"
              : `+ altri ${product.itinerary.length - 3} giorni`}
          </button>
        )}
      </div>
    );
  };

  const allImages = [product.image, ...(product.additionalImages || [])];

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (direction === "next") {
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setActiveImageIndex(
        (prev) => (prev - 1 + allImages.length) % allImages.length
      );
    }
  };

  const tabContent = {
    itinerary: renderItinerary(),
    sustainability: (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-gray-800 flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-emerald-600" />
          Impatto Sostenibile
        </h4>
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h5 className="font-medium text-emerald-800 mb-2">Riduzione CO2</h5>
          <p className="text-sm text-emerald-700">
            {product.sustainability?.carbonReduction}
          </p>
        </div>
        <div>
          <h5 className="font-medium text-gray-800 mb-2">
            Comunità Locali Supportate
          </h5>
          <ul className="space-y-1">
            {product.sustainability?.localCommunities
              .slice(0, 2)
              .map((community, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 flex items-start"
                >
                  <Heart className="w-4 h-4 mr-2 text-red-400 mt-0.5 flex-shrink-0" />
                  {community}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-gray-800 mb-2">
            Progetti di Conservazione
          </h5>
          <ul className="space-y-1">
            {product.sustainability?.conservationProjects
              .slice(0, 2)
              .map((project, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 flex items-start"
                >
                  <Leaf className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                  {project}
                </li>
              ))}
          </ul>
        </div>
      </div>
    ),
    accommodation: (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-gray-800 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
          Alloggi e Servizi
        </h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-medium text-gray-800">
            {product.accommodation?.type}
          </h5>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
              {product.accommodation?.certification}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {product.accommodation?.description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Difficoltà:</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs ${
                product.difficulty === "Facile"
                  ? "bg-green-100 text-green-700"
                  : product.difficulty === "Medio"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.difficulty}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Stagione:</span>
            <span className="ml-2 text-gray-600">{product.season}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Gruppo:</span>
            <span className="ml-2 text-gray-600">{product.groupSize}</span>
          </div>
        </div>
      </div>
    ),
    included: (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-gray-800 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
          Cosa Include/Esclude
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-emerald-700 mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Incluso
            </h5>
            <ul className="space-y-2">
              {product.included?.slice(0, 4).map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 flex items-start"
                >
                  <CheckCircle className="w-4 h-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-red-700 mb-3 flex items-center">
              <XCircle className="w-4 h-4 mr-1" />
              Escluso
            </h5>
            <ul className="space-y-2">
              {product.excluded?.slice(0, 4).map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 flex items-start"
                >
                  <XCircle className="w-4 h-4 mr-2 text-red-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  const containerClasses = `
    font-['Inter'] mb-8 rounded-2xl bg-gradient-to-b from-white to-zinc-50 shadow-lg shadow-gray-100
    ${isHighlighted ? "highlighted-product" : ""}
  `;

  const cardClasses = `
    group relative w-full max-w-4xl mx-auto rounded-2xl shadow-lg shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-300/40 transition-all duration-500 overflow-hidden
    ${isHighlighted ? "product-card" : ""}
  `;

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        {/* Badge highlighted */}
        {isHighlighted}

        {/* Badge existent */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg">
            {product.badge}
          </span>
        </div>

        {/* Image Gallery */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-t-2xl bg-gray-100">
          <IPFSImage
            src={allImages[activeImageIndex] || ""}
            alt={`${product.title} - Image ${activeImageIndex + 1}`}
            className="w-full h-full"
            fallbackSrc="https://via.placeholder.com/800x600/10b981/ffffff?text=Destinazione+Sostenibile"
          />

          {/* Image Navigation */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => handleImageNavigation("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/90 transition-all z-10"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => handleImageNavigation("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/90 transition-all z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Carbon Offset Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-semibold text-emerald-600">
              <Leaf className="w-4 h-4 mr-1" />
              {product.carbonOffset} CO2
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Rating */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="font-semibold">{product.rating}</span>
              <span className="ml-1">({product.reviews})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Quick Info Pills */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4 mr-1" />
              {product.dates}
            </div>
            <div className="flex items-center text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
              <Users className="w-4 h-4 mr-1" />
              {product.groupSize}
            </div>
            <div className="flex items-center text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
              <Thermometer className="w-4 h-4 mr-1" />
              {product.difficulty}
            </div>
          </div>

          {/* Eco Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.ecoFeatures.map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-md hover:bg-emerald-100 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Price & Main CTA */}
          <div className="flex items-center justify-between mb-4">
            <div className="space-x-2">
              <span className="text-2xl md:text-3xl font-bold text-emerald-600">
                {product.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice}
              </span>
            </div>
          </div>

          {/* Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors border-t"
          >
            <Info className="w-4 h-4 mr-2" />
            {isExpanded ? "Nascondi Dettagli" : "Vedi Tutti i Dettagli"}
            <ChevronDown
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              {/* Detailed Description */}
              {product.detailedDescription && (
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {product.detailedDescription}
                  </p>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-1 mb-6 bg-gray-50 p-1 rounded-lg">
                {Object.keys(tabContent).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as keyof typeof tabContent)}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                      activeTab === tab
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                        : "text-white hover:bg-emerald-600 bg-emerald-500"
                    }`}
                  >
                    {tab === "itinerary" && "Itinerario"}
                    {tab === "sustainability" && "Sostenibilità"}
                    {tab === "accommodation" && "Alloggi"}
                    {tab === "included" && "Dettagli"}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                {tabContent[activeTab]}
              </div>

              {/* Local Insights */}
              {product.localInsights && (
                <div className="mt-6 bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-emerald-600" />
                    Consigli Locali
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">
                        Guide Esperte
                      </h5>
                      <ul className="space-y-1">
                        {product.localInsights.guides.map((guide, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            • {guide}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">
                        Consigli Culturali
                      </h5>
                      <ul className="space-y-1">
                        {product.localInsights.culturalTips
                          .slice(0, 2)
                          .map((tip, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              • {tip}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">
                        Consigli Pratici
                      </h5>
                      <ul className="space-y-1">
                        {product.localInsights.practicalAdvice
                          .slice(0, 2)
                          .map((advice, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              • {advice}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary CTA */}
              <div className="mt-6 text-center">
                <button
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  onClick={() => onBuy(product)}
                  disabled={isBuying}
                >
                  {isBuying
                    ? "Elaborazione..."
                    : "Prenota Ora - " + product.price}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Cancellazione gratuita fino a 48h prima della partenza
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
