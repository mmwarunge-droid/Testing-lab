function Transaction({ transaction, onDeleteTransaction }) {
  const { id, date, description, category, amount } = transaction;

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button onClick={() => onDeleteTransaction(id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Transaction;