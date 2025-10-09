
import React from "react";
import Modal from "./Modal";

const ManuscriptDetailsStep = ({
  manuscript,
  updateManuscript,
  step2Errors,
  validateStep2,
  isStep2Valid,
  setStep,
  previewSubmission,
  activeManuscript,
  activeAuthors,
  isModalDataComplete,
  setIsModalDataComplete,
  modalAuthor,
  setModalAuthor,
}) => {
  const hasContent = (v) => v && v.trim() !== "";
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  const emailStarColor = (email) => (!hasContent(email) ? "text-red-600" : isValidEmail(email) ? "text-green-600" : "text-red-600");

  // All data complete = parent validation (already checks authors array too)
  const isAllDataComplete = () => !!isStep2Valid();
    
  return (
    <>
      <h1 className="text-lg font-bold mb-3">Manuscript Details</h1>

      {!previewSubmission ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium">Manuscript Title <span className={hasContent(manuscript.title) ? "text-green-600" : "text-red-600"}>*</span></label>
              <input
                type="text"
                value={manuscript.title}
                onChange={(e) => updateManuscript("title", e.target.value)}
                className={`w-full p-2 rounded bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${step2Errors.title ? "border-red-500" : ""}`}
              />
              {step2Errors.title && <div className="text-red-500 text-sm mt-1">{step2Errors.title}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Manuscript Type <span className={hasContent(manuscript.type) ? "text-green-600" : "text-red-600"}>*</span></label>
              <select
                value={manuscript.type}
                onChange={(e) => updateManuscript("type", e.target.value)}
                className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${step2Errors.type ? "border-red-500" : ""}`}
              >
                <option value="">Select Type</option>
                <option>Review Article</option>
                <option>Research Article</option>
                <option>Short Communication</option>
                <option>Case Study</option>
              </select>
              {step2Errors.type && <div className="text-red-500 text-sm mt-1">{step2Errors.type}</div>}
            </div>
            <div>
              <label className="block font-medium">Running Title <span className={hasContent(manuscript.runningTitle) ? "text-green-600" : "text-red-600"}>*</span></label>
              <input
                type="text"
                value={manuscript.runningTitle}
                onChange={(e) => updateManuscript("runningTitle", e.target.value)}
                className={`w-full border p-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${step2Errors.runningTitle ? "border-red-500" : ""}`}
              />
              {step2Errors.runningTitle && <div className="text-red-500 text-sm mt-1">{step2Errors.runningTitle}</div>}
            </div>
            <div>
              <label className="block font-medium">Subject <span className={hasContent(manuscript.subject) ? "text-green-600" : "text-red-600"}>*</span></label>
              <select
                value={manuscript.subject}
                onChange={(e) => updateManuscript("subject", e.target.value)}
                className={`w-full border p-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${step2Errors.subject ? "border-red-500" : ""}`}
              >
                <option value="">Select Subject</option>
                <option>Agriculture</option>
                <option>Science</option>
              </select>
              {step2Errors.subject && <div className="text-red-500 text-sm mt-1">{step2Errors.subject}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Code <span className={hasContent(manuscript.code) ? "text-green-600" : "text-red-600"}>*</span></label>
              <input
                type="text"
                value={manuscript.code}
                onChange={(e) => updateManuscript("code", e.target.value)}
                className={`w-full border p-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${step2Errors.code ? "border-red-500" : ""}`}
                placeholder="Please give a Code here"
              />
              {step2Errors.code && <div className="text-red-500 text-sm mt-1">{step2Errors.code}</div>}
            </div>
            <div>
              <label className="block font-medium">Corresponding Author Name <span className={hasContent(manuscript.correspondingName) ? "text-green-600" : "text-red-600"}>*</span></label>
              <input
                type="text"
                value={manuscript.correspondingName}
                onChange={(e) => updateManuscript("correspondingName", e.target.value)}
                className={`w-full border p-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${step2Errors.correspondingName ? "border-red-500" : ""}`}
              />
              {step2Errors.correspondingName && <div className="text-red-500 text-sm mt-1">{step2Errors.correspondingName}</div>}
            </div>
            <div>
              <label className="block font-medium">Corresponding Author Email <span className={emailStarColor(manuscript.correspondingEmail)}>*</span></label>
              <input
                type="email"
                value={manuscript.correspondingEmail}
                onChange={(e) => updateManuscript("correspondingEmail", e.target.value)}
                className={`w-full border p-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${step2Errors.correspondingEmail ? "border-red-500" : ""}`}
              />
              {step2Errors.correspondingEmail && <div className="text-red-500 text-sm mt-1">{step2Errors.correspondingEmail}</div>}
              {hasContent(manuscript.correspondingEmail) && !isValidEmail(manuscript.correspondingEmail) && (
                <div className="text-red-500 text-sm mt-1">Please enter a valid email address</div>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium">Abstract <span className={hasContent(manuscript.abstract) ? "text-green-600" : "text-red-600"}>*</span></label>
            <textarea
              value={manuscript.abstract}
              onChange={(e) => updateManuscript("abstract", e.target.value)}
              className={`w-full border p-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${step2Errors.abstract ? "border-red-500" : ""}`}
              rows={4}
              placeholder="Abstract"
            />
            {step2Errors.abstract && <div className="text-red-500 text-sm mt-1">{step2Errors.abstract}</div>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Authors Information</h4>
            </div>
            <p>Provide the details of all the authors of this manuscript, in the order that they appear on the manuscript. Your details have been prefilled as the submitting author.</p>

            <Modal
              setIsModalDataComplete={setIsModalDataComplete}
              modalAuthor={modalAuthor}
              setModalAuthor={setModalAuthor}
            />
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(1)} className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer">Previous</button>
            <button onClick={() => setStep(5)} className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer">Review</button>
            <div className="flex gap-2 cursor-pointer">
              <button
                onClick={() => { if (validateStep2()) setStep(3); }}
                className={`px-3 py-2 rounded cursor-pointer text-white ${isAllDataComplete() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"} transition `}
              >
                Next Step
              </button>
          </div>
        </div>
      </div>
      ) : (
        <div className="space-y-4">
          <div><strong>Manuscript Title:</strong> {activeManuscript.title || "—"}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Type:</strong> {activeManuscript.type || "—"}</div>
            <div><strong>Running Title:</strong> {activeManuscript.runningTitle || "—"}</div>
          </div>
          <div><strong>Subject:</strong> {activeManuscript.subject || "—"}</div>
          <div><strong>Abstract:</strong><div className="mt-1 text-sm text-gray-800">{activeManuscript.abstract || "—"}</div></div>
          <div><strong>Code:</strong><div className="mt-1 text-sm text-gray-800">{activeManuscript.code || "—"}</div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Corresponding:</strong> {activeManuscript.correspondingName || "—"}</div>
            <div><strong>Email:</strong> {activeManuscript.correspondingEmail || "—"}</div>
          </div>
          <div className="flex justify-between cursor-pointer mt-4">
            <button onClick={() => setStep(1)} className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer">Previous</button>
            <button onClick={() => setStep(5)} className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer">Review</button>
            <div className="flex gap-2">
              <button
                onClick={() => { if (isAllDataComplete()) setStep(3); }}
                disabled={!isAllDataComplete()}
                className={`px-3 py-2 rounded cursor-pointer text-white ${isAllDataComplete() ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-300"} transition`}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManuscriptDetailsStep;
