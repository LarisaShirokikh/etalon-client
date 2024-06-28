import React from "react";
import ProductSet from "../Products/ProductSet";
import CatalogSet from "./CatalogSet";

interface ProductSetProps {
  catalogId?: string;
  categoryId?: string;
}

const CatalogSection: React.FC<ProductSetProps> = ({
  catalogId,
  categoryId,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex-1">
          <CatalogSet categoryId={categoryId} />
      </div>
      <div className="flex-1">
        <ProductSet categoryId={categoryId} catalogId={catalogId} productsData={[]} videosData={[]} />
      </div>
      <div className="flex-1">
        <ProductSet categoryId={categoryId} catalogId={catalogId} productsData={[]} videosData={[]} />
      </div>
    </div>
  );
};

export default CatalogSection;
