import React from "react";
import "../styles/Panier.css";
import Navbar from "../components/Navbar";

function Panier({ panier, removeFromPanier }) {
  return (
    <div>
        <Navbar/>
        <div className="panier-container">
            <h2>🧺 Mon Panier</h2>
            {panier.length === 0 ? (
                <p className="panier-empty">Votre panier est vide.</p>
            ) : (
                <ul className="panier-list">
                {panier.map((produit, index) => (
                    <li key={index} className="panier-item">
                    <img src={produit.image} alt={produit.title} />
                    <div className="panier-details">
                        <h3>{produit.title}</h3>
                        <p>{produit.description}</p>
                    </div>
                    <button onClick={() => removeFromPanier(index)}>
                        Supprimer
                    </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
}

export default Panier;
