import { FaClock, FaGlobe, FaUnlockAlt, FaHandsHelping } from "react-icons/fa"; // Example icons

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Fast Peer Review",
      description:
        "Our efficient peer review process ensures timely feedback and publication.",
      icon: <FaClock className="text-indigo-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Global Reach",
      description:
        "We serve researchers from over 100 countries, ensuring your work reaches a worldwide audience.",
      icon: <FaGlobe className="text-green-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Open Access",
      description:
        "All our journals are open access, promoting transparency and accessibility.",
      icon: <FaUnlockAlt className="text-orange-500 text-4xl mb-4 mx-auto" />,
    },
    {
      title: "Support for Authors",
      description:
        "From submission to publication, we provide comprehensive support to our authors.",
      icon: <FaHandsHelping className="text-pink-500 text-4xl mb-4 mx-auto" />,
    },
  ];

  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-800">
          Why Publish with Beacons Press?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {reason.icon}
              <h3 className="text-lg font-bold mb-3 text-slate-800">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
