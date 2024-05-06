import {
  formatBRLCurrency,
  formatDateFromMiliseconds,
  transformAmount,
} from "@/utils/formatting";
import * as S from "./styles";
import { Transaction } from "@/utils/handleTransactions";
import { Ref, useMemo } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { IoClose } from "react-icons/io5";

type TransactionsListModalProps = {
  transactions: Transaction[];
  modalRef: Ref<HTMLDivElement>;
  onClose: () => void;
};

const TransactionRow = ({
  index,
  style,
  data,
}: {
  index: number;
  style: React.CSSProperties;
  data: Transaction[];
}) => {
  const {
    date,
    amount: transactionAmount,
    account,
    industry,
    state,
    transaction_type,
  } = data[index ?? 0];

  return (
    <S.Transaction
      style={style}
      key={date}
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
          {formatBRLCurrency(
            transformAmount(Number(transactionAmount), transaction_type),
          )}
        </span>
        <span>{formatDateFromMiliseconds(date)}</span>
      </div>
    </S.Transaction>
  );
};

export const TransactionsListModal = ({
  transactions,
  modalRef,
  onClose,
}: TransactionsListModalProps) => {
  const sortedTransactions = useMemo(() => {
    return transactions.sort((a, b) => {
      return Number(new Date(b.date)) - Number(new Date(a.date));
    });
  }, [transactions]);

  return (
    <S.Overlay ref={modalRef}>
      <S.ModalContent>
        <S.Header>
          <h3>Transações</h3>
          <button onClick={onClose}>
            <IoClose />
          </button>
        </S.Header>
        <S.TransactionsListContainer>
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                itemData={sortedTransactions}
                className="List"
                height={height}
                width={width}
                itemSize={50}
                itemCount={sortedTransactions.length}
              >
                {TransactionRow}
              </FixedSizeList>
            )}
          </AutoSizer>
        </S.TransactionsListContainer>
      </S.ModalContent>
    </S.Overlay>
  );
};
