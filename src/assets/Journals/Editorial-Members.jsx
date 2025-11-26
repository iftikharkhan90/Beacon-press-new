import React, { useState, useEffect, useParams } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import config from "../../common/config";

const Editorialmembers = () => {

     /* ------------------- STATE ------------------- */
  const [editpopup, seteditpopup] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [journalId, setjournalId] = useState(
    localStorage.getItem("journalId") || ""
  );
  const cleanJournalId = journalId.toString().trim();
  const roleObj = roleList.find((r) => r._id === role);
  const roleName = roleObj ? roleObj.title || roleObj.name : "No role";
  const [selectedLoaded, setSelectedLoaded] = useState(false);
  const isAlreadyAssigned = editingUser?.isAssigned;
  const updatedUser = { ...editingUser, role, roleName };
 

  

  
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
        console.log("roles:::", roles);

        const merged = users.map((u) => {
          const matchRole = roles.find((r) => r._id === u.role);
          return {
            ...u,
            roleName: matchRole ? r.title || r.name : "No role assigned",
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
        const res = await axios.get(`${config.BASE_API_URL}/journal-user/get`, {
          params: { journalId },
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Get journalUser", res.data);

        const assigned = Array.isArray(res.data) ? res.data : [res.data];

        const assignedUserIds = assigned.map((a) => a.userId._id);
////////////////////////////////////////////
const matched = userList
  .filter((u) => assignedUserIds.includes(u._id))
  .map((u) => {
    const roleEntry = assigned.find((a) => a.userId._id === u._id);

    const roleId = roleEntry?.roleId?._id;

    return {
      ...u,
      journalUserId: roleEntry?._id, // store journal-user _id
      role: roleId,
      roleName: roleList.find((r) => r._id === roleId)?.title || "No role",
    };
  });
////////////////////////////
        setSelectedUsers(matched);
        setSelectedLoaded(true);
      } catch (err) {
        console.error("Failed to load selected users:", err);
      }
    };

    loadSelectedUsers();
  }, [journalId, userList, roleList]);
 

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
                   <p className="text-3xl text-center font-bold">{userList.length}</p>
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
                       
                       <div className="p-5 md:grid-cols-3">
                         <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                           {`${user.firstName || ""} ${
                             user.lastName || ""
                           }`.trim() || "Unnamed User"}
                         </h3>
                         <div className="space-y-2 mb-4 md:grid-cols-3">
                           <p className="text-sm text-gray-600 flex items-center gap-2">
                             <svg
                               className="w-4 h-4 text-gray-400"
                               fill="none"
                               stroke="currentColor"
                               viewBox="0 0 24 24"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                               />
                             </svg>
                             <span className="truncate">
                               {user.email || "N/A"}
                             </span>
                           </p>
                           <p className="text-sm flex items-start gap-2">
                             <svg
                               className="w-4 h-4 text-gray-400 mt-0.5"
                               fill="none"
                               stroke="currentColor"
                               viewBox="0 0 24 24"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                               />
                             </svg>
                             <span className="font-semibold text-indigo-600">
                               {user.roleName || "No role assigned"}
                             </span>
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
            
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                 {userList.length > 0 ? (
                   userList.map((user) => (
                     <div
                       key={user._id}
                       className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                     >
                       
                       <div className="p-5">
                         <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                           {`${user.firstName || ""} ${
                             user.lastName || ""
                           }`.trim() || "Unnamed User"}
                         </h3>
                         <div className="space-y-2 mb-4">
                           <p className="text-sm text-gray-600 flex items-center gap-2">
                             <svg
                               className="w-4 h-4 text-gray-400"
                               fill="none"
                               stroke="currentColor"
                               viewBox="0 0 24 24"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                               />
                             </svg>
                             <span className="truncate">
                               {user.email || "N/A"}
                             </span>
                           </p>
                          
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
                </>
     );
   };
   

export default Editorialmembers
