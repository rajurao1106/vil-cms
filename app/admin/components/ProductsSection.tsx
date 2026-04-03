"use client";
import React, { useState, useEffect } from "react";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    productName: "",
    urlSlug: "",
    category: "",
    status: "Published",
    shortDescription: "",
    specifications: [{ label: "", value: "" }] // Dynamic specs array
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:1337/api/products");
      const data = await res.json();
      const productsArray = Array.isArray(data) ? data : data.data || [];
      setProducts(productsArray);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dynamic Specs Logic
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
  };

  const addSpecField = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { label: "", value: "" }]
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1337/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Product added successfully!");
        setFormData({
          productName: "", urlSlug: "", category: "", status: "Published",
          shortDescription: "", specifications: [{ label: "", value: "" }]
        });
        fetchProducts(); // List refresh karein
      }
    } catch (err) {
      alert("Error adding product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      
      {/* --- ADD PRODUCT FORM --- */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.productName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="urlSlug"
              placeholder="URL Slug (e.g. premium-iron)"
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.urlSlug}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={handleChange}
            />
            <select
              name="status"
              className="p-3 border rounded-xl outline-none"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <textarea
            name="shortDescription"
            placeholder="Short Description"
            className="w-full p-3 border rounded-xl outline-none"
            value={formData.shortDescription}
            onChange={handleChange}
          />

          {/* Dynamic Specifications */}
          <div className="space-y-2">
            <label className="font-semibold block text-gray-700">Specifications:</label>
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex gap-2">
                <input
                  placeholder="Label (e.g. Size)"
                  className="flex-1 p-2 border rounded-lg text-sm"
                  value={spec.label}
                  onChange={(e) => handleSpecChange(index, "label", e.target.value)}
                />
                <input
                  placeholder="Value (e.g. 10x12)"
                  className="flex-1 p-2 border rounded-lg text-sm"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecField}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add another specification
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Save Product
          </button>
        </form>
      </section>

      <hr className="border-gray-100" />

      {/* --- PRODUCTS TABLE --- */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Product Inventory</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="p-10 text-center">Loading...</td></tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{p.productName}</div>
                      <div className="text-xs text-gray-400">{p.urlSlug}</div>
                    </td>
                    <td className="p-4 text-gray-600">{p.category}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        p.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}