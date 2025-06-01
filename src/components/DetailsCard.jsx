import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetailsCard.css';

function ProduitDetails() {
  const { id } = useParams();  // Récupération de l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du produit:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Affichage pendant le chargement
  }

  const imageUrl = `http://localhost:8000${product.image}`;
  const categoriesNames=['','Fruits','Légumes','Viandes','Épices'];
  return (
    <div className="details-card">
      <div className="details-card-header">
        <h2 className="details-card-title">{product.name}</h2>
        <img className="details-card-image" src={imageUrl} alt={product.name} />
      </div>
      <div className="details-card-info">
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Category:</strong> {categoriesNames[product.category]}</p>
        <p><strong>Calories:</strong> {product.calories}</p>
        <p><strong>Protein:</strong> {product.protein}g</p>
        <p><strong>Carbs:</strong> {product.carbs}g</p>
        <p><strong>Fat:</strong> {product.fat}g</p>
        <p><strong>Vegetarian:</strong> {product.vegetarian ? 'Yes' : 'No'}</p>
        <p><strong>Gluten-Free:</strong> {product.gluten_free ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

export default ProduitDetails;
