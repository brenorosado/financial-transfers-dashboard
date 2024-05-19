import { Pagination } from ".";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Pagination Component", () => {
  it.each([
    {
      currentPage: 1,
      totalPages: 10,
      expectedOptions: ["1", "2", "3", "10"],
    },
    {
      currentPage: 5,
      totalPages: 10,
      expectedOptions: ["1", "4", "5", "6", "10"],
    },
    {
      currentPage: 10,
      totalPages: 10,
      expectedOptions: ["1", "8", "9", "10"],
    },
  ])(
    "render pages options correctly",
    ({ currentPage, totalPages, expectedOptions }) => {
      const mockedOnPageChange = jest.fn();

      const { getByText } = render(
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={mockedOnPageChange}
        />,
      );

      expectedOptions.forEach((option) => {
        expect(getByText(option)).toBeInTheDocument();
      });
    },
  );

  it("calls onPageChange function when a page button is clicked", () => {
    const mockedOnPageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockedOnPageChange}
      />,
    );
    fireEvent.click(getByText("2"));
    expect(mockedOnPageChange).toHaveBeenCalledWith(2);
  });

  it("applied style to selected page button correctly", () => {
    const mockedOnPageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockedOnPageChange}
      />,
    );
    expect(getByText("1")).toHaveStyle({
      border: "1px solid var(--light_gray)",
    });
  });
});
