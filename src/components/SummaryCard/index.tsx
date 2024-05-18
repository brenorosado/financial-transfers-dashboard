import * as S from "./styles";
import {
  formatBRLCurrency,
  formatDateFromMiliseconds,
  transformAmount,
} from "@/utils/formatting";
import { Transaction } from "@/utils/handleTransactions";
import { Data } from "@/containers/Dashboard/types";

export type CardTypes = "expenses" | "income" | "pending" | "balance";

type SummaryCardProps = {
  type: CardTypes;
  values: Data["values"];
  transactions: Data["transactions"];
};

const getCardInfo = ({ type, values, transactions }: SummaryCardProps) => {
  const titles = {
    expenses: {
      title: "EXPENSES",
      amount: values.totalExpenses,
      transactionsToList: transactions.lastWithdrawals,
    },
    income: {
      title: "REVENUES",
      amount: values.totalIncome,
      transactionsToList: transactions.lastDeposits,
    },
    pending: {
      title: "PENDING",
      amount: values.totalPending,
      transactionsToList: transactions.lastPendingTransactions,
    },
    balance: {
      title: "BALANCE",
      amount: values.totalIncome - values.totalExpenses,
      transactionsToList: transactions.lastTransactions,
    },
  };

  return titles[type]
    ? { ...titles[type], amount: formatBRLCurrency(titles[type].amount) }
    : { title: "-", amount: "R$ 0,00", transactionsToList: [] };
};

export const SummaryCard = ({
  type,
  values,
  transactions,
}: SummaryCardProps) => {
  const { title, amount, transactionsToList } = getCardInfo({
    type,
    values,
    transactions,
  });

  return (
    <S.SummaryCardContainer>
      <S.Header type={type}>
        <span>{title}</span>
        <span>{amount}</span>
      </S.Header>
      <S.TransactionsList>
        {transactionsToList.length === 0 && (
          <S.EmptyLabel>No transactions of this type</S.EmptyLabel>
        )}
        {transactionsToList.map(
          ({
            date,
            amount: transactionAmount,
            account,
            industry,
            state,
            transaction_type,
          }) => (
            <S.Transaction key={date} type={type}>
              <div>
                <span>{account}</span>
                <span>
                  {industry} - {state}
                </span>
              </div>
              <div>
                <span>
                  {formatBRLCurrency(
                    transformAmount(
                      Number(transactionAmount),
                      transaction_type,
                    ),
                  )}
                </span>
                <span>{formatDateFromMiliseconds(date)}</span>
              </div>
            </S.Transaction>
          ),
        )}
      </S.TransactionsList>
    </S.SummaryCardContainer>
  );
};
