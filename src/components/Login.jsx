import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userslice";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("anjali@gmail.com");
  const [password, setPassword] = useState("anjaliA@1");
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
    <div className="min-h-[85vh] bg-base-200 flex items-center justify-center p-4 selection:bg-neutral selection:text-neutral-content transition-colors duration-300">
      <div className="w-full max-w-md bg-base-100 rounded-2xl p-8 sm:p-10 shadow-xl border border-base-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-base-content tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-base-content/60 text-sm font-medium">
            Enter your details to access your account
          </p>
        </div>

        <form onSubmit={loginUser} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-4">
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-semibold text-base-content/80">Email address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-control">
              <label className="label pb-2 flex justify-between">
                <span className="label-text font-semibold text-base-content/80">Password</span>
                <a href="#" className="label-text-alt text-base-content hover:underline font-bold transition-colors">Forgot password?</a>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full bg-base-100 focus:border-neutral focus:ring-2 focus:ring-neutral/20 transition-all text-base-content"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3.5 mt-4 rounded-xl bg-neutral text-neutral-content font-bold text-base shadow-lg shadow-neutral/30 hover:shadow-neutral/50 hover:-translate-y-0.5 transition-all duration-200">
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-base-content/70 font-medium text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-base-content font-bold hover:underline transition-all">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
