import React, { useState, useEffect } from 'react';
import '../styles/AdminProduits.css';
import NavbarAdmin from '../components/NavbarAdmin';

function AdminArticles() {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    vegetarian: false,
    gluten_free: false,
    image: null,
    product: '',
    active: true,
  });

  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    GetAllProducts();
  }, []);

  const GetAllProducts = async () => {
    const response = await fetch('http://localhost:8000/api/articles/');
    const data = await response.json();
    setArticles(data);
  };

  const UpdateProducts = (e) => {
    const { name, value, type, files, checked } = e.target;
    const val = type === 'file' ? files[0] : type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = formData.id
      ? `http://localhost:8000/api/articles/${formData.id}/update/`
      : 'http://localhost:8000/api/articles/create/';
    const method = formData.id ? 'PUT' : 'POST';

    const bodyData = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) {
        bodyData.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(url, {
        method,
        body: bodyData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Article ${formData.id ? 'modifié' : 'créé'} avec succès : ${data.name}`);
        setFormData({
          id: null,
          name: '',
          description: '',
          price: '',
          calories: '',
          protein: '',
          carbs: '',
          fat: '',
          vegetarian: false,
          gluten_free: false,
          image: null,
          product: '',
          active: true,
        });
        GetAllProducts();
      } else {
        const errorData = await response.json();
        setMessage('❌ Erreur : ' + JSON.stringify(errorData));
      }
    } catch (error) {
      setMessage('❌ Erreur réseau : ' + error.message);
    }
  };

  const handleEdit = (article) => {
    setFormData({ ...article, image: null });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/articles/${id}/delete/`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        setMessage('✅ Article supprimé');
        GetAllProducts();
      } else {
        setMessage('❌ Erreur lors de la suppression');
      }
    } catch (error) {
      setMessage('❌ Erreur réseau : ' + error.message);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="admin-wrapper">
        <h1>📰 Gestion des Articles</h1>
        {message && <div className="status-message">{message}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={UpdateProducts} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={UpdateProducts} />
          <input type="number" name="price" placeholder="Prix (€)" step="0.01" value={formData.price} onChange={UpdateProducts} required />
          <input type="number" name="calories" placeholder="Calories" value={formData.calories} onChange={UpdateProducts} />
          <input type="number" name="protein" placeholder="Protéines (g)" step="0.01" value={formData.protein} onChange={UpdateProducts} />
          <input type="number" name="carbs" placeholder="Glucides (g)" step="0.01" value={formData.carbs} onChange={UpdateProducts} />
          <input type="number" name="fat" placeholder="Lipides (g)" step="0.01" value={formData.fat} onChange={UpdateProducts} />
          <label>
            <input type="checkbox" name="vegetarian" checked={formData.vegetarian} onChange={UpdateProducts} />
            Végétarien
          </label>
          <label>
            <input type="checkbox" name="gluten_free" checked={formData.gluten_free} onChange={UpdateProducts} />
            Sans gluten
          </label>
          <label>
            <input type="checkbox" name="active" checked={formData.active} onChange={UpdateProducts} />
            Actif
          </label>
          <input type="number" name="product" placeholder="ID Produit" value={formData.product} onChange={UpdateProducts} required />
          <input type="file" name="image" accept="image/*" onChange={UpdateProducts} />
          <button type="submit">{formData.id ? '✏️ Modifier' : '➕ Créer'}</button>
        </form>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Calories</th>
              <th>Protéines</th>
              <th>Glucides</th>
              <th>Lipides</th>
              <th>Végé</th>
              <th>Sans Gluten</th>
              <th>Actif</th>
              <th>Produit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>
                  <img
                    src={`http://localhost:8000${article.image}` || "/default.jpg"}
                    alt={article.name}
                    className="product-image"
                  />
                </td>
                <td>{article.name}</td>
                <td>{article.description}</td>
                <td>{article.price}€</td>
                <td>{article.calories}</td>
                <td>{article.protein}</td>
                <td>{article.carbs}</td>
                <td>{article.fat}</td>
                <td>{article.vegetarian ? '✔️' : '❌'}</td>
                <td>{article.gluten_free ? '✔️' : '❌'}</td>
                <td>{article.active ? '✔️' : '❌'}</td>
                <td>{article.product}</td>
                <td>
                  <button onClick={() => handleEdit(article)}>Modifier</button>
                  <button className="delete" onClick={() => handleDelete(article.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminArticles;
