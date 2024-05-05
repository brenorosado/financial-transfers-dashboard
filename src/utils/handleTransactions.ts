export type Transaction = {
  account: string;
  amount: string;
  currency: string;
  date: number;
  industry: string;
  state: string;
  transaction_type: "deposit" | "withdraw";
};

export const handleTransactions = (transactions: Transaction[]) => {
  const accountOptions: string[] = [];
  const stateOptions: string[] = [];
  const industryOptions: string[] = [];
  const lastDeposits: Transaction[] = [];
  const lastWithdrawals: Transaction[] = [];
  const lastPendingTransactions: Transaction[] = [];
  let totalIncome: number = 0;
  let totalExpenses: number = 0;
  let totalPending: number = 0;

  const nowMiliseconds = Number(new Date());

  const manageLastTransactions = (transaction: Transaction) => {
    const arrayToManage =
      transaction.date < nowMiliseconds
        ? transaction.transaction_type === "deposit"
          ? lastDeposits
          : lastWithdrawals
        : lastPendingTransactions;

    if (arrayToManage.length < 3) {
      arrayToManage.push(transaction);
      return;
    }

    const indexToReplace = arrayToManage.findIndex(
      (deposit) => transaction.date > deposit.date,
    );

    if (indexToReplace !== -1) {
      arrayToManage[indexToReplace] = transaction;
    }

    return;
  };

  transactions.forEach((transaction) => {
    const { account, state, industry, transaction_type, amount, date } =
      transaction;

    if (!accountOptions.includes(account)) {
      accountOptions.push(account);
    }

    if (!stateOptions.includes(state)) {
      stateOptions.push(state);
    }

    if (!industryOptions.includes(industry)) {
      industryOptions.push(industry);
    }

    manageLastTransactions(transaction);

    if (transaction_type === "deposit") {
      totalIncome += parseInt(amount);

      if (nowMiliseconds < date) {
        totalPending += parseInt(amount);
      }
    }

    if (transaction_type === "withdraw") {
      totalExpenses += parseInt(amount);

      if (nowMiliseconds < date) {
        totalPending -= parseInt(amount);
      }
    }
  });

  return {
    options: {
      accountOptions,
      stateOptions,
      industryOptions,
    },
    values: {
      totalExpenses,
      totalIncome,
      totalPending,
    },
    transactions: {
      lastDeposits,
      lastWithdrawals,
      lastPendingTransactions,
      lastTransactions: [...lastDeposits, ...lastWithdrawals]
        .sort((a, b) => a.date - b.date)
        .splice(0, 3),
    },
  };
};
