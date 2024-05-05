import styled from "styled-components";

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: clamp(48px, 0.5vw, 0.5vw);
  background: var(--dark_gray);
`;

export const ToggleVisibilityButton = styled.button`
  all: unset;
  cursor: pointer;
  height: clamp(32px, 3.33vw, 3.33vw);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--light_gray);
  font-size: clamp(24px, 1.25vw, 1.25vw);
`;

export const OptionsList = styled.ul`
  position: absolute;
  list-style: none;
`;
