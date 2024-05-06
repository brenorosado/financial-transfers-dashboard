"use client";

import { Sidebar } from "@/components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import Transactions from "@/../transactions.json";
import {
  ChartData,
  Transaction,
  handleTransactions,
} from "@/utils/handleTransactions";
import * as S from "./styles";
import { CardTypes, SummaryCard } from "@/components/SummaryCard";
import { LineChart, BarsChart } from "@/components/Charts";
import { Filters, FiltersOptions } from "@/components/Filters";

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
  chartsData: [],
};

const summaryCards: CardTypes[] = ["income", "expenses", "pending", "balance"];

const initialFiltersOptions: FiltersOptions = {
  industries: [],
  states: [],
  accounts: [],
  startDate: 0,
  endDate: 0,
};

export const Dashboard = () => {
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const [data, setData] = useState<Data>(dataInitialValue);
  const [filters, setFilters] = useState<FiltersOptions>(initialFiltersOptions);

  const fetchTransactions = useCallback(async () => {
    try {
      if (typeof window === "undefined") return;

      const previousOptions = localStorage.getItem("@bix-challenge:options");

      const formattedData = handleTransactions(
        Transactions as Transaction[],
        filters,
        !previousOptions,
      );

      if (!previousOptions) {
        localStorage.setItem(
          "@bix-challenge:options",
          JSON.stringify(formattedData.options),
        );
      }

      setData({
        ...formattedData,
        ...(!!previousOptions
          ? { options: JSON.parse(previousOptions) }
          : { options: formattedData.options }),
      });
    } catch (e) {
      console.log("Error while trying do read transactions file: ", e);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <S.DashboardMain $showSideBarOptions={showOptions}>
      <Sidebar showOptions={showOptions} setShowOptions={setShowOptions} />

      <S.Header>
        <h2>Olá, usuário</h2>
        <Filters
          options={data.options}
          filters={filters}
          setFilters={setFilters}
        />
      </S.Header>

      <S.CardsSection>
        {summaryCards.map((type) => (
          <SummaryCard
            key={type}
            type={type}
            values={data.values}
            transactions={data.transactions}
          />
        ))}
      </S.CardsSection>

      <S.ChartsSections>
        <BarsChart chartsData={data.chartsData} />
        <LineChart chartsData={data.chartsData} />
      </S.ChartsSections>
    </S.DashboardMain>
  );
};
