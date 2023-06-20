"use client";
import { Product } from "@/public/types";
import React, { useState } from "react";
import SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import ProductHorizontalCard from "./ProductHorizontalCard";

type HorizontalProductListProps = {
  title: string;
  products: Product[];
  className?: string;
};

function HorizontalProductList({
  title,
  products,
  className,
}: HorizontalProductListProps) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <div className="w-full pb-3 overflow-x-auto overflow-y-visible grid grid-flow-col grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] auto-cols-[minmax(220px,_1fr)] gap-4">
        {products.map((product: Product) => (
          <ProductHorizontalCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );

  // const [swiper, setSwiper] = useState<SwiperType>();
  // return (
  //   <div className={className}>
  //     <h3>{title}</h3>
  //     <Swiper
  //       spaceBetween={16}
  //       slidesPerView={3}
  //       onSlideChange={() => console.log("slide change")}
  //       onSwiper={(swiper) => setSwiper(swiper)}
  //       style={{
  //         paddingBottom: 8,
  //       }}
  //       breakpoints={{
  //         0: {
  //           slidesPerView: 2,
  //         },
  //         // when window width is >= 640px
  //         640: {
  //           slidesPerView: 3,
  //         },
  //         // when window width is >= 768px
  //         768: {
  //           slidesPerView: 5,
  //         },
  //       }}
  //     >
  //       {products.map((product: Product) => (
  //         <SwiperSlide key={product.id}>
  //           <ProductHorizontalCard key={product.id} data={product} />
  //         </SwiperSlide>
  //       ))}
  //     </Swiper>
  //   </div>
  // );
}

export default HorizontalProductList;
