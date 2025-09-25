import React from "react";
import { PRE_SUBMISSION_CHECKLIST } from "./utils";

const ChecklistStep = ({ checklistConfirmed, setChecklistConfirmed, setStep }) => {
  return (
    <>
      <h1 className="text-lg font-bold mb-3">Pre-Submission Checklist</h1>
      <div className="space-y-4">
        <div className="max-h-100 w-full overflow-y-auto p-4 bg-gray-100">
          <ul className="list-disc pl-5 space-y-2">
            {PRE_SUBMISSION_CHECKLIST.map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={checklistConfirmed}
              onChange={(e) => setChecklistConfirmed(e.target.checked)}
            />
            <span className="text-sm cursor-pointer">
              I have studied and understood all of the above instructions
            </span>
          </label>

          <div className="flex justify-end cursor-pointer">
            <button
              onClick={() => setStep(2)}
              disabled={!checklistConfirmed}
              className={`px-4 py-2 rounded text-white ${
                checklistConfirmed
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              } transition-colors`}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChecklistStep;