import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Swal from "sweetalert2";
import {
  COUNTRIES,
  PRE_SUBMISSION_CHECKLIST,
  MOCK_OLD_SUBMISSIONS,
  LOCAL_STORAGE_KEY,
  debounce,
  saveDraft,
  loadDraft,
} from "./utils";
import StepHeader from "./StepHeader";
import QuickLinks from "./QuickLinks";
import ChecklistStep from "./ChecklistStep";
import ManuscriptDetailsStep from "./ManuscriptDetailsStep";
import ReviewersStep from "./ReviewersStep";
import UploadFilesStep from "./UploadFilesStep";
import ReviewSubmitStep from "./ReviewSubmitStep";
import AllSubmissions from "./AllSubmission";

const SubmissionDashboard = () => {
  // State management
  const [view, setView] = useState("online");
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [checklistConfirmed, setChecklistConfirmed] = useState(false);
  const [manuscript, setManuscript] = useState({
    title: "",
    type: "",
    runningTitle: "",
    subject: "",
    abstract: "",
    keyword: "",
    correspondingName: "",
    correspondingEmail: "",
  });

  const [isModalDataComplete, setIsModalDataComplete] = useState(false);
  const [modalAuthor, setModalAuthor] = useState([]);

  const [reviewers, setReviewers] = useState([
    { fullName: "", affiliation: "", country: "", email: "" },
  ]);

  const [conflictOfInterest, setConflictOfInterest] = useState(null);
  const [conflictDescription, setConflictDescription] = useState("");
  const [dataAvailability, setDataAvailability] = useState("");
  const [oldSubmissions, setOldSubmissions] = useState(MOCK_OLD_SUBMISSIONS);
  const [previewSubmission, setPreviewSubmission] = useState(null);
  const [step2Errors, setStep2Errors] = useState({});
  const [step3Errors, setStep3Errors] = useState({});
  const [manuscriptFile, setManuscriptFile] = useState(null);
  const [figuresFile, setFiguresFile] = useState(null);
  const [supplementaryFile, setSupplementaryFile] = useState(null);
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [step4Error, setStep4Error] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
 
  // Track completed steps
  useEffect(() => {
    const newCompletedSteps = [];
    if (step > 1) newCompletedSteps.push(1);
    if (step > 2) newCompletedSteps.push(2);
    if (step > 3) newCompletedSteps.push(3);
    if (step > 4) newCompletedSteps.push(4);
    if (step > 5) newCompletedSteps.push(5);

    setCompletedSteps(newCompletedSteps);
  }, [step]);

  // Load saved draft from localStorage
  useEffect(() => {
    const savedDraft = loadDraft();
    if (savedDraft) {
      if (savedDraft.manuscript) setManuscript(savedDraft.manuscript);
      if (savedDraft.modalAuthor) setModalAuthor(savedDraft.modalAuthor);
      if (savedDraft.isModalDataComplete !== undefined)
        setIsModalDataComplete(savedDraft.isModalDataComplete);
      if (savedDraft.reviewers) setReviewers(savedDraft.reviewers);
      if (savedDraft.conflictOfInterest !== undefined)
        setConflictOfInterest(savedDraft.conflictOfInterest);
      if (savedDraft.conflictDescription)
        setConflictDescription(savedDraft.conflictDescription);
      if (savedDraft.dataAvailability)
        setDataAvailability(savedDraft.dataAvailability);
      if (typeof savedDraft.checklistConfirmed === "boolean")
        setChecklistConfirmed(savedDraft.checklistConfirmed);
      if (savedDraft.step) setStep(savedDraft.step);
      if (savedDraft.completedSteps)
        setCompletedSteps(savedDraft.completedSteps);
    }
  }, []);

  // Debounced save draft
  const debouncedSave = useMemo(() => debounce(saveDraft, 500), []);
  useEffect(() => {
    const draft = {
      manuscript,
      modalAuthor,
      isModalDataComplete,
      reviewers,
      conflictOfInterest,
      conflictDescription,
      dataAvailability,
      checklistConfirmed,
      step,
      completedSteps,
    };
    debouncedSave(draft);
  }, [
    manuscript,
    modalAuthor,
    isModalDataComplete,
    reviewers,
    conflictOfInterest,
    conflictDescription,
    dataAvailability,
    checklistConfirmed,
    step,
    completedSteps,
    debouncedSave,
  ]);

  const updateManuscript = (field, value) => {
    console.log(field, value, 'hello')
    setManuscript((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateReviewer = (idx, field, value) => {
    setReviewers((prev) =>
      prev.map((reviewer, index) =>
        index === idx ? { ...reviewer, [field]: value } : reviewer
      )
    );
  };

  const addReviewer = () => {
    setReviewers((prev) => [
      ...prev,
      { fullName: "", affiliation: "", country: "", email: "" },
    ]);
  };

  const removeReviewer = (idx) => {
    if (reviewers.length > 1) {
      setReviewers((prev) => prev.filter((_, i) => i !== idx));

    }
  };

  // Validation functions
  const validateStep2 = () => {
    const errors = {};
    if (!manuscript.journalsId) errors.journalsId = "Please select a journal";
    if (!manuscript.title.trim()) errors.title = "Title is required";
    if (!manuscript.type) errors.type = "Type is required";
    if (!manuscript.runningTitle.trim())
      errors.runningTitle = "Running Title is required";
    if (!manuscript.subject) errors.subject = "Subject is required";
    if (!manuscript.abstract.trim()) errors.abstract = "Abstract is required";
    if (!manuscript.keyword.trim()) errors.keyword = "keyword is required";
    if (!manuscript.correspondingName.trim())
      errors.correspondingName = "Name is required";
    if (!manuscript.correspondingEmail.trim())
      errors.correspondingEmail = "Email is required";

    const authorErrors = [];
    modalAuthor.forEach((author, index) => {
      const authorErr = {};
      if (!author.fullName.trim())
        authorErr.fullName = "Full name is required";
      if (!author.email.trim()) authorErr.email = "Email is required";
      if (!author.affiliation.trim())
        authorErr.affiliation = "Affiliation is required";
      if (!author.country.trim()) authorErr.country = "Country is required";
      if (Object.keys(authorErr).length > 0) {
        authorErrors[index] = authorErr;
      }
    });

    if (authorErrors.length > 0) errors.authors = authorErrors;
    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors = {};
    const reviewerErrors = [];
    reviewers.forEach((reviewer, index) => {
      const reviewerErr = {};
      if (!reviewer.fullName.trim())
        reviewerErr.fullName = "Full name is required";
      if (!reviewer.email.trim()) reviewerErr.email = "Email is required";
      if (!reviewer.country.trim()) reviewerErr.country = "Country is required";
      if (!reviewer.affiliation.trim())
        reviewerErr.affiliation = "Affiliation is required";
      if (Object.keys(reviewerErr).length > 0) {
        reviewerErrors[index] = reviewerErr;
      }
    });

    if (reviewerErrors.length > 0) errors.reviewers = reviewerErrors;
    if (conflictOfInterest === null) {
      errors.conflict = "Conflict of interest declaration is required";
    } else if (conflictOfInterest && !conflictDescription.trim()) {
      errors.conflict = "Conflict description is required";
    }

    setStep3Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const isStep2Valid = () => {
    return (
      manuscript?.journalsId?.trim() &&
      manuscript?.title?.trim() &&
      manuscript?.type &&
      manuscript.runningTitle.trim() &&
      manuscript?.subject &&
      manuscript?.abstract?.trim() &&
      manuscript?.keyword?.trim() &&
      manuscript?.correspondingName?.trim() &&
      manuscript?.correspondingEmail?.trim() &&
      modalAuthor?.length > 0 &&
      modalAuthor.every(
        (a) =>
          a.fullName?.trim() &&
          a.email?.trim() &&
          a.affiliation?.trim() &&
          a.country?.trim()
      )
    );
  };

  const isStep3Valid = () => {
    return (
      reviewers.every(
        (r) =>
          r.fullName.trim() &&
          r.email.trim() &&
          r.country.trim() &&
          r.affiliation.trim()
      ) &&
      conflictOfInterest !== null &&
      (conflictOfInterest === false ||
        (conflictOfInterest === true && conflictDescription.trim()))
    );
  };

  // Submission handler
  const handleSubmit = () => {
    if (!confirmationChecked) {
      Swal.fire("Please confirm the accuracy of your submission", "", "warning");

      setCompletedSteps((prev) => {
    if (!prev.includes(5)) {
      return [...prev, 5];
    }
    return prev;
  });

      setStep(6);
      return;
    }

    const newSubmission = {
      id: Date.now(),
      title: manuscript.title || "Untitled",
      date: new Date().toISOString().slice(0, 10),
      status: "Submitted",
      manuscript: { ...manuscript },
      authors: [...modalAuthor],
      reviewers: [...reviewers],
      conflictOfInterest,
      conflictDescription,
      dataAvailability,
      files: manuscriptFile ? [manuscriptFile.name] : [],
    };

    setOldSubmissions((prev) => [newSubmission, ...prev]);
    setManuscript({
      title: "",
      type: "",
      runningTitle: "",
      subject: "",
      abstract: "",
      keyword: "",
      correspondingName: "",
      correspondingEmail: "",
    });
    setModalAuthor([]);
    setIsModalDataComplete(false);
    setReviewers([{ fullName: "", affiliation: "", country: "", email: "" }]);
    setConflictOfInterest(null);
    setConflictDescription("");
    setDataAvailability("");
    setManuscriptFile(null);
    setFiguresFile(null);
    setSupplementaryFile(null);
    setChecklistConfirmed(false);
    setConfirmationChecked(false);
    setStep(1);
    setCompletedSteps([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    Swal.fire("Submission saved (demo)", "Old submissions updated.", "success");
  };

  // Active data for preview mode
  const activeManuscript = previewSubmission
    ? previewSubmission.manuscript
    : manuscript;
  const activeAuthors = previewSubmission
    ? previewSubmission.authors
    : modalAuthor;
  const activeReviewers = previewSubmission
    ? previewSubmission.reviewers
    : reviewers;
  const activeConflictOfInterest = previewSubmission
    ? previewSubmission.conflictOfInterest
    : conflictOfInterest;
  const activeConflictDescription = previewSubmission
    ? previewSubmission.conflictDescription
    : conflictDescription;
  const activeDataAvailability = previewSubmission
    ? previewSubmission.dataAvailability
    : dataAvailability;

  // Render current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ChecklistStep
            checklistConfirmed={checklistConfirmed}
            setChecklistConfirmed={setChecklistConfirmed}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <ManuscriptDetailsStep
            manuscript={manuscript}
            updateManuscript={updateManuscript}
            step2Errors={step2Errors}
            validateStep2={validateStep2}
            isStep2Valid={isStep2Valid}
            setStep={setStep}
            previewSubmission={previewSubmission}
            activeManuscript={activeManuscript}
            activeAuthors={activeAuthors}
            isModalDataComplete={isModalDataComplete}
            setIsModalDataComplete={setIsModalDataComplete}
            modalAuthor={modalAuthor}
            setModalAuthor={setModalAuthor}
          />
        );
      case 3:
        return (
          <ReviewersStep
            reviewers={reviewers}
            updateReviewer={updateReviewer}
            addReviewer={addReviewer}
            removeReviewer={removeReviewer}
            conflictOfInterest={conflictOfInterest}
            setConflictOfInterest={setConflictOfInterest}
            conflictDescription={conflictDescription}
            setConflictDescription={setConflictDescription}
            dataAvailability={dataAvailability}
            setDataAvailability={setDataAvailability}
            step3Errors={step3Errors}
            validateStep3={validateStep3}
            isStep3Valid={isStep3Valid}
            setStep={setStep}
            previewSubmission={previewSubmission}
            activeReviewers={activeReviewers}
            activeConflictOfInterest={activeConflictOfInterest}
            activeConflictDescription={activeConflictDescription}
            activeDataAvailability={activeDataAvailability}
            setReviewers={setReviewers}
          />
        );
      case 4:
        return (
          <UploadFilesStep
            manuscriptFile={manuscriptFile}
            setManuscriptFile={setManuscriptFile}
            figuresFile={figuresFile}
            setFiguresFile={setFiguresFile}
            supplementaryFile={supplementaryFile}
            setSupplementaryFile={setSupplementaryFile}
            step4Error={step4Error}
            setStep={setStep}
            previewSubmission={previewSubmission}
            setStep4Error={setStep4Error}
          />
        );
      case 5:
        return (
          <ReviewSubmitStep
            activeManuscript={activeManuscript}
            activeAuthors={activeAuthors}
            activeReviewers={activeReviewers}
            activeConflictOfInterest={activeConflictOfInterest}
            activeConflictDescription={activeConflictDescription}
            activeDataAvailability={activeDataAvailability}
            previewSubmission={previewSubmission}
            manuscriptFile={manuscriptFile}
            figuresFiles={figuresFile}
            supplementaryFiles={supplementaryFile}
            confirmationChecked={confirmationChecked}
            setConfirmationChecked={setConfirmationChecked}
            setStep={setStep}
            handleSubmit={handleSubmit}
            setManuscript={setManuscript}
            setModalAuthor={setModalAuthor}
            setReviewers={setReviewers}
            setConflictOfInterest={setConflictOfInterest}
            setConflictDescription={setConflictDescription}
            setDataAvailability={setDataAvailability}
            setPreviewSubmission={setPreviewSubmission}
          />
        );
        case 6:
  return (
    <div className="text-center py-12">
      {/* Beautiful success icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Success message */}
      <h2 className="text-2xl font-bold text-green-600">Submission Successful!</h2>
      <p className="mt-3 text-gray-700">
        Thank you for submitting your manuscript. You can start a new submission anytime.
      </p>

      {/* Button */}
      <button
        onClick={() => setStep(1)}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Start New Submission
      </button>
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <StepHeader />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Quick Links Sidebar */}
          <div className="lg:col-span-1">
            <QuickLinks
              view={view}
              setView={setView}
              setPreviewSubmission={setPreviewSubmission}
              currentStep={step}
              completedSteps={completedSteps}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {view === "online" ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b p-4 bg-gray-50">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Online Submission
                  </h2>
                </div>
                <div className="p-6">
                  {previewSubmission && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm text-yellow-700">
                            Previewing previous submission:
                          </div>
                          <div className="font-semibold text-yellow-800">
                            {previewSubmission.title}{" "}
                            <span className="text-xs text-yellow-600">
                              ({previewSubmission.date})
                            </span>
                          </div>
                          <div className="text-xs text-yellow-600 mt-1">
                            {previewSubmission.status}
                          </div>
                        </div>
                        <button
                          onClick={() => setPreviewSubmission(null)}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hover:bg-yellow-200 transition-colors"
                        >
                          Exit Preview
                        </button>
                      </div>
                    </div>
                  )}
                  {view === "online" && (
                    <div className="text-lg font-medium text-gray-600 mb-4">
                      Step {step} of 6
                    </div>
                  )}
                  {renderStep()}
                </div>
              </div>
            ) : (
              <AllSubmissions />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDashboard;
