export default function Budgets() {

  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const expenseTransactions = transactions.filter(
    item => item.type === "Expense"
  );

  const categoryTotals = {};

  expenseTransactions.forEach(item => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) +
      Number(item.amount);
  });

  const budgetLimits = {
    Food: 5000,
    Travel: 3000,
    Shopping: 4000,
    Bills: 3000,
    Entertainment: 2500,
    Education: 5000,
    Health: 4000,
    Other: 2000,
  };

  const budgets = Object.keys(budgetLimits).map(category => ({
    category,
    spent: categoryTotals[category] || 0,
    limit: budgetLimits[category],
  }));

  return (
    <div>

      <h1 className="text-3xl font-bold text-white mb-8">
        Budget Management
      </h1>

      {budgets.length === 0 ? (

        <p className="text-slate-400">
          No budget data available.
        </p>

      ) : (

        budgets.map((budget, index) => {

          const percentage = Math.min(
            (budget.spent / budget.limit) * 100,
            100
          );

          const remaining =
            budget.limit - budget.spent;

          let status = "Safe";
          let color = "bg-green-500";

          if (percentage >= 90) {
            status = "Critical";
            color = "bg-red-500";
          } else if (percentage >= 70) {
            status = "Warning";
            color = "bg-yellow-500";
          }

          return (

            <div
              key={index}
              className="bg-slate-800 p-6 rounded-xl mb-6 shadow-lg"
            >

              <div className="flex justify-between mb-2 text-white">

                <h2 className="font-semibold text-lg">
                  {budget.category}
                </h2>

                <span>
                  ₹{budget.spent.toLocaleString("en-IN")} /
                  ₹{budget.limit.toLocaleString("en-IN")}
                </span>

              </div>

              <div className="bg-slate-700 h-3 rounded-full">

                <div
                  className={`${color} h-3 rounded-full`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <div className="flex justify-between mt-4 text-sm text-slate-300">

                <span>
                  Used: {percentage.toFixed(1)}%
                </span>

                <span>
                  Remaining: ₹
                  {remaining.toLocaleString("en-IN")}
                </span>

              </div>

              <div className="mt-2">

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    percentage >= 90
                      ? "bg-red-500"
                      : percentage >= 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {status}
                </span>

              </div>

            </div>

          );

        })

      )}

    </div>
  );
}