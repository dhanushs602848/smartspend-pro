import KPICard from "../components/KPICard";
import FinanceChart from "../components/FinanceChart";
import ExpensePieChart from "../components/ExpensePieChart";
import FinancialInsights from "../components/FinancialInsights";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Reports() {

  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const totalIncome = transactions
    .filter(item => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = transactions
    .filter(item => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const savings = totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0
      ? Math.round((savings / totalIncome) * 100)
      : 0;

  const expenseRate =
    totalIncome > 0
      ? Math.round((totalExpense / totalIncome) * 100)
      : 0;

  const totalTransactions = transactions.length;

  let walletStatus = "";

  if (savingsRate >= 90)
    walletStatus = "🏆 Wealth Master";
  else if (savingsRate >= 75)
    walletStatus = "💰 Cash Commander";
  else if (savingsRate >= 60)
    walletStatus = "😎 Smart Saver";
  else if (savingsRate >= 45)
    walletStatus = "📊 Budget Explorer";
  else if (savingsRate >= 30)
    walletStatus = "⚠️ Spend Carefully";
  else
    walletStatus = "🚨 Budget Alert";

  const exportToExcel = () => {

    const auditLogs =
      JSON.parse(localStorage.getItem("auditLogs")) || [];

    const userSettings =
      JSON.parse(localStorage.getItem("userSettings")) || {};

    const summary = [
      {
        "User Name": userSettings.name || "Not Set",
        "User Email": userSettings.email || "Not Set",
        "Total Income": totalIncome,
        "Total Expense": totalExpense,
        "Savings": savings,
        "Savings Rate": `${savingsRate}%`,
        "Expense Rate": `${expenseRate}%`,
        "Wallet Status": walletStatus,
        "Transactions": totalTransactions,
      },
    ];

    const workbook = XLSX.utils.book_new();

    const transactionSheet =
      XLSX.utils.json_to_sheet(transactions);

    const auditSheet =
      XLSX.utils.json_to_sheet(auditLogs);

    const summarySheet =
      XLSX.utils.json_to_sheet(summary);

    XLSX.utils.book_append_sheet(
      workbook,
      transactionSheet,
      "Transactions"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      auditSheet,
      "Audit Logs"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      summarySheet,
      "Summary"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      fileData,
      `SmartSpend_Report_${userSettings.name || "User"}.xlsx`
    );
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Reports & Analytics
          </h1>

          <p className="text-slate-400">
            Detailed financial insights and performance analysis
          </p>

        </div>

        <button
          onClick={exportToExcel}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg"
        >
          📄 Download Report
        </button>

      </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <KPICard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString("en-IN")}`}
          color="text-green-400"
        />

        <KPICard
          title="Total Expense"
          value={`₹${totalExpense.toLocaleString("en-IN")}`}
          color="text-red-400"
        />

        <KPICard
          title="Net Savings"
          value={`₹${savings.toLocaleString("en-IN")}`}
          color="text-blue-400"
        />

        <KPICard
          title="Savings Ratio"
          value={`${savingsRate}%`}
          color="text-yellow-400"
        />

        <KPICard
          title="Expense Ratio"
          value={`${expenseRate}%`}
          color="text-orange-400"
        />

        <KPICard
          title="Transactions"
          value={totalTransactions}
          color="text-cyan-400"
        />

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <FinanceChart />

        <ExpensePieChart />

      </div>

      <FinancialInsights />

      <div className="bg-slate-800 rounded-xl p-6 mt-8 shadow-lg">

        <h2 className="text-2xl font-bold text-white mb-6">
          Monthly Financial Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-300">

          <div>
            💵 <span className="font-semibold">Total Income:</span>{" "}
            <span className="text-green-400 font-bold">
              ₹{totalIncome.toLocaleString("en-IN")}
            </span>
          </div>

          <div>
            💸 <span className="font-semibold">Total Expense:</span>{" "}
            <span className="text-red-400 font-bold">
              ₹{totalExpense.toLocaleString("en-IN")}
            </span>
          </div>

          <div>
            💰 <span className="font-semibold">Net Savings:</span>{" "}
            <span className="text-blue-400 font-bold">
              ₹{savings.toLocaleString("en-IN")}
            </span>
          </div>

          <div>
            📈 <span className="font-semibold">Savings Ratio:</span>{" "}
            <span className="text-yellow-400 font-bold">
              {savingsRate}%
            </span>
          </div>

          <div>
            📉 <span className="font-semibold">Expense Ratio:</span>{" "}
            <span className="text-orange-400 font-bold">
              {expenseRate}%
            </span>
          </div>

          <div>
            💳 <span className="font-semibold">Wallet Status:</span>{" "}
            <span className="text-purple-400 font-bold">
              {walletStatus}
            </span>
          </div>

          <div>
            📑 <span className="font-semibold">
              Total Transactions:
            </span>{" "}
            <span className="text-cyan-400 font-bold">
              {totalTransactions}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}