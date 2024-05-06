import * as S from "./styles";

type DateRangeInputProps = {
  onChangeDate: (date: string, dateProp: "startDate" | "endDate") => void;
};

export const DateRangeInput = ({ onChangeDate }: DateRangeInputProps) => {
  return (
    <S.DateRangeInputContainer>
      <input
        type="datetime-local"
        onChange={(e) => onChangeDate(e.target.value, "startDate")}
      />
      <span>até</span>
      <input
        type="datetime-local"
        onChange={(e) => onChangeDate(e.target.value, "endDate")}
      />
    </S.DateRangeInputContainer>
  );
};
