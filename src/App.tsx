import React, { useState, useEffect } from "react";

import type { Product } from "./products";
import { products } from "./products";

import {
  useAccount,
  useBalance,
  useDisconnect,
  useSendTransaction,
} from "wagmi";

import { ethers } from "ethers";
import { ArrowRight } from "lucide-react";

import StickyHeader from "./StickyHeader";
import HomePage from "./HomePage";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import SuccessModal from "./SuccessModal";

import "./App.css";
import ErrorModal from "./ErrorModal";
import SustainabilityPillars from "./SustainabilityPillars";

// L'indirizzo wallet di Gianni (testnet Sepolia)
const TRAVEL_AGENT_ADDRESS = import.meta.env
  .VITE_TRAVEL_AGENT_ADDRESS as `0x${string}`;
if (!TRAVEL_AGENT_ADDRESS || !ethers.isAddress(TRAVEL_AGENT_ADDRESS)) {
  throw new Error("Indirizzo del destinatario non valido o mancante.");
}

// Indirizzo (test) di Gianni (su Sepolia)

const App: React.FC = () => {
  // 1. Stato account
  const { address, isConnected } = useAccount();
  useDisconnect();

  // 2. Stato balance (in ETH)
  useBalance({
    address: address, // l’indirizzo dell’utente connesso
    chainId: 11155111, // Sepolia chain ID
  });

  // 3. useSendTransaction per inviare ETH
  const { sendTransactionAsync } = useSendTransaction();

  // 4. Stato locale per mostrare alert / messaggi
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

  // Funzione per “buy” un prodotto
  const handleBuy = async (product: Product) => {
    setErrorMessage(null);
    if (!isConnected || !address) {
      setErrorMessage("Devi connettere il wallet per procedere.");
      return;
    }

    try {
      setIsBuying(true);
      // 1. calcola value in wei
      const amountWei = ethers.parseEther(
        product.price.toString().replace(" ETH", "")
      );

      // 2. invia transazione
      const tx = await sendTransactionAsync({
        to: TRAVEL_AGENT_ADDRESS,
        value: amountWei,
      });

      // 3. salva l'hash della transazione
      setTxHash(tx);
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setErrorMessage("Transazione fallita");
    } finally {
      setIsBuying(false);
    }
    setBoughtProduct(product);
    setShowSuccessModal(true);
  };

  // Modal per successful purchase
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [boughtProduct, setBoughtProduct] = useState<Product | null>(null);

  return (
    <>
      <StickyHeader isConnected={isConnected} setIsConnected={() => {}} />

      {/* HomePage contiene il layout e lo sfondo */}
      <HomePage />

      {/* Messaggi di errore o hash tx */}
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
      <SustainabilityPillars />

      {/* Contenuto principale dell'app */}
      <div className="min-h-screen bg-gray-50 items-center py-14 px-4">
        {/* Titolo della pagina */}
        <h1 className="text-7xl font-bold text-green-700 mt-8 mb-28 text-left homepage-title">
          Le nostre offerte
        </h1>

        {/* Lista dei prodotti */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isBuying={isBuying}
            onBuy={handleBuy}
          />
        ))}

        {/* Pulsante per vedere tutte le destinazioni */}
        <div className="text-center mt-16">
          <button className="font-['Inter'] px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 flex items-center mx-auto">
            Vedi Tutte le Destinazioni
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Modal di successo */}
      {showSuccessModal && boughtProduct && txHash && (
        <SuccessModal
          product={boughtProduct}
          txHash={txHash}
          onClose={() => {
            setShowSuccessModal(false);
            setBoughtProduct(null);
            setTxHash(null);
          }}
        />
      )}
      <Footer />
    </>
  );
};

export default App;
