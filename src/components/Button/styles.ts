import styled from "styled-components";

export const StyledButton = styled.button<{ disabled?: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(8px, 0.833vw, 0.833vw);
  background: var(--black);
  border-radius: clamp(8px, 0.833vw, 0.833vw);
  font-weight: bold;
  font-size: clamp(16px, 0.833vw, 0.833vw);
  flex: 1;
  transition: 0.3s;

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.7;
    cursor: not-allowed;
  `}
`;
