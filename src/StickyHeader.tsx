import React, { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

export interface StickyHeaderProps {
  isConnected: boolean;
  setIsConnected: () => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isConnected } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 90; // Altezza dell'header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

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
            <div>
              <p className="text-2xl homepage-title">Orizon.</p>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50">
              <ul>
                <li>
                  <a onClick={() => handleNavClick("destinations")}>
                    Destinazioni
                  </a>
                </li>
                <li>
                  <a onClick={() => handleNavClick("mission")}>Mission</a>
                </li>
                <li>
                  <a href="/app/trips">I Miei Viaggi</a>
                </li>
                <li>
                  <a href="/app">Esplora App</a>
                </li>
              </ul>
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
                          <span className="font-['Inter']">Connettiti</span>
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
