export const formatBRLCurrency = (centsValue: number) => {
  const value = centsValue / 100;

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
