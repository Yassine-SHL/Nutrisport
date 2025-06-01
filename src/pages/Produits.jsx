import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card"; 
import "../styles/Produits.css";
import Navbar from '../components/Navbar';

function Products({ addToPanier }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/");
        setProducts(response.data);
        setIsLoading(false);

        const uniqueCategories = [...new Set(response.data.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === parseInt(selectedCategory) : true;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  const categoriesNames=['','Fruits','Légumes','Viandes','Épices'];
  return (
    <div>
      <Navbar />
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Toutes les catégories</option>
          { 
          categories.map((cat, index) => (
            <option key={index} value={cat}>{categoriesNames[cat]}</option>
          ))}
        </select>
      </div>

      <div className="Card-container">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            image={`http://localhost:8000${product.image}` || "/default.jpg"}
            title={product.name}
            description={product.description || "Pas de description"}
            addToPanier={addToPanier}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
