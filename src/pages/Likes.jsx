import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Likes.css";

const LikesForm = () => {
  const [likes, setLikes] = useState([]);
  const [newLike, setNewLike] = useState({ recipeId: "", userId: "" });

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    try {
      const response = await axios.get("https://recipefinderbackend-production-6b07.up.railway.app/likes");
      setLikes(response.data);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const handleAddLike = async () => {
    try {
      await axios.post("https://recipefinderbackend-production-6b07.up.railway.app/likes", newLike);
      setNewLike({ recipeId: "", userId: "" });
      fetchLikes();
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleDeleteLike = async (id) => {
    try {
      await axios.delete(`https://recipefinderbackend-production-6b07.up.railway.app/likes/${id}`);
      fetchLikes();
    } catch (error) {
      console.error("Error deleting like:", error);
    }
  };

  return (
    <div className="likes-form-container">
      <h2>Manage Likes</h2>
      <div className="like-form">
        <input
          type="text"
          placeholder="Recipe ID"
          value={newLike.recipeId}
          onChange={(e) => setNewLike({ ...newLike, recipeId: e.target.value })}
        />
        <input
          type="text"
          placeholder="User ID"
          value={newLike.userId}
          onChange={(e) => setNewLike({ ...newLike, userId: e.target.value })}
        />
        <button onClick={handleAddLike}>Add Like</button>
      </div>
      <ul className="like-list">
        {likes.length === 0 ? (
          <p>No likes available.</p>
        ) : (
          likes.map((like) => (
            <li key={like.id}>
              Recipe ID: {like.recipeId} | User ID: {like.userId}
              <button onClick={() => handleDeleteLike(like.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LikesForm;
