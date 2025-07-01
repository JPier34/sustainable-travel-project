import React, { useState, useEffect } from "react";

interface IPFSImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const IPFSImage: React.FC<IPFSImageProps> = ({
  src,
  alt,
  className = "",
  fallbackSrc,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Ottimizza URL IPFS con gateway più veloci
  const optimizeIPFSUrl = (ipfsUrl: string): string => {
    if (!ipfsUrl || ipfsUrl.trim() === "") {
      return fallbackSrc || "";
    }

    // Se è già un URL normale, restituiscilo
    if (ipfsUrl.startsWith("http") && !ipfsUrl.includes("ipfs.io")) {
      return ipfsUrl;
    }

    // Estrai l'hash IPFS
    let hash: string = ipfsUrl;
    if (ipfsUrl.includes("/ipfs/")) {
      const parts = ipfsUrl.split("/ipfs/");
      hash = parts[1] || ""; // ← Fallback a stringa vuota
    }

    // Se non c'è hash valido, usa fallback
    if (!hash || hash.trim() === "") {
      return fallbackSrc || "";
    }

    // Gateway IPFS in ordine di velocità
    const gateways = [
      `https://cloudflare-ipfs.com/ipfs/${hash}`,
      `https://gateway.pinata.cloud/ipfs/${hash}`,
      `https://dweb.link/ipfs/${hash}`,
      `https://ipfs.io/ipfs/${hash}`,
    ];

    return gateways[retryCount % gateways.length] || "";
  };

  useEffect(() => {
    if (src && src.trim() !== "") {
      setCurrentSrc(optimizeIPFSUrl(src));
      setIsLoading(true);
      setHasError(false);
    } else if (fallbackSrc) {
      // Se src è vuoto ma abbiamo fallback, usalo direttamente
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    } else {
      // Nessuna immagine disponibile
      setHasError(true);
      setIsLoading(false);
    }
  }, [src, retryCount, fallbackSrc]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    console.log(`IPFS load error for ${currentSrc}, retry ${retryCount + 1}`);

    if (retryCount < 3) {
      // Prova il prossimo gateway
      setRetryCount((prev) => prev + 1);
    } else if (fallbackSrc) {
      // Usa immagine di fallback se disponibile
      setCurrentSrc(fallbackSrc);
      setRetryCount(0);
    } else {
      // Mostra errore
      setHasError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gray-100 opacity-50" />
        </div>
      )}

      {/* Immagine principale */}
      {currentSrc && !hasError && (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full object-cover transition-all duration-700 group-hover:scale-105
            ${isLoading ? "opacity-0" : "opacity-100"}
          `}
          loading="lazy"
          draggable="false"
        />
      )}

      {/* Stato di errore */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center">
          <div className="text-gray-400 text-4xl mb-2">🖼️</div>
          <span className="text-gray-500 text-sm text-center px-4">
            Immagine temporaneamente non disponibile
          </span>
          <button
            onClick={() => {
              setRetryCount(0);
              setHasError(false);
            }}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Riprova
          </button>
        </div>
      )}

      {/* Indicatore di caricamento */}
      {isLoading && !hasError && (
        <div className="absolute bottom-2 right-2">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin opacity-75" />
        </div>
      )}
    </div>
  );
};

export default IPFSImage;
