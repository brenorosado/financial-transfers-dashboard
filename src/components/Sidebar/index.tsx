import { Dispatch, SetStateAction } from "react";
import * as S from "./styles";
import { IoIosMenu } from "react-icons/io";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";

type SidebarProps = {
  showOptions: boolean;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({ showOptions, setShowOptions }: SidebarProps) => {
  return (
    <S.SidebarContainer>
      <S.ToggleVisibilityButton
        onClick={() => setShowOptions((prevState: boolean) => !prevState)}
      >
        {showOptions ? <MdOutlineMenu /> : <MdMenuOpen />}
      </S.ToggleVisibilityButton>
      <S.OptionsList></S.OptionsList>
    </S.SidebarContainer>
  );
};
