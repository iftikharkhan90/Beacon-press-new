import { FaBook, FaFlask, FaFileAlt, FaProjectDiagram } from "react-icons/fa";

const WhatCanWePublish = () => {
  const items = [
    {
      title: "Research Articles",
      description:
        "We accept high-quality original research articles across all scientific disciplines.",
      icon: <FaFlask className="text-indigo-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Books",
      description:
        "We publish academic and professional books to help authors share extensive knowledge with the global community.",
      icon: <FaBook className="text-green-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Review Papers",
      description:
        "Comprehensive review papers that summarize and evaluate existing research in your field.",
      icon: <FaFileAlt className="text-orange-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Case Studies",
      description:
        "Detailed case reports and studies highlighting unique insights and practical applications.",
      icon: <FaProjectDiagram className="text-pink-500 text-4xl mb-4 mx-auto" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-800">
          Our Publishing Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {item.icon}
              <h3 className="text-lg font-bold mb-3 text-slate-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatCanWePublish;
