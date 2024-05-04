import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  content: string;
}

export const Button = ({ content, ...props }: ButtonProps) => {
  return <button {...props}>{content}</button>;
};
