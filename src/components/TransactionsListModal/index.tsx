import {
  formatBRLCurrency,
  formatDateFromMiliseconds,
  transformAmount,
} from "@/utils/formatting";
import * as S from "./styles";
import { Transaction } from "@/utils/handleTransactions";
import { Ref, useMemo, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Pagination } from "../Pagination";

type TransactionsListModalProps = {
  transactions: Transaction[];
  modalRef: Ref<HTMLDivElement>;
  onClose: () => void;
};

const TransactionRow = ({ data }: { data: Transaction }) => {
  const { date, amount, account, industry, state, transaction_type } = data;

  return (
    <S.Transaction
      type={transaction_type === "deposit" ? "income" : "expenses"}
    >
      <div>
        <span>{account}</span>
        <span>
          {industry} - {state}
        </span>
      </div>
      <div>
        <span>
          {formatBRLCurrency(transformAmount(Number(amount), transaction_type))}
        </span>
        <span>{formatDateFromMiliseconds(date)}</span>
      </div>
    </S.Transaction>
  );
};

const PAGE_SIZE = 10;

export const TransactionsListModal = ({
  transactions,
  modalRef,
  onClose,
}: TransactionsListModalProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortedTransactions = useMemo(() => {
    return transactions.sort((a, b) => {
      return Number(new Date(b.date)) - Number(new Date(a.date));
    });
  }, [transactions]);

  const transactionsToList = sortedTransactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <S.Overlay ref={modalRef}>
      <S.ModalContent>
        <S.Header>
          <h3>Transactions</h3>
          <button
            onClick={() => {
              setCurrentPage(1);
              onClose();
            }}
          >
            <IoClose />
          </button>
        </S.Header>
        {sortedTransactions.length === 0 ? (
          <S.EmbptyLabel>
            There are no transactions for the selected filters
          </S.EmbptyLabel>
        ) : (
          <>
            <S.TransactionsListContainer>
              {transactionsToList.map((transaction, index) => (
                <TransactionRow
                  key={`${index}-${transaction.date}`}
                  data={transaction}
                />
              ))}
            </S.TransactionsListContainer>
            <Pagination
              totalPages={Math.ceil(sortedTransactions.length / PAGE_SIZE)}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </S.ModalContent>
    </S.Overlay>
  );
};
