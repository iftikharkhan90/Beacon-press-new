import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaperSidebar = () => {
  const navigate = useNavigate();
  const [paperList, setPaperList] = useState([]);

  // Fetch Paper List (GET API)
  // useEffect(() => {
  //   axios
  //     .get("/api/papers") // update your actual API URL
  //     .then((res) => {
  //       setPaperList(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching paper list", err);
  //     });
  // }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
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
                Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Assign Papers</h1>
              <p className="text-sm text-gray-600">Manage and Assign Papers in Journal</p>
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Paper List</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Sr</th>
                  <th className="px-4 py-2 border">Paper Name</th>
                  <th className="px-4 py-2 border">Author Name</th>
                  <th className="px-4 py-2 border">Assign</th>
                </tr>
              </thead>
              <tbody>
                {paperList.length > 0 ? (
                  paperList.map((paper, index) => (
                    <tr key={paper._id} className="text-center">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{paper.paperName}</td>
                      <td className="border px-4 py-2">{paper.authorName}</td>
                      <td className="border px-4 py-2">
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-3 text-center border" colSpan="4">No Papers Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperSidebar;
