import styled from "styled-components";

export const ChartContainer = styled.div`
  padding: clamp(16px, 0.833vw, 0.833vw);
  min-width: 244px;
  border: 1px solid blue;
  height: clamp(400px, 40vh, 40vh);
  flex: 1;
  border: 1px solid var(--light_gray);
  border-radius: clamp(8px, 0.833vw, 0.833vw);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.833vw, 0.833vw);
`;

export const ChartTitle = styled.span`
  font-size: clamp(20px, 1vw, 1vw);
  font-weight: bold;
`;

export const EmptyLabel = styled.span`
  color: var(--light_gray);
  font-size: clamp(12px, 0.833vw, 0.833vw);
`;
