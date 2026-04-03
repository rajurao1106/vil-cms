"use client";
import React, { useState, useEffect } from "react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await fetch("http://localhost:1337/api/review");
    const data = await res.json();
    setReviews(data);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Reviews / Testimonials</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-3xl shadow">
            <div className="flex justify-between">
              <p className="font-semibold">{review.name}</p>
              <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
            </div>
            <p className="mt-2">{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
