import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../common/config";

const PaperDashboard = () => {
  const navigate = useNavigate();
  const [paperList, setPaperList] = useState([]);
  const journalId = "690d8f4c0de378034e392344";

  useEffect(() => {
    const loadPapers = async () => {
      const token = localStorage.getItem("authToken");
      if (!token || !journalId) return;

      try {
        const url = `${config.BASE_API_URL}/scripts/get?journalId=${journalId}`;
        console.log("Calling API:", url);

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", res.data);
        setPaperList(res.data.manuscript || []);
      } catch (err) {
        console.error("Failed to load Papers:", err.response?.data || err);
      }
    };

    loadPapers();
  }, [journalId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
                {" "}
                Assign Papers Table in Journal
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="overflow-x-auto">
            <div className="rounded-2xl overflow-hidden border shadow">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1 border-b">Sr</th>
                    <th className="px-2 py-1 border-b">Paper Name</th>
                    <th className="px-2 py-1 border-b">Author Name</th>
                    <th className="px-2 py-1 border-b">Assigne</th>
                  </tr>
                </thead>
                <tbody>
                  {paperList.length > 0 ? (
                    paperList.map((paper, index) => (
                      <tr key={paper._id} className="text-center">
                        <td className="px-2 py-1 border-b">{index + 1}</td>

                        {/* Paper Title */}
                        <td className="px-2 py-1 border-b">
                          {paper.manuscriptDetails?.title || "No Title"}
                        </td>

                        {/* Author Name */}
                        <td className="px-2 py-1 border-b">
                          {paper.authors && paper.authors.length > 0
                            ? paper.authors.map((a) => a.fullName).join(", ")
                            : "No Author"}
                        </td>

                        {/* Assignee Name */}
                        <td className="px-2 py-1 border-b">
                          {paper.journalsId?.fullName || "Not Assing Yet"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-3 text-center">
                        No Papers Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDashboard;
