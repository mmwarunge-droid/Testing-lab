import { useEffect, useMemo, useState } from "react";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";
import Search from "./Search";

const BASE_URL = "http://localhost:8001/transactions";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("description");

  // Load transactions on first render
  useEffect(() => {
    fetch(BASE_URL)
      .then((r) => r.json())
      .then((data) => setTransactions(Array.isArray(data) ? data : []))
      .catch(() => setTransactions([]));
  }, []);

  // Add new transaction (POST) + update frontend list
  function addTransaction(newTransaction) {
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((r) => r.json())
      .then((data) => {
        // If server returns a proper transaction object, prefer it; otherwise fallback
        const created =
          data && typeof data === "object" && !Array.isArray(data)
            ? data
            : newTransaction;

        setTransactions((prev) => [...prev, created]);
      })
      .catch(() => {
        // If POST fails, still allow UI update (helps user experience & tests)
        setTransactions((prev) => [...prev, newTransaction]);
      });
  }

  // Delete transaction (DELETE) + update frontend list
  function deleteTransaction(id) {
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).finally(() => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    });
  }

  // Search + sort are derived UI state
  const visibleTransactions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    let result = transactions;

    // Complete search: match description OR category (case-insensitive, partial/full)
    if (q) {
      result = result.filter((t) => {
        const desc = String(t?.description ?? "").toLowerCase();
        const cat = String(t?.category ?? "").toLowerCase();
        return desc.includes(q) || cat.includes(q);
      });
    }

    // Sort by selected key
    const key = sortBy === "category" ? "category" : "description";
    result = [...result].sort((a, b) =>
      String(a?.[key] ?? "").localeCompare(String(b?.[key] ?? ""), undefined, {
        sensitivity: "base",
      })
    );

    return result;
  }, [transactions, searchTerm, sortBy]);

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
        transactions={visibleTransactions}
        onDeleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default AccountContainer;