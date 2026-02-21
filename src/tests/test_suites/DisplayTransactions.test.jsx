import { render, screen, waitFor } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { act } from "react-dom/test-utils";

describe("Display Transactions", () => {
  it("renders transactions on startup", async () => {
    global.setFetchResponse([
      { id: 1, date: "2026-02-20", description: "Groceries", category: "Food", amount: 50 },
      { id: 2, date: "2026-02-21", description: "Fuel", category: "Transport", amount: 100 },
    ]);

    await act(async () => {
      render(<AccountContainer />);
    });

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
      expect(screen.getByText("Fuel")).toBeInTheDocument();
    });
  });
});