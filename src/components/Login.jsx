import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userslice";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { emailId: email, password },
        { withCredentials: true },
      );

      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Network error or server is down.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-200 flex items-center justify-center p-4 selection:bg-neutral selection:text-neutral-content transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
        {/* Left Section - App Info */}
        <div className="hidden lg:flex flex-col justify-center pr-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-neutral text-neutral-content text-sm font-bold tracking-widest uppercase mb-6 w-max shadow-lg">
            Developer Network
          </div>
          <h1 className="text-6xl font-black text-base-content leading-[1.1] tracking-tight mb-6">
            Connect with the top{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral to-base-content/50">
              developers
            </span>{" "}
            worldwide.
          </h1>
          <p className="text-xl text-base-content/70 font-medium mb-10 max-w-lg leading-relaxed">
            DevMeet is the exclusive social network for software engineers.
            Share your projects, find mentors, and collaborate on the next big
            thing.
          </p>

          {/* Features Summary */}
          <div className="space-y-5 mt-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-base-100 border border-base-300 shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
              </div>
              <p className="text-base-content/80 font-bold text-lg">Discover like-minded engineers</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-base-100 border border-base-300 shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <p className="text-base-content/80 font-bold text-lg">Swipe to send connection requests</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-base-100 border border-base-300 shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-base-content/80 font-bold text-lg">Curate your professional network</p>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full max-w-md mx-auto lg:ml-auto bg-base-100 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-base-300">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-base-content tracking-tight mb-3">
              Welcome back
            </h2>
            <p className="text-base-content/60 font-medium">
              Enter your details to access your account
            </p>
          </div>

          <form onSubmit={loginUser} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-5">
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-bold text-base-content/80 text-sm uppercase tracking-wide">
                    Email address
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full h-14 bg-base-100 focus:border-neutral focus:ring-4 focus:ring-neutral/10 transition-all text-base-content rounded-xl font-medium text-lg cursor-pointer"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label pb-2 flex justify-between">
                  <span className="label-text font-bold text-base-content/80 text-sm uppercase tracking-wide">
                    Password
                  </span>
                  <a
                    href="#"
                    className="label-text-alt text-base-content hover:text-neutral hover:underline font-bold transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full h-14 bg-base-100 focus:border-neutral focus:ring-4 focus:ring-neutral/10 transition-all text-base-content rounded-xl font-medium text-lg cursor-pointer"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-14 mt-6 rounded-xl bg-neutral text-neutral-content font-black text-lg shadow-xl shadow-neutral/20 hover:shadow-neutral/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-base-content/60 font-semibold text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-base-content font-black hover:text-neutral hover:underline transition-all cursor-pointer"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
