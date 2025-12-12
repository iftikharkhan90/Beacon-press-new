import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineCancelPresentation } from "react-icons/md"; // <- Import added
import config from "../../../common/config";
import Swal from "sweetalert2";

const PaperDashboard = () => {
  const navigate = useNavigate();
  const [paperList, setPaperList] = useState([]);
  const journalId = localStorage.getItem("journalId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [editingPaperIndex, setEditingPaperIndex] = useState(null);

  // Load Papers
  useEffect(() => {
  const loadData = async () => {
    const token = localStorage.getItem("authToken");
    const journalId = localStorage.getItem("journalId");
    if (!token || !journalId) return;

    try {
      // 1) Load all papers
      const resPapers = await axios.get(
        `${config.BASE_API_URL}/scripts/get?journalId=${journalId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const papers = resPapers.data.manuscript || [];

      // 2) Load paper assignments
      const resAssign = await axios.get(
        `${config.BASE_API_URL}/paper-assigns/get`,
        {
          params: { journalId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const assigns = resAssign.data.data || resAssign.data;

      // 3) Map manuscriptId → assignedUser
      const assignmentMap = {};
      assigns.forEach(a => {
        if (a.isAssigned) {
          assignmentMap[a.manuscriptId] = {
            _id: a.userId?._id,
            fullName: `${a.userId?.firstName || ""} ${a.userId?.lastName || ""}`.trim(),
          };
        }
      });

      // 4) Merge assignment into paper list
      const mergedPapers = papers.map(p => ({
        ...p,
        journalsId: assignmentMap[p._id] || null,
      }));

      // 5) Update table
      setPaperList(mergedPapers);

    } catch (err) {
      console.error("Failed to load combined data:", err);
    }
  };

  loadData();
}, []);


  // Open Modal and Load Users
  const openEditModal = async (index) => {
    setEditingPaperIndex(index);
    setSelectedUser("");

    const token = localStorage.getItem("authToken");
    const journalId = localStorage.getItem("journalId");
    

    try {
      const res = await axios.get(`${config.BASE_API_URL}/journal-user/get`, {
        params: { journalId },
        headers: { Authorization: `Bearer ${token}` },
      });

      // Extract assigned users only
      const assigned = res.data.data || res.data;
      if (assigned.length > 0) {
        localStorage.setItem("journalUserId", assigned[0]._id);
      }
      const validUsers = assigned
        .filter((a) => a.isAssigned === true)
        .map((a) => ({
          _id: a.userId?._id,
          fullName: `${a.userId?.firstName || ""} ${
            a.userId?.lastName || ""
          }`.trim(),
        }));

      setAllUsers(validUsers);
    } catch (error) {
      console.log("Failed to load editorial users:", error);
    }

    setIsModalOpen(true);
  };

  // Save Assigned User (updates UI only — add API call if needed)
  const handleSaveAssign = async () => {
    if (!selectedUser) {
      Swal.fire({
        icon: "warning",
        title: "No User Selected",
        text: "Please select a user to assign.",
      });
      return;
    }

    const selectedUserObj = allUsers.find((u) => u._id === selectedUser);
    if (!selectedUserObj) return;

    // Update UI first
    const updatedPapers = [...paperList];
    updatedPapers[editingPaperIndex] = {
      ...updatedPapers[editingPaperIndex],
      journalsId: {
        fullName: selectedUserObj.fullName,
        _id: selectedUserObj._id,
      },
    };
    setPaperList(updatedPapers);

    // Close modal
    setIsModalOpen(false);
    setSelectedUser("");

    
    const journalUserId = localStorage.getItem("journalUserId") || "";

    if (!journalUserId) {
      Swal.fire({
        icon: "error",
        title: "Missing journalUserId",
        text: "Please make sure journalUserId is stored before assigning.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const manuscriptId = updatedPapers[editingPaperIndex]._id;

      // -----------------------------
      // ⭐ API CALL HERE
      // -----------------------------
      await axios.post(
        `${config.BASE_API_URL}/paper-assigns/create`,
        {
          journalUserId,
          manuscriptId, 
          assigneeId: selectedUserObj._id, 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("User assigned successfully");
    } catch (err) {
      console.error("Failed to assign user:", err.response?.data || err);
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-3 transition-colors cursor-pointer"
                style={{ fontSize: "12px" }}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Journals
              </button>

              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Assign Papers List
              </h1>
              <p className="text-sm text-gray-600">
                Assign Papers Table in Journal
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="overflow-x-auto">
            <div className="rounded-2xl overflow-hidden border shadow">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1 border-b">Sr</th>
                    <th className="px-2 py-1 border-b">Paper Name</th>
                    <th className="px-2 py-1 border-b">Author Name</th>
                    <th className="px-2 py-1 border-b">Submission Date</th>
                    <th className="px-2 py-1 border-b">Status</th>
                    <th className="px-2 py-1 border-b">Assigne</th>
                    <th className="px-2 py-1 border-b">Select Assigne</th>
                  </tr>
                </thead>

                <tbody>
                  {paperList.length > 0 ? (
                    paperList.map((paper, index) => (
                      <tr
                        key={paper._id}
                        className="text-center hover:bg-gray-50 transition"
                      >
                        {/* Sr */}
                        <td className="px-3 py-2 border-b text-gray-700 font-medium">
                          {index + 1}
                        </td>

                        {/* Paper Title */}
                        <td className="px-3 py-2 border-b text-gray-800 font-semibold">
                          {paper.manuscriptDetails?.title || "No Title"}
                        </td>

                        {/* Author Names */}
                        <td className="px-3 py-2 border-b text-gray-600">
                          {paper.authors?.length > 0
                            ? paper.authors.map((a) => a.fullName).join(", ")
                            : "No Author"}
                        </td>

                        {/* Submission Date */}
                        <td className="px-3 py-2 border-b text-gray-500">
                          {paper.createdAt
                            ? new Date(paper.createdAt).toLocaleDateString()
                            : "No Date"}
                        </td>

                        {/* Status Badge */}
                        <td className="px-3 py-2 border-b">
                          {paper.journalsId?.fullName ? (
                            <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                              Assigned
                            </span>
                          ) : (
                            <span className="inline-block px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
                              Not Assigned
                            </span>
                          )}
                        </td>

                        {/* Assigned User */}
                        <td className="px-3 py-2 border-b text-gray-700 font-semibold">
                          {paper.journalsId?.fullName || (
                            <span className="text-gray-400 italic">
                              Not Assigned
                            </span>
                          )}
                        </td>

                        {/* Action Button */}
                        <td className="px-3 py-2 border-b">
                          <button
                            onClick={() => openEditModal(index)}
                            className="p-2 rounded-full hover:bg-blue-50 transition"
                            title="Assign User"
                          >
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a 2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 
                2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-6 text-center text-gray-500 italic"
                      >
                        No Papers Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ---------------- MODAL SECTION (styled like your Assign Role modal) ---------------- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:rotate-90 transition-all duration-200"
              >
                <MdOutlineCancelPresentation className="text-2xl" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
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
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                  Assign User
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Select a user to assign this paper
                </p>
              </div>

              {/* Select User Dropdown */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select User
                  </label>

                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">-- Select User --</option>
                    {Array.from(
                      new Map(allUsers.map((u) => [u._id, u])).values()
                    ).map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-sm font-medium border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveAssign}
                  className="flex-1 py-3 text-sm font-medium bg-gradient-to-r 
                     from-indigo-500 to-purple-600 text-white rounded-xl 
                     hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg"
                >
                  Assign User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- END MODAL ---------------- */}
      </div>
    </div>
  );
};

export default PaperDashboard;
