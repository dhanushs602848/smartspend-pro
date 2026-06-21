import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function FinanceChart() {
  const transactions = JSON.parse(
    localStorage.getItem("transactions")
  ) || [];

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

  const data = [
    {
      category: "Income",
      amount: totalIncome,
      fill: "#10B981",
    },
    {
      category: "Expense",
      amount: totalExpense,
      fill: "#EF4444",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 mt-8">
      <h2 className="text-xl font-bold text-white mb-4">
        Financial Overview
      </h2>

      {transactions.length === 0 ? (
        <p className="text-slate-400">
          No transaction data available.
        </p>
      ) : (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="category" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="amount">
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.fill}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}