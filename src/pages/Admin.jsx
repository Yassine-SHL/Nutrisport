import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import "../styles/loading.css";

const Admin = () => {
  
  return (
    <div>
        <NavbarAdmin/>
        <div className="hero-section">
  
      
        <div className="hero-content">
          <button className="hero-button" onClick={() => window.location.href = "/acceuil"}>
            Voir le site Web→
          </button>
        </div>
    </div>
    </div>
  );
  
};

export default Admin;
