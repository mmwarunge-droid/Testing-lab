import { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Normalize amount to number if possible
    const payload = {
      ...formData,
      amount: formData.amount === "" ? "" : Number(formData.amount),
    };

    onAddTransaction(payload);

    setFormData({
      date: "",
      description: "",
      category: "",
      amount: "",
    });
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Category
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
          </label>

          <label>
            Amount
            <input
              type="number"
              step="0.01"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
        </div>

        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;