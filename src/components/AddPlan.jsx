import React, { useState } from 'react';
import { addPlan } from '../services/api';

const AddPlan = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [coverageType, setCoverageType] = useState('');
  const [premium, setPremium] = useState('');
  const [term, setTerm] = useState('');
  const [conditions, setConditions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlan = {
      name,
      type,
      price: Number(price),
      coverageType,
      premium: Number(premium),
      term,
      conditions,
    };
    console.log("Plan to be submitted:", newPlan); 
    const addedPlan = await addPlan(newPlan);
    if (addedPlan) {
      onAdd(addedPlan);
    }
    setName('');
    setType('');
    setPrice('');
    setCoverageType('');
    setPremium('');
    setTerm('');
    setConditions('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Plan</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Plan Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input w-full border rounded-lg p-3 text-gray-700"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input w-full border rounded-lg p-3 text-gray-700"
          required
        >
          <option value="">Select Insurance Type</option>
          <option value="Health">Health</option>
          <option value="Life">Life</option>
          <option value="Auto">Auto</option>
          <option value="Home">Home</option>
          <option value="Travel">Travel</option>
          <option value="Business">Business</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input w-full border rounded-lg p-3 text-gray-700"
          required
        />
        <select
          value={coverageType}
          onChange={(e) => setCoverageType(e.target.value)}
          className="input w-full border rounded-lg p-3 text-gray-700"
          required
        >
          <option value="">Select Coverage Type</option>
          <option value="Individual">Individual</option>
          <option value="Family">Family</option>
        </select>
        <input
          type="number"
          placeholder="Premium"
          value={premium}
          onChange={(e) => setPremium(e.target.value)}
          className="input w-full border rounded-lg p-3 text-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Term (e.g., 1 year)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="input w-full border rounded-lg p-3 text-gray-700"
          required
        />
        <textarea
          placeholder="Conditions"
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          className="input w-full border rounded-lg p-3 text-gray-700"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition"
        >
          Add Plan
        </button>
      </div>
    </form>
  );
};

export default AddPlan;
