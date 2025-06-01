import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card"; 
import "../styles/Produits.css";
import Navbar from '../components/Navbar';

function Articles({ addToPanier }) {
  const [Articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/articles/");
        setArticles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="Card-container">
        {Articles.map((Article) => (
          <Card
            key={Article.id}
            id={Article.id}
            image={`http://localhost:8000${Article.image}` || "/default.jpg"}
            title={Article.name}
            description={Article.description || "Pas de description"}
            addToPanier={addToPanier}
          />
        ))}
      </div>
    </div>
  );
}

export default Articles;
