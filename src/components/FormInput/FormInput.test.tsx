import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FormInput } from ".";
import "@testing-library/jest-dom";

describe("FormInput component", () => {
  it("renders label correctly", () => {
    const { getByText } = render(<FormInput label="Username" />);
    const label = getByText("Username");
    expect(label).toBeInTheDocument();
  });

  it("renders error message and applies styles correctly", () => {
    const { getByText, getByTestId } = render(
      <FormInput error="Field is required" label="Test input" />,
    );
    expect(getByText("Field is required")).toBeInTheDocument();

    const formInputLabel = getByTestId("form-input-label");

    expect(formInputLabel).toHaveStyle("color: var(--red)");
  });

  it("toggles text visibility when canToggleTextVisibility is true", () => {
    const { getByTestId } = render(
      <FormInput label="Password" canToggleTextVisibility={true} />,
    );
    const passwordInput = getByTestId("form-input");
    const toggleIcon = getByTestId("form-input-toggle-visibility-icon");

    fireEvent.click(toggleIcon);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleIcon);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
