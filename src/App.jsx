import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import Acceuil from './pages/Acceuil';
import Produits from './pages/Produits';
import ProduitDetails from './pages/ProduitDetails';
import Panier from './pages/Panier';
import Articles from './pages/Articles';
import Login from './pages/Login';
import Inscription from './pages/Inscription';
import Admin from './pages/Admin';
import AdminProduits from './pages/AdminProduits';
import AdminUsers from './pages/AdminUsers';
import AdminArticles from './pages/AdminArticles';

function App() {
  const [panier, setPanier] = useState([]);
  
  const addToPanier = (produit) => {
    setPanier([...panier, produit]);
  };

  const removeFromPanier = (index) => {
    const updatedPanier = panier.filter((_, i) => i !== index);
    setPanier(updatedPanier);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/produits" element={<AdminProduits />} />
          <Route path="/admin/articles" element={<AdminArticles/>} />
          <Route path="/admin/utilisateurs" element={<AdminUsers/>} />
          <Route path="/acceuil" element={<Acceuil />} />
          <Route path="/produits" element={<Produits addToPanier={addToPanier} />} />
          <Route path="/produits/:id" element={<ProduitDetails />} />
          <Route path="/articles" element={<Articles addToPanier={addToPanier} />} />
          <Route path="/articles/:id" element={<ProduitDetails />} />
          <Route path="/panier" element={<Panier panier={panier} removeFromPanier={removeFromPanier} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
