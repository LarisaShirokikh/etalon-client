import { useState, useEffect } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface PriceProps {
  totalCount: number;
  onFilterChange: (sortOrder: string, priceRange?: [number, number]) => void;
}

const ProductPrice: React.FC<PriceProps> = ({ onFilterChange, totalCount }) => {
  const [productCount, setProductCount] = useState(totalCount);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    setProductCount(totalCount);
  }, [totalCount]);

  const handleSortChange = (sortOrder: string) => {
    onFilterChange(sortOrder);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setMinPrice(value);
      onFilterChange("price-range", [value, maxPrice]);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-2 text-xs">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div
            className="flex items-center gap-2 mb-2 p-2 text-gray-600 cursor-pointer"
            onClick={() => handleSortChange("price-asc")}
          >
            <TrendingDown size={20} />
            Дешевле
          </div>
          <div
            className="flex items-center gap-2 mb-2 p-2 text-gray-600 cursor-pointer"
            onClick={() => handleSortChange("price-desc")}
          >
            <TrendingUp size={20} />
            Дороже
          </div>
      
        </div>
        <div className="text-gray-200 mb-2 p-2">{productCount} дверей</div>
      </div>
    </div>
  );
};

export default ProductPrice;
