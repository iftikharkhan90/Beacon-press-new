import React, { useState, useEffect } from "react";
// import mountainPlaceholder from "../../../../public/mountainPlaceholder.png";
import mountainPlaceholder from "../../assets/images/mountainPlaceholder.png";

import {
  MdOutlineCancelPresentation,
  MdAddCircleOutline,
  MdCloudUpload,
} from "react-icons/md";
import axios from "axios";
import config from "../../common/config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AcademicJournalNav = () => {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdmin");
    if (!token || isAdmin !== "true") {
      navigate("/Admin/login");
    }
  }, [navigate]);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${config.BASE_API_URL}/journals/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJournals(res.data.journal || res.data.data || res.data.journals || []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Journals",
        text:
          error.response?.data?.message || "Token may be missing or invalid.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h2 className="text-3xl text-center md:text-4xl font-bold mb-12 text-slate-800">
            Our Rececent Journals
          </h2>

          {/* Journals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mr-60 ml-60 gap-4 md:gap-6">
            {journals.length > 0 ? (
              journals.map((journal, index) => (
                <div
                  key={journal._id || index}
                  // onClick={() => {localStorage.setItem("journalId", journal._id)
                  //    navigate(`/journals/${journal._id}`)}}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative overflow-hidden h-40 md:h-48">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={
                        journal.image?.trim()
                          ? journal.image.trim()
                          : mountainPlaceholder
                      }
                      alt={journal.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                        {journal.title}
                      </h3>
                       <div> 
                       <button
                        onClick={() => {localStorage.setItem("journalId", journal._id)
                     navigate(`/journals/${journal._id}`)}}
                        className="text-blue-600 hover:text-blue-700 text-sm font-semibold underline cursor-pointer"
                      >
                        View Details
                      </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm line-clamp-3">
                      {journal.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 md:py-16">
                <div className="text-gray-400 text-4xl md:text-6xl mb-4">
                  Book Icon
                </div>
                <p className="text-gray-500 text-lg md:text-xl font-medium">
                  No journals found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicJournalNav;
