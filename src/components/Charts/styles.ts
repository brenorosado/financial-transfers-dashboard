import styled from "styled-components";

export const ChartContainer = styled.div`
  padding: clamp(16px, 0.833vw, 0.833vw);
  min-width: 244px;
  height: clamp(400px, 40vh, 40vh);
  flex: 1;
  border: 1px solid var(--gray);
  background: var(--dark_gray);
  border-radius: clamp(8px, 0.833vw, 0.833vw);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.833vw, 0.833vw);
`;

export const ChartTitle = styled.span`
  font-size: clamp(20px, 1vw, 1vw);
  font-weight: bold;
  color: var(--light_gray);
`;

export const EmptyLabel = styled.span`
  color: var(--light_gray);
  font-size: clamp(12px, 0.833vw, 0.833vw);
`;

export const LegendLabel = styled.span`
  font-size: clamp(12px, 0.833vw, 0.833vw);
  color: var(--light_gray);
`;
