"use client";
import React, { useState, useEffect } from "react";

export default function DocumentsSection() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const res = await fetch("http://localhost:1337/api/document");
    const data = await res.json();
    setDocs(data);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Documents</h2>
      <div className="bg-white rounded-3xl p-6 shadow">
        {docs.map((doc) => (
          <div
            key={doc._id}
            className="flex justify-between items-center py-4 border-b last:border-none"
          >
            <div>
              <p className="font-medium">{doc.documentTitle}</p>
              <p className="text-sm text-gray-500">{doc.financialYear}</p>
            </div>
            <a
              href={doc.pdfPath}
              target="_blank"
              className="text-teal-600 hover:underline"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
