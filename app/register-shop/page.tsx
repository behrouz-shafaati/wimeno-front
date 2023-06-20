import Image from "next/image";
import React from "react";
import RegisterShopForm from "./component/RegisterShopForm";

function page() {
  return (
    <section className="w-full flex justify-center md:justify-around">
      <div className="w-full md:w-1/3 px-4">
        <h2 className="text-center">Register Shop</h2>
        <RegisterShopForm />
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

export default page;
