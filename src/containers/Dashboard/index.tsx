"use client";

import { Sidebar } from "@/components/Sidebar";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { TransactionsListModal } from "@/components/TransactionsListModal";

const fetchTransactions = async (filters: FiltersOptions): Promise<Data> => {
  if (typeof window === "undefined") return dataInitialValue;

  const formattedData = handleTransactions(
    Transactions as Transaction[],
    filters,
  );

  return formattedData;
};

const getCachedFilters = () => {
  if (typeof window === "undefined") return initialFiltersOptions;

  const storagedFilters = localStorage.getItem(
    "@financial-transfers-dashboard:filters",
  );

  if (storagedFilters) return JSON.parse(storagedFilters);

  return initialFiltersOptions;
};

export const Dashboard = () => {
  const [showOptions, setShowOptions] = useState<boolean>(true);
  const [data, setData] = useState<Data>(dataInitialValue);
  const [filters, setFilters] = useState<FiltersOptions>(getCachedFilters);

  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    if (modalRef.current) modalRef.current.style.display = "flex";
  };

  const closeModal = () => {
    if (modalRef.current) modalRef.current.style.display = "none";
  };

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
      <TransactionsListModal
        transactions={data.transactionsList}
        modalRef={modalRef}
        onClose={closeModal}
      />

      <Sidebar showOptions={showOptions} setShowOptions={setShowOptions} />

      <S.Header>
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

      <S.TransactionsListSection>
        <S.ListTransactionsButton onClick={openModal}>
          Listar transações
        </S.ListTransactionsButton>
      </S.TransactionsListSection>
    </S.DashboardMain>
  );
};
