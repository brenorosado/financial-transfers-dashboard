import styled from "styled-components";

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  background: var(--dark_gray);
  width: clamp(48px, 3vw, 3vw);
  height: clamp(40px, 3.33vw, 3.33vw);
`;

export const ToggleVisibilityButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: clamp(32px, 3.33vw, 3.33vw);
  width: 100%;
  color: var(--light_gray);
  font-size: clamp(24px, 1.25vw, 1.25vw);
`;

type OptionsListStyleProps = {
  $show: boolean;
};

export const OptionsList = styled.ul<OptionsListStyleProps>`
  list-style: none;
  height: calc(100dvh - clamp(32px, 3.33vw, 3.33vw));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(8px, 0.42vw, 0.42vw);
  padding-top: clamp(16px, 0.833vw, 0.833vw);
  background: var(--dark_gray);
  transition: 0.2s;
  opacity: 1;

  ${({ $show }) =>
    !$show &&
    `
    opacity: 0;
    transform: translateX(-100%);
    `}
`;

type OptionStyleProps = { $active: boolean };

export const Option = styled.li<OptionStyleProps>`
  background: var(--black);
  padding: clamp(8px, 0.42vw, 0.42vw);
  border-radius: clamp(8px, 0.42vw, 0.42vw);
  border: 1px solid
    ${({ $active }) => ($active ? "var(--light_gray)" : "var(--black)")};
  font-size: clamp(16px, 0.833vw, 0.833vw);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
