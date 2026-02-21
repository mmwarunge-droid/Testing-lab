// src/tests/test_suites/AddTransactions.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountContainer from '../../components/AccountContainer';
import { vi } from 'vitest';
import { act } from "react-dom/test-utils";

describe('Add Transactions', () => {

  it('should add new transaction to the frontend and call POST', async () => {
    const newTransaction = {
      date: '2026-02-21',
      description: 'Coffee',
      category: 'Food',
      amount: 100
    };
     global.setFetchResponse([]);

    await act(async () => {
      render(<AccountContainer />);
    });
    
    const dateInput = screen.getByLabelText(/date/i)
    const descInput = screen.getByLabelText(/description/i);
    const categoryInput = screen.getByLabelText(/category/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const submitBtn = screen.getByRole("button", { name: /add transaction/i });

    await act(async () => {
    fireEvent.change(dateInput, { target: { value: newTransaction.date } });
    fireEvent.change(descInput, { target: { value: newTransaction.description } });
    fireEvent.change(categoryInput, { target: { value: newTransaction.category } });
    fireEvent.change(amountInput, { target: { value: newTransaction.amount } });

    fireEvent.click(submitBtn);
    });
    await waitFor(() => {
      expect(screen.getByText("Coffee")).toBeInTheDocument();
    });
  });
});