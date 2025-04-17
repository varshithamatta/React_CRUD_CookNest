import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Ingredients.css';

const IngredientsForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('https://recipefinderbackend-production-6b07.up.railway.app/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleAddIngredient = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://recipefinderbackend-production-6b07.up.railway.app/ingredients', { name });
      setName('');
      fetchIngredients();
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://recipefinderbackend-production-6b07.up.railway.app/ingredients/${id}`);
      fetchIngredients();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  const handleEdit = (ingredient) => {
    setEditId(ingredient.id);
    setEditName(ingredient.name);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://recipefinderbackend-production-6b07.up.railway.app/ingredients/${id}`, { name: editName });
      setEditId(null);
      fetchIngredients();
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  return (
    <div className="ingredient-form-container">
      <h2>Ingredients</h2>
      <form onSubmit={handleAddIngredient} className="ingredient-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter ingredient name"
          required
        />
        <button type="submit">Add Ingredient</button>
      </form>

      <ul className="ingredient-list">
        {ingredients.length === 0 ? (
          <p>No ingredients available</p>
        ) : (
          ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {editId === ingredient.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(ingredient.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {ingredient.name}
                  <button onClick={() => handleEdit(ingredient)}>Edit</button>
                  <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default IngredientsForm;
