import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

// Orizon main address  (testnet Sepolia)
const TRAVEL_AGENT_ADDRESS = import.meta.env
  .VITE_TRAVEL_AGENT_ADDRESS as `0x${string}`;
if (!TRAVEL_AGENT_ADDRESS || !ethers.isAddress(TRAVEL_AGENT_ADDRESS)) {
  throw new Error("Indirizzo del destinatario non valido o mancante.");
}

// Orizon address (test) (on Sepolia)

const App: React.FC = () => {
  const navigate = useNavigate();

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

  // “buy” function
  const handleBuy = async (product: Product) => {
    setErrorMessage(null);
    if (!isConnected || !address) {
      setErrorMessage("Devi connettere il wallet per procedere.");
      return;
    }
    try {
      setIsBuying(true);
      // 1. calculate value in wei
      const amountWei = ethers.parseEther(
        product.price.toString().replace(" ETH", "")
      );

      // 2. send transaction
      const tx = await sendTransactionAsync({
        to: TRAVEL_AGENT_ADDRESS,
        value: amountWei,
      });

      // 3. save tx hash
      setTxHash(tx);
      navigate("/app/success", {
        state: {
          txHash: tx,
          boughtProduct: product,
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
      <StickyHeader isConnected={isConnected} setIsConnected={() => {}} />

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
      <SustainabilityPillars />

      {/* App main content */}
      <div className="min-h-screen bg-gray-50 items-center py-14 px-4">
        {/* Page title */}
        <h1 className="text-7xl font-bold text-green-700 mt-8 mb-28 text-left homepage-title">
          Le nostre offerte
        </h1>

        {/* Product list */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isBuying={isBuying}
            onBuy={handleBuy}
          />
        ))}

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
      <Footer />
    </>
  );
};

export default App;
