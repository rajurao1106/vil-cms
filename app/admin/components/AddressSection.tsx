"use client";
import React, { useState, useEffect } from "react";

export default function AddressSection() {
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const res = await fetch("http://localhost:1337/api/address");
    const data = await res.json();
    setAddress(data || {});
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await fetch("http://localhost:1337/api/address/save", {
      method: "POST",
      body: fd,
    });
    alert("Address Saved!");
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-8">Addresses & Sister Concerns</h2>
      <form
        onSubmit={handleSave}
        className="bg-white rounded-3xl p-8 shadow space-y-6"
      >
        <textarea
          name="headOffice"
          defaultValue={address.headOffice}
          placeholder="Head Office"
          className="w-full border rounded-3xl p-4 h-28"
        />
        <textarea
          name="cityOffice"
          defaultValue={address.cityOffice}
          placeholder="City Office"
          className="w-full border rounded-3xl p-4 h-28"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-4 rounded-3xl"
        >
          Save Addresses
        </button>
      </form>
    </div>
  );
}
