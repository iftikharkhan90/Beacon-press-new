// src/App.js
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Maximum Academic Press Marks Milestone",
    subtitle: "Eight Journals Awarded Their First Impact Factor",
    img: "/journals.png", // place your image in public/
  },
  {
    title: "Innovative Research in Agriculture",
    subtitle: "Shaping the future of sustainable farming",
    img: "/journals.png",
  },
];

const journals = [
  { name: "Forest Research", img: "/forest.jpg" },
  { name: "Fruit Research", img: "/fruit.jpg" },
  { name: "Grassland Research", img: "/grass.jpg" },
  { name: "Medicinal Plant Biology", img: "/medicinal.jpg" },
  { name: "Ornamental Plant Research", img: "/ornamental.jpg" },
  { name: "Seed Biology", img: "/seed.jpg" },
  { name: "Technology in Horticulture", img: "/tech.jpg" },
  { name: "Vegetable Research", img: "/vegetable.jpg" },
];

export default function App() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Max Academic Press</h1>
        <ul className="hidden md:flex gap-6 font-medium">
          <li className="hover:text-yellow-300 cursor-pointer">Home</li>
          <li className="hover:text-yellow-300 cursor-pointer">Journals</li>
          <li className="hover:text-yellow-300 cursor-pointer">About</li>
          <li className="hover:text-yellow-300 cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section / Slider */}
      <section className="relative w-full h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              alt="slide"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center px-10">
              <div className="text-white max-w-lg">
                <h2 className="text-3xl md:text-5xl font-bold leading-snug">
                  {slide.title}
                </h2>
                <p className="mt-4 text-lg">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-4 p-3 bg-white/30 rounded-full hover:bg-white/50"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-4 p-3 bg-white/30 rounded-full hover:bg-white/50"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Journals Showcase */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Featured Journals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {journals.map((journal, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={journal.img}
                alt={journal.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{journal.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg leading-relaxed">
          Maximum Academic Press is committed to advancing global knowledge
          through high-quality publishing. Our journals cover diverse fields,
          offering researchers and academics a platform to share their work and
          impact the world.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Max Academic Press. All rights reserved.</p>
          <ul className="flex gap-6 mt-4 md:mt-0">
            <li className="hover:text-yellow-300 cursor-pointer">Privacy</li>
            <li className="hover:text-yellow-300 cursor-pointer">Terms</li>
            <li className="hover:text-yellow-300 cursor-pointer">Help</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
