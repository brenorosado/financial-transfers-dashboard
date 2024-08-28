import { useMemo, useState } from "react";
import * as S from "./styles";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type SelectProps = {
  options: string[];
  selectedOptions: string[];
  placeholder: string;
  onApplyOptions: (options: string[]) => void;
};

export const Select = ({
  placeholder,
  options,
  selectedOptions,
  onApplyOptions,
}: SelectProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [newSelectedOptions, setNewSelectedOptions] =
    useState<string[]>(selectedOptions);
  const [search, setSearch] = useState<string>("");

  const onSelectOption = (newOption: string) => {
    setNewSelectedOptions((prevNewSelectedOptions) => {
      const newOptions = [...prevNewSelectedOptions];

      if (newOptions.includes(newOption)) {
        newOptions.splice(newOptions.indexOf(newOption), 1);
      } else {
        newOptions.push(newOption);
      }

      return newOptions;
    });
  };

  const filteredOptions = useMemo(() => {
    if (!search) return options;

    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  return (
    <>
      {showOptions && (
        <S.OptionsOverlay
          onClick={() => setShowOptions(false)}
        ></S.OptionsOverlay>
      )}
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
          <>
            <S.OptionsContainer>
              <S.OptionsList>
                {filteredOptions.map((option) => (
                  <S.Option
                    data-testid={`option-${option}`}
                    key={option}
                    $selected={newSelectedOptions.includes(option)}
                    onClick={() => onSelectOption(option)}
                  >
                    <span>{option}</span>
                    <div></div>
                  </S.Option>
                ))}
              </S.OptionsList>
              <button
                onClick={() => {
                  setSearch("");
                  setShowOptions(false);
                  onApplyOptions(newSelectedOptions);
                }}
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setSearch("");
                  setShowOptions(false);
                  setNewSelectedOptions([]);
                  onApplyOptions([]);
                }}
              >
                Remove all
              </button>
            </S.OptionsContainer>
          </>
        )}
      </S.SelectWrapper>
    </>
  );
};
