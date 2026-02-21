import Transaction from "./Transaction";

function TransactionsList({ transactions, onDeleteTransaction }) {
   const transactionRows = transactions.map((transaction, index) => (
  <Transaction
    key={transaction?.id ?? `${transaction?.date ?? "d"}-${transaction?.description ?? "x"}-${index}`}
    transaction={transaction}
    onDeleteTransaction={onDeleteTransaction}
  />
));

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">DELETE</h3>
          </th>
        </tr>
        {transactionRows}
      </tbody>
    </table>
  );
}

export default TransactionsList;