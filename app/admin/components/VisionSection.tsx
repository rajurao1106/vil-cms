import React, { useState, useEffect } from 'react';

const VisionMissionAdmin = () => {
  const [formData, setFormData] = useState({
    sectionTitle: '',
    visionStatement: '',
    missionStatement: '',
    backgroundImage: ''
  });

  const API_URL = 'http://localhost:1337/api/vision-mission';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        // Adjusting based on common API structures (e.g., Strapi often uses data.attributes)
        setFormData(data.attributes || data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Updated successfully!');
      } else {
        throw new Error('Failed to update');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating data');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Edit Vision & Mission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-medium text-gray-700">Section Title</label>
          <input 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.sectionTitle}
            onChange={(e) => setFormData({...formData, sectionTitle: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Vision Statement</label>
          <textarea 
            className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.visionStatement}
            onChange={(e) => setFormData({...formData, visionStatement: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Mission Statement</label>
          <textarea 
            className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.missionStatement}
            onChange={(e) => setFormData({...formData, missionStatement: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Background Image URL</label>
          <input 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.backgroundImage}
            onChange={(e) => setFormData({...formData, backgroundImage: e.target.value})}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default VisionMissionAdmin;