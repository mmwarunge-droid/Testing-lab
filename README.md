💰 Royal Bank of Flatiron — Transactions App

A simple React application for managing bank transactions.
Users can:

View transactions

Add new transactions

Search transactions

Sort transactions

Delete transactions

This project is built using React + Vite and includes automated tests using Vitest + React Testing Library.

🚀 Features

📋 Display transactions from API

➕ Add a new transaction

🔍 Search transactions by description

↕️ Sort transactions by:

Description

Category

🗑️ Delete transactions

✅ Fully tested with unit tests

🧰 Tech Stack

React

Vite

Semantic UI

Vitest

React Testing Library

📁 Project Structure
src/
│
├── components/
│ ├── AccountContainer.jsx
│ ├── AddTransactionForm.jsx
│ ├── TransactionsList.jsx
│ ├── Transaction.jsx
│ └── Search.jsx
│
├── tests/
│ ├── App.test.jsx
│ └── test_suites/
│ ├── AddTransactions.test.jsx
│ ├── DisplayTransactions.test.jsx
│ └── SearchSort.test.jsx
│
└── main.jsx
⚙️ Installation
1️⃣ Clone the repo
git clone <your-repo-url>
cd <project-folder>
2️⃣ Install dependencies
npm install
▶️ Running the App

Start the development server:

npm run dev

App runs at:

http://localhost:5173
🗄️ API Server

This project expects a local API at:

http://localhost:8001/transactions

You can run a mock API using json-server.

Install json-server
npm install -g json-server
Create db.json
{
"transactions": [
{
"id": 1,
"date": "2026-02-20",
"description": "Groceries",
"category": "Food",
"amount": 50
}
]
}
Run the server
json-server --watch db.json --port 8001
🧪 Running Tests

Run all tests:

npm test

Or with watch mode:

npm run test -- --watch
Test Coverage Includes:

Adding transactions

Displaying transactions

Searching

Sorting

🧠 Implementation Notes

Uses controlled form inputs for transaction creation.

Fetch API is used for:

GET transactions

POST new transactions

DELETE transactions

Defensive coding ensures the UI still works with mocked APIs during tests.

🛠️ Improvements (Future Work)

Edit transactions

Pagination

Better styling (Material UI / Tailwind)

API error handling

Persistent search state

Authentication

📄 License

This project is for educational purposes.
