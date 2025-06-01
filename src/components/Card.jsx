import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

function Card(props) {
  const addToPanier = () => {
    props.addToPanier({
      image: props.image,
      title: props.title,
      description: props.description,
    });
  };

  return (
    <div className="Product-card">
      <Link to={`/produits/${props.id}`}>
        <img src={props.image} alt={props.title} className="Card-image" />
      </Link>
      <h3 className="Card-title">{props.title}</h3>
      <p className="Card-desc">{props.description}</p>
      <button onClick={addToPanier} className="add-to-cart-button">
        Ajouter au panier🧺
      </button>
    </div>
  );
}

export default Card;
