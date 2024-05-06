import { useState } from "react";
import { FiltersOptions } from "../Filters";
import * as S from "./styles";

type DateRangeInputProps = {
  onChangeDate: (date: string, dateProp: "startDate" | "endDate") => void;
  filters: FiltersOptions;
};

export const DateRangeInput = ({
  onChangeDate,
  filters,
}: DateRangeInputProps) => {
  const [startDate, setStartDate] = useState<string | undefined>(
    filters.startDate
      ? new Date(filters.startDate).toISOString().replace(":00.000Z", "")
      : undefined,
  );
  const [endDate, setEndDate] = useState<string | undefined>(
    filters.endDate
      ? new Date(filters.endDate).toISOString().replace(":00.000Z", "")
      : undefined,
  );

  return (
    <S.DateRangeInputContainer>
      <input
        type="datetime-local"
        value={startDate}
        onChange={({ target: { value } }) => {
          setStartDate(value);
          onChangeDate(value, "startDate");
        }}
      />
      <span>até</span>
      <input
        type="datetime-local"
        value={endDate}
        onChange={({ target: { value } }) => {
          setEndDate(value);
          onChangeDate(value, "endDate");
        }}
      />
    </S.DateRangeInputContainer>
  );
};
