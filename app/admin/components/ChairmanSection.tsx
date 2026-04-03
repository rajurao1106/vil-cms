"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import styles (still compatible with the new package)
import "react-quill-new/dist/quill.snow.css";

// Use dynamic import to prevent SSR (Server-Side Rendering) 
// and avoid the 'findDOMNode' error during the build phase.
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400">
      Loading Editor...
    </div>
  ),
});

export default function ChairmanSection() {
  const [data, setData] = useState<any>({});
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:1337/api/chairman");
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData(json || {});
      setContent(json?.messageContent || "");
    } catch (error) {
      console.error("Error fetching chairman data:", error);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Use currentTarget to refer to the form
    const fd = new FormData(e.currentTarget);
    fd.append("messageContent", content);

    try {
      const res = await fetch("http://localhost:1337/api/chairman/save", {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        alert("Chairman's Message Saved!");
      } else {
        alert("Error saving message.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold mb-8">Chairman's Message</h2>
      <form
        onSubmit={handleSave}
        className="bg-white rounded-3xl p-8 shadow space-y-6"
      >
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Author Name
          </label>
          <input
            name="authorName"
            defaultValue={data.authorName}
            placeholder="Author Name"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Message Content
          </label>
          {/* Wrapped in a div with min-height to prevent layout shift */}
          <div className="min-h-[350px]">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-72"
            />
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Signature Image
          </label>
          <input
            type="file"
            name="signatureImagePath"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-3xl transition-colors duration-200 shadow-lg shadow-teal-100"
        >
          Save Message
        </button>
      </form>
    </div>
  );
}