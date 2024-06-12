import { Suspense } from "react";
import ProductSet from "@/components/Products/ProductSet";
import Skeleton from "@/components/Skeleton";
import CatalogSet from "./CatalogSet";

const one = "665b4315845f4980629d773c";
const two = "665c6779517f618c930fba02";

const CatalogSection = () => (
  <div className="flex flex-col md:flex-row gap-3">
    <div className="flex-1">
      {/* <Suspense fallback={<Skeleton />}> */}
      <CatalogSet categoryId={"6667092753a55b95d26b74d1"} />
      {/* </Suspense> */}
    </div>
    <div className="flex-1">
      {/* <Suspense fallback={<Skeleton />}> */}
      <ProductSet catalogId={one} />
      {/* </Suspense> */}
    </div>
    <div className="flex-1">
      {/* <Suspense fallback={<Skeleton />}> */}
      <ProductSet catalogId={two} />
      {/* </Suspense> */}
    </div>
  </div>
);

export default CatalogSection;
