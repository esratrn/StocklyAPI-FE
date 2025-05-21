import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    roleName: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://localhost:7080/api/Users/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <div className="p-8 bg-white shadow rounded-lg w-full max-w-md">
        {!isEditing ? (
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-gray-800">
              {user.name} {user.lastName}
            </h1>
            <p className="text-gray-500 mt-2">{user.email}</p>
            <p className="mt-4 text-sm text-gray-700">
              Role:{" "}
              <span className="bg-rose-600 text-white px-3 py-1 rounded-full">
                {user.roleName}
              </span>
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
              <input
                type="text"
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Role"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
