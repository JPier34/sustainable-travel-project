import React, { useState, useEffect } from "react";
import { Globe, Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export interface StickyHeaderProps {
  isConnected: boolean;
  setIsConnected: () => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">ORIZON</h1>
                <p className="text-xs text-emerald-600 font-medium">
                  Sustainable Travel
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#destinations"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Destinazioni
              </a>
              <a
                href="#mission"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Mission
              </a>
              <a
                href="#impact"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Impatto
              </a>
              <a
                href="#community"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Community
              </a>
            </nav>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-4">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {!connected ? (
                        <button
                          onClick={openConnectModal}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Wallet className="w-4 h-4" />
                          <span>Connect</span>
                        </button>
                      ) : (
                        <button
                          onClick={openAccountModal}
                          className="px-4 py-2 bg-white border border-emerald-200 text-emerald-600 font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Wallet className="w-4 h-4" />
                          <span>{account.displayName}</span>
                          <span className="text-xs text-gray-400">
                            {account.displayBalance}
                          </span>
                        </button>
                      )}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
