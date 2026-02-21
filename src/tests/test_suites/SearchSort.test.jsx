// src/tests/test_suites/SearchSort.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountContainer from '../../components/AccountContainer';

describe('Search and Sort Transactions', () => {
  it('should filter transactions based on search input', async () => {
    global.setFetchResponse([
      { id: 1, date: "2026-02-20", description: "Groceries", category: "Food", amount: 50 },
      { id: 2, date: "2026-02-21", description: "Fuel", category: "Transport", amount: 100 },
    ]);

      render(<AccountContainer />);

    const searchInput = screen.getByPlaceholderText(/Search your Recent Transactions/i);
    
    fireEvent.change(searchInput, { target: { value: "Fuel" } });

      await waitFor(() => {
      expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
      expect(screen.getByText('Fuel')).toBeInTheDocument();
    });
  });

  it('should call sort function when sort option changes', async () => {
    global.setFetchResponse([
      { id: 1, date: "2026-02-20", description: "Groceries", category: "Food", amount: 50 },
      { id: 2, date: "2026-02-21", description: "Fuel", category: "Transport", amount: 100 },
    ]);

    render(<AccountContainer />);

    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: 'category' } });

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      // Skipping header row, check first data row category
      expect(rows[1]).toHaveTextContent("Food");
    });
  });
});