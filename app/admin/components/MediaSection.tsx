"use client";
import React, { useState, useEffect } from "react";

export default function MediaSection() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await fetch("http://localhost:1337/api/documents");
    const data = await res.json();
    setMedia(data);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Media Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {media.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl overflow-hidden shadow"
          >
            <img
              src={item.filePath}
              alt=""
              className="w-full h-48 object-cover"
            />
            <div className="p-3 text-xs text-gray-500">{item.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
