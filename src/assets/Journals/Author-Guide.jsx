import React from 'react'

const Author = () => {
  return (
    <div>
   <div className=" ml-60 mr-60 leading-loose">
  <h1 className='text-2xl font-sans font-bold'>Authorship</h1>
  <p className='font-sans text-sm'>
    All authors should have made substantial contributions to all of the following:
  </p>

  <ol className="list-decimal text-sm font-sans ml-6">
    <li className='text-sm font-sans'>
      The conception and design of the study, or acquisition of data, or analysis
      and interpretation of data.
    </li>
    <li className='text-sm font-sans'>
      Drafting the article or revising it critically for important intellectual
      content.
    </li>
    <li className='text-sm font-sans'>Final approval of the version to be submitted.</li>
  </ol>

  <p className='text-sm font-sans'>
    Authors should appoint a corresponding author to communicate with the journal
    during the editorial process. All authors should agree to be accountable for
    all aspects of the work to ensure that the questions related to the accuracy
    or integrity of any part of the work are appropriately investigated and
    resolved.
  </p>

  <h2 className='text-lg font-bold font-sans'>Changes to Authorship</h2>
  <p className='text-sm font-sans'>
    The editors of this journal generally will not consider changes to authorship
    once a manuscript has been submitted. It is important that authors carefully
    consider the authorship list and order of authors and provide a definitive
    author list at original submission.
  </p>

  <p className='text-sm font-sans font-semibold'>The policy of this journal around authorship changes:</p>

  <ul className="list-disc text-sm font-sans ml-6">
    <li className='text-sm font-sans'>
      All authors must be listed in the manuscript and their details entered into
      the submission system.
    </li>
    <li className='text-sm font-sans'>
      Any addition, deletion or rearrangement of author names in the authorship
      list should only be made prior to acceptance, and only if approved by the
      journal editor.
    </li>
    <li className='text-sm font-sans'>
      Requests to change authorship should be made by the corresponding author,
      who must provide the reason for the request to the journal editor with
      written confirmation from all authors, including any authors being added or
      removed, that they agree with the addition, removal or rearrangement.
    </li>
    <li className='text-sm font-sans'>
      All requests to change authorship must be submitted using this form.
      Requests which do not comply with the instructions outlined in the form will
      not be considered.
    </li>
    <li className='text-sm font-sans'>
      Only in exceptional circumstances will the journal editor consider the
      addition, deletion or rearrangement of authors post acceptance.
    </li>
    <li>
      Publication of the manuscript may be paused while a change in authorship
      request is being considered.
    </li>
    <li className='text-sm font-sans'>
      Any authorship change requests approved by the journal editor will result in
      a corrigendum if the manuscript has already been published.
    </li>
    <li className='text-sm font-sans'>
      Any unauthorized authorship changes may result in the rejection of the
      article, or retraction, if the article has already been published.
    </li>
  </ul>
</div>


    </div>
  )
}

export default Author
