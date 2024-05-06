"use client";

import { Sidebar } from "@/components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import Transactions from "@/../transactions.json";
import { Transaction, handleTransactions } from "@/utils/handleTransactions";
import * as S from "./styles";
import { SummaryCard } from "@/components/SummaryCard";
import { LineChart, BarsChart } from "@/components/Charts";
import { Filters, FiltersOptions } from "@/components/Filters";
import { Data } from "./types";
import {
  dataInitialValue,
  initialFiltersOptions,
  summaryCards,
} from "./constants";

const fetchTransactions = async (filters: FiltersOptions): Promise<Data> => {
  if (typeof window === "undefined") return dataInitialValue;

  const previousOptions = localStorage.getItem("@bix-challenge:options");

  const formattedData = handleTransactions(
    Transactions as Transaction[],
    filters,
    !previousOptions,
  );

  localStorage.setItem("@bix-challenge:filters", JSON.stringify(filters));

  return {
    ...formattedData,
    ...(!!previousOptions
      ? { options: JSON.parse(previousOptions) }
      : { options: formattedData.options }),
  };
};

export const Dashboard = () => {
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const [data, setData] = useState<Data>(dataInitialValue);
  const [filters, setFilters] = useState<FiltersOptions>(() => {
    if (typeof window === "undefined") return initialFiltersOptions;

    const storagedFilters = localStorage.getItem("@bix-challenge:filters");

    if (storagedFilters) return JSON.parse(storagedFilters);

    return initialFiltersOptions;
  });

  const getTransactions = useCallback(async () => {
    try {
      const newData = await fetchTransactions(filters);
      setData(newData);
    } catch (e) {
      console.log("Error while trying do read transactions file: ", e);
    }
  }, [filters]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

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
