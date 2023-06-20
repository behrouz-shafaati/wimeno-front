import { Category, Product, Shop } from "@/public/types";
import React from "react";
import ProductCard from "@/app/components/product/ProductCard";
import HorizontalProductList from "../components/product/HorizontalProductList";
import HorizontalCategoryList from "./components/category/HorizontalCategoryList";
import ShopHeader from "./components/ShopHeader";

async function getData({ shopStringId }: { shopStringId: string }) {
  const res = await fetch(
    `${process.env.API_ROOT}/shop?shopStringId=${shopStringId}`,
    { cache: "no-store" }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Page({ params }: { params: { shopStringId: string } }) {
  const data = await getData({ shopStringId: params.shopStringId });
  const shop: Shop = data.data[0];
  const allProduct: Product[] = shop.products;

  const discountedProducts: Product[] = allProduct.filter(
    (product) => product?.priceSale != 0
  );
  const duplicateCategories: Category[] = allProduct.map(
    (product) => product.category
  );
  const categories: Category[] = duplicateCategories.reduce(
    (accumulator: Category[], current: Category) => {
      if (!accumulator.find((item: Category) => item.id === current.id)) {
        accumulator.push(current);
      }
      return accumulator;
    },
    []
  );

  return (
    <>
      <ShopHeader shop={shop} />

      <HorizontalProductList title="Today's Discount" products={allProduct} />

      <h3>Menu Categories</h3>
      <HorizontalCategoryList
        categories={categories}
        className="sticky top-2"
      />
      <div>
        {categories.map((category: Category) => (
          <div key={category.id} className="mt-4">
            <h3
              className="mt-0 mb-2 scroll-mt-16 category-header"
              id={category.id}
            >
              {category.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {allProduct
                .filter(
                  (product: Product) => product.category.id == category.id
                )
                .map((product: Product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
