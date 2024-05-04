import { render, fireEvent } from "@testing-library/react";
import { Button } from ".";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Button>Hello World</Button>);
    const buttonElement = getByText("Hello World");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick function when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>,
    );
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick function when disabled", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock} disabled>
        Disabled Button
      </Button>,
    );
    const button = getByText("Disabled Button");
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("applies custom styles from props", () => {
    const { container } = render(
      <Button style={{ color: "red" }}>Styled Button</Button>,
    );
    const button = container.querySelector("button");
    expect(button).toHaveStyle("color: red");
  });

  it("passes additional attributes to the button element", () => {
    const { container } = render(
      <Button data-testid="custom-id">Custom ID Button</Button>,
    );
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("data-testid", "custom-id");
  });
});
