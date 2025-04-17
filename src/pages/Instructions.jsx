import React, { useState, useEffect } from 'react';
import '../styles/Instructions.css';

const InstructionsForm = () => {
  const [instructions, setInstructions] = useState([]);
  const [step, setStep] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchInstructions();
  }, []);

  const fetchInstructions = async () => {
    try {
      const res = await fetch('https://your-backend-url.com/instructions');
      const data = await res.json();
      setInstructions(data);
    } catch (err) {
      console.error('Error fetching instructions:', err);
    }
  };

  const handleAddInstruction = async () => {
    try {
      const res = await fetch('https://your-backend-url.com/instructions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, recipeId }),
      });
      if (res.ok) {
        setStep('');
        setRecipeId('');
        fetchInstructions();
      }
    } catch (err) {
      console.error('Error adding instruction:', err);
    }
  };

  const handleUpdateInstruction = async (id) => {
    try {
      const res = await fetch(`https://your-backend-url.com/instructions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, recipeId }),
      });
      if (res.ok) {
        setStep('');
        setRecipeId('');
        setEditingId(null);
        fetchInstructions();
      }
    } catch (err) {
      console.error('Error updating instruction:', err);
    }
  };

  const handleDeleteInstruction = async (id) => {
    try {
      const res = await fetch(`https://your-backend-url.com/instructions/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchInstructions();
      }
    } catch (err) {
      console.error('Error deleting instruction:', err);
    }
  };

  const handleEdit = (instruction) => {
    setEditingId(instruction.id);
    setStep(instruction.step);
    setRecipeId(instruction.recipeId);
  };

  return (
    <div className="instructions-form-container">
      <h2>Manage Instructions</h2>
      <div className="instruction-form">
        <input
          type="text"
          placeholder="Enter instruction step"
          value={step}
          onChange={(e) => setStep(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter recipe ID"
          value={recipeId}
          onChange={(e) => setRecipeId(e.target.value)}
        />
        {editingId ? (
          <button onClick={() => handleUpdateInstruction(editingId)}>Update</button>
        ) : (
          <button onClick={handleAddInstruction}>Add</button>
        )}
      </div>

      <ul className="instruction-list">
        {instructions.length > 0 ? (
          instructions.map((inst) => (
            <li key={inst.id}>
              <span>{inst.step} (Recipe ID: {inst.recipeId})</span>
              <button onClick={() => handleEdit(inst)}>Edit</button>
              <button onClick={() => handleDeleteInstruction(inst.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No instructions available.</p>
        )}
      </ul>
    </div>
  );
};

export default InstructionsForm;
