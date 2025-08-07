
import React, { useState } from 'react';
import { Download, Search, Filter, Calendar, User, Eye, BookOpen, ChevronRight } from 'lucide-react';

const JournalsPublicationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');

  // Sample journal data
  const journals = [
    {
      id: 1,
      title: "Advanced Machine Learning Techniques in Healthcare",
      authors: ["Dr. Sarah Johnson", "Prof. Michael Chen", "Dr. Emily Rodriguez"],
      journal: "Journal of Medical AI",
      year: 2024,
      volume: "Vol 15, Issue 3",
      category: "AI & Healthcare",
      abstract: "This paper explores cutting-edge machine learning algorithms applied to diagnostic imaging and patient outcome prediction.",
      pages: "pp. 45-62",
      doi: "10.1234/jmai.2024.15.3.45",
      views: 1247,
      downloads: 856,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions for Urban Development",
      authors: ["Dr. Ahmed Hassan", "Prof. Lisa Wang"],
      journal: "Environmental Engineering Review",
      year: 2024,
      volume: "Vol 28, Issue 2",
      category: "Environment",
      abstract: "A comprehensive study on implementing renewable energy systems in metropolitan areas with focus on cost-effectiveness.",
      pages: "pp. 112-128",
      doi: "10.1234/eer.2024.28.2.112",
      views: 892,
      downloads: 634,
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Quantum Computing Applications in Cryptography",
      authors: ["Prof. Robert Kim", "Dr. Anna Petrov", "Dr. James Wright"],
      journal: "Quantum Science Quarterly",
      year: 2023,
      volume: "Vol 7, Issue 4",
      category: "Computer Science",
      abstract: "Analysis of quantum algorithms for next-generation encryption methods and their implications for cybersecurity.",
      pages: "pp. 78-94",
      doi: "10.1234/qsq.2023.7.4.78",
      views: 2156,
      downloads: 1423,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Biodiversity Conservation in Tropical Rainforests",
      authors: ["Dr. Maria Santos", "Prof. David Thompson"],
      journal: "Conservation Biology Today",
      year: 2024,
      volume: "Vol 12, Issue 1",
      category: "Biology",
      abstract: "Long-term ecological study revealing new strategies for preserving endangered species in Amazon rainforest ecosystems.",
      pages: "pp. 23-41",
      doi: "10.1234/cbt.2024.12.1.23",
      views: 1456,
      downloads: 987,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Neuroplasticity and Memory Formation",
      authors: ["Prof. Jennifer Lee", "Dr. Marco Rossi"],
      journal: "Neuroscience Advances",
      year: 2023,
      volume: "Vol 34, Issue 6",
      category: "Neuroscience",
      abstract: "Investigation into synaptic changes during learning processes and their role in long-term memory consolidation.",
      pages: "pp. 156-172",
      doi: "10.1234/na.2023.34.6.156",
      views: 1789,
      downloads: 1234,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Smart City Infrastructure and IoT Integration",
      authors: ["Dr. Kevin Zhang", "Prof. Isabella Garcia"],
      journal: "Urban Technology Review",
      year: 2024,
      volume: "Vol 19, Issue 2",
      category: "Technology",
      abstract: "Comprehensive framework for implementing Internet of Things solutions in modern urban planning and management.",
      pages: "pp. 89-107",
      doi: "10.1234/utr.2024.19.2.89",
      views: 1123,
      downloads: 765,
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=300&h=200&fit=crop"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: journals.length },
    { id: 'AI & Healthcare', name: 'AI & Healthcare', count: 1 },
    { id: 'Environment', name: 'Environment', count: 1 },
    { id: 'Computer Science', name: 'Computer Science', count: 1 },
    { id: 'Biology', name: 'Biology', count: 1 },
    { id: 'Neuroscience', name: 'Neuroscience', count: 1 },
    { id: 'Technology', name: 'Technology', count: 1 }
  ];

  const years = ['all', '2024', '2023', '2022', '2021'];

  const filteredJournals = journals.filter(journal => {
    const matchesCategory = selectedCategory === 'all' || journal.category === selectedCategory;
    const matchesSearch = journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = selectedYear === 'all' || journal.year.toString() === selectedYear;
    
    return matchesCategory && matchesSearch && matchesYear;
  });

  const handleDownload = (journal) => {
    // Simulate PDF download
    console.log(`Downloading: ${journal.title}`);
    alert(`Downloading "${journal.title}" - This would trigger a PDF download in a real application.`);
  };

  const JournalCard = ({ journal }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={journal.image} 
          alt={journal.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {journal.year}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
            {journal.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {journal.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <User size={14} className="mr-2" />
          <span className="truncate">{journal.authors.join(', ')}</span>
        </div>
        
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center mb-1">
            <BookOpen size={14} className="mr-2" />
            <span>{journal.journal}</span>
          </div>
          <div className="text-xs text-gray-500">
            {journal.volume} • {journal.pages}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {journal.abstract}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye size={12} className="mr-1" />
              <span>{journal.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Download size={12} className="mr-1" />
              <span>{journal.downloads.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-blue-600 font-medium">
            DOI: {journal.doi}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center">
            <Eye size={16} className="mr-2" />
            View Details
          </button>
          <button 
            onClick={() => handleDownload(journal)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-xl min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Journal Publications</h1>
            <p className="text-gray-600 text-sm">Discover and download academic papers</p>
          </div>
          
          {/* Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search journals, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Year Filter */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Calendar className="mr-2" size={20} />
              Publication Year
            </h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
          </div>
          
          {/* Categories */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Filter className="mr-2" size={20} />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                    <ChevronRight size={16} className={`ml-2 transition-transform ${
                      selectedCategory === category.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Latest Publications
              </h2>
              <div className="text-sm text-gray-600">
                Showing {filteredJournals.length} of {journals.length} publications
              </div>
            </div>
            
            {selectedCategory !== 'all' && (
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-600 mr-2">Filtered by:</span>
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {selectedCategory}
                </span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
          
          {filteredJournals.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <BookOpen size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No publications found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredJournals.map(journal => (
                <JournalCard key={journal.id} journal={journal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalsPublicationsPage;
