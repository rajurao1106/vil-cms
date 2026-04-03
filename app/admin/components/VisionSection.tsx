"use client";
import React, { useState, useEffect } from "react";

export default function VisionSection() {
  const [data, setData] = useState({
    sectionTitle: "",
    visionStatement: "",
    missionStatement: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // Button state handle karne ke liye

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:1337/api/vision-mission");
      const json = await res.json();
      if (json) setData(json);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true); // Button ko disable karne ke liye

    const fd = new FormData();
    fd.append("sectionTitle", data.sectionTitle);
    fd.append("visionStatement", data.visionStatement);
    fd.append("missionStatement", data.missionStatement);
    
    // Check agar user ne nayi file select ki hai
    const fileInput = e.target.backgroundImage.files[0];
    if (fileInput) {
      fd.append("backgroundImage", fileInput);
    }

    try {
      console.log("Sending data..."); // Debugging line
      const res = await fetch("http://localhost:1337/api/vision-mission/save", {
        method: "POST",
        // NOTE: FormData ke saath 'Content-Type' header MANUALLY MAT LAGANA
        body: fd,
      });

      if (res.ok) {
        alert("Vision & Mission Saved Successfully!");
        fetchData();
      } else {
        const errorData = await res.text();
        console.error("Server Error:", errorData);
        alert("Server returned an error. Check console.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Could not connect to server.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p className="p-8 text-center">Loading Data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8">Vision & Mission Settings</h2>
      <form
        onSubmit={handleSave}
        className="bg-white rounded-3xl p-8 shadow-lg space-y-6"
        key={data._id || "form-key"}
      >
        <div>
          <label className="block text-sm font-semibold mb-2">Section Title</label>
          <input
            name="sectionTitle"
            value={data.sectionTitle || ""}
            onChange={handleChange}
            placeholder="Enter Title"
            className="w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Vision Statement</label>
          <textarea
            name="visionStatement"
            value={data.visionStatement || ""}
            onChange={handleChange}
            placeholder="Enter Vision"
            rows={4}
            className="w-full border rounded-3xl p-4 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Mission Statement</label>
          <textarea
            name="missionStatement"
            value={data.missionStatement || ""}
            onChange={handleChange}
            placeholder="Enter Mission"
            rows={4}
            className="w-full border rounded-3xl p-4 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Background Image</label>
          {data.backgroundImage && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Current Image:</p>
              <img 
                src={data.backgroundImage} 
                alt="Current" 
                className="h-24 w-auto rounded-lg border shadow-sm" 
              />
            </div>
          )}
          <input
            type="file"
            name="backgroundImage"
            className="w-full border border-dashed rounded-2xl px-4 py-3 bg-gray-50"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className={`w-full py-4 rounded-3xl font-bold text-white transition-all ${
            isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 shadow-md"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}