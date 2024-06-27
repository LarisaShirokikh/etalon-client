"use client";
import BackButton from "@/components/Button/BackButton";
import Meta from "@/components/Seo/Meta";
import { paths } from "@/utils/path";
import BreadCrumbs from "@/components/BreadCrumbs";
import Cart from "@/components/Cart";

function CartPage() {

  
  return (
    <div className="mt-12 px-1 sm:px-5">
      <Meta pageType="product" />
      <BreadCrumbs paths={paths} />
      <BackButton/>
      <Cart/>
    </div>
  );
}

export default CartPage;
