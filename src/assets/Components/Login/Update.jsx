import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { COUNTRIES } from "../Submission/utils";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import config from "../../../common/config/index";

const EditUser = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    country: "",
    specialization: "",
    affiliation: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isReviewer: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        let userId = id; // from URL
        if (!userId) {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          userId = storedUser?._id; // 👈 fallback to logged-in user
        }

        const result = await axios.get(`${config.USER_API_URL}/get`, {
          Authorization: `Bearer ${token}`,
        });
        setUser({
          ...result.data.data,
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("Error loading user:", err);
        Swal.fire("❌ Error", "Failed to load user data", "error");
      }
    };

    loadUser();
  }, [id]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    let submitData = { ...user };

    // If password is not changed → remove it
    if (!user.password) {
      delete submitData.password;
      delete submitData.confirmPassword;
    } else {
      // Password updated → must match confirm password
      if (user.password !== user.confirmPassword) {
        Swal.fire("⚠️ Warning", "Passwords do not match!", "warning");
        return;
      }
    }

    // confirmPassword is frontend-only → remove before sending
    delete submitData.confirmPassword;

    try {
      const response = await axios.patch(`${config.USER_API_URL}/patch`, {
        Authorization: `Bearer ${token}`,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/submit");
        });
      } else {
        Swal.fire(
          "⚠️ Error",
          response.data.message || "Update failed",
          "error"
        );
      }
    } catch (err) {
      console.error("Error updating user:", err);
      Swal.fire("❌ Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Profile Settings</h2>
          <h3 className="mt-2 text-sm font-medium text-blue-500">
            Update Your Profile
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                required
                value={user.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                required
                value={user.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email + Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={user.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="country"
                required
                value={user.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title + Specialization + Password */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <select
                name="title"
                required
                value={user.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Title</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss.</option>
                <option>Dr.</option>
                <option>Prof.</option>
                <option>Prof. Dr.</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <select
                name="specialization"
                required
                value={user.specialization}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select specialization</option>
                <option>Computer Science</option>
                <option>Engineering</option>
                <option>Medicine</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                <option>Mathematics</option>
                <option>Social Sciences</option>
                <option>Other</option>
              </select>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  minLength="8"
                  value={user.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="New Password"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password (only if new password given) */}
          {user.password && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={user.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="Confirm Password"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          )}

          {/* Affiliation + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Affiliation
              </label>
              <input
                name="affiliation"
                type="text"
                required
                value={user.affiliation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                value={user.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Reviewer Checkbox */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div>
              <h3 className="font-medium text-gray-700">Become a Reviewer</h3>
              <p className="text-sm text-gray-600">
                Check this if you want to review papers
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isReviewer"
                checked={user.isReviewer}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            Update Profile
          </button>

          <div className="text-center mt-4">
            <Link
              to="/home"
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
