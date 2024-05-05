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
    margin-left: clamp(48px, 0.5vw, 0.5vw);
  `}
`;

export const CardsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(16px, 1.25vw, 1.25vw);
  justify-content: space-between;
`;
