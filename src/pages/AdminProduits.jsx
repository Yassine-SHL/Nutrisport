import React, { useState, useEffect } from 'react';
import '../styles/AdminProduits.css';
import NavbarAdmin from '../components/NavbarAdmin';

function AdminProduits() {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    active: true,
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    vegetarian: false,
    gluten_free: false,
    category: 1,
    price: '', 
    image: null,
  });
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    GetAllProducts();
  }, []);

  const GetAllProducts = async () => {
    const response = await fetch('http://localhost:8000/api/products/');
    const data = await response.json();
    setProducts(data);
  };

  const UpdateProduct = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = formData.id
      ? `http://localhost:8000/api/products/${formData.id}/update/`
      : 'http://localhost:8000/api/products/create/';
    const method = formData.id ? 'PUT' : 'POST';

    const bodyData = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) {
        bodyData.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(url, {
        method: method,
        body: bodyData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Produit ${formData.id ? 'modifié' : 'créé'} avec succès : ${data.name}`);
        setFormData({
          id: null,
          name: '',
          description: '',
          active: true,
          calories: '',
          protein: '',
          carbs: '',
          fat: '',
          vegetarian: false,
          gluten_free: false,
          category: 1,
          price: '', 
          image: null,
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

  const handleEdit = (product) => {
    setFormData({ ...product, image: null });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/delete/`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        setMessage('✅ Produit supprimé');
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
        <NavbarAdmin/>
        <div className="admin-wrapper">
      <h1>🛠️ Gestion des Produits</h1>
      {message && <div className="status-message">{message}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="name" placeholder="Nom du produit" value={formData.name} onChange={UpdateProduct} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={UpdateProduct}></textarea>
        <label><input type="checkbox" name="active" checked={formData.active} onChange={UpdateProduct} /> Produit actif</label>
        <input type="number" name="calories" placeholder="Calories" value={formData.calories} onChange={UpdateProduct} />
        <input type="number" step="0.01" name="protein" placeholder="Protéines" value={formData.protein} onChange={UpdateProduct} />
        <input type="number" step="0.01" name="carbs" placeholder="Glucides" value={formData.carbs} onChange={UpdateProduct} />
        <input type="number" step="0.01" name="fat" placeholder="Lipides" value={formData.fat} onChange={UpdateProduct} />
        <label><input type="checkbox" name="vegetarian" checked={formData.vegetarian} onChange={UpdateProduct} /> Végétarien</label>
        <label><input type="checkbox" name="gluten_free" checked={formData.gluten_free} onChange={UpdateProduct} /> Sans gluten</label>
        <input type="number" name="category" placeholder="ID Catégorie" value={formData.category} onChange={UpdateProduct} />
        <input type="number" step="0.01" name="price" placeholder="Prix" value={formData.price} onChange={UpdateProduct} />
        <input type="file" name="image" accept="image/*" onChange={UpdateProduct} />
        <button type="submit">{formData.id ? '✏️ Modifier' : '➕ Créer'}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Calories</th>
            <th>Protéines</th>
            <th>Glucides</th>
            <th>Lipides</th>
            <th>Prix</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={`http://localhost:8000${product.image}` || "/default.jpg"} alt={product.name} className="product-image" /></td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.calories}</td>
              <td>{product.protein}</td>
              <td>{product.carbs}</td>
              <td>{product.fat}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Modifier</button>
                <button className="delete" onClick={() => handleDelete(product.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default AdminProduits;
