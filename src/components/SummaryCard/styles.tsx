import styled from "styled-components";
import { CardTypes } from ".";

const CardTypeColorModifiers = {
  expenses: () => `color: var(--red);`,
  income: () => `color: var(--green);`,
  pending: () => `color: var(--yellow);`,
  balance: () => `color: var(--blue);`,
};

export const SummaryCardContainer = styled.div`
  border: 1px solid var(--light_gray);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.833vw, 0.833vw);
  padding: clamp(8px, 0.833vw, 0.833vw);
  border-radius: clamp(8px, 0.833vw, 0.833vw);
  min-width: 244px;
`;

type HeaderStyleProps = {
  type: CardTypes;
};

export const Header = styled.div<HeaderStyleProps>`
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.42vw, 0.42vw);

  span {
    ${({ type }) => CardTypeColorModifiers[type]()}
  }

  span:first-child {
    font-size: clamp(12px, 0.833vw, 0.833vw);
    font-weight: 500;
  }

  span:last-child {
    font-size: clamp(16px, 1.25vw, 1.25vw);
    font-weight: bold;
  }
`;

export const EmptyLabel = styled.span`
  font-size: clamp(12px, 0.833vw, 0.833vw);
  color: var(--light_gray);
`;

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
`;

type TransactionStyleProps = {
  type: CardTypes;
};

export const Transaction = styled.div<TransactionStyleProps>`
  display: flex;
  justify-content: space-between;
  padding: clamp(8px, 0.42vw, 0.42vw);

  div {
    display: flex;
    flex-direction: column;

    span:first-child {
      font-size: clamp(12px, 0.833vw, 0.833vw);
    }

    span:last-child {
      font-size: clamp(8px, 0.625vw, 0.625vw);
    }
  }

  div:last-child {
    align-items: flex-end;

    span:first-child {
      ${({ type }) => CardTypeColorModifiers[type]()}
    }
  }
`;
