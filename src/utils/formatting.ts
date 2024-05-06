import { Transaction } from "./handleTransactions";

export const formatBRLCurrency = (
  rawValue: number,
  isCents: boolean = true,
) => {
  const value = isCents ? rawValue / 100 : rawValue;

  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatDateFromMiliseconds = (miliseconds: number) => {
  const stringifiedDate = new Date(miliseconds).toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const [date, time] = stringifiedDate.split(", ");

  return `${time} ${date}`;
};

export const transformAmount = (
  amount: number,
  transactionType: Transaction["transaction_type"],
) => {
  if (transactionType === "withdraw") {
    return amount * -1;
  }

  return amount;
};
