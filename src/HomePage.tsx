import React from "react";
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
  return (
    <div className="homepage-root">
      {/* Gradiente di sfondo */}
      <div className="homepage-bg-gradient"></div>

      {/* Contenuto principale a sinistra */}
      <div className="homepage-content">
        <div className="homepage-logo-circle">
          <img src={logo} alt="Golobe Logo" className="homepage-logo" />
        </div>
        <div className="homepage-title-section">
          <h1 className="homepage-title">Orizon.</h1>
          <h2 className="homepage-subtitle">
            Il <em>tuo</em> viaggio.
          </h2>
        </div>
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

        {/* Frame 2608799 (immagini a colonna) - Questo rimane */}
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
