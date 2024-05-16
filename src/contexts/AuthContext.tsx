"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState, createContext, useEffect, useCallback } from "react";

type AuthContextData = {
  userEmail?: string;
  signIn: (email: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  const router = useRouter();
  const pathname = usePathname();

  const signIn = (email: string) => {
    setUserEmail(email);
    localStorage.setItem("@financial-transfers-dashboard:userEmail", email);
    router.push("/");
  };

  const signOut = () => {
    setUserEmail(undefined);
    localStorage.removeItem("@financial-transfers-dashboard:userEmail");
    router.push("/login");
  };

  const checkAuthentication = useCallback(() => {
    if (typeof window === "undefined") return;

    const storedUserEmail = localStorage.getItem(
      "@financial-transfers-dashboard:userEmail",
    );

    setAuthChecked(true);

    if (pathname === "/login" && storedUserEmail) {
      setUserEmail(storedUserEmail);
      router.push("/");
      return;
    }

    if (pathname !== "/login" && !storedUserEmail) {
      router.push("/login");
    }
  }, [pathname, router]);

  useEffect(checkAuthentication, [checkAuthentication]);

  if (!authChecked) return null;

  return (
    <AuthContext.Provider value={{ userEmail, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
