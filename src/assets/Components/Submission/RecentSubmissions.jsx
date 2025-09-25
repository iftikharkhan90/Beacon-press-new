import React from "react";

const RecentSubmissions = ({ oldSubmissions, setPreviewSubmission, setView, setStep }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="font-semibold mb-3">Recent Submissions</h3>
      <div className="overflow-auto max-h-48">
        <table className="w-full text-sm">
          <tbody>
            {oldSubmissions.slice(0, 5).map((s) => (
              <tr key={s.id} className="border-b">
                <td className="py-2 align-top">
                  <div className="font-medium line-clamp-1">{s.title}</div>
                  <div className="text-xs text-gray-500">{s.date}</div>
                </td>
                <td className="py-2 align-top text-right">
                  <button
                    onClick={() => {
                      setPreviewSubmission(s);
                      setView("online");
                      setStep(1);
                    }}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {oldSubmissions.length === 0 && (
          <div className="text-center text-gray-500 py-4">No recent submissions</div>
        )}
      </div>
    </div>
  );
};

export default RecentSubmissions;