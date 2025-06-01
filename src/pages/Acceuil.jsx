import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/loading.css";

const Acceuil = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let percentage = 0;
    let loadingText = document.getElementById("loading-text");

    let interval = setInterval(() => {
      percentage += 2;
      loadingText.textContent = percentage + "%";

      if (percentage >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          document.getElementById("loading-overlay").style.opacity = "0";
          setTimeout(() => {
            document.getElementById("loading-overlay").style.display = "none";
            setIsLoading(false);
          }, 500);
        }, 500);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <Navbar />
  
      {isLoading && (
        <>
          <div id="loading-overlay">
            <div className="loader">
              <span id="loading-text">0%</span>
            </div>
          </div>
          <div id="disable-overlay"></div>
        </>
      )}
  
      {!isLoading && (
        <div className="hero-content">
          <button className="hero-button" onClick={() => window.location.href = "/produits"}>
            Voir nos produits→
          </button>
        </div>
      )}
    </div>
  );
  
};

export default Acceuil;
