import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import config from "../../../common/config/index";

const LoginPage = ({ setCurrentPage }) => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [showPassword, setShowPassword] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);

  // Load saved accounts
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("savedAccounts")) || [];
    setSavedAccounts(accounts);

    if (accounts.length > 0) {
      const lastAccount = accounts[accounts.length - 1];
      setFormData({
        email: lastAccount.email,
        password: lastAccount.password,
        role: lastAccount.role || "user",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountSelect = (e) => {
    const selectedEmail = e.target.value;
    const account = savedAccounts.find((acc) => acc.email === selectedEmail);
    if (account) {
      setFormData({
        email: account.email,
        password: account.password,
        role: account.role || "user",
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/submit");
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        formData.role === "admin"
          ? `${config.USER_API_URL}/admin/login`
          : `${config.USER_API_URL}/users/login`;

      const res = await axios.post(endpoint, formData);

      if (res.data.success) {
        const token = res.data.token;
        const rememberMe = document.getElementById("remember-me").checked;

        if (rememberMe) {
          let updatedAccounts =
            JSON.parse(localStorage.getItem("savedAccounts")) || [];

          const existingIndex = updatedAccounts.findIndex(
            (acc) => acc.email === formData.email
          );

          if (existingIndex !== -1) {
            updatedAccounts[existingIndex] = formData;
          } else {
            updatedAccounts.push(formData);
          }

          localStorage.setItem("savedAccounts", JSON.stringify(updatedAccounts));
          setSavedAccounts(updatedAccounts);
        } else {
          sessionStorage.setItem("token", token);
        }

        login(token);

        Swal.fire({
          position: "center",
          icon: "success",
          title: `${formData.role === "admin" ? "Admin" : "User"} Login Successful`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(formData.role === "admin" ? "/admin/dashboard" : "/submit");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Email or password does not match",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
      });
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your registered email address",
      inputPlaceholder: "example@email.com",
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
    });

    if (email) {
      try {
        const res = await axios.post(
          `${config.USER_API_URL}/users/forgot-password`,
          { email }
        );

        if (res.data.success) {
          Swal.fire(
            "Email Sent!",
            "Password reset link has been sent to your email.",
            "success"
          );
        } else {
          Swal.fire("Error", "Email not found in our records.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to send reset email.", "error");
        console.error("Forgot password error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/signup">
              <button className="font-medium text-blue-600 hover:text-blue-400 cursor-pointer">
                Create a new account
              </button>
            </Link>
          </p>
        </div>

        {/* Saved Accounts Dropdown */}
        {savedAccounts.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose saved account
            </label>
            <select
              onChange={handleAccountSelect}
              value={formData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none"
            >
              {savedAccounts.map((acc, idx) => (
                <option key={idx} value={acc.email}>
                  {acc.email} ({acc.role})
                </option>
              ))}
            </select>
          </div>
        )}

        <form className="mt-6 space-y-6" onSubmit={onSubmit}>
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login as
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email input */}
          <input
            name="email"
            type="email"
            required
            className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />

          {/* Password input */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
            </span>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-blue-600 hover:text-blue-400 cursor-pointer"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          {/* Sign in */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Sign in
            </button>
          </div>

          {/* Back to home */}
          <div className="text-center">
            <Link to="/home">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-400 cursor-pointer"
              >
                Back to Home
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
