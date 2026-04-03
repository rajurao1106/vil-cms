"use client";
import React, { useState, useEffect } from "react";

export default function StatsSection() {
  const [stats, setStats] = useState([]);
  const API_URL = "http://localhost:1337/api/stats";

  // 1. READ: Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      // Ensure we have an array; if empty, provide one empty row
      setStats(data.length > 0 ? data : [{ title: "", value: "", unit: "", order: 0 }]);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  // Handle local state changes for inputs
  const handleChange = (index, field, value) => {
    const updatedStats = [...stats];
    updatedStats[index][field] = field === "order" ? Number(value) : value;
    setStats(updatedStats);
  };

  // 2. CREATE (UI): Add a new local row
  const addStatRow = () => {
    setStats([...stats, { title: "", value: "", unit: "", order: stats.length }]);
  };

  // 3. DELETE (UI): Remove a row locally
  const removeStatRow = (index) => {
    const updatedStats = stats.filter((_, i) => i !== index);
    setStats(updatedStats);
  };

  // 4. SAVE (Create/Update/Delete Batch)
  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/save-all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats }),
      });

      if (res.ok) {
        alert("Statistics synchronized successfully!");
        fetchStats();
      } else {
        alert("Failed to save statistics.");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Manage Statistics</h2>
      
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 mb-4 group">
            <div className="grid grid-cols-4 gap-4 flex-grow">
              <input
                placeholder="Title"
                value={stat.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                placeholder="Value"
                value={stat.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
                className="border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                placeholder="Unit"
                value={stat.unit}
                onChange={(e) => handleChange(index, "unit", e.target.value)}
                className="border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="number"
                placeholder="Order"
                value={stat.order}
                onChange={(e) => handleChange(index, "order", e.target.value)}
                className="border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            
            {/* Delete Button */}
            <button
              onClick={() => removeStatRow(index)}
              className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Remove row"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        ))}

        <div className="flex gap-4 mt-8">
          <button
            onClick={addStatRow}
            className="flex-1 py-4 border-2 border-dashed border-gray-200 text-gray-500 hover:border-teal-500 hover:text-teal-600 rounded-3xl transition-all font-medium"
          >
            + Add New Stat
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-3xl shadow-md transition-all font-bold"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}