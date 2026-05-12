import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const payload = { firstName, lastName, emailId, password };
      if (gender) payload.gender = gender;

      await axios.post(BASE_URL + "/signup", payload, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred during signup",
      );
    }
  };

  return (
    <div className="min-h-[85vh] bg-base-200 flex items-center justify-center p-4 selection:bg-neutral selection:text-neutral-content transition-colors duration-300 py-12">
      <div className="w-full max-w-lg bg-base-100 rounded-2xl p-8 sm:p-10 shadow-xl border border-base-300">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-base-content tracking-tight mb-2">
            Join DevMeet
          </h1>
          <p className="text-base-content/60 text-sm font-medium">
            Create an account to connect with top developers
          </p>
        </div>

        <form onSubmit={signupUser} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0"
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

          {/* Name Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-semibold text-base-content/80">
                  First Name
                </span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content"
                placeholder="John"
                required
              />
            </div>
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-semibold text-base-content/80">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label pb-2">
              <span className="label-text font-semibold text-base-content/80">
                Email address
              </span>
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content"
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label pb-2">
              <span className="label-text font-semibold text-base-content/80">
                Password
              </span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label pb-2">
              <span className="label-text font-semibold text-base-content/80">
                Gender{" "}
                <span className="font-normal opacity-50">(Optional)</span>
              </span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-4 rounded-xl bg-neutral text-neutral-content font-bold text-base shadow-lg shadow-neutral/30 hover:shadow-neutral/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-base-content/70 font-medium text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-base-content font-bold hover:underline transition-all"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
