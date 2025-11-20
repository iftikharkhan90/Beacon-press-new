import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedJournals from './featured-journals';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import LatestPublications from './LatestPublications';
import Footer from './Footer';
import { Sliders } from 'lucide-react';
import WhatCanWePublish from './Whatcanwepublish';
import Journals from './Journals';



const Home = ({ setCurrentPage }) => {
  return (
<div className='App'>
      
<section
  className="bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-gray-100 text-white py-[100px] text-center"
>
      <div className="container mx-auto max-w-6xl px-4">
<h2 className="text-[36px] mb-5 text-black font-bold" >         Advancing Knowledge Through Open Access Research
        </h2>
 <p className="text-[18px] text-black mb-7">          Beacons Press is a leading publisher of high-quality, peer-reviewed research across diverse disciplines. 
          Explore our journals, submit your work, and join a global community of researchers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={() => setCurrentPage('journals')}
            className="bg-blue-500 text-white px-8 py-3 rounded font-bold hover:bg-blue-600 transition-all duration-300 cursor-pointer"
          >
            Browse Journals
          </button>
          <Link to="/submit">
          <button
            onClick={() => setCurrentPage('submit')}
            className="bg-transparent text-blue-400 border-2 border-blue-400 px-8 py-3 rounded font-bold hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Submit Your Manuscript
          </button>
          </Link>
        </div>
      </div>
    </section>
      {/* <Sliders/> */}
      <FeaturedJournals/>
      <WhatCanWePublish/>
      <WhyChooseUs/>
      <Testimonials/>
      <LatestPublications/>
      <Journals/>
      <Footer/>
      
    </div>

  );
};

export default Home