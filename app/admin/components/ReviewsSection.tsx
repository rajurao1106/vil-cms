"use client";
import React, { useState, useEffect } from "react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: "", rating: 5, reviewText: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:1337/api/reviews");
      const data = await res.json();
      // Adjust "data.data" depending on if you are using Strapi v4/v5 or a custom API
      setReviews(Array.isArray(data) ? data : data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:1337/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // If using Strapi, you might need to wrap the body in { data: formData }
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", rating: 5, reviewText: "" }); // Reset form
        fetchReviews(); // Refresh list
      }
    } catch (error) {
      console.error("Error posting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8">Reviews / Testimonials</h2>

      {/* --- POST REVIEW FORM --- */}
      <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 p-6 rounded-3xl border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-xl border"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <select
            className="w-full p-3 rounded-xl border"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
          <textarea
            placeholder="Write your thoughts..."
            className="w-full p-3 rounded-xl border h-32"
            value={formData.reviewText}
            onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Posting..." : "Post Review"}
          </button>
        </div>
      </form>

      {/* --- REVIEWS LIST --- */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id || review.id} className="bg-white p-6 rounded-3xl shadow border">
            <div className="flex justify-between">
              <p className="font-semibold">{review.name || review.attributes?.name}</p>
              <p className="text-yellow-500">
                {"★".repeat(review.rating || review.attributes?.rating)}
              </p>
            </div>
            <p className="mt-2 text-gray-700">
              {review.reviewText || review.attributes?.reviewText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}