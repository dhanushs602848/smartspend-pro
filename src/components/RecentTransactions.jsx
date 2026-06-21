export default function RecentTransactions() {

  const transactions = JSON.parse(
    localStorage.getItem("transactions")
  ) || [];

  return (
    <div className="bg-slate-800 rounded-xl p-6 mt-8">

      <h2 className="text-xl font-bold text-white mb-4">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-slate-400">
          No transactions available.
        </p>
      ) : (

        <table className="w-full">

          <thead>
            <tr className="text-slate-400 border-b border-slate-700">

              <th className="text-left py-3">
                Category
              </th>

              <th className="text-left py-3">
                Type
              </th>

              <th className="text-right py-3">
                Amount
              </th>

            </tr>
          </thead>

          <tbody>

            {transactions
              .slice()
              .reverse()
              .slice(0, 5)
              .map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-700"
                >

                  <td className="py-3 text-white">
                    {item.category}
                  </td>

                  <td className="py-3 text-white">
                    {item.type}
                  </td>

                  <td className="py-3 text-right text-white">
                    ₹{item.amount}
                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      )}

    </div>
  );
}