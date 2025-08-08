const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-grey-100 text-black py-10 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">About Beacons-Press</h1>
          <p className="text-lg md:text-xl font-light">
            Delivering truth, inspiring change — your trusted global news source.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 md:px-20 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl border-gray-100">
            <h2 className="p-2 w-full max-w-md text-2xl font-bold text-center">Our Mission</h2>
            <p className="text-black leading-relaxed rounded-2xl shadow-xl p-6">
              At Beacons-Press, our mission is to illuminate the world with accurate, timely, and 
              unbiased journalism. We strive to empower individuals, communities, and nations 
              through fact-driven storytelling and investigative reporting.
            </p>
          </div>
          <div className="bg-white rounded-2xl border-gray-100">
            <h2 className="p-2 w-full max-w-md text-2xl font-bold text-center">Our Vision</h2>
            <p className="text-black p-9 leading-relaxed rounded-2xl shadow-xl">
              We envision a global society where informed citizens can make decisions that 
              promote justice, equality, and sustainable development — guided by the light of truth.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-white py-16 px-7 md:px-20 p-3">
        <div className="max-w-5xl mx-auto bg-gray-100 p-5 rounded-2xl border-white">
          <h2 className="text-2xl text-center font-bold mb-6">Our Story</h2>
          <p className="text-black leading-relaxed mb-4">
            Founded in 1995, Beacons-Press began as a small independent news outlet committed 
            to fearless reporting. Over the decades, we have grown into an internationally 
            recognized media network, reaching millions of readers across continents.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our award-winning journalists, photographers, and correspondents operate in over 
            40 countries, covering stories that matter — from breaking news to in-depth 
            investigative reports.
          </p>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="bg-gray-100 py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto p-5 bg-white rounded-2xl border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6">Editorial Standards & Ethics</h2>
          <p className="text-black leading-relaxed">
            Our credibility is built on truth and transparency. We adhere to the highest 
            standards of journalistic ethics, ensuring that our reporting is impartial, 
            evidence-based, and accountable. Every story undergoes rigorous fact-checking 
            and editorial review before publication.
          </p>
        </div>
      </section>

      {/* Global Presence */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Global Presence</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center bg-gray-100 shadow-2xl max-w-5xl mx-auto p-5 rounded-2xl border-white">
            {[
              { country: "New York, USA", role: "Headquarters" },
              { country: "London, UK", role: "Europe Bureau" },
              { country: "Dubai, UAE", role: "Middle East Bureau" },
              { country: "Singapore", role: "Asia Bureau" },
              { country: "Nairobi, Kenya", role: "Africa Bureau" },
              { country: "Sydney, Australia", role: "Oceania Bureau" },
            ].map((office, idx) => (
              <div key={idx} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold">{office.country}</h3>
                <p className="text-gray-600">{office.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gradient-to-r bg-gray-100 text-black py-12 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">For press inquiries, partnerships, or media requests:</p>
          <a
            href="mailto:contact@beacons-press.com"
            className="inline-block bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            contact@beacons-press.com
          </a>
        </div>
      </section>
    </div>
  );
}
 
export default AboutUs