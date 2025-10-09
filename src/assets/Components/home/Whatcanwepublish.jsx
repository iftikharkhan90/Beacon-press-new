import { FaBook, FaFlask, FaFileAlt, FaUniversity, FaScroll } from "react-icons/fa";

const WhatCanWePublish = () => {
  const items = [
    {
      title: "Journals",
      description:
        "We publish peer-reviewed journals across multiple academic disciplines to promote high-impact scholarly communication.",
      icon: <FaFileAlt className="text-indigo-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Books",
      description:
        "We publish academic and professional books authored by scholars and experts to share in-depth knowledge globally.",
      icon: <FaBook className="text-green-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Laboratory Manuals",
      description:
        "Comprehensive laboratory manuals designed to support experimental learning and scientific education.",
      icon: <FaFlask className="text-pink-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Conference Proceedings",
      description:
        "We publish proceedings from academic conferences to preserve and disseminate research presented at scholarly events.",
      icon: <FaUniversity className="text-orange-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Monographs",
      description:
        "Detailed monographs offering focused research and in-depth analysis on specialized academic topics.",
      icon: <FaScroll className="text-violet-500 text-4xl mb-4 mx-auto" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-800">
          Our Publishing Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
