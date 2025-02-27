"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/search?name=${name}`);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-2 bg-gray-100 p-2 rounded-lg flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Поиск..."
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src="/search.svg" alt="" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
