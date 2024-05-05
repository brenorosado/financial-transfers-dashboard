import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import * as S from "./styles";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
  canToggleTextVisibility?: boolean;
  register?: UseFormRegisterReturn;
}

export const FormInput = ({
  label,
  error,
  canToggleTextVisibility,
  register,
  ...props
}: FormInputProps) => {
  const [showTest, setShowText] = useState<boolean>(false);

  return (
    <S.FormInputContainer error={error} data-testid="form-input-container">
      {!!label && (
        <S.InputLabel
          htmlFor={props.id}
          error={error}
          data-testid="form-input-label"
        >
          {label}
        </S.InputLabel>
      )}
      {!!error && (
        <S.ErrorLabel data-testid="form-input-error-label">
          {error}
        </S.ErrorLabel>
      )}
      <input
        data-testid="form-input"
        {...props}
        {...register}
        type={
          canToggleTextVisibility
            ? showTest
              ? "text"
              : "password"
            : props.type
        }
      />
      {canToggleTextVisibility && (
        <S.IconContainer
          data-testid="form-input-toggle-visibility-icon"
          onClick={() => setShowText((prevState) => !prevState)}
        >
          {showTest ? <BsEyeSlash /> : <BsEye />}
        </S.IconContainer>
      )}
    </S.FormInputContainer>
  );
};
