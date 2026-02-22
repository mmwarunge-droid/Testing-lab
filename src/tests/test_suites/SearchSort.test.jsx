import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { act } from "react-dom/test-utils";

describe("Search + Sort", () => {
  it("updates the displayed transactions when search changes (change event)", async () => {
    global.setFetchResponse([
      { id: 1, date: "2026-02-20", description: "Groceries", category: "Food", amount: 50 },
      { id: 2, date: "2026-02-21", description: "Fuel", category: "Transport", amount: 100 },
      { id: 3, date: "2026-02-22", description: "Coffee", category: "Food", amount: 10 },
    ]);

    await act(async () => {
      render(<AccountContainer />);
    });

    // Confirm initial render shows all
    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
      expect(screen.getByText("Fuel")).toBeInTheDocument();
      expect(screen.getByText("Coffee")).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText(/search/i);

    // Partial match: "cof" -> Coffee
    fireEvent.change(searchInput, { target: { value: "cof" } });

    await waitFor(() => {
      expect(screen.getByText("Coffee")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
      expect(screen.queryByText("Fuel")).not.toBeInTheDocument();
    });

    // Full match: "Fuel" -> Fuel
    fireEvent.change(searchInput, { target: { value: "Fuel" } });

    await waitFor(() => {
      expect(screen.getByText("Fuel")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
      expect(screen.queryByText("Coffee")).not.toBeInTheDocument();
    });
  });

  it("search matches category too (complete search)", async () => {
    global.setFetchResponse([
      { id: 1, date: "2026-02-20", description: "Groceries", category: "Food", amount: 50 },
      { id: 2, date: "2026-02-21", description: "Bus", category: "Transport", amount: 20 },
    ]);

    await act(async () => {
      render(<AccountContainer />);
    });

    const searchInput = screen.getByLabelText(/search/i);

    // Category match: "transport" should show Bus
    fireEvent.change(searchInput, { target: { value: "transport" } });

    await waitFor(() => {
      expect(screen.getByText("Bus")).toBeInTheDocument();
      expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    });
  });

  it("sorts transactions by selected field", async () => {
    global.setFetchResponse([
      { id: 1, date: "2026-02-20", description: "Zebra", category: "Food", amount: 1 },
      { id: 2, date: "2026-02-21", description: "Apple", category: "Transport", amount: 2 },
    ]);

    await act(async () => {
      render(<AccountContainer />);
    });

    const sortSelect = screen.getByLabelText(/sort/i);

    // Sort by description (default): Apple should come before Zebra
    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      // rows include header row; use table body text check
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.getByText("Zebra")).toBeInTheDocument();
    });

    // Switch to category sort (Food vs Transport => Food first)
    fireEvent.change(sortSelect, { target: { value: "category" } });

    await waitFor(() => {
      // Find table and check order by scanning tbody rows
      const table = screen.getByRole("table");
      const bodyRows = within(table).getAllByRole("row").slice(1); // skip header
      const firstRowText = bodyRows[0].textContent || "";
      expect(firstRowText.toLowerCase()).toContain("food");
    });
  });
});