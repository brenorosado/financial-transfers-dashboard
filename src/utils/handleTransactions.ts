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
  name: `${string}/${string}`;
  expenses: number;
  income: number;
  balance: number;
};

const chartDataInitialValue: ChartData = {
  name: "-/-",
  expenses: 0,
  income: 0,
  balance: 0,
};

const sortChartData = (a: ChartData, b: ChartData) => {
  const dateA = Number(new Date(`20${a.name.split("/").reverse().join("-")}`));
  const dateB = Number(new Date(`20${b.name.split("/").reverse().join("-")}`));
  return dateA - dateB;
};

const filterTransaction = (
  transaction: Transaction,
  filters: FiltersOptions,
) => {
  const conditions: boolean[] = [];

  if (filters.accounts.length > 0)
    conditions.push(filters.accounts.includes(transaction.account));

  if (filters.states.length > 0)
    conditions.push(filters.states.includes(transaction.state));

  if (filters.industries.length > 0)
    conditions.push(filters.industries.includes(transaction.industry));

  if (filters.startDate > 0)
    conditions.push(filters.startDate <= transaction.date);

  if (filters.endDate > 0) conditions.push(filters.endDate >= transaction.date);

  return conditions.every((condition) => condition);
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
  const chartsData: ChartData[] = [];
  let totalIncome: number = 0;
  let totalExpenses: number = 0;
  let totalPending: number = 0;

  const nowMiliseconds = Number(new Date());

  const manageOptions = (transaction: Transaction) => {
    const { account, state, industry } = transaction;

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
  };

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

    const propToChange =
      transaction.transaction_type === "deposit" ? "income" : "expenses";

    if (indexToAggregate !== -1) {
      chartsData[indexToAggregate] = {
        ...chartsData[indexToAggregate],
        [propToChange]:
          chartsData[indexToAggregate][propToChange] +
          parseInt(transaction.amount),
      };
      return;
    }

    chartsData.push({
      ...chartDataInitialValue,
      name: `${transactionMonth}/${transactionYear}`,
      [propToChange]: parseInt(transaction.amount),
    });
  };

  const manageAccumulators = (transaction: Transaction) => {
    const { transaction_type, amount, date } = transaction;
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
  };

  transactions
    .filter((transaction) => filterTransaction(transaction, filters))
    .forEach((transaction) => {
      manageOptions(transaction);
      manageLastTransactions(transaction);
      manageChartData(transaction);
      manageAccumulators(transaction);
    });

  const formattedChartData = chartsData
    .sort(sortChartData)
    .map((chartData) => ({
      ...chartData,
      income: chartData.income / 100,
      expenses: chartData.expenses / 100,
      balance: (chartData.income - chartData.expenses) / 100,
    }));

  const lastTransactions = [...lastDeposits, ...lastWithdrawals]
    .sort((a, b) => a.date - b.date)
    .splice(0, 3);

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
      lastTransactions,
    },
    chartsData: formattedChartData,
  };
};
