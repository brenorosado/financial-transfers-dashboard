import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from ".";
import "@testing-library/jest-dom";

const options = ["Option 1", "Option 2", "Option 3"];
const selectedOptions = ["Option 1"];
const placeholder = "Select options";
const onApplyOptions = jest.fn();

describe("Select component", () => {
  it("renders correctly with placeholder", () => {
    render(
      <Select
        options={options}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        onApplyOptions={onApplyOptions}
      />,
    );

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("shows options when input is clicked", () => {
    const { getByPlaceholderText, getByText } = render(
      <Select
        options={options}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        onApplyOptions={onApplyOptions}
      />,
    );

    fireEvent.click(getByPlaceholderText(placeholder));

    options.forEach((option) => {
      expect(getByText(option)).toBeInTheDocument();
    });
  });

  it("filters options based on search input", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Select
        options={options}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        onApplyOptions={onApplyOptions}
      />,
    );

    fireEvent.click(getByPlaceholderText(placeholder));
    fireEvent.change(getByPlaceholderText(placeholder), {
      target: { value: "2" },
    });

    expect(getByText("Option 2")).toBeInTheDocument();
    expect(queryByText("Option 1")).not.toBeInTheDocument();
    expect(queryByText("Option 3")).not.toBeInTheDocument();
  });

  it("check style applied to selected option", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Select
        options={options}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        onApplyOptions={onApplyOptions}
      />,
    );

    fireEvent.click(getByPlaceholderText(placeholder));

    const option = getByTestId("option-Option 1");
    expect(option.firstChild).toHaveStyle({
      background: "rgb(131, 131, 131);",
    });
  });

  it("applies selected options when apply button is clicked", () => {
    const { getByPlaceholderText, getByText } = render(
      <Select
        options={options}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        onApplyOptions={onApplyOptions}
      />,
    );

    fireEvent.click(getByPlaceholderText(placeholder));

    const option2 = getByText("Option 2");
    fireEvent.click(option2);

    fireEvent.click(getByText("Apply"));

    expect(onApplyOptions).toHaveBeenCalledWith(["Option 1", "Option 2"]);
  });

  it("removes all options when remove all button is clicked", () => {
    const { getByPlaceholderText, getByText } = render(
      <Select
        options={options}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        onApplyOptions={onApplyOptions}
      />,
    );

    fireEvent.click(getByPlaceholderText(placeholder));
    fireEvent.click(getByText("Remove all"));

    expect(onApplyOptions).toHaveBeenCalledWith([]);
  });
});
