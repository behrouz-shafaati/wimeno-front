import ShopSearch from "@/app/components/ShopSearch";
import Image from "next/image";
import ShopCart from "@/app/components/ShopCart";
import { Shop } from "@/public/types";

async function getData() {
  const res = await fetch(`${process.env.API_ROOT}/shops?page=0&perPage=4`, {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const shops: Shop[] = data.data;
  return (
    <main className="min-h-screen py-24">
      <section className="flex flex-col items-center">
        <p className="flex items-center">
          <Image
            src="./icons/uil_qrcode-scan.svg"
            alt="QR"
            width={25}
            height={25}
          />
          <span className="px-2">Scan QR Code</span>
        </p>
        <p className="mt-0">or</p>
        <ShopSearch />
      </section>
      <div className="md:px-8">
        <h3 className="mt-12 ">Newest</h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {shops.map((shop: Shop) => (
            <ShopCart key={shop.id} shop={shop} />
          ))}
        </section>
      </div>
    </main>
  );
}
