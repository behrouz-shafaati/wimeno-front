import { Product } from "@/public/types";
import { Rating } from "@/app/components/mui";
import React from "react";
import { fCurrency } from "@/src/utils/formatNumber";
import Image from "../Image";
import IconButton from "../mui/IconButton";
import { ICONS } from "../navbar/NavConfig";

type ProductCardProps = {
  data: Product;
  className?: string;
};

function ProductHorizontalCard({ data, className = "" }: ProductCardProps) {
  const price = data?.priceSale != 0 ? data?.priceSale : data.price;
  return (
    <div
      className={`w-full h-[90px] flex flex-row bg-white rounded-md shadow-md p-0 ${className}`}
    >
      <div className="w-[86px] p-1 aspect-square">
        <Image
          alt={data.name}
          src={data.images[0].url}
          className="rounded-md"
        />
      </div>
      <div className="w-full flex flex-col justify-center px-2 pt-1 pb-2">
        <h2 className="text-xs m-0">{data.name}</h2>
        <div className="flex flex-row justify-between">
          <div>
            <Rating size="small" value={4} precision={0.1} readOnly />
            <div className="flex flex-row">
              {data?.priceSale > 0 && (
                <p className="text-md m-0 text-black-400 line-through">
                  {fCurrency(data?.price)}
                </p>
              )}
              <p className="text-md ml-2 my-0">{fCurrency(price)}</p>
            </div>
          </div>
          <div className="flex items-end">
            <IconButton icon={ICONS.plus} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHorizontalCard;
