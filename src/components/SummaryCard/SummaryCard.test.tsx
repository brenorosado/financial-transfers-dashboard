import React from "react";
import { render } from "@testing-library/react";
import { SummaryCard } from "./index";
import "@testing-library/jest-dom";

const mockData = {
  values: {
    totalExpenses: 100000,
    totalIncome: 200000,
    totalPending: 50000,
  },
  transactions: {
    lastDeposits: [],
    lastWithdrawals: [],
    lastPendingTransactions: [],
    lastTransactions: [],
  },
};

describe("SummaryCard component", () => {
  it("renders SummaryCard with correct title and amount", () => {
    const { getByText } = render(
      <SummaryCard
        type="income"
        values={mockData.values}
        transactions={mockData.transactions}
      />,
    );

    const titleElement = getByText("RECEITAS");
    const amountElement = getByText("R$ 2.000,00");

    expect(titleElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
  });

  it("calculates balance correctly based on income and expenses", () => {
    const { getByText } = render(
      <SummaryCard
        type="balance"
        values={mockData.values}
        transactions={mockData.transactions}
      />,
    );

    const amountElement = getByText("R$ 1.000,00");

    expect(amountElement).toBeInTheDocument();
  });
});
