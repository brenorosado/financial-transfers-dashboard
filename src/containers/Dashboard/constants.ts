import { CardTypes } from "@/components/SummaryCard";
import { Data } from "./types";
import { FiltersOptions } from "@/components/Filters";

export const dataInitialValue: Data = {
  options: {
    accountOptions: [],
    stateOptions: [],
    industryOptions: [],
  },
  values: {
    totalExpenses: 0,
    totalIncome: 0,
    totalPending: 0,
  },
  transactions: {
    lastDeposits: [],
    lastWithdrawals: [],
    lastPendingTransactions: [],
    lastTransactions: [],
  },
  chartsData: [],
  transactionsList: [],
};

export const summaryCards: CardTypes[] = [
  "income",
  "expenses",
  "pending",
  "balance",
];

export const initialFiltersOptions: FiltersOptions = {
  industries: [],
  states: [],
  accounts: [],
  startDate: 0,
  endDate: 0,
};
