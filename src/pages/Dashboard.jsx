import KPICard from "../components/KPICard";
import Header from "../components/Header";
import RecentTransactions from "../components/RecentTransactions";
import FinanceChart from "../components/FinanceChart";
import ExpensePieChart from "../components/ExpensePieChart";
import FinancialInsights from "../components/FinancialInsights";

export default function Dashboard() {

  const transactions = JSON.parse(
    localStorage.getItem("transactions")
  ) || [];
    const totalIncome = transactions
    .filter(item => item.type === "Income")
    .reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

  const totalExpense = transactions
    .filter(item => item.type === "Expense")
    .reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

  const savings =
    totalIncome - totalExpense;
  
  const savingsRate =
  totalIncome > 0
    ? Math.round(
        (savings / totalIncome) * 100
      )
    : 0;

let budgetStatus = "";

if (savingsRate >= 90)
  budgetStatus = "Financial Gigachad 💸";
else if (savingsRate >= 80)
  budgetStatus = "W Money Moves 📈";
else if (savingsRate >= 70)
  budgetStatus = "Locked In 🎯";
else if (savingsRate >= 60)
  budgetStatus = "Cooking 🔥";
else if (savingsRate >= 50)
  budgetStatus = "Vibing 😎";
else if (savingsRate >= 40)
  budgetStatus = "Overspending Arc 💀";
else
  budgetStatus = "Absolutely Cooked ☠️";

  return (
    <div>

      <Header />

      <div className="grid grid-cols-4 gap-6 mt-8">

        <KPICard
          title="Total Income"
          value={`₹${totalIncome}`}
          color="text-green-400"
        />

        <KPICard
          title="Expenses"
          value={`₹${totalExpense}`}
          color="text-red-400"
        />

        <KPICard
          title="Savings"
          value={`₹${savings}`}
          color="text-blue-400"
        />

        <KPICard
          title="Budget Score"
          value={`${savingsRate}`}
          color="text-yellow-400"
        />

      </div>
      <RecentTransactions />
        <div className="grid grid-cols-2 gap-6 mt-8">

  <FinanceChart />

  <ExpensePieChart />

</div>
        <FinancialInsights />
    

    </div>
  );
}