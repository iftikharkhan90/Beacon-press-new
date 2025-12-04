import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../common/config";
import Swal from "sweetalert2";

const Editorialmembers = () => {
  /* ------------------- STATE ------------------- */

  const [userList, setUserList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedLoaded, setSelectedLoaded] = useState(false);

  const [journalId, setjournalId] = useState(
    localStorage.getItem("journalId") || ""
  );

  /* ---------- ROLE FILTERING ---------- */
  const editorInChief = selectedUsers.filter(
    (u) => u.roleName === "Editor in Chief"
  );

  const associateEditors = selectedUsers.filter(
    (u) => u.roleName === "Association Editor"
  );

  const editorialMembers = selectedUsers.filter(
    (u) => u.roleName === "Editorial Board Member"
  );

  /* ------------------- FETCH USERS & ROLES ------------------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        

        const [userRes, roleRes] = await Promise.all([
          axios.get(`${config.BASE_API_URL}/admin/user/get`, {
            headers: { Authorization: `Bearer beaconPressSecretToken` },
          }),
          axios.get(`${config.BASE_API_URL}/role/get`, {
            headers: { Authorization: `Bearer beaconPressSecretToken` },
          }),
        ]);

        const users = Array.isArray(userRes.data.data)
          ? userRes.data.data
          : [userRes.data.data];

        const roles = Array.isArray(roleRes.data.role)
          ? roleRes.data.role
          : [];

        const merged = users.map((u) => {
          const matchRole = roles.find((r) => r._id === u.role);
          return {
            ...u,
            roleName: matchRole ? matchRole.title || matchRole.name : "No role assigned",
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

  /* ------------------- FETCH ASSIGNED USERS ------------------- */
  useEffect(() => {
    const loadSelectedUsers = async () => {
      if (!journalId) return;

      try {
        const res = await axios.get(`${config.BASE_API_URL}/journal-user/get`, {
          params: { journalId },
          headers: { Authorization: `Bearer beaconPressSecretToken` },
        });

        const assigned = Array.isArray(res.data) ? res.data : [res.data];

        const assignedUserIds = assigned.map((a) => a.userId._id);

        const matched = userList
          .filter((u) => assignedUserIds.includes(u._id))
          .map((u) => {
            const roleEntry = assigned.find((a) => a.userId._id === u._id);
            const roleId = roleEntry?.roleId?._id;

            return {
              ...u,
              journalUserId: roleEntry?._id,
              role: roleId,
              roleName:
                roleList.find((r) => r._id === roleId)?.title || "No role",
              passportPhoto: u.profileImage,
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

  /* ------------------- USER CARD COMPONENT ------------------- */
 const UserCard = ({ user }) => (
  <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-indigo-200">
    <div className="p-5 flex items-center gap-5">
      
      <img
        src={
          user.passportPhoto ||
          user.profileImage ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(`${user.firstName} ${user.lastName}`)
        }
        alt="User"
        className="w-20 h-24 object-cover rounded-md border shadow"
      />

      <div>
        {/* ⬅ SHOW TITLE + FULL NAME */}
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          {user.title ? `${user.title} ` : ""}{user.firstName} {user.lastName}
        </h3>

        {/* ⬅ SPECIALIZATION */}
        <p className="text-sm text-gray-700 font-medium">
          {user.specialization}
        </p>

        {/* ⬅ EMAIL */}
        <p className="text-sm text-gray-600">{user.email}</p>

        {/* ⬅ AFFILIATION */}
        <p className="text-sm text-gray-700 font-medium">
          {user.affiliation}
        </p>

      </div>
    </div>
  </div>
);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Editorial Board
                </h1>
                <p className="text-sm text-gray-600">
                  Journal editorial members
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-md">
                <p className="text-sm font-medium opacity-90">Total Members</p>
                <p className="text-3xl text-center font-bold">
                  {selectedUsers.length}
                </p>
              </div>
            </div>
          </div>

          {/* ------- EDITOR-IN-CHIEF ------- */}
          {editorInChief.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 ml-80 mb-4 pb-2">
                Editor-in-Chief
              </h2>

              <div className="grid grid-cols-1 ml-80 mr-60 gap-5">
                {editorInChief.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            </div>
          )}

          {/* ------- ASSOCIATE EDITORS ------- */}
          {associateEditors.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 ml-80 mb-4 pb-2">
                Associate Editors
              </h2>

              <div className="grid grid-cols-1 ml-80 mr-60 gap-5">
                {associateEditors.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            </div>
          )}

          {/* ------- EDITORIAL BOARD MEMBERS ------- */}
          {editorialMembers.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 ml-80 pb-2">
                Editorial Board Members
              </h2>

              <div className="grid grid-cols-1 ml-80 mr-60 gap-5">
                {editorialMembers.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Editorialmembers;
