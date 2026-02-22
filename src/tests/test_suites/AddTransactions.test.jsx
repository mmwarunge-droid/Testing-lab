import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountContainer from "../../components/AccountContainer";
import { act } from "react-dom/test-utils";

describe("Add Transactions", () => {
  it("adds new transaction to the frontend and calls POST", async () => {
    const newTransaction = {
      date: "2026-02-21",
      description: "Coffee",
      category: "Food",
      amount: 100,
    };

    // Initial GET returns empty array
    global.setFetchResponse([]);

    await act(async () => {
      render(<AccountContainer />);
    });

    const dateInput = screen.getByLabelText(/date/i);
    const descInput = screen.getByLabelText(/description/i);
    const categoryInput = screen.getByLabelText(/category/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const submitBtn = screen.getByRole("button", { name: /add transaction/i });

    await act(async () => {
      fireEvent.change(dateInput, { target: { value: newTransaction.date } });
      fireEvent.change(descInput, { target: { value: newTransaction.description } });
      fireEvent.change(categoryInput, { target: { value: newTransaction.category } });
      fireEvent.change(amountInput, { target: { value: String(newTransaction.amount) } });

      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("Coffee")).toBeInTheDocument();
    });

    // Ensure POST happened (2nd call typically; first is initial GET)
    expect(global.fetch).toHaveBeenCalled();

    const postCall = global.fetch.mock.calls.find(
      (args) => args?.[1]?.method === "POST"
    );

    expect(postCall).toBeTruthy();
    expect(postCall[1]).toEqual(
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
      })
    );
  });
});