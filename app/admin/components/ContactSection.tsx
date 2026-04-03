"use client";
import React, { useState, useEffect } from "react";

export default function ContactSection() {
  const [faqs, setFaqs] = useState([]);
  const [mapSettings, setMapSettings] = useState({});

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    const faqRes = await fetch("http://localhost:1337/api/contact/faqs");
    const faqData = await faqRes.json();
    setFaqs(faqData);

    const mapRes = await fetch(
      "http://localhost:1337/api/contact/map-settings",
    );
    const mapData = await mapRes.json();
    setMapSettings(mapData || {});
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Contact Page & FAQs</h2>
      <div className="bg-white rounded-3xl p-8 shadow">
        <h3 className="font-semibold mb-4">FAQs</h3>
        {faqs.map((faq, i) => (
          <div key={i} className="py-4 border-b last:border-none">
            <p className="font-medium">{faq.question}</p>
            <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
