import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-lg">

        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          SmartSpend Pro
        </h1>

        <p className="text-slate-400 text-center mb-6">
          Manage your finances smarter
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 text-white outline-none"
        />

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

        <p className="text-slate-400 text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}