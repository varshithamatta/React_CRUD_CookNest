import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/admin/categories">Categories</NavLink></li>
        <li><NavLink to="/admin/recipes">Recipes</NavLink></li>
        <li><NavLink to="/admin/chefs">Chefs</NavLink></li>
        <li><NavLink to="/admin/cuisines">Cuisines</NavLink></li>
        <li><NavLink to="/admin/ingredients">Ingredients</NavLink></li>
        <li><NavLink to="/admin/instructions">Instructions</NavLink></li>
        <li><NavLink to="/admin/users">Users</NavLink></li>
        <li><NavLink to="/admin/followers">Followers</NavLink></li>
        <li><NavLink to="/admin/likes">Likes</NavLink></li>
        <li><NavLink to="/admin/savedrecipes">Saved Recipes</NavLink></li>
        <li><NavLink to="/admin/sequelizemeta">SequelizeMeta</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
