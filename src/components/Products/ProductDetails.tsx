import React from "react";
import Button from "@/components/Button/Button";
import { IProduct } from "@/interface/Product";

const ProductDetails = ({ item }: { item: IProduct }) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-6">
      <h1 className="text-3xl font-medium">{item.title}</h1>
      <p className="text-gray-500">{item.description}</p>
      <div className="h-[2px] bg-gray-100" />
      {item.price && (
        <>
          {item.price.price === item.price.discountedPrice ? (
            <h2 className="font-medium text-2xl">
              {item.price.discountedPrice} рублей
            </h2>
          ) : (
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">
                {item.price.price} рублей
              </h3>
              <h2 className="font-medium text-2xl">
                {item.price.discountedPrice} рублей
              </h2>
            </div>
          )}
          <Button text="Вызвать замерщика" />
          <div className="h-[2px] bg-gray-100" />
        </>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Конструкция:</strong> {item.design}
        </div>
        <div>
          <strong>Количество контуров:</strong> {item.contours}
        </div>
        <div>
          <strong>Утеплитель:</strong> {item.insulation}
        </div>
        <div>
          <strong>Толщина:</strong> {item.thickness}
        </div>
        <div>
          <strong>Основной замок:</strong> {item.mainLock}
        </div>
        <div>
          <strong>Дополнительный замок:</strong> {item.additionalLock}
        </div>
        <div>
          <strong>Внешняя отделка:</strong> {item.exterior}
        </div>
        <div>
          <strong>Внутренняя отделка:</strong> {item.interior}
        </div>
        <div>
          <strong>Петли:</strong> {item.loops}
        </div>
        <div>
          <strong>Защита:</strong> {item.protection}
        </div>
      </div>
      <div className="h-[2px] bg-gray-100" />
      {/* Additional Info Sections */}
      {/* {product.additionalInfoSections?.map((section: any) => (
        <div className="text-sm" key={section.title}>
          <h4 className="font-medium mb-4">{section.title}</h4>
          <p>{section.description}</p>
        </div>
      ))} */}
      <div className="h-[2px] bg-gray-100" />
      {/* Reviews */}
      {/* <h1 className="text-2xl">User Reviews</h1>
      <Suspense fallback="Loading...">
        <Reviews productId={product._id!} />
      </Suspense> */}
    </div>
  );
};

export default ProductDetails;
