import React, { useState } from 'react';
import { Download, Filter, Eye, X } from 'lucide-react';

const JournalsPublicationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('all');
  const [selectedJournal, setSelectedJournal] = useState(null);

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

  const JournalCard = ({ journal }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden group">
      <img src={journal.image} alt={journal.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
          {journal.category}
        </span>
        <h3 className="text-xl font-bold mt-3 mb-3">{journal.title}</h3>
        <p className="text-sm text-gray-600">{journal.abstract}</p>
        <div className="flex mt-4 space-x-3">
          <button onClick={() => setSelectedJournal(journal)} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg">
            <Eye size={16} className="inline-block mr-2" /> View Details
          </button>
          <button onClick={() => handleDownload(journal)} className="bg-green-600 text-white py-2 px-4 rounded-lg">
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      
      {/* Left Sidebar */}
      <div className="w-80 bg-white shadow-xl min-h-screen overflow-y-auto">
        
        {/* Search */}
        <div className="p-6 border-b">
          <input
            type="text"
            placeholder="Search journals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Year Filter */}
        <div className="p-6 border-b">
          <h3 className="mb-2 font-semibold">Publication Year</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year === 'all' ? 'All Years' : year}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div className="p-6 border-b">
          <h3 className="mb-3 font-semibold flex items-center"><Filter size={16} className="mr-2" /> Categories</h3>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-1 ${
                selectedCategory === category.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Classification */}
        <div className="p-6">
          <h3 className="mb-3 font-semibold flex items-center"><Filter size={16} className="mr-2" /> Classification</h3>
          {classifications.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedClassification(c.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-1 ${
                selectedClassification === c.id ? 'bg-green-100' : 'hover:bg-gray-100'
              }`}
            >
              {c.name} ({c.count})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {!selectedJournal ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredJournals.map(journal => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        ) : (
          <div>
            {/* Detail View */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold">{selectedJournal.title}</h2>
              <button onClick={() => setSelectedJournal(null)}><X size={24} /></button>
            </div>

            <img
              src={selectedJournal.image}
              alt={selectedJournal.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <p className="text-gray-600 mb-4">{selectedJournal.abstract}</p>
            <p><strong>Authors:</strong> {selectedJournal.authors.join(', ')}</p>
            <p><strong>Journal:</strong> {selectedJournal.journal}</p>
            {selectedJournal.volume && <p><strong>Volume:</strong> {selectedJournal.volume}</p>}
            <p><strong>Year:</strong> {selectedJournal.year}</p>
            <p><strong>Pages:</strong> {selectedJournal.pages}</p>
            {selectedJournal.classification && <p><strong>Classification:</strong> {selectedJournal.classification}</p>}
            <p><strong>DOI:</strong> {selectedJournal.doi}</p>
            <p><strong>Views:</strong> {selectedJournal.views}</p>
            <p><strong>Downloads:</strong> {selectedJournal.downloads}</p>

            <button
              onClick={() => handleDownload(selectedJournal)}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <Download size={16} className="mr-2" /> Download PDF
            </button>
          </div>
        )}
      </div>

      {/* Right Sidebar - References */}
      {selectedJournal && selectedJournal.references && (
        <div className="w-80 bg-white shadow-xl p-6 border-l overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">References</h3>
          <ul className="list-disc list-inside space-y-2">
            {selectedJournal.references.map((ref, idx) => (
              <li key={idx} className="text-gray-700">{ref}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JournalsPublicationsPage;
