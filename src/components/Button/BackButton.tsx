import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 bg-wite-500 text-gray-600 rounded-lg shadow hover:bg-gray-50 transition-colors"
    >
      <CircleArrowLeft />
      <span>назад</span>
    </button>
  );
};

export default BackButton;
