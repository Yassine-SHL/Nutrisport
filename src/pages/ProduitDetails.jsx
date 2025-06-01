import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetailsCard from '../components/DetailsCard';
import { useParams } from 'react-router-dom';

function ProduitDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du produit', error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <DetailsCard product={product} />
    </div>
  );
}

export default ProduitDetails;
