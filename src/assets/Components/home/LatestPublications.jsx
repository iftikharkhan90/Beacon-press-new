const LatestPublications = () => {
  const publications = [
    {
      title: "Impact of Climate Change on Crop Yields",
      journal: "Plant Environment & Agriculture",
      authors: "Jane Doe et al."
    },
    {
      title: "Social Media and Mental Health: A Global Perspective",
      journal: "Journal of Social Sciences",
      authors: "John Smith et al."
    },
    {
      title: "Optimization Algorithms for Renewable Energy Systems",
      journal: "Applied Mathematics",
      authors: "Emily Brown et al."
    }
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-800">
          Recent Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((publication, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold mb-3 text-slate-800">{publication.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Journal:</strong> {publication.journal}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Authors:</strong> {publication.authors}
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded font-bold hover:bg-blue-600 transition-all duration-300">
                Read Paper
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default LatestPublications