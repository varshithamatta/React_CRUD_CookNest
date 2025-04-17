import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cuisines.css'; // You can reuse the same CSS from other forms

const apiURL = 'https://recipefinderbackend-production-6b07.up.railway.app/cuisines';

const CuisinesForm = () => {
  const [cuisines, setCuisines] = useState([]);
  const [newCuisine, setNewCuisine] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedCuisine, setEditedCuisine] = useState({ name: '' });

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = async () => {
    try {
      const response = await axios.get(apiURL);
      setCuisines(response.data);
    } catch (error) {
      console.error('Error fetching cuisines:', error);
    }
  };

  const handleAddCuisine = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiURL, newCuisine);
      setNewCuisine({ name: '' });
      fetchCuisines();
    } catch (error) {
      console.error('Error adding cuisine:', error);
    }
  };

  const handleDeleteCuisine = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      fetchCuisines();
    } catch (error) {
      console.error('Error deleting cuisine:', error);
    }
  };

  const handleEditClick = (cuisine) => {
    setEditingId(cuisine.id);
    setEditedCuisine({ name: cuisine.name });
  };

  const handleUpdateCuisine = async (id) => {
    try {
      await axios.put(`${apiURL}/${id}`, editedCuisine);
      setEditingId(null);
      fetchCuisines();
    } catch (error) {
      console.error('Error updating cuisine:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Cuisines</h2>

      <form onSubmit={handleAddCuisine}>
        <input
          type="text"
          placeholder="Cuisine Name"
          value={newCuisine.name}
          onChange={(e) => setNewCuisine({ name: e.target.value })}
          required
        />
        <button type="submit">Add Cuisine</button>
      </form>

      <ul>
        {cuisines.length === 0 ? (
          <p>No cuisines available.</p>
        ) : (
          cuisines.map((cuisine) => (
            <li key={cuisine.id}>
              {editingId === cuisine.id ? (
                <>
                  <input
                    type="text"
                    value={editedCuisine.name}
                    onChange={(e) => setEditedCuisine({ name: e.target.value })}
                  />
                  <button onClick={() => handleUpdateCuisine(cuisine.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>{cuisine.name}</strong>
                  <button onClick={() => handleEditClick(cuisine)}>Edit</button>
                  <button onClick={() => handleDeleteCuisine(cuisine.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CuisinesForm;
