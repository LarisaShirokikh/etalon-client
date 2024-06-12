import { Suspense } from "react";
import ProductSet from "@/components/Products/ProductSet";
import CatalogSet from "../Catalogs/CatalogSet";

const one = "665c67e2517f618c930fba0a";
const two = "665c680c517f618c930fba0e";

const ProductSection = () => (
  <div className="flex flex-col md:flex-row gap-3">
    <div className="flex-1">
      <ProductSet catalogId={one} />
    </div>
    <div className="flex-1">
      <ProductSet catalogId={two} />
    </div>
    <div className="flex-1">
      <CatalogSet categoryId={"6667092753a55b95d26b74d1"} />
    </div>
  </div>
);

export default ProductSection;
