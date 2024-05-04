"use client";

import { useForm } from "react-hook-form";
import * as S from "./styles";
import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { useAuth } from "@/hooks/useAuth";

type LoginFormValues = {
  email: string;
  password: string;
};

const loginFormDefaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: loginFormDefaultValues });

  const { signIn } = useAuth();

  const submitLogin = async (data: LoginFormValues) => {
    signIn(data.email);
  };

  return (
    <S.LoginMain>
      <section>
        <S.LoginForm onSubmit={handleSubmit(submitLogin)}>
          <FormInput
            id="email"
            label="E-mail"
            type="email"
            error={errors.email?.message}
            register={{
              ...register("email", {
                required: {
                  value: true,
                  message: "campo obrigatório",
                },
              }),
            }}
          />
          <FormInput
            id="password"
            label="Senha"
            canToggleTextVisibility
            error={errors.password?.message}
            register={{
              ...register("password", {
                required: {
                  value: true,
                  message: "campo obrigatório",
                },
              }),
            }}
          />
          <Button type="submit">ENTRAR</Button>
        </S.LoginForm>
      </section>
    </S.LoginMain>
  );
};
