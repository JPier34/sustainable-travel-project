import React, { useState, useEffect } from "react";
import "./HomePage.css";
import logo from "./assets/logo.jpeg";
import { products } from "./products";
import { Heart, Users, Leaf, Camera, Compass } from "lucide-react";

const HomePage: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  // Inserisci i \n dove vuoi andare a capo
  const fullText = "Paga crypto.\nViaggia.\nSalva il mondo.";

  useEffect(() => {
    setDisplayedText("");

    const startDelay = setTimeout(() => {
      typeText(0);
    }, 500);

    return () => clearTimeout(startDelay);
  }, []);

  const typeText = (index: number) => {
    if (index < fullText.length) {
      setDisplayedText(fullText.substring(0, index + 1));

      const delay =
        fullText[index] === "." ? 300 : fullText[index] === " " ? 50 : 80;

      setTimeout(() => typeText(index + 1), delay);
    }
  };

  // Gestione degli a capo con \n
  const getStyledText = () => {
    const text = displayedText.trim();

    // Dividi il testo sulle nuove righe
    const lines = text.split("\n");

    return (
      <>
        {lines[0] && <h1 className="homepage-title">{lines[0]}</h1>}
        {lines[1] && <h2 className="homepage-subtitle">{lines[1]}</h2>}
        {lines[2] && <h2 className="homepage-subtitle">{lines[2]}</h2>}
        {lines[3] && <h2 className="homepage-subtitle">{lines[3]}</h2>}
      </>
    );
  };

  // Dati FITTIZI per le destinazioni e le storie di viaggio
  const travelStories = [
    {
      user: "Sofia",
      action: "ha prenotato Bali",
      time: "2 min fa",
      avatar: "👩🏻",
    },
    {
      user: "Marco",
      action: "ha condiviso Islanda",
      time: "5 min fa",
      avatar: "👨🏽",
    },
    {
      user: "Elena",
      action: "ha salvato Patagonia",
      time: "8 min fa",
      avatar: "👩🏼",
    },
  ];

  const [currentDestination, setCurrentDestination] = useState(0);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % products.length);
      setActiveStory((prev) => (prev + 1) % travelStories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-root">
      {/* Gradiente di sfondo */}
      <div className="homepage-bg-gradient"></div>

      {/* Contenuto principale a sinistra */}
      <div className="homepage-content">
        <div className="homepage-logo-circle">
          <img src={logo} alt="Orizon Logo" className="homepage-logo" />
        </div>
        <div className="homepage-title-section">{getStyledText()}</div>

        <div className="homepage-createdby">
          <span className="homepage-createdby-text">Created by</span>
          <span className="homepage-signature-text ">J.Pier</span>
        </div>
      </div>
      {/* Contenuto a destra */}
      <div className="flex-1 p-8 space-y-6 side-content">
        {/* Live Activity Feed */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Live</span>
          </div>

          <div className="space-y-2">
            {travelStories.map((story, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                  index === activeStory ? "bg-white/20" : "bg-white/5"
                }`}
              >
                <span className="text-lg">{story.avatar}</span>
                <div className="flex-1">
                  <span className="text-white font-medium">{story.user}</span>
                  <span className="text-gray-300 ml-1">{story.action}</span>
                  <div className="text-xs text-gray-400">{story.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Travel Card */}
        <div className="space-y-4">
          {/* Featured Destination Card */}
          <div
            className={`bg-gradient-to-r ${products[currentDestination]?.color} rounded-3xl p-6 shadow-2xl transform transition-all duration-500 hover:scale-105`}
          >
            {/* Destination Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">
                {products[currentDestination]?.emoji}
              </div>

              {/* Floating Heart */}
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all">
                <Heart className="w-5 h-5 text-white" />
              </button>

              {/* Live Travelers Count */}
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                <Users className="w-4 h-4 text-white" />
                <span className="text-white text-sm">
                  {products[currentDestination]?.travelers} viaggiatori
                </span>
              </div>
            </div>

            {/* Destination Info */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {products[currentDestination]?.title}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {products[currentDestination]?.price}
                  </div>
                  <div className="text-white/70 text-sm">≈ €420</div>
                </div>
              </div>

              {/* Sustainability Badge */}
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full w-fit">
                <Leaf className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">
                  {products[currentDestination]?.ecoFeatures}
                </span>
              </div>

              {/* Travel Story */}
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/90 text-sm">
                  💚 {products[currentDestination]?.story}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">
                  Prenota Ora
                </button>
                <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                  <Camera className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                  <Compass className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Destination Indicators */}
          <div className="flex justify-center space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDestination(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentDestination
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
