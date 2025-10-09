// Featured Journals Component
const FeaturedJournals = () => {
  const journals = [
    {
      id: 1,
      title: "Plant Environment & Agriculture",
      description: "A peer-reviewed journal focusing on sustainable agriculture, plant sciences, and environmental impact.",
      impactFactor: "3.2",
      image: "🌱"
    },
    {
      id: 2,
      title: "Journal of Social Sciences",
      description: "An interdisciplinary journal dedicated to research in sociology, psychology, economics, and political science.",
      impactFactor: "2.8",
      image: "📊"
    },
    {
      id: 3,
      title: "Applied Mathematics",
      description: "A premier journal for research in applied mathematics, computational methods, and mathematical modeling.",
      impactFactor: "4.1",
      image: "🔢"
    }
  ];

  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-800">
          Explore Our Leading Journals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.map((journal) => (
            <div
              key={journal.id}
              className="bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-4">{journal.image}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{journal.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{journal.description}</p>
              <p className="text-sm font-bold text-slate-800 mb-4">
                <strong>Impact Factor:</strong> {journal.impactFactor}
              </p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded font-bold hover:bg-blue-600 transition-all duration-300 cursor-pointer">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedJournals