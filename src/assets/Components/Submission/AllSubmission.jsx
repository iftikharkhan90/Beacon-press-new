import React, { useState, useEffect } from 'react';

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        setRawResponse('');
        
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
        const API_ENDPOINT = '/api/submissions';
        
        console.log('Fetching from:', `${API_BASE_URL}${API_ENDPOINT}`);
        
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        
        if (!contentType || !contentType.includes('application/json')) {
          const textResponse = await response.text();
          setRawResponse(textResponse.substring(0, 200) + '...');
          throw new Error(`Expected JSON but got: ${contentType}. Server returned HTML. Check your API endpoint.`);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setSubmissions(Array.isArray(data) ? data : []);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const useMockData = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        { 
          id: 1, 
          title: 'Test Submission 1', 
          description: 'This is a test submission for demonstration purposes', 
          status: 'pending', 
          createdAt: new Date('2024-01-15') 
        },
        { 
          id: 2, 
          title: 'Test Submission 2', 
          description: 'Another test submission with approved status', 
          status: 'approved', 
          createdAt: new Date('2024-01-14') 
        },
        { 
          id: 3, 
          title: 'Test Submission 3', 
          description: 'Third test submission that was rejected', 
          status: 'rejected', 
          createdAt: new Date('2024-01-13') 
        },
        { 
          id: 4, 
          title: 'Test Submission 4', 
          description: 'Fourth submission pending review', 
          status: 'pending', 
          createdAt: new Date('2024-01-12') 
        },
      ];
      setSubmissions(mockData);
      setError(null);
      setLoading(false);
    }, 1000);
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filter === 'all') return true;
    return submission.status === filter;
  });

  const handleApprove = (id) => {
    console.log('Approving submission:', id);
    // Add your approve logic here
  };

  const handleReject = (id) => {
    console.log('Rejecting submission:', id);
    // Add your reject logic here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-64">
          <div className="text-lg text-gray-600 mb-4">Loading submissions...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <button 
            onClick={useMockData}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Use Mock Data Instead
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Error Loading Submissions</h2>
          <p className="text-red-600 mb-4">{error}</p>
          
          {rawResponse && (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <strong className="text-gray-700">Server Response:</strong>
              <pre className="text-xs text-gray-600 overflow-auto mt-2 bg-white p-2 rounded border">
                {rawResponse}
              </pre>
            </div>
          )}
          
          <div className="flex gap-3 mb-6">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={useMockData} 
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Use Mock Data
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Troubleshooting Tips:</h4>
            <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
              <li>Check if your backend server is running on the correct port</li>
              <li>Verify the API endpoint URL in your environment variables</li>
              <li>Ensure the endpoint returns JSON format, not HTML</li>
              <li>Check CORS settings on your server</li>
              <li>Test the API endpoint directly in your browser or Postman</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Submissions</h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Total: {submissions.length}</span>
            <span>Showing: {filteredSubmissions.length}</span>
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <label className="text-sm font-medium text-gray-700">Filter by:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-gray-500 text-lg mb-2">
              {submissions.length === 0 ? 'No submissions found.' : 'No submissions match your filter.'}
            </div>
            <button 
              onClick={useMockData}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Load Sample Data
            </button>
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <div key={submission.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Submission Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {submission.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {submission.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(submission.status)}`}>
                      {submission.status?.charAt(0).toUpperCase() + submission.status?.slice(1)}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3 lg:gap-2">
                  {submission.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(submission.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(submission.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllSubmissions;