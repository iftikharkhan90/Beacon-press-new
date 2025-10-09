import React, { useState } from "react";

const UploadFilesStep = ({
  manuscriptFile,
  setManuscriptFile,
  figuresFile,
  setFiguresFile,
  supplementaryFile,
  setSupplementaryFile,
  step4Error,
  setStep,
  previewSubmission,
  setStep4Error
}) => {
  

  const handleRemoveFile = (fileType) => {
    if (fileType === "manuscript") {
      setManuscriptFile(null);
    } else if (fileType === "figures") {
      setFiguresFile(null);
    } else if (fileType === "supplementary") {
      setSupplementaryFile(null);
    }
    setStep4Error(false);
  };

  const FilePreview = ({ file, fileType, label }) => {
    if (!file) return null;
    
    return (
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded flex justify-between items-center">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-green-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <div className="font-medium text-green-700">{label} Uploaded</div>
            <div className="text-sm text-gray-600">{file.name}</div>
          </div>
        </div>
        <button
          onClick={() => handleRemoveFile(fileType)}
          className="text-gray-500 hover:text-red-500 p-1"
          title="Remove file"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <>
      <h3 className="text-lg font-bold mb-3">Upload Files</h3>
      <div className="space-y-4">
        {!previewSubmission ? (
          <>
            <div className="rounded p-4 ">
              {/* Manuscript File Upload */}
              <div className="mb-4">
                <label className="block font-medium mb-2">
                  Upload Manuscript File{" "}
                  <span className={manuscriptFile ? "text-green-600" : "text-red-600"}>
                    *
                  </span>
                </label>
                
                {!manuscriptFile ? (
                  <input
                    type="file"
                    className={`w-full p-2 border  border-gray-300 focus:ring-1 focus:ring-blue-500 rounded ${
                      step4Error ? "border-red-500" : ""
                    }`}
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setManuscriptFile(e.target.files[0]);
                        setStep4Error(false);
                      }
                    }}
                    accept=".pdf,.docx"
                  />
                ) : (
                  <FilePreview 
                    file={manuscriptFile} 
                    fileType="manuscript" 
                    label="Manuscript File" 
                  />
                )}

                {step4Error && (
                  <div className="text-red-500 text-sm mt-2">
                    Manuscript file is required
                  </div>
                )}
              </div>

              {/* Figures/Tables File Upload */}
              <div className="mb-4">
                <label className="block font-medium mb-2">
                  Upload Figures/Tables (Optional)
                </label>
                
                {!figuresFile ? (
                  <input
                    type="file"
                    className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-blue-500 rounded"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setFiguresFile(e.target.files[0]);
                      }
                    }}
                    accept=".pdf,.docx"
                  />
                ) : (
                  <FilePreview 
                    file={figuresFile} 
                    fileType="figures" 
                    label="Figures/Tables File" 
                  />
                )}
              </div>

              {/* Supplementary Files Upload */}
              <div>
                <label className="block font-medium mb-2">
                  Supplementary Files (Optional)
                </label>
                
                {!supplementaryFile ? (
                  <input
                    type="file"
                    className="w-full p-2 border border-gray-300 focus:ring-1 focus:ring-blue-500 rounded"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setSupplementaryFile(e.target.files[0]);
                      }
                    }}
                    accept=".pdf,.docx"
                  />
                ) : (
                  <FilePreview 
                    file={supplementaryFile} 
                    fileType="supplementary" 
                    label="Supplementary File" 
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(3)}
                className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (manuscriptFile) {
                    setStep(5);
                  } else {
                    setStep4Error(true);
                  }
                }}
                className={`px-3 py-2 rounded cursor-pointer text-white ${
                  manuscriptFile
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!manuscriptFile}
              >
                Next Step
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="border rounded p-4 bg-gray-50">
              <strong>Files:</strong>
              <ul className="list-disc pl-6 mt-2">
                {previewSubmission.files && previewSubmission.files.length > 0 ? (
                  previewSubmission.files.map((f, i) => (
                    <li key={i} className="text-sm">
                      {f}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-sm">No files attached</li>
                )}
              </ul>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(3)}
                className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
              >
                Next Step
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UploadFilesStep;