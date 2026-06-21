export default function FinancialInsights() {

  const transactions = JSON.parse(
    localStorage.getItem("transactions")
  ) || [];

  const income = transactions
    .filter(item => item.type === "Income")
    .reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

  const expense = transactions
    .filter(item => item.type === "Expense")
    .reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

  const savings = income - expense;

  const savingsRate =
    income > 0
      ? ((savings / income) * 100).toFixed(1)
      : 0;

  const categoryTotals = {};

  transactions
    .filter(item => item.type === "Expense")
    .forEach(item => {
      categoryTotals[item.category] =
        (categoryTotals[item.category] || 0)
        + Number(item.amount);
    });

  const highestCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce(
          (a, b) =>
            categoryTotals[a] >
            categoryTotals[b]
              ? a
              : b
        )
      : "None";

  return (
    <div className="bg-slate-800 rounded-xl p-6 mt-8">

      <h2 className="text-xl font-bold text-white mb-4">
        💡 Financial Insights
      </h2>

      <div className="space-y-3 text-slate-300">

        <p>
          • Highest Spending Category:
          {" "}
          {highestCategory}
        </p>

        <p>
          • Total Expenses:
          {" "}
          ₹{expense}
        </p>

        <p>
          • Savings Rate:
          {" "}
          {savingsRate}%
        </p>

        <p>
          • Current Savings:
          {" "}
          ₹{savings}
        </p>

      </div>

    </div>
  );
}