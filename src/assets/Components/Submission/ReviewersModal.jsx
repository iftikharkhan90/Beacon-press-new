import React, { useEffect, useState } from "react";
import { COUNTRIES } from "./utils";

function ReviewersModal({
  setIsModalDataComplete,
  modalReviewers = [],
  setModalReviewers,
}) {
  const [reviewers, setReviewers] = useState(modalReviewers);
  console.log("set",setModalReviewers)
  console.log("modal",modalReviewers)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    affiliation: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setReviewers(modalReviewers);
  }, [modalReviewers]);

  // Validation helpers
  const hasContent = (v) => v && v.trim() !== "";
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!hasContent(formData.fullName))
      newErrors.fullName = "Full name is required";
    if (!hasContent(formData.email)) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!hasContent(formData.country))
      newErrors.country = "Country is required";
    if (!hasContent(formData.affiliation))
      newErrors.affiliation = "Affiliation is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddReviewer = () => {
    if (!validateForm()) return;
    const updated = [...reviewers, formData];
    setReviewers(updated);
    if (typeof setModalReviewers === "function") {
      setModalReviewers(updated);
    }
    resetForm();
  };

  const handleUpdateReviewer = () => {
    if (!validateForm()) return;
    const updated = reviewers.map((rev, i) =>
      i === editingIndex ? formData : rev
    );
    setReviewers(updated);
    if (typeof setModalReviewers === "function") {
      setModalReviewers(updated);
    }
    setEditingIndex(-1);
    resetForm();
  };

  const handleRemoveReviewer = (index) => {
    const updated = reviewers.filter((_, i) => i !== index);
    setReviewers(updated);
    if (typeof setModalReviewers === "function") {
      setModalReviewers(updated);
    }
    if (editingIndex === index) {
      setEditingIndex(-1);
      resetForm();
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const startEditing = (index) => {
    setFormData(reviewers[index]);
    setEditingIndex(index);
    setErrors({});
  };

  const resetForm = () => {
    setFormData({ fullName: "", email: "", country: "", affiliation: "" });
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingIndex(-1);
    resetForm();
  };

  const saveChanges = () => {
    if (typeof setModalReviewers === "function") {
      setModalReviewers(reviewers);
    }
    closeModal();
  };

  // Reviewer requirement message
  const getReviewerRequirementMessage = () => {
    if (reviewers.length === 0) return "At least three reviewers are required.";
    if (reviewers.length === 1) return "Two more reviewers are required.";
    if (reviewers.length === 2) return "One more reviewer is required.";
    return "";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Reviewers</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex cursor-pointer items-center transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Manage Reviewers
        </button>
      </div>

      {/* Card view of reviewers */}
      {reviewers.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p className="mt-4 text-gray-600">
            No reviewers added yet. Click the button above to add reviewers.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviewers.map((rev, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg text-gray-800">
                  {rev.fullName}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Reviewer {index + 1}
                </span>
              </div>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {rev.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Affiliation:</span>{" "}
                {rev.affiliation}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Country:</span> {rev.country}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingIndex >= 0 ? "Edit Reviewer" : "Add New Reviewer"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Reviewer requirement message at top */}
            {getReviewerRequirementMessage() && (
              <p className="text-red-600 text-sm px-6 pt-4">
                {getReviewerRequirementMessage()}
              </p>
            )}

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 flex-grow">
              {/* Full Name */}
              <div>
                <label className="block font-medium text-gray-700">
                  Full Name{" "}
                  <span
                    className={
                      hasContent(formData.fullName)
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-gray-700">
                  Email{" "}
                  <span
                    className={
                      hasContent(formData.email)
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    *
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block font-medium text-gray-700">
                  Country{" "}
                  <span
                    className={
                      hasContent(formData.country)
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    *
                  </span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a country</option>
                  {COUNTRIES.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>

              {/* Affiliation */}
              <div>
                <label className="block font-medium text-gray-700">
                  Affiliation{" "}
                  <span
                    className={
                      hasContent(formData.affiliation)
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                  className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.affiliation ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter affiliation"
                />
                {errors.affiliation && (
                  <p className="text-red-500 text-sm">{errors.affiliation}</p>
                )}
              </div>
            </div>

            {/* Add/Update Buttons */}
            <div className="flex justify-between mb-6 px-6">
              <div>
                {editingIndex >= 0 ? (
                  <button
                    onClick={handleUpdateReviewer}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center transition cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Update Reviewer
                  </button>
                ) : (
                  <button
                    onClick={handleAddReviewer}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center transition"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Reviewer
                  </button>
                )}
              </div>
              {editingIndex >= 0 && (
                <button
                  onClick={() => {
                    setEditingIndex(-1);
                    resetForm();
                  }}
                  className="text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg border border-gray-300 transition cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* Reviewer list inside modal */}
            <div className="px-6 pb-6 border-t border-gray-300 mt-4">
              <h4 className="font-medium text-gray-800 mt-2">Reviewer List</h4>
              {reviewers.length === 0 ? (
                <p className="text-center text-gray-600">
                  No reviewers added yet.
                </p>
              ) : (
                reviewers.map((rev, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border p-3 border-gray-300 rounded mb-2"
                  >
                    <div>
                      <h5 className="font-medium">{rev.fullName}</h5>
                      <p className="text-sm text-gray-600">{rev.email}</p>
                      <p className="text-sm text-gray-600">{rev.country}</p>
                      <p className="text-sm text-gray-600">{rev.affiliation}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(index)}
                        className="text-blue-600 hover:text-blue-800 p-1 transition cursor-pointer"
                        title="Edit Reviewer"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemoveReviewer(index)}
                        className="text-red-600 hover:text-red-800 p-1 transition cursor-pointer"
                        title="Delete Reviewer" 
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={saveChanges}
                disabled={reviewers.length < 3}
                className={`px-4 py-2 rounded-lg text-white cursor-pointer ${
                  reviewers.length < 3
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewersModal;
