import { useState, useEffect } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    type: "Expense",
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.amount ||
      !formData.date
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      ...formData,
      amount: Number(formData.amount),
    };

    setTransactions([
      ...transactions,
      newTransaction,
    ]);

    const userSettings = JSON.parse(
      localStorage.getItem("userSettings")
    ) || {};

    const auditLogs = JSON.parse(
      localStorage.getItem("auditLogs")
    ) || [];

    auditLogs.push({
      action: "Added",
      user: userSettings.name || "Unknown User",
      category: formData.category,
      amount: formData.amount,
      type: formData.type,
      timestamp: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "auditLogs",
      JSON.stringify(auditLogs)
    );

    setFormData({
      category: "",
      amount: "",
      date: "",
      type: "Expense",
    });
  };

  const deleteTransaction = (index) => {

    const userSettings = JSON.parse(
      localStorage.getItem("userSettings")
    ) || {};

    const auditLogs = JSON.parse(
      localStorage.getItem("auditLogs")
    ) || [];

    auditLogs.push({
      action: "Deleted",
      user: userSettings.name || "Unknown User",
      category: transactions[index].category,
      amount: transactions[index].amount,
      type: transactions[index].type,
      timestamp: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "auditLogs",
      JSON.stringify(auditLogs)
    );

    const updatedTransactions =
      transactions.filter(
        (_, i) => i !== index
      );

    setTransactions(updatedTransactions);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Transactions
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl mb-8"
      >

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        >
          <option value="">
            Select Category
          </option>

          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">
            Investment
          </option>
          <option value="Pocket Money">
            Pocket Money
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Health">
            Health
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        >
          <option value="Expense">
            Expense
          </option>

          <option value="Income">
            Income
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-white"
        >
          Add Transaction
        </button>

      </form>

      <div className="bg-slate-800 rounded-xl p-6">

        <h2 className="text-xl font-bold text-white mb-4">
          Transaction History
        </h2>

        {transactions.length === 0 ? (
          <p className="text-slate-400">
            No transactions added yet.
          </p>
        ) : (
          transactions.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-slate-700 py-3 text-white"
            >
              <span>{item.category}</span>

              <span>
                ₹{item.amount}
              </span>

              <span>
                {item.type}
              </span>

              <span>
                {new Date(
                  item.date
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>

              <button
                onClick={() =>
                  deleteTransaction(index)
                }
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}