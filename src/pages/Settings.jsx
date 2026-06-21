import { useState, useEffect } from "react";

export default function Settings() {

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("userSettings");

    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          currency: "INR",
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "userSettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>

      <h1 className="text-3xl font-bold text-white mb-8">
        Settings
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl max-w-2xl">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={settings.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={settings.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        />

        <select
          name="currency"
          value={settings.currency}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        >
          <option>INR</option>
          <option>USD</option>
          <option>EUR</option>
        </select>

        <button
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white"
        >
          Settings Saved
        </button>

      </div>

    </div>
  );
}