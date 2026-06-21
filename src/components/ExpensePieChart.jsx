import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ExpensePieChart() {

  const transactions = JSON.parse(
    localStorage.getItem("transactions")
  ) || [];

  const expenses = transactions.filter(
    item => item.type === "Expense"
  );

  const categoryTotals = {};

  expenses.forEach((item) => {
    if (categoryTotals[item.category]) {
      categoryTotals[item.category] += Number(item.amount);
    } else {
      categoryTotals[item.category] = Number(item.amount);
    }
  });

  const data = Object.keys(categoryTotals).map(
    (category) => ({
      name: category,
      value: categoryTotals[category],
    })
  );

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 mt-8">

      <h2 className="text-xl font-bold text-white mb-4">
        Expense Distribution
      </h2>

      {data.length === 0 ? (
        <p className="text-slate-400">
          No expense data available.
        </p>
      ) : (

        <div style={{ width: "100%", height: 350 }}>

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>
  );
}