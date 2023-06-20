"use client";
import Image from "@/app/components/Image";
import { Category } from "@/public/types";
import React from "react";
// hooks
import { useHeadsObserver } from "@/src/hooks/useHeadsObserver";

type CategoryCardProps = {
  data: Category;
};

function CategoryCard({ data }: CategoryCardProps) {
  const { activeId } = useHeadsObserver();
  const activeClass = activeId == data.id ? "bg-primary-900" : "bg-white";
  return (
    <a
      href={`#${data.id}`}
      className="no-underline text-black-800 hover:text-black-800 visited:text-black-800"
    >
      <div
        className={`w-full max-w-[150px] h-full flex flex-row justify-around items-center  shadow-md rounded-md ${activeClass}`}
      >
        <div className="h-8 py-2 aspect-square">
          <Image src={data.avatar?.url} alt={data.title} />
        </div>
        <p className=" text-center m-0 pr-2 font-bold">{data.title}</p>
      </div>
    </a>
  );
}

export default CategoryCard;
