import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Categories.css';

const CategoriesForm = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem('token');

  // Redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchCategories();
    }
  }, []);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/categories`,
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Update category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/api/categories/${editCategoryId}`,
        { name: editCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(
        categories.map((category) =>
          category.id === editCategoryId ? response.data : category
        )
      );
      setEditCategoryId(null);
      setEditCategoryName('');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="categories-form">
      <h2>Manage Categories</h2>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          required
        />
        <button type="submit">Add Category</button>
      </form>

      {/* Categories List */}
      <div>
        <h3>Existing Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {editCategoryId === category.id ? (
                <div>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    required
                  />
                  <button onClick={handleUpdateCategory}>Update</button>
                  <button onClick={() => setEditCategoryId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>{category.name}</span>
                  <button
                    onClick={() => {
                      setEditCategoryId(category.id);
                      setEditCategoryName(category.name);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesForm;