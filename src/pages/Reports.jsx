import KPICard from "../components/KPICard";
import FinanceChart from "../components/FinanceChart";
import ExpensePieChart from "../components/ExpensePieChart";
import FinancialInsights from "../components/FinancialInsights";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Reports() {
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

  const savings =
    totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0
      ? Math.round(
          (savings / totalIncome) * 100
        )
      : 0;

  const exportToExcel = () => {
    const auditLogs = JSON.parse(
      localStorage.getItem("auditLogs")
    ) || [];

    const userSettings = JSON.parse(
      localStorage.getItem("userSettings")
    ) || {};

    const summary = [
      {
        "User Name":
          userSettings.name || "Not Set",

        "User Email":
          userSettings.email || "Not Set",

        "Total Income": totalIncome,

        "Total Expense": totalExpense,

        "Savings": savings,

        "Savings Rate":
          `${savingsRate}%`,
      },
    ];

    const workbook =
      XLSX.utils.book_new();

    const transactionSheet =
      XLSX.utils.json_to_sheet(
        transactions
      );

    const auditSheet =
      XLSX.utils.json_to_sheet(
        auditLogs
      );

    const summarySheet =
      XLSX.utils.json_to_sheet(
        summary
      );

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

    const excelBuffer =
      XLSX.write(
        workbook,
        {
          bookType: "xlsx",
          type: "array",
        }
      );

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      fileData,
      `SmartSpend_Report_${
        userSettings.name || "User"
      }.xlsx`
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
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg"
        >
          Export Excel Report
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Income"
          value={`₹${totalIncome}`}
          color="text-green-400"
        />

        <KPICard
          title="Total Expense"
          value={`₹${totalExpense}`}
          color="text-red-400"
        />

        <KPICard
          title="Savings"
          value={`₹${savings}`}
          color="text-blue-400"
        />

        <KPICard
          title="Savings Rate"
          value={`${savingsRate}%`}
          color="text-yellow-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FinanceChart />
        <ExpensePieChart />
      </div>

      <FinancialInsights />
    </div>
  );
}