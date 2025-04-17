import React, { useEffect, useState } from 'react';
import '../styles/Followers.css';

const FollowersForm = () => {
  const [followers, setFollowers] = useState([]);
  const [userId, setUserId] = useState('');
  const [chefId, setChefId] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const res = await fetch('https://your-backend-url.com/followers');
      const data = await res.json();
      setFollowers(data);
    } catch (err) {
      console.error('Error fetching followers:', err);
    }
  };

  const handleAddFollower = async () => {
    try {
      const res = await fetch('https://your-backend-url.com/followers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, chefId }),
      });
      if (res.ok) {
        setUserId('');
        setChefId('');
        fetchFollowers();
      }
    } catch (err) {
      console.error('Error adding follower:', err);
    }
  };

  const handleUpdateFollower = async (id) => {
    try {
      const res = await fetch(`https://your-backend-url.com/followers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, chefId }),
      });
      if (res.ok) {
        setEditingId(null);
        setUserId('');
        setChefId('');
        fetchFollowers();
      }
    } catch (err) {
      console.error('Error updating follower:', err);
    }
  };

  const handleDeleteFollower = async (id) => {
    try {
      const res = await fetch(`https://your-backend-url.com/followers/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchFollowers();
      }
    } catch (err) {
      console.error('Error deleting follower:', err);
    }
  };

  const handleEdit = (follower) => {
    setEditingId(follower.id);
    setUserId(follower.userId);
    setChefId(follower.chefId);
  };

  return (
    <div className="followers-form-container">
      <h2>Manage Followers</h2>
      <div className="follower-form">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Chef ID"
          value={chefId}
          onChange={(e) => setChefId(e.target.value)}
        />
        {editingId ? (
          <button onClick={() => handleUpdateFollower(editingId)}>Update</button>
        ) : (
          <button onClick={handleAddFollower}>Add</button>
        )}
      </div>

      <ul className="follower-list">
        {followers.length > 0 ? (
          followers.map((follower) => (
            <li key={follower.id}>
              <span>User ID: {follower.userId}, Chef ID: {follower.chefId}</span>
              <button onClick={() => handleEdit(follower)}>Edit</button>
              <button onClick={() => handleDeleteFollower(follower.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No followers found.</p>
        )}
      </ul>
    </div>
  );
};

export default FollowersForm;
