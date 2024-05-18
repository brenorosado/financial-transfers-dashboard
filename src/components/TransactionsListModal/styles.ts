import styled from "styled-components";
import { TransactionsList, Transaction } from "../SummaryCard/styles";

export { TransactionsList, Transaction };

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  height: 100vh;
  width: 100dvw;
  width: 100vw;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const ModalContent = styled.div`
  width: clamp(260px, 60vw, 60vw);
  max-height: 90vh;
  background: var(--dark_gray);
  padding: clamp(8px, 0.833vw, 0.833vw);
  border-radius: clamp(8px, 0.833vw, 0.833vw);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.833vw, 0.833vw);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: clamp(16px, 1.25vw, 1.25vw);
    color: var(--light_gray);
  }

  button {
    all: unset;
    cursor: pointer;
    font-size: clamp(16px, 1.25vw, 1.25vw);
    }
  }
`;

export const TransactionsListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const EmbptyLabel = styled.span`
  color: var(--light_gray);
  text-align: center;
`;
