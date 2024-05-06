import { ChartData, Transaction } from "@/utils/handleTransactions";

export type Data = {
  options: {
    accountOptions: string[];
    stateOptions: string[];
    industryOptions: string[];
  };
  values: {
    totalExpenses: number;
    totalIncome: number;
    totalPending: number;
  };
  transactions: {
    lastDeposits: Transaction[];
    lastWithdrawals: Transaction[];
    lastPendingTransactions: Transaction[];
    lastTransactions: Transaction[];
  };
  chartsData: ChartData[];
  transactionsList: Transaction[];
};
