"use client";
import { Category, Product } from "@/public/types";
import { useHeadsObserver } from "@/src/hooks/useHeadsObserver";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "./CategoryCard";

type HorizontalCategoryListProps = {
  categories: Category[];
  className?: string;
};

function HorizontalCategoryList({
  categories,
  className,
}: HorizontalCategoryListProps) {
  const { activeId } = useHeadsObserver();
  const [swiper, setSwiper] = useState<SwiperType>();
  useEffect(() => {
    categories.forEach((category, index) => {
      if (activeId == category.id) swiper?.slideTo(index);
    });
  }, [activeId]);
  return (
    <div className={`z-40 ${className}`}>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={16}
        slidesPerView={"auto"}
        onSlideChange={() => console.log("slide change")}
        style={{
          paddingBottom: 8,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 9,
          },
        }}
      >
        {categories.map((category: Category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard key={category.id} data={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HorizontalCategoryList;
