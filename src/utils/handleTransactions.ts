import { FiltersOptions } from "@/components/Filters";

export type Transaction = {
  account: string;
  amount: string;
  currency: string;
  date: number;
  industry: string;
  state: string;
  transaction_type: "deposit" | "withdraw";
};

export type ChartData = {
  name: string;
  expenses: number;
  income: number;
};

export const handleTransactions = (
  transactions: Transaction[],
  filters: FiltersOptions,
  mustReturnOptions: boolean = true,
) => {
  const accountOptions: string[] = [];
  const stateOptions: string[] = [];
  const industryOptions: string[] = [];
  const lastDeposits: Transaction[] = [];
  const lastWithdrawals: Transaction[] = [];
  const lastPendingTransactions: Transaction[] = [];
  let totalIncome: number = 0;
  let totalExpenses: number = 0;
  let totalPending: number = 0;
  const chartsData: ChartData[] = [];

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

  const manageChartData = (transaction: Transaction) => {
    const transactionDate = new Date(transaction.date);

    const transactionMonth = (transactionDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const transactionYear = transactionDate.getFullYear().toString().slice(-2);

    const indexToAggregate = chartsData.findIndex(
      (data) => data.name === `${transactionMonth}/${transactionYear}`,
    );

    if (indexToAggregate !== -1) {
      chartsData[indexToAggregate] = {
        ...chartsData[indexToAggregate],
        ...(transaction.transaction_type === "deposit"
          ? {
              income:
                chartsData[indexToAggregate].income +
                parseInt(transaction.amount),
            }
          : {
              expenses:
                chartsData[indexToAggregate].expenses +
                parseInt(transaction.amount),
            }),
      };
      return;
    }

    chartsData.push({
      name: `${transactionMonth}/${transactionYear}`,
      ...(transaction.transaction_type === "deposit"
        ? {
            income: parseInt(transaction.amount),
            expenses: 0,
          }
        : {
            expenses: parseInt(transaction.amount),
            income: 0,
          }),
    });
  };

  transactions
    .filter((transation) => {
      const conditions: boolean[] = [];

      if (filters.accounts.length > 0)
        conditions.push(filters.accounts.includes(transation.account));

      if (filters.states.length > 0)
        conditions.push(filters.states.includes(transation.state));

      if (filters.industries.length > 0)
        conditions.push(filters.industries.includes(transation.industry));

      return conditions.every((condition) => condition);
    })
    .forEach((transaction) => {
      const { account, state, industry, transaction_type, amount, date } =
        transaction;

      if (mustReturnOptions) {
        if (!accountOptions.includes(account)) {
          accountOptions.push(account);
        }

        if (!stateOptions.includes(state)) {
          stateOptions.push(state);
        }

        if (!industryOptions.includes(industry)) {
          industryOptions.push(industry);
        }
      }

      manageLastTransactions(transaction);
      manageChartData(transaction);

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
    chartsData: chartsData
      .sort((a, b) => {
        const dateA = Number(
          new Date(`20${a.name.split("/").reverse().join("-")}`),
        );
        const dateB = Number(
          new Date(`20${b.name.split("/").reverse().join("-")}`),
        );
        return dateA - dateB;
      })
      .map((d) => ({
        ...d,
        income: d.income / 100,
        expenses: d.expenses / 100,
        balance: (d.income - d.expenses) / 100,
      })),
  };
};
