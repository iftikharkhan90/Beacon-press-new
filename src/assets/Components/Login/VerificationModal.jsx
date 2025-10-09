import React, { useState } from "react";

const EmailVerificationModal = ({ isOpen, onClose, email, onVerify }) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null; // Only show modal if open

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code) {
      alert("Please enter verification code");
      return;
    }
    onVerify(code); // pass code to parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
        <p className="text-sm text-gray-600 mb-4">
          A verification code has been sent to <b>{email}</b>. Please enter it below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            placeholder="Enter verification code"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
