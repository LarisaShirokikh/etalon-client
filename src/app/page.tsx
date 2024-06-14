"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

// Dynamic imports for lazy loading
const ProductSection = dynamic(
  () => import("@/components/Products/ProductSection")
);
const CatalogSection = dynamic(
  () => import("@/components/Catalogs/CatalogSection")
);

const HomePage = () => {
  const cat1 = "665c67ad517f618c930fba06";
  const cat3 = "665c6779517f618c930fba02";
  const cat4 = "665b4315845f4980629d773c";
  const cat5 = "665b2b71845f4980629d7714";
  const cat6 = "665b34e7845f4980629d7720";
  const cat7 = "6667094753a55b95d26b74d7";

  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });

   useEffect(() => {
     console.log("Component 1 in view:", inView1);
   }, [inView1]);

   useEffect(() => {
     console.log("Component 2 in view:", inView2);
   }, [inView2]);

  

  return (
    <div>
      <div ref={ref1}>
        {inView1 && <ProductSection catalogId={cat1} categoryId={cat5} />}
      </div>
      <div ref={ref2}>
        {inView2 && <CatalogSection catalogId={cat3} categoryId={cat6} />}
      </div>
    </div>
  );
};

export default HomePage;
