import { Suspense } from "react";
import ProductSet from "@/components/Products/ProductSet";
import Skeleton from "@/components/Skeleton";

const ProductSection = () => (
  <div className="flex flex-col md:flex-row gap-3">
    <div className="flex-1">
      {/* <Suspense fallback={<Skeleton />}> */}
      <ProductSet />
      {/* </Suspense> */}
    </div>
    <div className="flex-1">
      {/* <Suspense fallback={<Skeleton />}> */}
      <ProductSet />
      {/* </Suspense> */}
    </div>
    <div className="flex-1">
      {/* <Suspense fallback={<Skeleton />}> */}
      <ProductSet />
      {/* </Suspense> */}
    </div>
  </div>
);

export default ProductSection;
