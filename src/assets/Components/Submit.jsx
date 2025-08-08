import React, { useState, useEffect } from 'react';
import { Upload, FileText, User, Mail, Calendar, BookOpen, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const SubmitManuscriptPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'submit', 'details'
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Manuscript form state
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    authors: '',
    category: '',
    manuscript: null,
    supplementary: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mock user data
  const mockUser = {
    email: 'author@example.com',
    password: 'password123',
    name: 'Dr. Jane Smith'
  };

  // Categories
  const categories = [
    'Computer Science',
    'Biology',
    'Chemistry',
    'Physics',
    'Mathematics',
    'Medicine',
    'Engineering',
    'Environmental Science'
  ];

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === mockUser.email && loginData.password === mockUser.password) {
      setIsLoggedIn(true);
      setCurrentView('submit');
    } else {
      alert('Invalid credentials. Try: author@example.com / password123');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newSubmission = {
      id: Date.now(),
      ...formData,
      status: 'Under Review',
      submissionDate: new Date().toLocaleDateString(),
      manuscriptName: formData.manuscript?.name || 'manuscript.pdf',
      supplementaryName: formData.supplementary?.name || null
    };

    setSubmissions(prev => [...prev, newSubmission]);
    setSubmitSuccess(true);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      title: '',
      abstract: '',
      keywords: '',
      authors: '',
      category: '',
      manuscript: null,
      supplementary: null
    });

    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  // Handle file upload
  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  // View submission details
  const viewSubmissionDetails = (submission) => {
    setSelectedSubmission(submission);
    setCurrentView('details');
  };

  // Login View
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Journal Portal</h1>
            <p className="text-gray-600">Sign in to submit your manuscript</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

        
        </div>
      </div>
    );
  }

  // Submission Details View
  if (currentView === 'details' && selectedSubmission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <button
                onClick={() => setCurrentView('submit')}
                className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Submit
              </button>
              <h1 className="text-3xl font-bold mb-2">Submission Details</h1>
              <p className="text-white/90">Review your manuscript submission</p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Manuscript Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Manuscript Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Title</label>
                        <p className="text-gray-900 mt-1 font-medium">{selectedSubmission.title}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Authors</label>
                        <p className="text-gray-900 mt-1">{selectedSubmission.authors}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Category</label>
                        <p className="text-gray-900 mt-1">{selectedSubmission.category}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Keywords</label>
                        <p className="text-gray-900 mt-1">{selectedSubmission.keywords}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Files</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{selectedSubmission.manuscriptName}</p>
                          <p className="text-sm text-gray-600">Main manuscript</p>
                        </div>
                      </div>
                      {selectedSubmission.supplementaryName && (
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedSubmission.supplementaryName}</p>
                            <p className="text-sm text-gray-600">Supplementary material</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Status & Abstract */}
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Status</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="font-medium text-yellow-700">{selectedSubmission.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">Submitted: {selectedSubmission.submissionDate}</p>
                      <p>ID: #{selectedSubmission.id}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Abstract</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedSubmission.abstract}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Submit Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Submit Manuscript</h1>
                <p className="text-white/90">Welcome back, {mockUser.name}</p>
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentView('login');
                }}
                className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {submitSuccess && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <p className="text-green-700">Manuscript submitted successfully!</p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8 p-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Manuscript Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter manuscript title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authors *</label>
                    <input
                      type="text"
                      value={formData.authors}
                      onChange={(e) => setFormData(prev => ({ ...prev, authors: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Author1, Author2, Author3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Abstract *</label>
                  <textarea
                    value={formData.abstract}
                    onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter your manuscript abstract..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Manuscript File *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'manuscript')}
                        className="hidden"
                        id="manuscript-upload"
                        accept=".pdf,.doc,.docx"
                        required
                      />
                      <label htmlFor="manuscript-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700">Click to upload</span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
                      {formData.manuscript && (
                        <p className="text-sm text-green-600 mt-2">{formData.manuscript.name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplementary Files</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, 'supplementary')}
                        className="hidden"
                        id="supplementary-upload"
                        accept=".pdf,.doc,.docx,.zip"
                      />
                      <label htmlFor="supplementary-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700">Click to upload</span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Optional additional files</p>
                      {formData.supplementary && (
                        <p className="text-sm text-green-600 mt-2">{formData.supplementary.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Manuscript'
                  )}
                </button>
              </form>
            </div>

            {/* Right Column - Submissions List */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Your Submissions
                </h3>
                
                {submissions.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No submissions yet</p>
                ) : (
                  <div className="space-y-3">
                    {submissions.map(submission => (
                      <div key={submission.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-gray-900 mb-2 truncate">{submission.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{submission.submissionDate}</span>
                          <button
                            onClick={() => viewSubmissionDetails(submission)}
                            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                            {submission.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guidelines</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    Ensure manuscript follows journal formatting guidelines
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    Include all required sections: abstract, introduction, methods, results, discussion
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    Provide complete author information and affiliations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    Upload high-quality figures and supplementary materials
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitManuscriptPage;