import Avatar from "@/app/components/Avatar";
import { Shop } from "@/public/types";
import React from "react";
import ShopAvatar from "./ShopAvatar";

type ShopHeaderProps = {
  shop: Shop;
};

function ShopHeader({ shop }: ShopHeaderProps) {
  return (
    <div className="flex flex-row items-center">
      <ShopAvatar
        src={shop.logo?.url}
        alt={shop.title}
        sx={{ width: 55, height: 55 }}
      />
      <h1 className="font-bold text-2xl pl-2">{shop.title}</h1>
    </div>
  );
}

export default ShopHeader;
