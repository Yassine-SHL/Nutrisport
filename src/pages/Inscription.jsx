import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Inscription = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleInscription = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/users/", formData);
      alert("Inscription réussie !");
      // rediriger ou vider les champs
    } catch (error) {
      alert("Erreur lors de l'inscription.");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleInscription}>
        <h2>Inscription</h2>
        <input name="username" type="text" placeholder="Nom d'utilisateur" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="first_name" type="text" placeholder="Prénom" onChange={handleChange} />
        <input name="last_name" type="text" placeholder="Nom" onChange={handleChange} />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Inscription;
