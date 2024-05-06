import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as S from "./styles";
import { Select } from "../Select";
import { Data } from "@/containers/Dashboard";
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
  const onSelect = (newOption: string, optionType: SelectsOptions) => {
    setFilters((prevFilters) => {
      const newOptions = [...prevFilters[optionType]];

      if (newOptions.includes(newOption)) {
        newOptions.splice(newOptions.indexOf(newOption), 1);
      } else {
        newOptions.push(newOption);
      }

      return {
        ...prevFilters,
        [optionType]: newOptions,
      };
    });
  };

  const onRemoveAll = (optionType: SelectsOptions) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [optionType]: [],
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
        placeholder="Selecione a conta"
        options={options.accountOptions}
        selectedOptions={filters.accounts}
        onSelectOption={(account: string) => onSelect(account, "accounts")}
        onRemoveAll={() => onRemoveAll("accounts")}
      />
      <DateRangeInput onChangeDate={onChangeDate} />
      <Select
        placeholder="Selecione o estado"
        options={options.stateOptions}
        selectedOptions={filters.states}
        onSelectOption={(state: string) => onSelect(state, "states")}
        onRemoveAll={() => onRemoveAll("states")}
      />
      <Select
        placeholder="Selecione a indústria"
        options={options.industryOptions}
        selectedOptions={filters.industries}
        onSelectOption={(industry: string) => onSelect(industry, "industries")}
        onRemoveAll={() => onRemoveAll("industries")}
      />
    </S.FiltersContainer>
  );
};
