import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const userSettings = JSON.parse(
    localStorage.getItem("userSettings")
  ) || {};

  const userName =
    userSettings.name || "User";

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-slate-800 text-white p-5 relative transition-all duration-300`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-8 bg-slate-700 px-3 py-2 rounded"
      >
        {collapsed ? "☰" : "✕"}
      </button>

      {!collapsed && (
        <h1 className="text-2xl font-bold mb-8">
          SmartSpend Pro
        </h1>
      )}

      <nav className="space-y-4">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          {collapsed ? "🏠" : "🏠 Dashboard"}
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          {collapsed ? "💳" : "💳 Transactions"}
        </NavLink>

        <NavLink
          to="/budgets"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          {collapsed ? "📊" : "📊 Budgets"}
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          {collapsed ? "📈" : "📈 Reports"}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-slate-700"
            }`
          }
        >
          {collapsed ? "⚙️" : "⚙️ Settings"}
        </NavLink>

      </nav>

      <div className="absolute bottom-5 left-5 right-5">

        <div className="border-t border-slate-700 pt-4">

          {!collapsed && (
            <>
              <p className="text-sm text-slate-400">
                👤 {userName}
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-3 w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </aside>
  );
}