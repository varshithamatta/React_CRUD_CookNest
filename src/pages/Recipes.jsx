import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Recipes.css';

const API_BASE = 'https://recipefinderbackend-production-6b07.up.railway.app';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    chefId: '',
  });
  const [editId, setEditId] = useState(null);  // For tracking if we are editing a recipe

  // Fetch all recipes
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/recipes`);
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update the recipe if we are editing
        await axios.put(`${API_BASE}/recipes/${editId}`, form);
      } else {
        // Add a new recipe if we are creating
        await axios.post(`${API_BASE}/recipes`, form);
      }
      setForm({ title: '', description: '', chefId: '' });
      setEditId(null);
      fetchRecipes();  // Refresh the recipe list after submitting
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (recipe) => {
    // When Edit is clicked, set form fields to the selected recipe's data
    setForm({
      title: recipe.title,
      description: recipe.description,
      chefId: recipe.chefId,
    });
    setEditId(recipe.id);  // Set editId to the selected recipe's ID
  };

  const handleDelete = async (id) => {
    try {
      // Delete the selected recipe
      await axios.delete(`${API_BASE}/recipes/${id}`);
      fetchRecipes();  // Refresh the recipe list after deleting
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="recipes-container">
      <h2>Manage Recipes</h2>
      
      {/* Recipe form for Add and Update */}
      <form onSubmit={handleSubmit} className="recipe-form">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="chefId"
          placeholder="Chef ID"
          value={form.chefId}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>

      {/* Table displaying all recipes */}
      <table className="recipe-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Chef ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.title}</td>
                <td>{recipe.description}</td>
                <td>{recipe.chefId}</td>
                <td>
                  <button onClick={() => handleEdit(recipe)}>Edit</button>
                  <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No recipes available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recipes;
