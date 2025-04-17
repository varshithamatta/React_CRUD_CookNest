import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Chefs.css';

const ChefsForm = () => {
  const [chefs, setChefs] = useState([]);
  const [newChef, setNewChef] = useState({ name: '', email: '', password: '' });
  const [editChefId, setEditChefId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', password: '' });

  const apiURL = 'https://recipefinderbackend-production-6b07.up.railway.app/chefs';

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      const response = await axios.get(apiURL);
      setChefs(response.data);
    } catch (error) {
      console.error('Error fetching chefs:', error);
    }
  };

  const handleChange = (e) => {
    setNewChef({ ...newChef, [e.target.name]: e.target.value });
  };

  const handleAddChef = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiURL, newChef);
      setNewChef({ name: '', email: '', password: '' });
      fetchChefs();
    } catch (error) {
      console.error('Error adding chef:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      fetchChefs();
    } catch (error) {
      console.error('Error deleting chef:', error);
    }
  };

  const handleEditClick = (chef) => {
    setEditChefId(chef.id);
    setEditFormData({ name: chef.name, email: chef.email, password: chef.password });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateChef = async (id) => {
    try {
      await axios.put(`${apiURL}/${id}`, editFormData);
      setEditChefId(null);
      fetchChefs();
    } catch (error) {
      console.error('Error updating chef:', error);
    }
  };

  return (
    <div className="chefs-form">
      <h2>Manage Chefs</h2>

      <form onSubmit={handleAddChef} className="add-form">
        <input type="text" name="name" placeholder="Name" value={newChef.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={newChef.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={newChef.password} onChange={handleChange} required />
        <button type="submit">Add Chef</button>
      </form>

      {chefs.length > 0 ? (
        <ul>
          {chefs.map((chef) => (
            <li key={chef.id}>
              {editChefId === chef.id ? (
                <>
                  <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} />
                  <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} />
                  <input type="password" name="password" value={editFormData.password} onChange={handleEditChange} />
                  <button onClick={() => handleUpdateChef(chef.id)}>Update</button>
                  <button onClick={() => setEditChefId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {chef.name} ({chef.email})
                  <button onClick={() => handleEditClick(chef)}>Edit</button>
                  <button onClick={() => handleDelete(chef.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chefs available.</p>
      )}
    </div>
  );
};

export default ChefsForm;
