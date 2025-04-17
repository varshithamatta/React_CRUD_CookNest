import React, { useState, useEffect } from 'react';
import '../styles/Users.css'; // Make sure this file exists in the same directory

const UsersForm = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://your-backend-url.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    const newUser = { name, email };
    try {
      const response = await fetch('https://your-backend-url.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
        setName('');
        setEmail('');
      } else {
        console.error('Error adding user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (id) => {
    const updatedUser = { name, email };
    try {
      const response = await fetch(`https://your-backend-url.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
      } else {
        console.error('Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://your-backend-url.com/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers(); // Refresh the list
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-form-container">
      <h2>Manage Users</h2>
      <div className="user-form">
        <input
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <ul className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={() => handleUpdateUser(user.id)}>Update</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </ul>
    </div>
  );
};

export default UsersForm;
