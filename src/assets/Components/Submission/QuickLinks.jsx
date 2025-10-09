import React from "react";

const QuickLinks = ({ 
  view, 
  setView, 
  setPreviewSubmission, 
  currentStep, 
  completedSteps 
}) => {
  // Define all steps with their numbers and labels
  const steps = [
    { id: 1, label: "Pre-Submission Checklist" },
    { id: 2, label: "Manuscript Details" },
    { id: 3, label: "Reviewers Details" },
    { id: 4, label: "Upload Files" },
    { id: 5, label: "Review & Submit" },
    { id: 6, label: "Submission Successful" }, 
  ];

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-4 text-lg border-b pb-2">Quick Links</h3>
      
      {/* Main Navigation */}
      <ul className="text-sm space-y-2 mb-6">
        <li>
          <button
            onClick={() => {
              setView("all");
              setPreviewSubmission(null);
            }}
            className={`text-left w-full p-2 rounded transition ${
              view === "all"
                ? "bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Submissions
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setView("online");
              setPreviewSubmission(null);
            }}
            className={`text-left w-full p-2 rounded transition ${
              view === "online"
                ? "bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Online Submission
          </button>
        </li>
      </ul>

      {/* Progress Steps - Only show when in online submission view */}
      {view === "online" && (
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">Submission Progress</h4>
          <ul className="space-y-2">
            {steps.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              
              return (
                <li key={step.id} className="flex items-center">
                  {/* Step indicator */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                      isCompleted 
                        ? "bg-green-500 text-white" 
                        : isCurrent 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isCompleted ? (
                      <span>✓</span>
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  
                  {/* Step label */}
                  <span
                    className={`text-sm ${
                      isCompleted 
                        ? "text-green-600 font-medium" 
                        : isCurrent 
                        ? "text-blue-600 font-semibold" 
                        : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuickLinks;
