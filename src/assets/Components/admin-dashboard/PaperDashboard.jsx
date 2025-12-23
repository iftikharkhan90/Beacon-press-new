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
  const [assignmentMap, setAssignmentMap] = useState({});

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

        // 2) Load all paper assignments
        const resAssign = await axios.get(
          `${config.BASE_API_URL}/paper-assigns/get`,
          {
            params: { journalId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const assigns = Array.isArray(resAssign.data?.data)
          ? resAssign.data.data
          : [];

        // 3) Build assignment map: manuscriptId -> assigned user
        const assignmentMap = {};
        assigns.forEach((a) => {
          const manuscriptId = a.manuscriptId?._id?.toString();

          // Safely get user object
          let user = null;

          if (a.journalUserId && a.journalUserId.userId) {
            user = a.journalUserId.userId; // nested user exists
          } else if (a.assigneeId) {
            user = a.assigneeId; // fallback if you store assignee differently
          }

          if (manuscriptId && user) {
            assignmentMap[manuscriptId] = {
              _id: user._id,
              fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            };
          }
        });
        setAssignmentMap(assignmentMap);
       
        // 4) Merge assignments into papers
        const mergedPapers = papers.map((p) => ({
          ...p,
          journalUserId: assignmentMap[p._id.toString()] || null,
        }));

        setPaperList(mergedPapers);
      } catch (err) {
        console.error("Failed to load papers or assignments:", err);
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
      const assigned = Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];

      const validUsers = assigned.map((a) => ({
        journalUserId: a._id,
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
    if (editingPaperIndex === null) return;

    const paper = paperList[editingPaperIndex];

    if (!selectedUser) {
      Swal.fire({ icon: "error", title: "Select a user first" });
      return;
    }

    try {
      const payload = {
        manuscriptId: paper._id,
        journalUserId: selectedUser,
        status: "Pending",
        feedBack: "",
      };

      const { data } = await axios.post(
        `${config.BASE_API_URL}/paper-assigns/create`,
        payload
      );

      if (data.success) {
        Swal.fire("Success", "User assigned successfully", "success");

        // Update assignmentMap
        const selected = allUsers.find((u) => u.journalUserId === selectedUser);

        setAssignmentMap((prev) => ({
          ...prev,
          [paper._id]: {
            _id: selectedUser,
            fullName: selected?.fullName || "Assigned",
          },
        }));

        // Update paperList status only
        setPaperList((prev) =>
          prev.map((p, idx) =>
            idx === editingPaperIndex
              ? { ...p, journalUserId: { _id: selectedUser } }
              : p
          )
        );

        // ✅ CLOSE MODAL
        setIsModalOpen(false);
        setEditingPaperIndex(null);
        setSelectedUser("");
      }
    } catch (error) {
      console.error("Error assigning user:", error);
      Swal.fire("Error", "Failed to assign user", "error");
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

              <h1 className="text-2xl font-sans font-bold text-gray-900 mb-1">
                Assign Papers List
              </h1>
              <p className="text-sm font-sans text-gray-600">
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
                    <th className="px-2 font-sans text-sm py-1 border-b">Sr</th>
                    <th className="px-2 font-sans text-sm py-1 border-b">Paper Name</th>
                    <th className="px-2 font-sans text-sm py-1 border-b">Author Name</th>
                    <th className="px-2 font-sans text-sm py-1 border-b">Submission Date</th>
                    <th className="px-2 font-sans text-sm py-1 border-b">Status</th>
                    <th className="px-2 font-sans text-sm py-1 border-b">Assigne</th>
                    <th className="px-2 font-sans text-sm py-1 border-b">Select Assigne</th>
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
                        <td className="px-3 text-sm font-sans py-2 border-b text-gray-700 font-medium">
                          {index + 1}
                        </td>

                        {/* Paper Name */}
                        <td className="px-3 py-2 text-sm font-sans border-b text-gray-800 font-semibold">
                          {paper.manuscriptDetails?.title || "No Title"}
                        </td>

                        {/* Author Names */}
                        <td className="px-3 py-2 text-sm font-sans border-b text-gray-600">
                          {paper.authors?.length > 0
                            ? paper.authors.map((a) => a.fullName).join(", ")
                            : "No Author"}
                        </td>

                        {/* Submission Date */}
                        <td className="px-3 text-sm font-sans py-2 border-b text-gray-500">
                          {paper.createdAt
                            ? new Date(paper.createdAt).toLocaleDateString()
                            : "No Date"}
                        </td>

                        {/* Status  */}
                        <td className="px-3 py-2 border-b">
                          {assignmentMap[paper._id] ? (
                            <span className="inline-block font-sans text-sm px-3 py-1 font-semibold bg-green-100 text-green-700 rounded-full">
                              Assigned
                            </span>
                          ) : (
                            <span className="inline-block px-3 py-1 text-ms font-sans font-semibold bg-red-100 text-red-600 rounded-full">
                              Not Assigned
                            </span>
                          )}
                        </td>

                        {/* Assigned */}
                        <td className="px-3 py-2 font-sans text-sm border-b text-gray-700 font-semibold">
                          {assignmentMap[paper._id]?.fullName || (
                            <span className="text-gray-400 text-sm font-sans">
                              Not Assigned
                            </span>
                          )}
                        </td>

                        {/* Select Assigne */}
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
                        className="px-4 py-6 font-sans text-sm text-center text-gray-500"
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

                <h1 className="text-2xl font-sans font-bold text-gray-900">
                  Assign User
                </h1>
                <p className="text-sm font-sans text-gray-500 mt-1">
                  Select a user to assign this paper
                </p>
              </div>

              {/* Select User Dropdown */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-sans font-semibold text-gray-700 mb-2">
                    Select User
                  </label>

                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full font-sans text-sm  border rounded px-3 py-2"
                  >
                    <option value="">-- Select User --</option>
                    {allUsers.map((user) => (
                      <option
                        key={user.journalUserId}
                        value={user.journalUserId}
                      >
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
                  className="flex-1 py-3 text-sm font-sans font-medium border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveAssign}
                  className="flex-1 py-3 text-sm font-sans font-medium bg-gradient-to-r 
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
