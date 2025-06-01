import React, { useState, useEffect } from 'react';
import '../styles/AdminUsers.css';
import NavbarAdmin from '../components/NavbarAdmin';

function UserList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setMessage('❌ ' + error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
        <NavbarAdmin/>
        <div className="user-list-container">
      <h1 className='user-liste-title'>Liste des utilisateurs</h1>
      {message && <div className="status-message">{message}</div>}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default UserList;
