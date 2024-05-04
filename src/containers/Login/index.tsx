"use client";

import * as S from "./styles";
import { Button } from "@/components/Button";

export const Login = () => {
  return (
    <S.LoginMain>
      <section>
        <S.LoginForm>
          <Button>ENTRAR</Button>
        </S.LoginForm>
      </section>
    </S.LoginMain>
  );
};
