"use client";
import React, { useState, useEffect } from "react";

export default function ProgrammesSection() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    programmeTitle: "",
    reviewDate: "",
    programmeContent: "",
    pdfUrl: "",
  });

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    try {
      const res = await fetch("http://localhost:1337/api/programmes");
      const data = await res.json();
      setProgrammes(Array.isArray(data) ? data : data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1337/api/programmes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Programme added successfully!");
        setFormData({ programmeTitle: "", reviewDate: "", programmeContent: "", pdfUrl: "" });
        fetchProgrammes();
      }
    } catch (err) {
      alert("Error adding programme");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      
      {/* --- ADD PROGRAMME FORM --- */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-indigo-900">New Programme Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 ml-1 text-gray-600">Programme Title</label>
              <input
                name="programmeTitle"
                placeholder="e.g. Annual Review 2026"
                className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.programmeTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 ml-1 text-gray-600">Review Date</label>
              <input
                type="date"
                name="reviewDate"
                className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.reviewDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 ml-1 text-gray-600">PDF Document URL</label>
            <input
              name="pdfUrl"
              placeholder="https://example.com/document.pdf"
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.pdfUrl}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 ml-1 text-gray-600">Programme Content (HTML)</label>
            <textarea
              name="programmeContent"
              placeholder="Describe the programme details here..."
              className="w-full p-3 border rounded-xl h-32 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.programmeContent}
              onChange={handleChange}
            />
          </div>

          <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
            Save Programme
          </button>
        </form>
      </section>

      {/* --- PROGRAMMES LIST --- */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Active Programmes</h2>
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-400">Fetching schedules...</p>
          ) : programmes.length > 0 ? (
            programmes.map((p) => (
              <div key={p._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{p.programmeTitle}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md font-medium">
                      📅 {new Date(p.reviewDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    {p.pdfUrl && (
                      <span className="text-xs text-gray-400">PDF Attached</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                  {p.pdfUrl && (
                    <a 
                      href={p.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                    >
                      View PDF
                    </a>
                  )}
                  <button className="flex-1 md:flex-none bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition">
                    Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed">
              <p className="text-gray-400">No programmes listed yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}