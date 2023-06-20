import { Shop } from "@/public/types";
import Link from "next/link";
import React from "react";
import ShopAvatar from "../[shopStringId]/components/ShopAvatar";
import Avatar from "./Avatar";

type ShopCartProps = {
  shop: Shop;
};

function ShopCart({ shop }: ShopCartProps) {
  return (
    <Link href={`/${shop.shopStringId}`}>
      <div className=" w-full flex flex-row items-center px-3 bg-white rounded-md shadow-md">
        <ShopAvatar
          src={shop.logo?.url}
          alt={shop.title}
          sx={{ width: 55, height: 55 }}
        />
        <h1 className="font-bold text-2xl pl-2">{shop.title}</h1>
      </div>
    </Link>
  );
}

export default ShopCart;
