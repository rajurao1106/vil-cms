"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import api from "@/lib/api"; // Aapka Axios instance
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-50 animate-pulse rounded-2xl" />,
});

const categories = [
  "The Company",
];

interface CompanyData {
  pageTitle?: string;
  subtitle?: string;
  mainContent?: string;
  imageUrl?: string; // Naya field URL ke liye
}

export default function CompanySection() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [data, setData] = useState<CompanyData>({});
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSection();
  }, [selectedCategory]);

  // --- FETCH DATA ---
  const fetchSection = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/company/${selectedCategory}`);
      const json = res.data;
      
      setData(json || {});
      setContent(json?.mainContent || "");
    } catch (error: any) {
      setData({});
      setContent("");
      console.log("Section is empty or new.");
    } finally {
      setLoading(false);
    }
  };

  // --- SAVE DATA ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formElement = e.currentTarget;
    
    // Form se values nikaalna
    const pageTitle = (formElement.elements.namedItem("pageTitle") as HTMLInputElement).value;
    const subtitle = (formElement.elements.namedItem("subtitle") as HTMLInputElement).value;
    const imageUrl = (formElement.elements.namedItem("imageUrl") as HTMLInputElement).value;

    // Payload taiyar karna (Ab simple JSON bhej rahe hain)
    const payload = {
      category: selectedCategory,
      pageTitle: pageTitle || "",
      subtitle: subtitle || "",
      mainContent: content,
      imageUrl: imageUrl || "", // File ki jagah Text URL
    };

    try {
      // Multipart ki zaroorat nahi agar sirf text bhej rahe hain
      await api.post("/company/save", payload);
      toast.success(`${selectedCategory} Saved Successfully!`);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to save data.";
      console.error("Save error details:", err.response?.data);
      toast.error(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Company Sections</h2>
      
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 border border-gray-200 rounded-2xl px-5 py-3 text-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white shadow-sm transition-all"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
             <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Page Title</label>
              <input
                name="pageTitle"
                key={`${selectedCategory}-title`}
                defaultValue={data.pageTitle || ""}
                placeholder="Enter title..."
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                name="subtitle"
                key={`${selectedCategory}-subtitle`}
                defaultValue={data.subtitle || ""}
                placeholder="Enter subtitle..."
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Main Content</label>
              <div className="min-h-[350px] pb-12">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="h-72"
                />
              </div>
            </div>

            {/* --- FILE INPUT REMOVED, TEXT INPUT ADDED --- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Section Image URL</label>
              <input
                name="imageUrl"
                type="text"
                key={`${selectedCategory}-image`}
                defaultValue={data.imageUrl || ""}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
              <p className="mt-1 text-xs text-gray-400 ml-1">Paste the direct link to the image.</p>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className={`w-full py-4 rounded-3xl font-bold text-lg transition-all shadow-lg
                ${isSaving ? 'bg-gray-400' : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-100 active:scale-95'}`}
            >
              {isSaving ? "Saving..." : `Save ${selectedCategory}`}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}