
export const COUNTRIES = [
   "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
  "Antigua and Barbuda", "Argentina", "Armenia","Pakistan", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China",
  "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
  "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
  "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// ==================== PRE-SUBMISSION CHECKLIST ====================
export const PRE_SUBMISSION_CHECKLIST = [
  "Manuscript contains original data and has not been submitted or published anywhere and the submitted manuscript or data will not be submitted anywhere during the review process.",
  "The instructions to authors have been noted and the format of the manuscript is as per given guidelines, especially 'Results and Discussion' are presented in separate sections and Figures' legends and table titles are self-explanatory and have sufficient information.",
  "The cited material is published in high quality journals and no citation manipulation has been done. Furthermore, recently published relevant manuscripts of this journal may be reviewed.",
  "Adapted figures and illustrations are referenced properly.",
  "There is no plagiarism regarding text (19% similarity index with 5% from any single source) or data or figure or illustration.",
  "The publication ethics of the scientific publications have been followed.",
  "Authors' contribution and statement of 'conflict of interest' have been mentioned before the references in the manuscript.",
  "Editor has right to reject or send back the manuscript without reviewing process if it is not up to mark of the journal standards.",
  "All coauthors consented to submit the articles in this journal and agreed to transfer copy rights to the journal if it is accepted for the publication.",
  "Decision of the editor should be accepted open heartedly.",
  "Author list is as per contribution, and after acceptance of the manuscript author list will not be altered. However, at the time of revision authors' list can be modified with the permission of managing editor, although not encouraged.",
  "The publishing time is 3 to 6 months; therefore, author can inquire the status three months after submission only through email: dratif@uaf.edu.pk, use of any other mean (telephone or physical inquiry from the office or email to the personal email of any editor) will be considered as unethical and can lead to return of the manuscript to authors without further processing."
];

// ==================== MOCK SUBMISSIONS ====================
export const MOCK_OLD_SUBMISSIONS = [
  {
    id: 1,
    title: "Impact of AI on Modern Publishing",
    date: "2024-08-10",
    status: "Published",
    manuscript: {
      title: "Impact of AI on Modern Publishing",
      type: "Research Article",
      runningTitle: "AI & Publishing",
      subject: "Publishing Technology",
      abstract: "This study examines how AI tools are reshaping editorial workflows, peer review, and content discovery.",
      correspondingName: "Dr. Sana Khan",
      correspondingEmail: "s.khan@example.edu"
    },
    authors: [
      {
        fullName: "Sana Khan",
        affiliation: "Uni of Publishing",
        country: "Pakistan",
        email: "s.khan@example.edu"
      },
      {
        fullName: "Ali Mir",
        affiliation: "Tech Institute",
        country: "Pakistan",
        email: "a.mir@tech.org"
      }
    ],
    files: ["manuscript_ai_publishing.pdf", "figure1.png"]
  },
  {
    id: 2,
    title: "Crop Yield under Drought",
    date: "2024-03-02",
    status: "Under Review",
    manuscript: {
      title: "Crop Yield under Drought Conditions: A Multi-Region Study",
      type: "Research Article",
      runningTitle: "Drought & Yield",
      subject: "Agriculture",
      abstract: "Multi-region analysis demonstrating mitigation strategies to retain crop yield under drought.",
      correspondingName: "Dr. Bilal Ahmed",
      correspondingEmail: "b.ahmed@example.org"
    },
    authors: [
      {
        fullName: "Bilal Ahmed",
        affiliation: "Agri University",
        country: "Pakistan",
        email: "b.ahmed@example.org"
      }
    ],
    files: ["manuscript_drought.pdf"]
  }
];

// ==================== FORM OPTIONS ====================
export const MANUSCRIPT_TYPES = [
  "Research Article",
  "Review Article",
  "Short Communication",
  "Case Study"
];

export const SUBJECT_CATEGORIES = [
  "Agriculture",
  "Science",
  "Technology",
  "Medicine",
  "Engineering",
  "Social Sciences"
];

// ==================== FILE HANDLING ====================
export const ACCEPTED_FILE_TYPES = {
  manuscript: [".doc", ".docx", ".pdf"],
  figures: [".jpg", ".jpeg", ".png", ".gif", ".tiff", ".eps"],
  supplementary: [".zip", ".rar", ".pdf", ".xls", ".xlsx", ".csv"]
};

export const MAX_FILE_SIZE_MB = 10; // 10MB limit

// ==================== LOCAL STORAGE ====================
export const LOCAL_STORAGE_KEY = "pj_submission_draft_v1";

// ==================== UTILITY FUNCTIONS ====================
/**
 * Debounce function to limit how often a function executes
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Validates email format
 * @param {string} email 
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Saves draft to localStorage
 * @param {Object} data - Draft data to save
 */
export const saveDraft = (data) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      ...data,
      savedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.error("Error saving draft:", error);
  }
};

/**
 * Loads draft from localStorage
 * @returns {Object|null} Parsed draft data or null
 */
export const loadDraft = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Error loading draft:", error);
    return null;
  }
};

