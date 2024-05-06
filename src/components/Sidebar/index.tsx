"use client";

import { Dispatch, SetStateAction } from "react";
import * as S from "./styles";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import { FaDoorOpen } from "react-icons/fa6";
import { BiHomeAlt } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type SidebarProps = {
  showOptions: boolean;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({ showOptions, setShowOptions }: SidebarProps) => {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <S.SidebarContainer>
      <S.ToggleVisibilityButton
        data-testid="sidebar-toggle-button"
        onClick={() => setShowOptions((prevState: boolean) => !prevState)}
      >
        {showOptions ? <MdMenuOpen /> : <MdOutlineMenu />}
      </S.ToggleVisibilityButton>
      <S.OptionsList $show={showOptions} data-testid="sidebar-options-list">
        <S.Option
          data-testid="dashboard-option"
          onClick={() => router.push("/")}
          title="Dashboard"
          $active={pathname === "/"}
        >
          <BiHomeAlt />
          <S.HintText>Dashboard</S.HintText>
        </S.Option>
        <S.Option
          data-testid="logout-option"
          onClick={signOut}
          title="Sair"
          $active={pathname === "/login"}
        >
          <FaDoorOpen />
          <S.HintText>Sair</S.HintText>
        </S.Option>
      </S.OptionsList>
    </S.SidebarContainer>
  );
};
