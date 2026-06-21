import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Track your finances in real-time
        </p>
      </div>

      <button
        onClick={() => navigate("/transactions")}
        className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
      >
        Add Transaction
      </button>

    </header>
  );
}