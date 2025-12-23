import React from 'react'

const Article = () => {
  return (
    <div>
      <div className="px-8 ml-60 mr-60 leading-loose text-justify py-6">
<h1 className="text-2xl font-sans font-bold mb-4">Article Processing Charges (APC)</h1>


<p className='text-sm font-sans'>
To support the open access publication model and ensure high-quality editorial and
production processes, the journal applies Article Processing Charges (APCs) for
accepted manuscripts. These charges help cover editorial review, typesetting,
archiving, indexing, and online hosting.
</p>


<h2 className="text-lg font-sans font-semibold mt-6">APC Structure</h2>
<ul className="list-disc text-sm font-sans ml-6">
<li className='text-sm font-sans'> Regular Research Articles: $200</li>
<li className='text-sm font-sans'>Books: $250</li>
<li className='text-sm font-sans'>Laboratory Manuals: $120</li>
<li className='text-sm font-sans'>Monographs: $150</li>
</ul>


<h2 className="text-lg font-sans font-semibold mt-6">Waivers & Discounts</h2>
<p className='text-sm font-sans'>
The journal offers APC waivers and discounts to ensure equitable access for authors
regardless of financial limitations.
</p>
<ul className="list-disc ml-6 text-sm font-sans">
<li className='text-sm font-sans'>Full waivers for authors from low-income countries.</li>
<li className='text-sm font-sans'>Up to 50% discount for students or early‑career researchers.</li>
<li className='text-sm font-sans'>Special consideration for high‑quality papers with significant contribution.</li>
</ul>


<h2 className="text-lg font-sans font-semibold mt-6">Payment Process</h2>
<ol className="list-decimal text-sm font-sans ml-6">
<li className='text-sm font-sans'>APC is due only after the manuscript is accepted.</li>
<li className='text-sm font-sans'>An invoice will be sent to the corresponding author.</li>
<li className='text-sm font-sans'>Payment can be made via bank transfer, credit card, or institutional support.</li>
</ol>


<h2 className="text-lg font-sans font-semibold mt-6">Refund Policy</h2>
<p className='text-sm font-sans'>
APCs are non‑refundable once the article enters production. In cases of technical
error or journal-side issues, partial refunds may be considered.
</p>


<p className="font-sans text-sm mt-6">
For questions or waiver requests, authors may contact the editorial office through
the journal's official communication channel.
</p>
</div>
    </div>
  )
}

export default Article
