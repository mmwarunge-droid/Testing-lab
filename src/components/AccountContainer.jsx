import { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";
import Search from "./Search";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("description");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data));
  }, []);

   function addTransaction(newTransaction) {
  fetch("http://localhost:8001/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTransaction),
  })
    .then((r) => r.json())
     .then((data) => {
  const hasRequiredFields =
    data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    typeof data.description === "string" &&
    typeof data.category === "string" &&
    typeof data.date === "string";

  const created = hasRequiredFields ? data : newTransaction;

  setTransactions((prev) => [...prev, created]);
});
}
  function deleteTransaction(id) {
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    });
  }

  const filteredTransactions = transactions
  .filter((transaction) =>
    (transaction?.description ?? "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "category") {
      return (a?.category ?? "").localeCompare(b?.category ?? "");
    }
    return (a?.description ?? "").localeCompare(b?.description ?? "");
  }); 

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <AddTransactionForm onAddTransaction={addTransaction} />

      <TransactionsList
        transactions={filteredTransactions}
        onDeleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default AccountContainer;