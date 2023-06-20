import MuiLink from "@/app/components/mui/MuiLink";
import { PATH_PAGE } from "@/src/routes/paths";
import React from "react";
import ResetPasswordForm from "./components/ResetPasswordForm";

function page() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full md:w-1/3 px-4">
        <h2 className="text-center">Set / Reset Password</h2>

        <ResetPasswordForm />
        <p className="text-center">
          Dont have an account?{" "}
          <MuiLink href={PATH_PAGE.user.signup}>Sign up</MuiLink>
        </p>
      </div>
    </section>
  );
}

export default page;
