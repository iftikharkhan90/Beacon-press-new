import React, { useState, useEffect } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import axios from "axios";
import config from "../../../common/config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import mountainPlaceholder from "../../../../public/mountainPlaceholder.png";

const Editorialboard = () => {
  const navigate = useNavigate();

  /* ------------------- STATE ------------------- */
  const [editpopup, seteditpopup] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [journalsId, setJournalsId] = useState(localStorage.getItem("journalId") || "");
  const cleanJournalId = journalsId.toString().trim();

  useEffect(() => {
    // If you need to fetch or confirm journalsId here:
    const savedId = localStorage.getItem("journalId");
    if (savedId) {
      setJournalsId(savedId);
    } else {
      console.warn("No journalId found in localStorage");
    }
  }, []);

  /* ------------------- BACKGROUND & SCROLL ------------------- */
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    document.body.style.background = `url(${mountainPlaceholder}) no-repeat center/cover fixed`;

    return () => {
      document.body.style.background = "";
    };
  }, []);

  /* ------------------- FETCH USERS & ROLES ------------------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          Swal.fire("Warning", "User not logged in.", "warning");
          return;
        }

        const [userRes, roleRes] = await Promise.all([
          axios.get(`${config.BASE_API_URL}/admin/user/get`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.BASE_API_URL}/role/get`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const users = Array.isArray(userRes.data.data)
          ? userRes.data.data
          : [userRes.data.data];

        const roles = Array.isArray(roleRes.data.role) ? roleRes.data.role : [];

        const merged = users.map((u) => {
          const matchRole = roles.find((r) => r._id === u.role);
          return {
            ...u,
            roleName: matchRole ? matchRole.name : u.role || "No role assigned",
          };
        });

        setUserList(merged);
        setRoleList(roles);
      } catch (err) {
        console.error("Error loading data:", err);
        Swal.fire("Error", "Failed to load user/role data", "error");
      }
    };

    loadData();
  }, []);

  /* ------------------- CHECKBOX ------------------- */
  const handleCheckboxChange = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  /* ------------------- MODAL ------------------- */
  const openEditModal = (user) => {
    setEditingUser(user);
    setUserName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
    setRole(user.role || "");
    seteditpopup(true);
  };

  const closeModal = () => {
    seteditpopup(false);
    setEditingUser(null);
    setUserName("");
    setRole("");
  };

  /* ------------------- SAVE ROLE ------------------- */
  const handleSubmit = async () => {
    if (!role) {
      Swal.fire("Warning", "Please select a role.", "warning");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
       const journalsId = localStorage.getItem("journalId");

    if (!journalsId) {
      Swal.fire("Error", "No journalId found. Please open a journal first.", "error");
      return;
    }
  
    await axios.post(
  `${config.BASE_API_URL}/journalsUserRole/create`,
   {
        roleId: role,                  
        userId: editingUser._id,       
        journalsId,        
        isAssigned: true,              
      },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

      Swal.fire("Success", "Role assigned successfully!", "success");
      closeModal();

      const res = await axios.get(`${config.BASE_API_URL}/admin/user/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const users = Array.isArray(res.data.data)
        ? res.data.data
        : [res.data.data];
      const merged = users.map((u) => {
        const matchRole = roleList.find((r) => r._id === u.role);
        return {
          ...u,
          roleName: matchRole ? matchRole.name : u.role || "No role",
        };
      });

      setUserList(merged);
      setSelectedUsers((prev) =>
        prev.map((u) =>
          u._id === editingUser._id
            ? {
                ...u,
                role,
                roleName: merged.find((m) => m._id === u._id)?.roleName,
              }
            : u
        )
      );
    } catch (err) {
      console.error("Error updating role:", err);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  /* ------------------- RENDER ------------------- */
  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-3 transition-colors"
                  style={{ fontSize: '12px' }}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Editorial Board
                </h1>
                <p className="text-sm text-gray-600">
                  Manage and assign roles to editorial members
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-md">
                <p className="text-sm font-medium opacity-90">Total Users</p>
                <p className="text-3xl font-bold">{userList.length}</p>
              </div>
            </div>
          </div>

          {/* SELECTED USERS */}
          {selectedUsers.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Selected Users
                </h2>
                <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {selectedUsers.length}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {selectedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-indigo-200"
                  >
                    <div className="relative">
                      <img
                        src={user.journalImage || mountainPlaceholder}
                        alt="User"
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => handleCheckboxChange(user)}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded-full shadow-lg transition-colors"
                          style={{ fontSize: '12px' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                        {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unnamed User"}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">{user.email || "N/A"}</span>
                        </p>
                        <p className="text-sm flex items-start gap-2">
                          <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-semibold text-indigo-600">
                            {user.roleName || "No role assigned"}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => openEditModal(user)}
                        className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md"
                        style={{ fontSize: '12px' }}
                      >
                        Assign Role
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ALL USERS */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              All Users
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {userList.length > 0 ? (
                userList.map((user) => (
                  <div
                    key={user._id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={user.journalImage || mountainPlaceholder}
                        alt="User"
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.some((u) => u._id === user._id)}
                          onChange={() => handleCheckboxChange(user)}
                          className="w-5 h-5 accent-indigo-500 cursor-pointer rounded border-2 border-white shadow-lg"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                        {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unnamed User"}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">{user.email || "N/A"}</span>
                        </p>
                        <p className="text-sm flex items-start gap-2">
                          <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-semibold text-indigo-600">
                            {user.roleName || "No role assigned"}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => openEditModal(user)}
                        className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                        style={{ fontSize: '12px' }}
                      >
                        Assign Role
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
                  <p className="text-gray-500 text-lg">Loading users...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ASSIGN ROLE MODAL */}
      {editpopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:rotate-90 transition-all duration-200"
            >
              <MdOutlineCancelPresentation className="text-2xl" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Assign Role
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Update user permissions and access
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  value={userName}
                  readOnly
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
                >
                  <option value="">-- Select Role --</option>
                  {roleList.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={closeModal}
                className="flex-1 py-3 text-sm font-medium border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

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