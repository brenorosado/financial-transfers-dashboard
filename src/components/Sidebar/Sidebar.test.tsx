import { render, fireEvent } from "@testing-library/react";
import { Sidebar } from ".";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
}));

describe("Sidebar component", () => {
  it("options is shown when showOptions is true", () => {
    const { getByTestId } = render(
      <Sidebar showOptions={true} setShowOptions={() => {}} />,
    );

    const optionsList = getByTestId("sidebar-options-list");

    expect(optionsList).toBeVisible();
  });

  it("options isn't shown when showOptions is false", () => {
    const { getByTestId } = render(
      <Sidebar showOptions={false} setShowOptions={() => {}} />,
    );

    const optionsList = getByTestId("sidebar-options-list");

    expect(optionsList).not.toBeVisible();
  });

  it("calls setShowOptions function when toggle visibility button is clicked", () => {
    const setShowOptions = jest.fn();

    const { getByTestId } = render(
      <Sidebar showOptions={true} setShowOptions={setShowOptions} />,
    );

    const toggleButton = getByTestId("sidebar-toggle-button");

    fireEvent.click(toggleButton);

    expect(setShowOptions).toHaveBeenCalledTimes(1);
  });

  it("active option is highlighted", () => {
    const { getByTestId } = render(
      <Sidebar showOptions={true} setShowOptions={() => {}} />,
    );

    const dashboardOption = getByTestId("dashboard-option");

    expect(dashboardOption).toHaveStyle(`
      border: 1px solid var(--light_gray);
    `);
  });
});
