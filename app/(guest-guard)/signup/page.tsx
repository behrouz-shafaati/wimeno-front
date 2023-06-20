import { PATH_PAGE } from "@/src/routes/paths";
import Image from "next/image";
import React from "react";
import MuiLink from "@/app/components/mui/MuiLink";
import RegisterForm from "./component/RegisterForm";

export default function page() {
  return (
    <section className="w-full flex justify-center md:justify-around">
      <div className="w-full md:w-1/3 px-4">
        <h2 className="text-center">Sign up</h2>
        <RegisterForm />
        <p className="text-center">
          Have an account? <MuiLink href={PATH_PAGE.user.login}>Log in</MuiLink>
        </p>
      </div>
      <div className="hidden items-center md:flex">
        <Image
          src="/img/coffe-shop.png"
          width={400}
          height={350}
          alt="coffe shop"
        />
      </div>
    </section>
  );
}
