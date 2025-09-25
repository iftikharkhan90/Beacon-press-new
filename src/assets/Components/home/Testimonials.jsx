const Testimonials = () => {
  const testimonials = [
    {
      quote: "Publishing with Beacons Press was a seamless experience. The peer review process was thorough and constructive.",
      author: "Dr. Jane Doe, Plant Scientist"
    },
    {
      quote: "The Journal of Social Sciences provided a great platform to share my research on global inequality.",
      author: "Dr. John Smith, Sociologist"
    },
    {
      quote: "Applied Mathematics is a top-tier journal with a rigorous review process. Highly recommended!",
      author: "Dr. Emily Brown, Mathematician"
    }
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-800">
          What Our Authors Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-bold text-slate-800">– {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Testimonials