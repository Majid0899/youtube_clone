import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
const LogIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Handle the Login functionality of user
   * Perform Validation
   * Set the logged in user to redux user state
   */
  const handleLogIn = (e) => {
    e.preventDefault();

    // Client-side validation
    let tempErrors = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!password.trim()) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    setServerError("");
    setSuccessMessage("");

    //Send the data to backend
    async function sendData() {
      try {
        //Api Calling
        const response = await axios.post("http://localhost:5100/user/login", {
          username: name,
          email,
          password,
        });

        if (response.data.token) {
          //Set the logged in user detail to localstorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("avatar", response.data.user.avatar);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem('id',response.data.user._id)
          localStorage.setItem(
            "channel",
            response.data.user.channels.length > 0
          );

          // set the success message from server
          setSuccessMessage(`${response.data.message} redirecting ....`);

          dispatch(
            addUser({
              id:response.data.user._id,
              avatar: response.data.user.avatar,
              username: response.data.user.username,
              channel: response.data.user.channels.length > 0,
              token: response.data.token,
            })
          );
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        //Set the server error
        if (error.response?.data?.error) {
          setServerError(error.response.data.error);
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
      }
    }

    sendData();
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-100">
      <div className="w-full max-w-sm  mt-5 p-6 max-sm:mx-2 bg-white dark:border dark:border-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-white">
          Sign In
        </h2>

        {successMessage && (
          <div className="mb-4 p-2 text-green-800 bg-green-200 rounded-lg">
            {successMessage}
          </div>
        )}

        {serverError && (
          <div className="mb-4 p-2 text-red-800 bg-red-200 rounded-lg">
            {serverError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogIn}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border dark:text-white border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="user123@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border dark:text-white border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border dark:text-white border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
