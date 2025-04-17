import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard'; // You will create this page later
import Recipes from './pages/Recipes';
import Categories from './pages/Categories';
import Chefs from './pages/Chefs';
import Cuisines from './pages/Cuisines';
import Ingredients from './pages/Ingredients';
import Users from './pages/Users';
import SavedRecipes from './pages/SavedRecipes';
import Instructions from './pages/Instructions';
import Followers from './pages/Followers';
import Likes from './pages/Likes';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard route */}
        <Route path="/admin/recipes" element={<Recipes />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/chefs" element={<Chefs />} />
        <Route path="/admin/cuisines" element={<Cuisines />} />
        <Route path="/admin/ingredients" element={<Ingredients />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/savedrecipes" element={<SavedRecipes />} />
        <Route path="/admin/instructions" element={<Instructions />} />
        <Route path="/admin/followers" element={<Followers />} />
        <Route path="/admin/likes" element={<Likes />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;