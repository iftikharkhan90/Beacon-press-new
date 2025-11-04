import React, { useState, useEffect } from "react";
import {
  MdOutlineCancelPresentation,
  MdAddCircleOutline,
  MdCloudUpload,
} from "react-icons/md";
import axios from "axios";
import config from "../../../common/config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Editorialboard = () => {
  const navigate = useNavigate();

  const [editpopup, seteditpopup] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");

  // ✅ Fetch all users from API
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${config.BASE_API_URL}/users/get`, {
        
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Users",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
                >
                  Back
                </button>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
                  Editorial Board
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Manage your Editorial Members
                </p>
              </div>

            
            </div>
          </div>

          {/* User Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {users.length > 0 ? (
              users.map((user, index) => (
                <div
                  key={user._id || index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{user.role}</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No editorial members found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {editpopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {editingUser ? "Edit Member" : "Add New Member"}
              </h1>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
              >
                <MdOutlineCancelPresentation className="text-2xl md:text-3xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
              {/* User Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter user name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-xl px-3 py-2.5 text-gray-800 outline-none"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Select Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-xl px-3 py-2.5 text-gray-800 outline-none"
                >
                  <option value="">-- Select Role --</option>
                  <option value="Editor-in-Chief">Editor-in-Chief</option>
                  <option value="Associate Editor">Associate Editor</option>
                  <option value="Reviewer">Reviewer</option>
                  <option value="Advisory Board">Advisory Board</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={closeModal}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
              >
                {editingUser ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Global: Prevent page scroll */}
      <style jsx global>{`
        html,
        body,
        #root {
          height: 100%;
          overflow: hidden !important;
        }
      `}</style>
    </>
  );
};

export default Editorialboard;
