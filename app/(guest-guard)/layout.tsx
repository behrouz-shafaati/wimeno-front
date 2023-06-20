"use client";
import useAuth from "@/src/hooks/useAuth";
import { PATH_PAGE } from "@/src/routes/paths";
import { redirect, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

function Layout({ children }: PropsType) {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    const redirectUrl = searchParams.get("redirect");
    redirect(redirectUrl || PATH_PAGE.home);
  }
  return <>{children}</>;
}

export default Layout;
