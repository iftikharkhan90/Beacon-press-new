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
  const [journalId, setjournalId] = useState(localStorage.getItem("journalId") || "");
  const cleanJournalId = journalId.toString().trim();
  const roleObj = roleList.find((r) => r._id === role);
  const roleName = roleObj ? roleObj.title || roleObj.name : "No role";
  const [selectedLoaded, setSelectedLoaded] = useState(false);


  useEffect(() => {
    // If you need to fetch or confirm journalId here:
    const savedId = localStorage.getItem("journalId");
    if (savedId) {
      setjournalId(savedId);
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
             roleName: matchRole ? (r.title || r.name) : "No role assigned",
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

 useEffect(() => {
  const loadSelectedUsers = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !journalId) return;

    try {
      const res = await axios.get(`${config.BASE_API_URL}/journalsUserRole/get`, {
        params: { journalId },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Get journalUser", res.data);

      // Always treat response as array
      const assigned = Array.isArray(res.data) ? res.data : [res.data];

      // Extract actual userId._id from nested objects
      const assignedUserIds = assigned.map((a) => a.userId._id);

      const matched = userList
        .filter((u) => assignedUserIds.includes(u._id))
        .map((u) => {
          const roleEntry = assigned.find((a) => a.userId._id === u._id);

          // Extract role _id correctly
          const roleId = roleEntry?.roleId?._id;

          const roleObj = roleList.find((r) => r._id === roleId);

          return {
            ...u,
            role: roleId,
            roleName: roleObj ? (roleObj.title || roleObj.name) : "No role",
          };
        });

      setSelectedUsers(matched);
      setSelectedLoaded(true);

    } catch (err) {
      console.error("Failed to load selected users:", err);
    }
  };

  loadSelectedUsers();
}, [journalId, userList, roleList]);

  /* ------------------- CHECKBOX ------------------- */
 const handleCheckboxChange = (user) => {
  const alreadySelected = selectedUsers.some((u) => u._id === user._id);

  if (alreadySelected) {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== user._id));
  } else {
    openEditModal(user);
  }
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
       const journalId = localStorage.getItem("journalId");

    if (!journalId) {
      Swal.fire("Error", "No journalId found. Please open a journal first.", "error");
      return;
    }
  
    await axios.post(
  `${config.BASE_API_URL}/journalsUserRole/create`,
   {
        roleId: role,                  
        userId: editingUser._id,       
        journalId,        
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

      setUserList((prev) =>
      prev.map((u) =>
        u._id === editingUser._id ? { ...u, role, roleName } : u
      )
    );

    setSelectedUsers((prev) => {
      const isAlready = prev.some((u) => u._id === editingUser._id);
      const updatedUser = { ...editingUser, role, roleName };
      return isAlready
        ? prev.map((u) => (u._id === editingUser._id ? updatedUser : u))
        : [...prev, updatedUser];
    });

    Swal.fire("Success", "Role assigned successfully!", "success");
    closeModal();
  } catch (err) {
    console.error("Error updating role:", err);
    Swal.fire("Error", "Failed to update user role", "error");
  }
};

const handleDelete = async (user) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This will remove this user from the editorial board.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, remove!",
  });

  if (!confirm.isConfirmed) return;

  try {
    const token = localStorage.getItem("authToken");
    const journalId = localStorage.getItem("journalId");

    if (!journalId) {
      Swal.fire("Error", "journalId missing", "error");
      return;
    }

    // ✅ Mark as unassigned
    await axios.post(
      `${config.BASE_API_URL}/journalsUserRole/create`,
      {
        roleId: user.role,   
        userId: user._id,
        journalId,
        isAssigned: false,   
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Remove from selectedUsers in UI
    setSelectedUsers((prev) => prev.filter((u) => u._id !== user._id));

    Swal.fire({
      icon: "success",
      title: "Removed!",
      text: "User removed from editorial board.",
      confirmButtonColor: "#2563eb",
    });
  } catch (error) {
    console.error("Error removing user:", error);
    Swal.fire({
      icon: "error",
      title: "Failed to Remove",
      text: error.response?.data?.message || "Something went wrong.",
      confirmButtonColor: "#2563eb",
    });
  }
};

const updateJournalUserRole = async (journalUserId, payload) => {
  try {
    const response = await axios.put(
      `${config.API_URL}/journaluser/update/${journalUserId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating journal user role:", error);
    throw error.response ? error.response.data : error;
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
                    
                    </div>
           <div className="p-5 md:grid-cols-3">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                        {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unnamed User"}
                      </h3>
                      <div className="space-y-2 mb-4 md:grid-cols-3">
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
                          <button onClick={() => openEditModal(user)} className="text-blue-500 hover:text-blue-600 p-1 transition cursor-pointer" title="Edit User Role">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete(user)} className="text-red-500 hover:text-red-600 p-1 transition cursor-pointer" title="Remove User">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </p>
                        </div>
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
                       <div>
                        <input
                          type="checkbox"
                          checked={selectedUsers.some((u) => u._id === user._id)}
                          onChange={() => handleCheckboxChange(user)}
                          className="w-4 h-4 accent-indigo-500 cursor-pointer rounded border-2 border-white shadow-lg"
                        />
                        <label className="text-sm ml-2">Assign Role</label>
                      </div>
                      </div>
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