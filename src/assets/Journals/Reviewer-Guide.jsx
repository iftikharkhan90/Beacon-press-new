import React from "react";

const ReviewerGuide = () => {
  return (
    <div className="px-8 ml-60 mr-60 leading-loose text-justify py-6">
      <h1 className="text-2xl font-bold mb-4">Reviewer Guide</h1>

      <p>
        Peer reviewers play a vital role in ensuring the quality, accuracy, and integrity of
        the research published in this journal. This guide provides clear instructions and
        expectations for reviewers to follow during the evaluation process.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Responsibilities of Reviewers</h2>
      <ol className="list-decimal ml-6">
        <li>Provide an objective, fair, and constructive evaluation of the manuscript.</li>
        <li>Maintain strict confidentiality throughout the review process.</li>
        <li>Avoid using any information from the manuscript for personal advantage.</li>
        <li>Identify any potential conflicts of interest and inform the editor immediately.</li>
        <li>Report any ethical issues such as plagiarism or data manipulation.</li>
      </ol>

      <h2 className="text-xl font-semibold mt-6">2. Review Process</h2>
      <p>Reviewers are expected to assess the manuscript based on the following criteria:</p>
      <ul className="list-disc ml-6">
        <li>Originality and significance of the research.</li>
        <li>Clarity and coherence of writing.</li>
        <li>Methodological rigor and validity of results.</li>
        <li>Relevance of cited literature and references.</li>
        <li>Ethical compliance and transparency of data.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">3. Structure of the Review Report</h2>
      <p>Reviewers should structure their comments clearly and professionally:</p>
      <ol className="list-decimal ml-6">
        <li><strong>Summary:</strong> Brief overview of the manuscript.</li>
        <li><strong>Major Comments:</strong> Critical issues that must be addressed.</li>
        <li><strong>Minor Comments:</strong> Suggestions for improving clarity or style.</li>
        <li><strong>Recommendation:</strong> Accept, revise, or reject.</li>
      </ol>

      <h2 className="text-xl font-semibold mt-6">4. Reviewer Ethics</h2>
      <ul className="list-disc ml-6">
        <li>Do not contact the authors directly.</li>
        <li>Avoid bias based on nationality, gender, or background.</li>
        <li>Only accept reviews for manuscripts relevant to your expertise.</li>
        <li>Complete the review within the assigned time frame.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">5. Confidentiality</h2>
      <p>
        All manuscripts under review are confidential documents. Reviewers must not share
        them with colleagues or students without written permission from the editor.
      </p>

      <h2 className="text-xl font-semibold mt-6">6. How to Submit Your Review</h2>
      <ol className="list-decimal ml-6">
        <li>Log in to the journal's online submission system.</li>
        <li>Access the manuscript assigned to you.</li>
        <li>Upload your review report and recommendation.</li>
        <li>Ensure all comments are respectful, clear, and constructive.</li>
      </ol>

      <p className="mt-6">
        We appreciate the valuable time and expertise reviewers contribute to maintaining
        the high standards of this journal.
      </p>
    </div>
  );
}

export default ReviewerGuide