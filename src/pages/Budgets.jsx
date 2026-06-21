export default function Budgets() {

  const transactions = JSON.parse(
    localStorage.getItem("transactions")
  ) || [];

  const expenseTransactions =
    transactions.filter(
      item => item.type === "Expense"
    );

  const categoryTotals = {};

  expenseTransactions.forEach(item => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0)
      + Number(item.amount);
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

  const budgets = Object.keys(
    categoryTotals
  ).map(category => ({
    category,
    spent: categoryTotals[category],
    limit:
      budgetLimits[category] || 3000,
  }));

  return (
    <div>

      <h1 className="text-3xl font-bold text-white mb-8">
        Budgets
      </h1>

      {budgets.length === 0 ? (
        <p className="text-slate-400">
          No expense data available.
        </p>
      ) : (

        budgets.map((budget, index) => {

          const percentage = Math.min(
            (budget.spent / budget.limit) * 100,
            100
          );

          return (

            <div
              key={index}
              className="bg-slate-800 p-5 rounded-xl mb-5"
            >

              <div className="flex justify-between text-white">

                <span>
                  {budget.category}
                </span>

                <span>
                  ₹{budget.spent} / ₹{budget.limit}
                </span>

              </div>

              <div className="bg-slate-700 h-3 rounded-full mt-3">

                <div
                  className={`h-3 rounded-full ${
                    percentage > 80
                      ? "bg-red-500"
                      : percentage > 60
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${percentage}%`
                  }}
                />

              </div>

            </div>

          );
        })

      )}

    </div>
  );
}