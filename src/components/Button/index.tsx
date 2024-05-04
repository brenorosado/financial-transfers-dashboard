import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import * as S from "./styles";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <S.StyledButton {...props}>{children}</S.StyledButton>;
};
