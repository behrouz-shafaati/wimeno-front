import Image from "next/image";
import LoginForm from "./component/LoginForm";
import { PATH_PAGE } from "@/src/routes/paths";
import MuiLink from "../../components/mui/MuiLink";

export default function page() {
  return (
    <section className="w-full flex justify-center md:justify-around">
      <div className="w-full md:w-1/3 px-4">
        <h2 className="text-center">Welcome Back</h2>
        <LoginForm />
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <MuiLink href={PATH_PAGE.user.signup}>Sign up</MuiLink>
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
