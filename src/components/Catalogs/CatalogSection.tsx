import { Suspense } from "react";
import ProductSet from "@/components/Products/ProductSet";
import CatalogSet from "./CatalogSet";

const one = "665b4315845f4980629d773c";
const two = "665c680c517f618c930fba0e";

const CatalogSection = () => (
  <div className="flex flex-col md:flex-row gap-3">
    <div className="flex-1">
      <CatalogSet categoryId={"6667092753a55b95d26b74d1"} />
    </div>
    <div className="flex-1">
      <ProductSet catalogId={one} />
    </div>
    <div className="flex-1">
      <ProductSet catalogId={two} />
    </div>
  </div>
);

export default CatalogSection;
