import React, { useState, useEffect } from "react";
import sunshine from "../../images/sunshine.jpg";
import { MdOutlineCancelPresentation, MdAddCircleOutline, MdCloudUpload } from "react-icons/md";
import axios from "axios";
import config from "../../../common/config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [editpopup, seteditpopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [journals, setJournals] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("authToken");
  const isAdmin = localStorage.getItem("isAdmin");

  // If no token OR not admin → redirect
  if (!token || isAdmin !== "true") {
    navigate("/Admin/login");
  }
}, []);

  // 🔹 Fetch all journals (with token)
  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(`${config.BASE_API_URL}/journals/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched journals:", res.data);

      // ✅ Fix here — use "journal" instead of "data"
      setJournals(res.data.journal || []);
    } catch (error) {
      console.error("Error fetching journals:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Journals",
        text: error.response?.data?.message || "Token may be missing or invalid.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // 🔹 Create journal
  const handleSubmit = async () => {
    if (!title || !description || !image) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all fields before submitting",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `${config.BASE_API_URL}/journals/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res.data.message,
        confirmButtonColor: "#2563eb",
      });
      seteditpopup(false);
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      fetchJournals();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.response?.data?.message || "Token may be missing or invalid.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-sm md:text-base text-gray-600">Manage your journals and content</p>
            </div>
            <button
              onClick={() => seteditpopup(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold w-full md:w-auto"
            >
              <MdAddCircleOutline className="text-xl md:text-2xl" />
              <span className="text-sm md:text-base">Add Journal</span>
            </button>
          </div>
        </div>

        {/* Journals Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {journals.length > 0 ? (
            journals.map((journal, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden h-40 md:h-48">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={journal.image?.trim() || sunshine}
                    alt={journal.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {journal.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm line-clamp-3">
                    {journal.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 md:py-16">
              <div className="text-gray-400 text-4xl md:text-6xl mb-4">📚</div>
              <p className="text-gray-500 text-lg md:text-xl font-medium">No journals found</p>
              <p className="text-gray-400 text-xs md:text-sm mt-2 text-center px-4">Click "Add Journal" to create your first entry</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Popup Modal */}
      {editpopup && (
        <div className="bg-black/60 backdrop-blur-sm fixed inset-0 z-50 flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all animate-slideUp max-h-[90vh] overflow-hidden flex flex-col mt-15">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Add New Journal
              </h1>
              <button
                onClick={() => {
                  seteditpopup(false);
                  setImagePreview(null);
                }}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
              >
                <MdOutlineCancelPresentation className="text-2xl md:text-3xl " />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-5 overflow-y-auto">
              {/* Image Upload Section */}
              <div>
                <label className="text-xs md:text-sm font-semibold text-gray-700 mb-2 block">
                  Upload Image
                </label>
                <div className="relative">
                  <input
                    className="hidden"
                    type="file"
                    id="image-upload"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-blue-50"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 md:h-40 object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <MdCloudUpload className="text-4xl md:text-5xl text-gray-400 mb-2" />
                        <p className="text-sm md:text-base text-gray-600 font-medium">Click to upload image</p>
                        <p className="text-gray-400 text-xs mt-1">JPG, JPEG or PNG</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="text-xs md:text-sm font-semibold text-gray-700 mb-2 block">
                  Title
                </label>
                <input
                  className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-800 transition-all duration-200 outline-none"
                  type="text"
                  placeholder="Enter journal title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="text-xs md:text-sm font-semibold text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-gray-800 transition-all duration-200 outline-none resize-none"
                  rows="4"
                  placeholder="Enter journal description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 md:gap-3 p-4 md:p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => {
                  seteditpopup(false);
                  setImagePreview(null);
                }}
                className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 text-sm md:text-base font-semibold hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Save Journal
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;