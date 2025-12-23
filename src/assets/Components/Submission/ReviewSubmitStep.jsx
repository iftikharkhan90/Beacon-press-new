import React, { useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../../common/config/index";

const ReviewSubmitStep = ({
  activeManuscript,
  activefigures,
  activesupplementary,
  activeAuthors,
  activeReviewers,
  activeConflictOfInterest,
  activeConflictDescription,
  activeDataAvailability,
  previewSubmission,
  manuscriptFile,
  journalsId,
  figuresFiles,
  supplementaryFiles,
  confirmationChecked,
  setConfirmationChecked,
  setStep,
  setManuscript,
  setAuthors,
  setReviewers,
  setConflictOfInterest,
  setConflictDescription,
  setDataAvailability,
  setPreviewSubmission,
}) => {
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };



  const getFileExtension = (filename) => {
    if (!filename) return "FILE";
    return filename.split(".").pop().toUpperCase();
  };

  const getFileName = (file) => {
    if (typeof file === "string") return file;
    return file?.name || file?.fileName || "Unknown File";
  };

  const getFileSize = (file) => {
    if (typeof file === "string") return null;
    return file?.size || file?.fileSize || null;
  };

  const getLastModified = (file) => {
    if (typeof file === "string") return null;
    return file?.lastModified || file?.dateModified || file?.uploadDate || null;
  };

  const isFormComplete = useMemo(() => {
    if (
      !activeManuscript?.journalsId ||
      !activeManuscript?.title ||
      !activeManuscript?.type ||
      !activeManuscript?.subject ||
      !activeManuscript?.runningTitle ||
      !activeManuscript?.keyword ||
      !activeManuscript?.correspondingName ||
      !activeManuscript?.correspondingEmail ||
      !activeManuscript?.abstract
    ) {
      return false;
    }

    if (!activeAuthors || activeAuthors.length === 0) return false;
    for (let author of activeAuthors) {
      if (
        !author.fullName ||
        !author.email ||
        !author.country ||
        !author.affiliation
      ) {
        return false;
      }
    }

    if (!activeReviewers || activeReviewers.length < 3) return false;
    for (let reviewer of activeReviewers) {
      if (!reviewer.fullName || !reviewer.email || !reviewer.affiliation) {
        return false;
      }
    }

    return true;
  }, [
    activeManuscript,
    activeAuthors,
    activeReviewers,
    supplementaryFiles,
  ]);

  const handleSubmit = async () => {
    if (!confirmationChecked) {
      Swal.fire({
        icon: "warning",
        title: "Confirmation Required",
        text: "Please confirm before submitting.",
      });
      return;
    }

    if (!isFormComplete) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all required fields before submitting.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      console.log("thisiis tokenenene:::",token)

      const formData = new FormData();
      formData.append("journalsId", activeManuscript.journalsId);
      formData.append("manuscript", manuscriptFile);

      formData.append("manuscriptDetails", JSON.stringify(activeManuscript));
      formData.append("figuresDetails", JSON.stringify(activefigures));
      formData.append(
        "supplementaryDetails",
        JSON.stringify(activesupplementary)
      );
      formData.append("authors", JSON.stringify(activeAuthors));
      formData.append("reviewers", JSON.stringify(activeReviewers));
      formData.append(
        "conflictOfInterest",
        JSON.stringify(activeConflictOfInterest)
      );
      formData.append("conflictDescription", activeConflictDescription || "");
     formData.append("dataAvailability", activeDataAvailability || "Not provided");
      const res = await axios.post(
        `${config.BASE_API_URL}/scripts/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
         } }
      );
      console.log("Submitting manuscript:", res);

      console.log("res", res);
      Swal.fire({
        icon: "success",
        title: "Submission Successful",
        text: "Your manuscript has been submitted successfully ✅",
      });

      console.log("Server response:", res.data);
      setStep(6);
    } catch (error) {
      console.error("Error submitting:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again ❌",
      });
    }
  };

  const FileCard = ({ file, index }) => {
    const fileName = getFileName(file);
    const fileSize = getFileSize(file);
    const lastModified = getLastModified(file);

    return (
      <div
        key={index}
        className="p-3 border-1 rounded border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-xs font-semibold text-blue-500">
              {getFileExtension(fileName)}
            </span>
          </div>
          <div>
            <div className="font-medium text-sm">{fileName}</div>
            <div className="text-xs text-gray-500">
              {fileSize ? formatFileSize(fileSize) : "Size unknown"}
              {lastModified &&
                ` • Uploaded ${new Date(lastModified).toLocaleDateString()}`}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h3 className="text-2xl font-semibold mb-3 font-sans">Review & Submit</h3>
      <div className="border-gray-300 p-4 rounded space-y-4">
        {/* Manuscript Details Section */}
        <div className="bg-white p-4 rounded border border-gray-300">
   <div className="text-center mt-2">
  <strong className="text-lg">Select Journal:</strong>{" "}
{activeManuscript?.journalTitle || "—"}

</div>


          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold font-sans text-lg">Manuscript Details:</h4>
            <button
              onClick={() => setStep(2)}
              className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="gap-4">
            
            <div>
              <strong className="font-sans text-lg">Title:</strong> {activeManuscript.title || "—"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div>
              <strong className="font-sans text-lg">Type:</strong> {activeManuscript.type || "—"}
            </div>
            <div>
              <strong className="font-sans text-lg">Running Title:</strong>{" "}
              {activeManuscript.runningTitle || "—"}
            </div>
            <div>
              <strong className="font-sans text-lg">Subject:</strong> {activeManuscript.subject || "—"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div>
              <strong className="font-sans text-lg">keyword:</strong> {activeManuscript.keyword || "—"}
            </div>
            <div>
              <strong className="font-sans text-lg">Corresponding Author:</strong>{" "}
              {activeManuscript.correspondingName || "—"}
            </div>
            <div>
              <strong className="font-sans text-lg">Email:</strong>{" "}
              {activeManuscript.correspondingEmail || "—"}
            </div>
          </div>
          <div className="mt-3">
            <strong className="font-sans text-lg">Abstract:</strong>
            {activeManuscript.abstract || "—"}
          </div>

          <h4 className="font-semibold text-lg font-sans mt-4">Authors:</h4>
          <div className="space-y-3">
            {activeAuthors.map((author, index) => (
              <div
                key={index}
                className="p-3 rounded grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <div>
                  <strong className="font-sans text-lg">Full Name:</strong> {author.fullName || "—"}
                </div>
                <div>
                  <strong className="font-sans text-lg">Email:</strong> {author.email || "—"}
                </div>
                <div>
                  <strong className="font-sans text-lg">Country:</strong> {author.country || "—"}
                </div>
                <div className="md:col-span-3">
                  <strong className="font-sans text-lg">Affiliation:</strong> {author.affiliation || "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded border-gray-200 border-1">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-2xl">Reviewers:</h4>
            <button
              onClick={() => setStep(3)}
              className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="">
                <tr>
                  <th className="p-2 text-center font-sans text-lg">Full Name</th>
                  <th className="p-2 text-center font-sans text-lg">Email</th>
                  <th className="p-2 text-center font-sans text-lg">Country</th>
                  <th className="p-2 text-center font-sans text-lg">Affiliation</th>
                </tr>
              </thead>
              <tbody>
                {activeReviewers.map((r, i) => (
                  <tr key={i}>
                    <td className="p-2 text-center font-sans text-sm">{r.fullName || "—"}</td>
                    <td className="p-2 text-center font-sans text-sm">{r.email || "—"}</td>
                    <td className="p-2 text-center font-sans text-sm">{r.country || "—"}</td>
                    <td className="p-2 text-center font-sans text-sm">{r.affiliation || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold text-lg mt-4">Conflict of Interest</h4>
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

          <h4 className="font-semibold text-lg mt-4">
            Data Availability Statement
          </h4>
          <p>{activeDataAvailability || "—"}</p>
        </div>

        <div className="bg-white p-4 rounded border-gray-300 border-1">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-2xl font-sans">Files</h4>
            <button
              onClick={() => setStep(4)}
              className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="mb-6">
            <h5 className="font-medium text-lg mb-1 flex items-center font-sans ">
              📄 Manuscript File
            </h5>
            {manuscriptFile ? (
              <FileCard file={manuscriptFile} index={0} />
            ) : (
              <div className="p-3 border-1 border-gray-300 font-sans text-sm rounded text-center text-gray-500">
                No manuscript file uploaded
              </div>
            )}
          </div>

          <div className="mb-6">
            <h5 className="font-medium text-lg mb-1 flex items-center font-sans ">
              📊 Figures/Tables
            </h5>
            {figuresFiles ? (
              <FileCard file={figuresFiles} index={0} />
            ) : (
              <div className="p-3 border-1 border-gray-300 rounded text-sm text-center text-gray-500">
                No figures or tables uploaded
              </div>
            )}
          </div>

          <div>
            <h5 className="font-medium text-lg font-sans mb-1 flex items-center">
              📎 Supplementary Files
            </h5>
            {supplementaryFiles ? (
              <FileCard file={supplementaryFiles} index={0} />
            ) : (
              <div className="p-3 border-1 text-sm border-gray-300 rounded text-center text-gray-500">
                No supplementary files uploaded
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded">
            <h6 className="font-medium text-blue-900 mb-2 text-lg">Files Summary:</h6>
            <div className="text-sm text-blue-800 space-y-1">
              <div className="text-sm font-sans">
                • Manuscript: {manuscriptFile ? "✅ Uploaded" : "❌ Required"}
              </div>
              <div className="text-sm font-sans">
                • Figures/Tables:{" "}
                {figuresFiles ? "✅ Uploaded" : "❌ Not uploaded"}
              </div>
              <div className="text-sm font-sans">
                • Supplementary:{" "}
                {supplementaryFiles ? "✅ Uploaded" : "❌ Not uploaded"}
              </div>
              <div className="pt-2 font-sans text-sm">
                Total files:{" "}
                {(manuscriptFile ? 1 : 0) +
                  (figuresFiles ? 1 : 0) +
                  (supplementaryFiles ? 1 : 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 border-blue-500 border rounded bg-blue-50 cursor-pointer">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1"
            checked={confirmationChecked}
            onChange={(e) => setConfirmationChecked(e.target.checked)}
          />
          <span className="text-sm font-sans">
            I confirm that all information provided is accurate and complete. I
            understand that submitting false information may result in rejection
            of my submission.
          </span>
        </label>
        {!confirmationChecked && (
          <div className="text-red-500 text-sm font-sans mt-2">
            Please confirm the accuracy of your submission
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setStep(4)}
          className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer"
        >
          Previous
        </button>
        <div className="flex gap-2 cursor-pointer">
          {!previewSubmission ? (
            <button
              onClick={handleSubmit}
              className={`px-3 py-2 rounded cursor-pointer text-white ${
                confirmationChecked && isFormComplete
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!confirmationChecked || !isFormComplete}
            >
              Submit to Beacons Press
            </button>
          ) : (
            <button
              onClick={() => {
                setManuscript(previewSubmission.manuscript);
                setAuthors(previewSubmission.authors.map((a) => ({ ...a })));
                setReviewers(
                  previewSubmission.reviewers.map((r) => ({ ...r }))
                );
                setConflictOfInterest(previewSubmission.conflictOfInterest);
                setConflictDescription(previewSubmission.conflictDescription);
                setDataAvailability(previewSubmission.dataAvailability);
                setPreviewSubmission(null);
                setStep(5);
                Swal.fire({
                  icon: "info",
                  title: "Preview Loaded",
                  text: "Loaded preview into form — press Submit to push it.",
                });
              }}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Load & Edit To Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewSubmitStep;
