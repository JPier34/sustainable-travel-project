import React, { useState } from "react";
import type { Product } from "./products";
import { PRODUCTS } from "./products";
import ProductCard from "./ProductCard";
import SuccessModal from "./SuccessModal";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useSendTransaction,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers, formatEther } from "ethers";
import "./App.css";

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
  const { disconnect } = useDisconnect();

  // 2. Stato balance (in ETH)
  const { data: balanceData } = useBalance({
    address: address, // l’indirizzo dell’utente connesso
    chainId: 11155111, // Sepolia chain ID
  });

  // 3. useSendTransaction per inviare ETH
  const { sendTransactionAsync } = useSendTransaction();

  // 4. Stato locale per mostrare alert / messaggi
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Funzione per “buy” un prodotto
  const handleBuy = async (product: Product) => {
    setErrorMessage("");
    if (!isConnected || !address) {
      setErrorMessage("Devi connettere il wallet per procedere.");
      return;
    }

    setIsBuying(true);
    try {
      // 1. calcola value in wei
      const amountWei = ethers.parseEther(product.priceInETH.toString());

      // 2. invia transazione
      const tx = await sendTransactionAsync({
        to: TRAVEL_AGENT_ADDRESS,
        value: amountWei,
      });

      // 3. salva l'hash della transazione
      setTxHash(tx);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || "Transazione fallita");
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        GreenChain Travel Marketplace
      </h1>

      {/* Barra di connessione / logout */}
      <div className="w-full max-w-md flex flex-col items-center mb-8 space-y-4">
        <ConnectButton /> {/* RainbowKit ConnectButton */}
        {isConnected && (
          <button
            onClick={() => disconnect()}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}
        {isConnected && balanceData && (
          <p className="text-gray-700">
            <span className="font-semibold">Il tuo saldo:</span>{" "}
            {parseFloat(formatEther(balanceData.value)).toFixed(4)}{" "}
            {balanceData.symbol}
          </p>
        )}
      </div>

      {/* Messaggi di errore o hash tx */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md max-w-md w-full">
          {errorMessage}
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

      {/* Gallery dei prodotti */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isBuying={isBuying}
            onBuy={handleBuy}
          />
        ))}
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

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} GreenTravel. Tutti i diritti
        riservati.
      </footer>
    </div>
  );
};

export default App;
