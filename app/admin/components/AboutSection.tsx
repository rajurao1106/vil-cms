"use client";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-72 bg-gray-100 animate-pulse rounded-2xl" />,
});

interface AboutData {
  _id?: string;
  tagLine?: string;
  heading?: string;
  content?: string;
  ctaText?: string;
  ctaLink?: string;
  quote?: string;
  sectionImage?: string;
}

const API_URL = "https://vil-cms-dhct.vercel.app/api/about-snippet";

export default function AboutSection() {
  const [data, setData] = useState<AboutData>({});
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const json = await res.data || await res.json();
      // Handle potential nesting (common in CMS responses)
      const attributes = json.data || json;
      
      setData(attributes || {});
      setContent(attributes?.content || "");
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Could not load about section data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Save Data ---
  const handleSave = async () => {
    const payload = {
      ...data,
      content: content,
    };

    try {
      // Note: If your API uses a different endpoint for saving (like /save), 
      // append it to the API_URL here.
      const res = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to save data");
      }

      toast.success("About Snippet Saved Successfully!");
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote"],
      ["clean"],
    ],
  }), []);

  if (loading) return <div className="p-10 text-center font-medium">Loading CMS Data...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">About Snippet</h2>
          <p className="text-gray-500 mt-1">Manage the content of your About Us section</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Tagline</label>
            <input
              type="text"
              placeholder="e.g. Our Story"
              value={data.tagLine || ""}
              onChange={(e) => setData({ ...data, tagLine: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-teal-500 outline-none transition-colors text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Heading *</label>
            <input
              type="text"
              placeholder="Main Section Title"
              value={data.heading || ""}
              onChange={(e) => setData({ ...data, heading: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-teal-500 outline-none transition-colors text-black"
              required
            />
          </div>
        </div>

        <div className="mb-20">
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Main Content</label>
          <div className="h-64">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="h-full text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">CTA Text</label>
            <input
              type="text"
              value={data.ctaText || ""}
              onChange={(e) => setData({ ...data, ctaText: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-teal-500 outline-none text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">CTA Link</label>
            <input
              type="text"
              value={data.ctaLink || ""}
              onChange={(e) => setData({ ...data, ctaLink: e.target.value })}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-teal-500 outline-none text-black"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-10 w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl text-lg font-bold transition-all active:scale-95 shadow-lg"
        >
          Update Section Content
        </button>
      </div>
    </div>
  );
}