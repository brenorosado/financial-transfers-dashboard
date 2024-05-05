"use client";

import { Sidebar } from "@/components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import Transactions from "@/../transactions.json";
import { Transaction, handleTransactions } from "@/utils/handleTransactions";
import * as S from "./styles";
import { SummaryCard } from "@/components/SummaryCard";

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
};

const dataInitialValue: Data = {
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
};

export const Dashboard = () => {
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const [data, setData] = useState<Data>(dataInitialValue);

  const fetchTransactions = useCallback(async () => {
    try {
      const formattedData = handleTransactions(Transactions as Transaction[]);
      setData(formattedData);
    } catch (e) {
      console.log("Error while trying do read transactions file: ", e);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <S.DashboardMain $showSideBarOptions={showOptions}>
      <Sidebar showOptions={showOptions} setShowOptions={setShowOptions} />

      <S.CardsSection>
        <SummaryCard
          type="income"
          values={data.values}
          transactions={data.transactions}
        />
        <SummaryCard
          type="pending"
          values={data.values}
          transactions={data.transactions}
        />
        <SummaryCard
          type="expenses"
          values={data.values}
          transactions={data.transactions}
        />
        <SummaryCard
          type="balance"
          values={data.values}
          transactions={data.transactions}
        />
      </S.CardsSection>
    </S.DashboardMain>
  );
};
