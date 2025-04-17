import React, { useState, useEffect } from 'react';
import '../styles/SavedRecipes.css'; // Make sure this file exists in the same directory

const SavedRecipesForm = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch('https://your-backend-url.com/savedrecipes');
      const data = await response.json();
      setSavedRecipes(data);
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  const handleAddSavedRecipe = async () => {
    const newSavedRecipe = { recipeId, userId };
    try {
      const response = await fetch('https://your-backend-url.com/savedrecipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSavedRecipe),
      });
      if (response.ok) {
        fetchSavedRecipes(); // Refresh the list
        setRecipeId('');
        setUserId('');
      } else {
        console.error('Error adding saved recipe');
      }
    } catch (error) {
      console.error('Error adding saved recipe:', error);
    }
  };

  const handleUpdateSavedRecipe = async (id) => {
    const updatedSavedRecipe = { recipeId, userId };
    try {
      const response = await fetch(`https://your-backend-url.com/savedrecipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSavedRecipe),
      });
      if (response.ok) {
        fetchSavedRecipes(); // Refresh the list
      } else {
        console.error('Error updating saved recipe');
      }
    } catch (error) {
      console.error('Error updating saved recipe:', error);
    }
  };

  const handleDeleteSavedRecipe = async (id) => {
    try {
      const response = await fetch(`https://your-backend-url.com/savedrecipes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchSavedRecipes(); // Refresh the list
      } else {
        console.error('Error deleting saved recipe');
      }
    } catch (error) {
      console.error('Error deleting saved recipe:', error);
    }
  };

  return (
    <div className="saved-recipe-form-container">
      <h2>Manage Saved Recipes</h2>
      <div className="saved-recipe-form">
        <input
          type="text"
          placeholder="Enter recipe ID"
          value={recipeId}
          onChange={(e) => setRecipeId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleAddSavedRecipe}>Add Saved Recipe</button>
      </div>

      <ul className="saved-recipe-list">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((savedRecipe) => (
            <li key={savedRecipe.id}>
              <input
                type="text"
                value={savedRecipe.recipeId}
                onChange={(e) => setRecipeId(e.target.value)}
              />
              <input
                type="text"
                value={savedRecipe.userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button onClick={() => handleUpdateSavedRecipe(savedRecipe.id)}>Update</button>
              <button onClick={() => handleDeleteSavedRecipe(savedRecipe.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No saved recipes available.</p>
        )}
      </ul>
    </div>
  );
};

export default SavedRecipesForm;
