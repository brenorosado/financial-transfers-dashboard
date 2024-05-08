import styled from "styled-components";

type StyleProps = {
  error?: string;
};

export const FormInputContainer = styled.div<StyleProps>`
  position: relative;
  display: flex;
  flex-wrap: no-wrap;
  border-radius: clamp(8px, 0.833vw, 0.833vw);
  border: 1px solid
    ${({ error }) => (error ? "var(--red)" : "var(--light_gray)")};
  background: transparent;

  input {
    all: unset;
    width: 100%;
    padding: clamp(8px, 0.833vw, 0.833vw);
    border-radius: clamp(8px, 0.833vw, 0.833vw);
    font-size: clamp(12px, 0.833vw, 0.833vw);
    color: var(--light_gray);
  }
`;

export const InputLabel = styled.label<StyleProps>`
  position: absolute;
  top: calc(-1 * 0.7 * clamp(12px, 0.833vw, 0.833vw));
  left: clamp(16px, 0.833vw, 0.833vw);
  font-size: clamp(12px, 0.73vw, 0.73vw);
  background: var(--dark_gray);
  padding: 0 clamp(4px, 0.21vw, 0.21vw);
  color: ${({ error }) => (error ? "var(--red)" : "var(--light_gray)")};
`;

export const ErrorLabel = styled.span`
  position: absolute;
  bottom: calc(-1 * 0.5 * clamp(12px, 0.833vw, 0.833vw));
  right: clamp(16px, 0.833vw, 0.833vw);
  color: var(--red);
  font-size: clamp(10px, 0.6vw, 0.6vw);
  background: var(--gray);
  padding: 0 clamp(4px, 0.21vw, 0.21vw);
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(20px, 1.041vw, 1.041vw);
  padding: 0 clamp(8px, 0.5vw, 0.5vw);
  cursor: pointer;
  border-radius: clamp(8px, 0.833vw, 0.833vw);
`;
