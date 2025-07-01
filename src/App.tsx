import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import type { Product } from "./products";
import { products } from "./products";

import {
  useAccount,
  useBalance,
  useDisconnect,
  useSendTransaction,
} from "wagmi";

import { ethers } from "ethers";

import StickyHeader from "./StickyHeader";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import "./App.css";
import ErrorModal from "./ErrorModal";
import SustainabilityPillars from "./SustainabilityPillars";
import { tripsStorage } from "./utils/tripsStorage";

// Orizon main address  (testnet Sepolia)
const TRAVEL_AGENT_ADDRESS = import.meta.env
  .VITE_TRAVEL_AGENT_ADDRESS as `0x${string}`;
if (!TRAVEL_AGENT_ADDRESS || !ethers.isAddress(TRAVEL_AGENT_ADDRESS)) {
  throw new Error("Indirizzo del destinatario non valido o mancante.");
}

// Orizon address (test) (on Sepolia)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [loadingSteps, setLoadingSteps] = useState({
    pillars: false,
    products: false,
    footer: false,
  });

  useEffect(() => {
    const loadSequence = async () => {
      //  Pillars
      await delay(300);
      setLoadingSteps((prev) => ({ ...prev, pillars: true }));

      // Products
      await delay(500);
      setLoadingSteps((prev) => ({ ...prev, products: true }));

      // Footer
      await delay(300);
      setLoadingSteps((prev) => ({ ...prev, footer: true }));
    };

    loadSequence();
  }, []);

  // Highlighted product when clicked upon
  const [highlightedProductId, setHighlightedProductId] = useState<
    number | null
  >(null);
  const highlightedProductRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products;

  const { address, isConnected } = useAccount();
  useDisconnect();

  // Balance (in ETH)
  useBalance({
    address: address, // user address
    chainId: 11155111, // Sepolia chain ID
  });

  // useSendTransaction used for sending ETH
  const { sendTransactionAsync } = useSendTransaction();

  // alert / messagges
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      setErrorMessage("");
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (txHash) {
      const timer = setTimeout(() => setTxHash(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [txHash]);

  useEffect(() => {
    const state = location.state as {
      highlightProductId?: number;
      scrollToProduct?: boolean;
    };

    if (state?.highlightProductId) {
      setHighlightedProductId(state.highlightProductId);

      if (state.scrollToProduct) {
        const scrollTimer = setTimeout(() => {
          const highlightedElement = document.querySelector(
            ".highlighted-product-container"
          );
          if (highlightedElement) {
            highlightedElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          } else {
            // Fallback
            highlightedProductRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 1000);

        return () => clearTimeout(scrollTimer);
      }

      const highlightTimer = setTimeout(() => {
        setHighlightedProductId(null);
      }, 5000);

      return () => clearTimeout(highlightTimer);
    }
  }, [location.state]);

  useEffect(() => {
    if (slug) {
      const productWithSlug = products.find((p) => p.slug === slug);
      if (productWithSlug) {
        setHighlightedProductId(productWithSlug.id);

        setTimeout(() => {
          highlightedProductRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      }
    }
  }, [slug]);

  // “buy” function
  const handleBuy = async (product: Product) => {
    setErrorMessage(null);
    if (!isConnected || !address) {
      setErrorMessage("Devi connettere il wallet per procedere.");
      return;
    }
    try {
      setIsBuying(true);
      // Calculate value in wei
      const amountWei = ethers.parseEther(
        product.price.toString().replace(" ETH", "")
      );

      // Send transaction
      const tx = await sendTransactionAsync({
        to: TRAVEL_AGENT_ADDRESS,
        value: amountWei,
      });

      const savedTrip = tripsStorage.save({
        destination: product.title,
        date: product.dates, // Esempio: "01.10-14.10" -> usa data di inizio
        participants: 1, // Default, potresti aggiungere un form per questo
        price: product.price.replace(" ETH", ""),
        duration: (product.duration || "7 giorni").toString(),
        transactionHash: tx,
        image: product.image,
        userAddress: address,
        productId: product.id,
      });

      console.log("Viaggio salvato con successo:", savedTrip);

      // Save tx hash
      setTxHash(tx);
      navigate("/app/success", {
        state: {
          txHash: tx,
          boughtProduct: product,
          savedTrip: savedTrip,
        },
      });
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setErrorMessage("Transazione fallita");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <>
      <StickyHeader />

      {/* Error message or hash tx */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md max-w-md w-full">
          <ErrorModal
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        </div>
      )}
      {txHash && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md max-w-md w-full">
          Transazione inviata con hash:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {txHash.slice(0, 6) + "..." + txHash.slice(-4)}
          </a>
        </div>
      )}

      {loadingSteps.pillars && (
        <div className="fade-in">
          <SustainabilityPillars />
        </div>
      )}

      {/* App main content */}
      <div className="min-h-screen bg-gray-50 items-center py-14 px-4">
        {/* Page title */}
        {loadingSteps.products ? (
          <h1 className="text-7xl font-bold text-green-700 mt-8 mb-28 text-left homepage-title fade-in">
            Le nostre offerte
          </h1>
        ) : (
          // Title skeleton
          <div className="animate-pulse mt-8 mb-28">
            <div className="h-20 bg-gray-300 rounded w-1/2"></div>
          </div>
        )}

        {/* Product list */}
        {loadingSteps.products || highlightedProductId ? (
          <div className="products-container">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                ref={
                  product.id === highlightedProductId
                    ? highlightedProductRef
                    : null
                }
                className={`
          ${
            product.id === highlightedProductId
              ? "highlighted-product-container"
              : "staggered-item"
          }
        `}
                style={{
                  animationDelay:
                    product.id === highlightedProductId
                      ? "0ms"
                      : `${index * 200}ms`,
                }}
              >
                <ProductCard
                  product={product}
                  isBuying={isBuying}
                  onBuy={handleBuy}
                  isHighlighted={product.id === highlightedProductId}
                />
              </div>
            ))}
          </div>
        ) : (
          // Skeleton product cards
          <div className="space-y-8">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-6 animate-pulse max-w-4xl mx-auto"
                >
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 'All destinations' button */}
        {/* EVENTUAL NEXT DEVELOPINGS
        <div className="text-center mt-16">
          <button className="font-['Inter'] px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 flex items-center mx-auto">
            Vedi Tutte le Destinazioni
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
        */}
      </div>
      {loadingSteps.footer && (
        <div className="fade-in-delayed">
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
