"use client";
import React, { useState, useEffect } from "react";

export default function BoardSection() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await fetch("http://localhost:1337/api/board");
    const data = await res.json();
    setMembers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));

    await fetch("http://localhost:1337/api/board/add", {
      method: "POST",
      body: fd,
    });
    setShowForm(false);
    setFormData({});
    fetchMembers();
  };

  const deleteMember = async (id) => {
    if (!confirm("Delete member?")) return;
    await fetch(`http://localhost:1337/api/board/${id}`, { method: "DELETE" });
    fetchMembers();
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl font-bold">Board of Directors</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-teal-600 text-white px-6 py-3 rounded-2xl"
        >
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Designation</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id} className="border-t">
                <td className="py-4 px-6 font-medium">{member.fullName}</td>
                <td className="py-4 px-6">{member.designation}</td>
                <td className="py-4 px-6">
                  <img
                    src={member.profileImageUrl}
                    alt=""
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => deleteMember(member._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal - Simplified (You can expand it) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-6">Add Board Member</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full border rounded-2xl px-4 py-3"
                required
              />
              <input
                type="text"
                placeholder="Designation"
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                className="w-full border rounded-2xl px-4 py-3"
                required
              />
              <input
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profileImageUrl: e.target.files[0],
                  })
                }
                className="w-full border rounded-2xl px-4 py-3"
              />
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-4 border rounded-3xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-teal-600 text-white rounded-3xl"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
