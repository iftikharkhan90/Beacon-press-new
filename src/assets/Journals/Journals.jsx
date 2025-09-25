import React, { useState, useEffect } from 'react';
import { Download, Filter, Eye, X, Menu, ChevronDown } from 'lucide-react';

const JournalsPublicationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('all');
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isMobileReferencesOpen, setIsMobileReferencesOpen] = useState(false);

  // Sample data
  const journals = [
    {
      id: 1,
      title: "Advanced Machine Learning Techniques in Healthcare",
      authors: ["Dr. Sarah Johnson", "Prof. Michael Chen", "Dr. Emily Rodriguez"],
      journal: "Journal of Medical AI",
      year: 2024,
      volume: "Vol 15, Issue 3",
      category: "AI & Healthcare",
      classification: "Original Research",
      abstract: "Explores cutting-edge machine learning algorithms applied to diagnostic imaging and patient outcome prediction.",
      pages: "pp. 45-62",
      doi: "10.1234/jmai.2024.15.3.45",
      views: 1247,
      downloads: 856,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      references: [
        "Smith J., 2022. Machine learning in healthcare. MedTech Journal.",
        "Brown P. et al., 2023. AI for diagnostics. AI Health Review.",
        "Johnson R., 2021. Neural networks in medicine. HealthAI."
      ]
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions for Urban Development",
      authors: ["Dr. Ahmed Hassan", "Prof. Lisa Wang"],
      journal: "Environmental Engineering Review",
      year: 2024,
      volume: "Vol 28, Issue 2",
      category: "Environment",
      classification: "Review Paper",
      abstract: "Study on renewable energy systems in metropolitan areas with cost-effectiveness focus.",
      pages: "pp. 112-128",
      doi: "10.1234/eer.2024.28.2.112",
      views: 892,
      downloads: 634,
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop",
      references: [
        "Lee T., 2023. Urban renewable energy adoption. EnviroEng Review.",
        "Hassan A., 2022. Sustainable infrastructure planning. Green Cities Journal."
      ]
    },
    {
      id: 3,
      title: "Quantum Computing Applications in Cryptography",
      authors: ["Prof. Robert Kim", "Dr. Anna Petrov", "Dr. James Wright"],
      journal: "Quantum Science Quarterly",
      year: 2023,
      volume: "Vol 7, Issue 4",
      category: "Computer Science",
      classification: "Case Study",
      abstract: "Analysis of quantum algorithms for next-generation encryption methods.",
      pages: "pp. 78-94",
      doi: "10.1234/qsq.2023.7.4.78",
      views: 2156,
      downloads: 1423,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
      references: [
        "Kim R., 2023. Quantum key distribution. CyberSecurity Journal.",
        "Petrov A., 2022. Post-quantum cryptography. QTech."
      ]
    },
     {
      id: 4,
      title: "Neuroplasticity and Memory Formation",
      authors: ["Prof. Jennifer Lee", "Dr. Marco Rossi"],
      journal: "Neuroscience Advances",
      year: 2023,
      volume: "Vol 34, Issue 6",
      category: "Neuroscience",
      classification: "Short Communication",
      abstract: "Investigation into synaptic changes during learning processes.",
      pages: "pp. 156-172",
      doi: "10.1234/na.2023.34.6.156",
      views: 1789,
      downloads: 1234,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
      references: [
        "Lee J., 2023. Memory pathway mapping. NeuroSci Journal.",
        "Rossi M., 2021. Brain plasticity studies. Neural Research."
      ]
    },
    {
      id: 5,
      title: "Urban Flood Management with IoT Sensors",
      authors: ["Dr. Kevin Zhang", "Prof. Isabella Garcia"],
      journal: "Urban Technology Review",
      year: 2024,
      volume: "Vol 19, Issue 2",
      category: "Technology",
      classification: "Other",
      abstract: "IoT solutions for real-time flood monitoring and response systems.",
      pages: "pp. 89-107",
      doi: "10.1234/utr.2024.19.2.89",
      views: 1123,
      downloads: 765,
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=300&h=200&fit=crop",
      references: [
        "Garcia I., 2023. Smart city water management. TechUrban Journal.",
        "Zhang K., 2022. IoT in environmental monitoring. IoTWorld."
      ]
    },
    {
      id: 6,
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
      id: 7,
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

  // Filters
  const categories = [{ id: 'all', name: 'All Categories', count: journals.length },
    ...[...new Set(journals.map(j => j.category))].map(cat => ({
      id: cat,
      name: cat,
      count: journals.filter(j => j.category === cat).length
    }))
  ];

  const classifications = [{ id: 'all', name: 'All Classifications', count: journals.length },
    ...[...new Set(journals.map(j => j.classification).filter(Boolean))].map(c => ({
      id: c,
      name: c,
      count: journals.filter(j => j.classification === c).length
    }))
  ];

  const years = ['all', ...new Set(journals.map(j => j.year.toString()))];

  const filteredJournals = journals.filter(journal => {
    const matchesCategory = selectedCategory === 'all' || journal.category === selectedCategory;
    const matchesClassification = selectedClassification === 'all' || journal.classification === selectedClassification;
    const matchesSearch = !searchTerm ||
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = selectedYear === 'all' || journal.year.toString() === selectedYear;
    return matchesCategory && matchesClassification && matchesSearch && matchesYear;
  });

  const handleDownload = (journal) => {
    alert(`Downloading "${journal.title}"`);
  };

  // Close mobile filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileFiltersOpen && !event.target.closest('.mobile-filters')) {
        setIsMobileFiltersOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileFiltersOpen]);

  const JournalCard = ({ journal }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <img 
        src={journal.image} 
        alt={journal.title} 
        className="w-full h-32 sm:h-40 lg:h-48 object-cover"
      />
      <div className="p-4 sm:p-6">
        <span className="inline-block px-2 sm:px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
          {journal.category}
        </span>
        <h3 className="text-lg sm:text-xl font-bold mt-2 sm:mt-3 mb-2 sm:mb-3 line-clamp-2">
          {journal.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">{journal.abstract}</p>
        <div className="flex flex-col sm:flex-row mt-4 space-y-2 sm:space-y-0 sm:space-x-3">
          <button 
            onClick={() => setSelectedJournal(journal)} 
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            <Eye size={16} className="inline-block mr-2" /> View Details
          </button>
          <button 
            onClick={() => handleDownload(journal)} 
            className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors"
          >
            <Download size={16} className="inline-block sm:inline mr-2 sm:mr-0" />
            <span className="sm:hidden">Download</span>
          </button>
        </div>
      </div>
    </div>
  );

  const FilterSection = ({ className = "" }) => (
    <div className={className}>
      {/* Search */}
      <div className="p-4 sm:p-6 border-b">
        <input
          type="text"
          placeholder="Search journals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Year Filter */}
      <div className="p-4 sm:p-6 border-b">
        <h3 className="mb-2 font-semibold text-sm sm:text-base">Publication Year</h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year === 'all' ? 'All Years' : year}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className="p-4 sm:p-6 border-b">
        <h3 className="mb-3 font-semibold flex items-center text-sm sm:text-base">
          <Filter size={16} className="mr-2" /> Categories
        </h3>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`block w-full text-left px-4 py-2 rounded-lg mb-1 text-sm transition-colors ${
              selectedCategory === category.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Classification */}
      <div className="p-4 sm:p-6">
        <h3 className="mb-3 font-semibold flex items-center text-sm sm:text-base">
          <Filter size={16} className="mr-2" /> Classification
        </h3>
        {classifications.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedClassification(c.id)}
            className={`block w-full text-left px-4 py-2 rounded-lg mb-1 text-sm transition-colors ${
              selectedClassification === c.id ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
            }`}
          >
            {c.name} ({c.count})
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      
      {/* Mobile Filter Button */}
      <div className="lg:hidden bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Journals & Publications</h1>
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
        </div>
        
        {/* Results count */}
        <div className="mt-2 text-sm text-gray-600">
          Showing {filteredJournals.length} of {journals.length} publications
        </div>
      </div>

      <div className="flex min-h-screen">
        
        {/* Desktop Left Sidebar */}
        <div className="hidden lg:block w-80 bg-white shadow-xl min-h-screen overflow-y-auto">
          <FilterSection />
        </div>

        {/* Mobile Filters Overlay */}
        {isMobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="mobile-filters bg-white w-80 max-w-[90vw] h-full overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterSection />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {!selectedJournal ? (
            <>
              {/* Desktop Results Header */}
              <div className="hidden lg:block mb-6">
                <h1 className="text-2xl xl:text-3xl font-bold mb-2">Journals & Publications</h1>
                <p className="text-gray-600">
                  Showing {filteredJournals.length} of {journals.length} publications
                </p>
              </div>

              {/* Journal Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {filteredJournals.map(journal => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
              </div>

              {/* No results message */}
              {filteredJournals.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No publications found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedClassification('all');
                      setSelectedYear('all');
                      setSearchTerm('');
                    }}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Detail View */
            <div className="max-w-4xl mx-auto">
              {/* Detail Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-0 pr-4">
                  {selectedJournal.title}
                </h2>
                <button 
                  onClick={() => {
                    setSelectedJournal(null);
                    setIsMobileReferencesOpen(false);
                  }}
                  className="self-start p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <img
                src={selectedJournal.image}
                alt={selectedJournal.title}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg mb-4 sm:mb-6"
              />

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {selectedJournal.abstract}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="mb-2">
                      <strong className="text-gray-800">Authors:</strong> {selectedJournal.authors.join(', ')}
                    </p>
                    <p className="mb-2">
                      <strong className="text-gray-800">Journal:</strong> {selectedJournal.journal}
                    </p>
                    {selectedJournal.volume && (
                      <p className="mb-2">
                        <strong className="text-gray-800">Volume:</strong> {selectedJournal.volume}
                      </p>
                    )}
                    <p className="mb-2">
                      <strong className="text-gray-800">Year:</strong> {selectedJournal.year}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <strong className="text-gray-800">Pages:</strong> {selectedJournal.pages}
                    </p>
                    {selectedJournal.classification && (
                      <p className="mb-2">
                        <strong className="text-gray-800">Classification:</strong> {selectedJournal.classification}
                      </p>
                    )}
                    <p className="mb-2">
                      <strong className="text-gray-800">DOI:</strong> {selectedJournal.doi}
                    </p>
                    <div className="flex gap-4">
                      <p><strong className="text-gray-800">Views:</strong> {selectedJournal.views}</p>
                      <p><strong className="text-gray-800">Downloads:</strong> {selectedJournal.downloads}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => handleDownload(selectedJournal)}
                    className="bg-green-600 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                  >
                    <Download size={16} className="mr-2" /> Download PDF
                  </button>

                  {/* Mobile References Toggle */}
                  {selectedJournal.references && (
                    <button
                      onClick={() => setIsMobileReferencesOpen(!isMobileReferencesOpen)}
                      className="lg:hidden bg-gray-600 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    >
                      References
                      <ChevronDown 
                        size={16} 
                        className={`ml-2 transition-transform ${isMobileReferencesOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile References */}
              {selectedJournal.references && isMobileReferencesOpen && (
                <div className="lg:hidden bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">References</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {selectedJournal.references.map((ref, idx) => (
                      <li key={idx} className="text-gray-700 text-sm leading-relaxed">{ref}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Right Sidebar - References */}
        {selectedJournal && selectedJournal.references && (
          <div className="hidden lg:block w-80 xl:w-96 bg-white shadow-xl p-6 border-l overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">References</h3>
            <ul className="list-disc list-inside space-y-3">
              {selectedJournal.references.map((ref, idx) => (
                <li key={idx} className="text-gray-700 text-sm leading-relaxed">{ref}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalsPublicationsPage;