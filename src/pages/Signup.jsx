import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-lg">

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 text-white outline-none"
        />

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
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
        >
          Create Account
        </button>

        <p className="text-slate-400 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}