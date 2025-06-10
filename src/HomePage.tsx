import React, { useState, useEffect } from "react";
import "./HomePage.css";
import logo from "./assets/logo.jpeg";
import rectangle47 from "./assets/rectangle47.svg";
import rectangle45 from "./assets/rectangle45.svg";
import rectangle48 from "./assets/rectangle48.svg";
import rectangle53 from "./assets/rectangle53.svg";
import rectangle52 from "./assets/rectangle52.svg";
import rectangle51 from "./assets/rectangle51.svg";
import rectangle49 from "./assets/rectangle49.svg";

const HomePage: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Orizon. Il Tuo Viaggio.";

  useEffect(() => {
    setDisplayedText("");

    const startDelay = setTimeout(() => {
      typeText(0); // Passa l'indice come parametro
    }, 500);

    return () => clearTimeout(startDelay);
  }, []);

  const typeText = (index: number) => {
    if (index < fullText.length) {
      setDisplayedText(fullText.substring(0, index + 1));

      // Ritardo variabile per effetto più naturale
      const delay =
        fullText[index] === "." ? 300 : fullText[index] === " " ? 50 : 80;

      setTimeout(() => typeText(index + 1), delay); // Passa il prossimo indice
    }
    // Quando finisce, non fa nient'altro - testo pulito senza cursore
  };

  // Dividi il testo per gestire lo styling separatamente
  const getStyledText = () => {
    const text = displayedText;

    // Trova la posizione di "Orizon." e "Il Tuo Viaggio."
    if (text.includes("Il")) {
      const parts = text.split("Il ");
      const firstPart = parts[0]; // "Orizon. "
      const secondPart = parts[1] ? "Il " + parts[1] : ""; // "Il Tuo Viaggio."

      return (
        <>
          <h1 className="homepage-title">{firstPart}</h1>
          {secondPart && (
            <h2 className="homepage-subtitle">
              Il <em>{secondPart.replace("Il ", "").replace("Tuo", "tuo")}</em>
            </h2>
          )}
        </>
      );
    } else {
      // Ancora nella prima parte
      return <h1 className="homepage-title">{text}</h1>;
    }
  };

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
        <div className="homepage-stats">
          <div className="homepage-stat">
            <span className="homepage-stat-number"></span>
            <span className="homepage-stat-label"></span>
          </div>
          <div className="homepage-stat">
            <span className="homepage-stat-number"></span>
            <span className="homepage-stat-label"></span>
          </div>
        </div>
        <div className="homepage-createdby">
          <span className="homepage-createdby-text">Created by</span>
          <span className="homepage-signature-text">J.Pier</span>
        </div>
      </div>

      {/* Contenitore per le immagini di sfondo a destra */}
      <div className="homepage-right-images">
        {/* Reintrodurre il Frame 2608798 con le immagini singole dei rettangoli */}
        <div className="homepage-frame-2608798">
          <img
            src={rectangle47}
            alt="Background image 1"
            className="homepage-rectangle-47"
          />
          <img
            src={rectangle45}
            alt="Background image 2"
            className="homepage-rectangle-45"
          />
          <img
            src={rectangle48}
            alt="Background image 3"
            className="homepage-rectangle-48"
          />
        </div>

        {/* Frame 2608799 (immagini a colonna) */}
        <div className="homepage-frame-2608799">
          <img
            src={rectangle53}
            alt="Background image 4"
            className="homepage-rectangle-53"
          />
          <img
            src={rectangle52}
            alt="Background image 5"
            className="homepage-rectangle-52"
          />
          <img
            src={rectangle51}
            alt="Background image 6"
            className="homepage-rectangle-51"
          />
          <img
            src={rectangle49}
            alt="Background image 7"
            className="homepage-rectangle-49"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
