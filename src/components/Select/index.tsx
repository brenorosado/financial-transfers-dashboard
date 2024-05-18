import { useMemo, useState } from "react";
import * as S from "./styles";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type SelectProps = {
  options: string[];
  selectedOptions: string[];
  placeholder: string;
  onSelectOption: (option: string) => void;
  onRemoveAll: () => void;
};

export const Select = ({
  placeholder,
  options,
  selectedOptions,
  onSelectOption,
  onRemoveAll,
}: SelectProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const filteredOptions = useMemo(() => {
    if (!search) return options;

    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  return (
    <S.SelectWrapper>
      <S.SelectContainer
        onClick={() => setShowOptions((prevState) => !prevState)}
      >
        <input
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!showOptions) setShowOptions(true);
          }}
        />
        <S.IconContainer>
          <MdOutlineKeyboardArrowDown />
        </S.IconContainer>
      </S.SelectContainer>
      {selectedOptions?.length > 0 && (
        <S.QuantitySelectedIndicator>
          {selectedOptions.length} selected options
        </S.QuantitySelectedIndicator>
      )}
      {showOptions && (
        <S.OptionsContainer>
          <S.OptionsList>
            {filteredOptions.map((option) => (
              <S.Option
                key={option}
                selected={selectedOptions.includes(option)}
                onClick={() => onSelectOption(option)}
              >
                <div></div>
                <span>{option}</span>
              </S.Option>
            ))}
          </S.OptionsList>
          <button
            onClick={() => {
              setSearch("");
              setShowOptions(false);
              if (selectedOptions.length === 0) return;
              onRemoveAll();
            }}
          >
            Remove all
          </button>
        </S.OptionsContainer>
      )}
    </S.SelectWrapper>
  );
};
