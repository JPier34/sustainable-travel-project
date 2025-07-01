import React, { useState, useEffect } from "react";
import { Wallet, Menu, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

interface StickyHeaderProps {
  customHomeLink?: boolean;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  customHomeLink = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isConnected } = useAccount();
  const location = useLocation();
  const navigate = useNavigate();

  const isInApp = location.pathname.startsWith("/app");

  if (!isInApp) {
    return null;
  }

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

  // Direct navigation to App
  const handleDirectNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Clickable to go back to home */}
            <div
              onClick={() => navigate(customHomeLink ? "/" : "/app")}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <p className="text-2xl homepage-title font-bold text-emerald-600">
                Orizon.
              </p>
            </div>

            {/* Navigation Desktop */}
            <nav className="font-['Inter'] hidden md:flex items-center space-x-8">
              {/* I Miei Viaggi - viewable if already connected */}
              {isConnected && (
                <button
                  onClick={() => handleDirectNavigation("/app/trips")}
                  className={`font-medium transition-colors cursor-pointer ${
                    location.pathname === "/app/trips"
                      ? "text-emerald-600 font-semibold"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  I Miei Viaggi
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-emerald-600 focus:outline-none"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Wallet Connection */}
            <div className="hidden md:flex items-center space-x-4">
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
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                        >
                          <Wallet className="w-4 h-4" />
                          <span className="font-['Inter'] hidden sm:inline">
                            Connettiti
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={openAccountModal}
                          className="px-3 py-2 bg-white border border-emerald-200 text-emerald-600 font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2 hover:border-emerald-300 hover:shadow-md"
                        >
                          <Wallet className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            {account.displayName}
                          </span>
                          {account.displayBalance && (
                            <span className="text-xs text-gray-500 hidden lg:inline">
                              {account.displayBalance}
                            </span>
                          )}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 md:hidden">
            <div className="p-4 space-y-3">
              <button
                onClick={() => handleDirectNavigation("/app")}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/app"
                    ? "bg-emerald-50 text-emerald-600 font-semibold"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                Dashboard
              </button>

              {isConnected && (
                <button
                  onClick={() => handleDirectNavigation("/app/trips")}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    location.pathname === "/app/trips"
                      ? "bg-emerald-50 text-emerald-600 font-semibold"
                      : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
                >
                  I Miei Viaggi
                </button>
              )}

              <button
                onClick={() => handleDirectNavigation("/")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors"
              >
                Torna alla Home
              </button>

              {/* Wallet Connection Mobile */}
              <div className="pt-3 border-t border-gray-200">
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
                      <div className="w-full">
                        {!connected ? (
                          <button
                            onClick={openConnectModal}
                            className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                          >
                            <Wallet className="w-4 h-4" />
                            <span>Connetti Wallet</span>
                          </button>
                        ) : (
                          <button
                            onClick={openAccountModal}
                            className="w-full px-4 py-3 bg-white border border-emerald-200 text-emerald-600 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                          >
                            <Wallet className="w-4 h-4" />
                            <span>{account.displayName}</span>
                          </button>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default StickyHeader;
