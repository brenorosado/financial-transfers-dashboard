import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  gap: clamp(8px, 0.833vw, 0.833vw);
  align-items: center;
  justify-content: center;
`;

type PageButtonStyleProps = {
  selected: boolean;
};

export const PageButton = styled.div<PageButtonStyleProps>`
  border: 1px solid var(--gray);
  padding: clamp(4px, 0.42vw, 0.42vw);
  border-radius: clamp(4px, 0.42vw, 0.42vw);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(12px, 0.833vw, 0.833vw);
  color: var(--light_gray);
  cursor: pointer;
  transition: 0.2s;

  ${({ selected }) =>
    selected &&
    `
    border: 1px solid var(--light_gray);
  `}

  &:hover {
    border: 1px solid var(--light_gray);
  }
`;
