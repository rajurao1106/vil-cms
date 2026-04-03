"use client";
import React, { useState, useEffect } from "react";

export default function StatsSection() {
  const [stats, setStats] = useState([]);
  const [newStats, setNewStats] = useState([
    { title: "", value: "", unit: "", order: 0 },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await fetch("http://localhost:1337/api/stats");
    const data = await res.json();
    setStats(data);
  };

  const handleSave = async () => {
    await fetch("http://localhost:1337/api/stats/save-all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stats: newStats }),
    });
    alert("Statistics Saved!");
    fetchStats();
  };

  const addStatRow = () => {
    setNewStats([
      ...newStats,
      { title: "", value: "", unit: "", order: newStats.length },
    ]);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Statistics</h2>
      <div className="bg-white rounded-3xl p-8 shadow">
        {newStats.map((stat, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-6">
            <input
              placeholder="Title"
              value={stat.title}
              onChange={(e) => {
                const updated = [...newStats];
                updated[index].title = e.target.value;
                setNewStats(updated);
              }}
              className="border rounded-2xl px-4 py-3"
            />
            <input
              placeholder="Value"
              value={stat.value}
              onChange={(e) => {
                const updated = [...newStats];
                updated[index].value = e.target.value;
                setNewStats(updated);
              }}
              className="border rounded-2xl px-4 py-3"
            />
            <input
              placeholder="Unit"
              value={stat.unit}
              onChange={(e) => {
                const updated = [...newStats];
                updated[index].unit = e.target.value;
                setNewStats(updated);
              }}
              className="border rounded-2xl px-4 py-3"
            />
            <input
              type="number"
              placeholder="Order"
              value={stat.order}
              onChange={(e) => {
                const updated = [...newStats];
                updated[index].order = Number(e.target.value);
                setNewStats(updated);
              }}
              className="border rounded-2xl px-4 py-3"
            />
          </div>
        ))}
        <div className="flex gap-4">
          <button
            onClick={addStatRow}
            className="flex-1 py-4 border rounded-3xl"
          >
            + Add More Stat
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-4 bg-teal-600 text-white rounded-3xl"
          >
            Save All Stats
          </button>
        </div>
      </div>
    </div>
  );
}
