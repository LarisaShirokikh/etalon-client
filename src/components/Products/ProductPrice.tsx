import { useState, useEffect } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface PriceProps {
  totalCount: number;
  onFilterChange: (sortOrder: string) => void;
}

const ProductPrice: React.FC<PriceProps> = ({ onFilterChange, totalCount }) => {
  const [productCount, setProductCount] = useState(totalCount);

  useEffect(() => {
    setProductCount(totalCount);
  }, [totalCount]);

  const handleSortChange = (sortOrder: string) => {
    onFilterChange(sortOrder);
  };

  return (
    <div className="flex justify-between items-center p-2 text-xs">
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
  );
};

export default ProductPrice;
