import React, { useState, useEffect } from "react";
import "./HomePage.css";
import logo from "./assets/logo.jpeg";
import { products } from "./products";
import { Users, Leaf } from "lucide-react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  //  \n to go to the next line
  const fullText = "Paga in crypto.\nViaggia.\nSalva il mondo.";

  const handleHeroClick = async () => {
    setIsNavigating(true);

    setTimeout(() => {
      navigate("/app");
    }, 500);
  };

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

  // New line handles with \n
  const getStyledText = () => {
    const text = displayedText.trim();

    // Divide text on new lines
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

  // Default data for destinations and travel stories
  const travelStories = [
    {
      user: "Sofia",
      action: "ha prenotato Australia",
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
      action: "ha messo Hawaii nel carrello",
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
      {/* BG gradient */}
      <div className="homepage-bg-gradient"></div>
      {/* Particles Layer */}
      <div className="homepage-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Left principal content */}
      <div
        className={`homepage-content clickable-hero ${
          isNavigating ? "loading" : ""
        }`}
        onClick={handleHeroClick}
        role="button"
        tabIndex={0}
        aria-label="Inizia il tuo viaggio sostenibile"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleHeroClick();
          }
        }}
      >
        <div className="homepage-logo-circle">
          <img src={logo} alt="Orizon Logo" className="homepage-logo" />
          <div className="logo-hover-overlay">
            <ArrowRightIcon className="arrow-icon" />
            <span className="hover-text">Entra nell'App</span>
          </div>
        </div>
        <div className="homepage-title-section homepage-slogan">
          {getStyledText()}
        </div>

        <div className="homepage-createdby">
          <span className="homepage-createdby-text">Created by</span>
          <span className="homepage-signature-text ">J.Pier</span>
        </div>
      </div>
      {/* Right content */}
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

              {/* Floating Heart (for future use)
     
<button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all">
  <Heart className="w-5 h-5 text-white" />
</button>
*/}

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

              <div className="flex justify-around items-center">
                <button
                  className="p-3 bg-sky-200 rounded-xl hover:bg-sky-300 transition-all"
                  onClick={() => navigate("/product")}
                >
                  <span className="text-sky-900">Scopri di più!</span>
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
