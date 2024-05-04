import styled from "styled-components";

export const LoginMain = styled.main`
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    min-width: 20vw;
    background: var(--gray);
    padding: clamp(8px, 0.833vw, 0.833vw);
    border-radius: clamp(8px, 0.833vw, 0.833vw);
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.833vw, 0.833vw);
`;
