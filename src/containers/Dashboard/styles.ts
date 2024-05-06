import styled from "styled-components";

export const DashboardMain = styled.main<{ $showSideBarOptions: boolean }>`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 1.25vw, 1.25vw);
  padding: clamp(16px, 3.33vw, 3.33vw);
  padding-top: clamp(64px, 3.33vw, 3.33vw);
  transition: 0.2s;

  ${({ $showSideBarOptions }) =>
    $showSideBarOptions &&
    `
    @media (min-width: 768px) {
      padding-left: calc(clamp(16px, 3.33vw, 3.33vw) + clamp(48px, 0.5vw, 0.5vw));
    }
  `}
`;

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(16px, 0.833vw, 0.833vw);

  h2 {
    font-size: clamp(16px, 1.25vw, 1.25vw);
  }
`;

export const CardsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(16px, 1.25vw, 1.25vw);
  justify-content: space-between;
`;

export const ChartsSections = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(16px, 1.25vw, 1.25vw);
  justify-content: space-between;
`;
