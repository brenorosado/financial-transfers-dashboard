import { Dispatch, SetStateAction } from "react";
import * as S from "./styles";
import { Select } from "../Select";
import { Data } from "@/containers/Dashboard/types";
import { DateRangeInput } from "../DateRangeInput";

export type FiltersOptions = {
  industries: string[];
  states: string[];
  accounts: string[];
  startDate: number;
  endDate: number;
};

type FilterProps = {
  options: Data["options"];
  filters: FiltersOptions;
  setFilters: Dispatch<SetStateAction<FiltersOptions>>;
};

type SelectsOptions = "industries" | "states" | "accounts";

export const Filters = ({ options, filters, setFilters }: FilterProps) => {
  const onApllySelectOptions = (
    newOptions: string[],
    optionType: SelectsOptions,
  ) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [optionType]: newOptions,
      };
    });
  };

  const onChangeDate = (
    dateString: string,
    dateProp: "startDate" | "endDate",
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [dateProp]: Number(new Date(dateString)),
    }));
  };

  return (
    <S.FiltersContainer>
      <Select
        placeholder="Select account"
        options={options.accountOptions}
        selectedOptions={filters.accounts}
        onApplyOptions={(newSelectedAccounts) =>
          onApllySelectOptions(newSelectedAccounts, "accounts")
        }
      />
      <DateRangeInput onChangeDate={onChangeDate} filters={filters} />
      <Select
        placeholder="Select state"
        options={options.stateOptions}
        selectedOptions={filters.states}
        onApplyOptions={(newSelectedStates) =>
          onApllySelectOptions(newSelectedStates, "states")
        }
      />
      <Select
        placeholder="Select industry"
        options={options.industryOptions}
        selectedOptions={filters.industries}
        onApplyOptions={(newSelectedIndustries) =>
          onApllySelectOptions(newSelectedIndustries, "industries")
        }
      />
    </S.FiltersContainer>
  );
};
