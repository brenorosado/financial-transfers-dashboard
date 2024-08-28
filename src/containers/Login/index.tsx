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
            autoComplete="off"
            placeholder="Any valid e-mail"
            error={errors.email?.message}
            register={{
              ...register("email", {
                required: {
                  value: true,
                  message: "required field",
                },
              }),
            }}
          />
          <FormInput
            id="password"
            label="Password"
            autoComplete="off"
            placeholder="Any password"
            canToggleTextVisibility
            error={errors.password?.message}
            register={{
              ...register("password", {
                required: {
                  value: true,
                  message: "required field",
                },
              }),
            }}
          />
          <Button type="submit">SIGN IN</Button>
        </S.LoginForm>
      </section>
    </S.LoginMain>
  );
};
