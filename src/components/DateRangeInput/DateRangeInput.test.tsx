import { render, screen, fireEvent } from "@testing-library/react";
import { DateRangeInput } from ".";
import { FiltersOptions } from "../Filters";
import "@testing-library/jest-dom";

const emptyFilters: FiltersOptions = {
  industries: [],
  states: [],
  accounts: [],
  startDate: 0,
  endDate: 0,
};

describe("DateRangeInput component", () => {
  const mockOnChangeDate = jest.fn();
  const filters: FiltersOptions = {
    ...emptyFilters,
    startDate: Number(new Date("2023-05-19T00:00:00Z")),
    endDate: Number(new Date("2023-05-20T00:00:00Z")),
  };

  it("renders correctly with initial date values", () => {
    const { getByDisplayValue } = render(
      <DateRangeInput onChangeDate={mockOnChangeDate} filters={filters} />,
    );

    const startDateInput = getByDisplayValue("2023-05-19T00:00");
    const endDateInput = getByDisplayValue("2023-05-20T00:00");

    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
  });

  it("calls onChangeDate with correct values on startDate change", () => {
    const { getByDisplayValue } = render(
      <DateRangeInput onChangeDate={mockOnChangeDate} filters={filters} />,
    );

    const newStartDate = "2023-05-21T10:00";
    const startDateInput = getByDisplayValue("2023-05-19T00:00");

    fireEvent.change(startDateInput, { target: { value: newStartDate } });

    expect(mockOnChangeDate).toHaveBeenCalledWith(newStartDate, "startDate");
  });

  it("calls onChangeDate with correct values on endDate change", () => {
    const { getByDisplayValue } = render(
      <DateRangeInput onChangeDate={mockOnChangeDate} filters={filters} />,
    );

    const newEndDate = "2023-05-22T10:00";
    const endDateInput = getByDisplayValue("2023-05-20T00:00");

    fireEvent.change(endDateInput, { target: { value: newEndDate } });

    expect(mockOnChangeDate).toHaveBeenCalledWith(newEndDate, "endDate");
  });

  it("calls onChangeDate with correct values on startDate change when no initial date is provided", () => {
    const { queryAllByDisplayValue } = render(
      <DateRangeInput onChangeDate={mockOnChangeDate} filters={emptyFilters} />,
    );

    const newStartDate = "2023-05-21T10:00";
    const startDateInput = queryAllByDisplayValue("");

    if (startDateInput)
      fireEvent.change(startDateInput[0], { target: { value: newStartDate } });

    expect(mockOnChangeDate).toHaveBeenCalledWith(newStartDate, "startDate");
  });

  it("calls onChangeDate with correct values on endDate change when no initial date is provided", () => {
    const { queryAllByDisplayValue } = render(
      <DateRangeInput onChangeDate={mockOnChangeDate} filters={emptyFilters} />,
    );

    const newEndDate = "2023-05-22T10:00";
    const endDateInput = queryAllByDisplayValue("");

    if (endDateInput)
      fireEvent.change(endDateInput[1], { target: { value: newEndDate } });

    expect(mockOnChangeDate).toHaveBeenCalledWith(newEndDate, "endDate");
  });
});
