import React from "react";
import ReviewersModal from "./ReviewersModal";

const ReviewersStep = ({
  reviewers,
  setReviewers,
  conflictOfInterest,
  setConflictOfInterest,
  conflictDescription,
  setConflictDescription,
  dataAvailability,
  setDataAvailability,
  step3Errors,
  validateStep3,
  isStep3Valid,
  setStep,
  previewSubmission,
  activeReviewers,
  activeConflictOfInterest,
  activeConflictDescription,
  activeDataAvailability,
}) => {
  console.log("yesss", setReviewers)
  return (
    <>
      <h3 className="text-lg font-semibold mb-3">
        Reviewers Details
        <span className="text-sm font-normal ml-2 text-red-600">
          (At least 3 reviewers are required)
        </span>
      </h3>
      <p className="text-sm mb-4">
        Provide the details of all the reviewers of this manuscript, in the
        order that they appear on the manuscript.
      </p>

      {/* ✅ Popup modal for adding/updating reviewers */}
      <ReviewersModal
        modalReviewers={reviewers.filter(
          (r) => r.fullName || r.affiliation || r.country || r.email
        )} // only non-empty reviewers
        setModalReviewers={setReviewers}
      />

      {!previewSubmission ? (
        // --- Input Mode ---
        <div className="space-y-6">
          {/* --- Conflict of Interest --- */}
          <div className="rounded-lg p-4">
            <h4 className="font-semibold mb-3">
              Conflict of Interest{" "}
              <span
                className={`${
                  conflictOfInterest !== null ? "text-green-500" : "text-red-600"
                }`}
              >
                *
              </span>
            </h4>

            <div className="mb-3">
              <p className="text-sm mb-2">
                Do any authors have Conflicts of Interest to declare? Please
                describe any of the authors' potential conflicts of interest.
              </p>

              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="conflict"
                    checked={conflictOfInterest === true}
                    onChange={() => setConflictOfInterest(true)}
                    className="mr-2"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="conflict"
                    checked={conflictOfInterest === false}
                    onChange={() => setConflictOfInterest(false)}
                    className="mr-2"
                  />
                  <span>No</span>
                </label>
              </div>
              {step3Errors.conflict && (
                <div className="text-red-500 text-sm mt-2">
                  {step3Errors.conflict}
                </div>
              )}
            </div>

            {conflictOfInterest === true && (
              <div>
                <label className="block mb-1 ">Conflict Description:</label>
                <textarea
                  value={conflictDescription}
                  onChange={(e) => setConflictDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 focus:outline-none rounded focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the conflict of interest..."
                />
              </div>
            )}
          </div>

          {/* --- Data Availability --- */}
          <div className="rounded-lg p-4">
            <h4 className="font-semibold mb-3">Data Availability Statement</h4>

            <p className="text-sm mb-2">
              Please describe where the underlying data supporting the results
              of your study can be found.
            </p>

            <textarea
              value={dataAvailability}
              onChange={(e) => setDataAvailability(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="Describe data availability..."
            />
          </div>

          {/* --- Navigation Buttons --- */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer"
            >
              Review
            </button>
            <button
              onClick={() => {
                if (validateStep3()) {
                  setStep(4);
                }
              }}
              className={`px-4 py-2 rounded text-white cursor-pointer ${
                isStep3Valid()
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              } transition`}
              disabled={!isStep3Valid()}
            >
              Next Step
            </button>
          </div>
        </div>
      ) : (
        // --- Preview Mode ---
        <div className="space-y-4">
          {/* --- Show Reviewers only if filled --- */}
          {activeReviewers && activeReviewers.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Reviewers Details</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Full Name</th>
                      <th className="p-2 text-left">Affiliation</th>
                      <th className="p-2 text-left">Country</th>
                      <th className="p-2 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeReviewers
                      .filter(
                        (r) =>
                          r.fullName || r.affiliation || r.country || r.email
                      )
                      .map((r, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="p-2">{r.fullName || "—"}</td>
                          <td className="p-2">{r.affiliation || "—"}</td>
                          <td className="p-2">{r.country || "—"}</td>
                          <td className="p-2">{r.email || "—"}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- Conflicts of Interest --- */}
          <div>
            <h4 className="font-semibold mb-2">Conflicts of Interest</h4>
            <p>
              {activeConflictOfInterest === true
                ? "Yes"
                : activeConflictOfInterest === false
                ? "No"
                : "—"}
            </p>
            {activeConflictOfInterest === true && (
              <div className="mt-2 p-2 rounded">
                <strong>Description:</strong>
                <div className="mt-1">{activeConflictDescription || "—"}</div>
              </div>
            )}
          </div>

          {/* --- Data Availability --- */}
          <div>
            <h4 className="font-semibold mb-2">Data Availability Statement</h4>
            <div className="mt-1 p-2 rounded">
              {activeDataAvailability || "—"}
            </div>
          </div>

          {/* --- Navigation Buttons --- */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer"
            >
              Review
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
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

export default ReviewersStep;
