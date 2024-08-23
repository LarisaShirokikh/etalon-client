// src/api/fetchAllData.ts
import axios from "axios";

const fetchAllData = async (page: number) => {
  const [products, videos, catalogs, categories] = await Promise.all([
    axios
      .get(`/api/products?limit=6&page=${page}&randomize=true`)
      .then((res) => res.data.products),
    axios.get("/api/video").then((res) => res.data.products),
    axios
      .get("/api/catalogs", { params: { limit: 6 } })
      .then((res) => res.data.catalogs),
    axios
      .get("/api/categories", { params: { limit: 6 } })
      .then((res) => res.data.categories),
  ]);
  return { products, videos, catalogs, categories: categories || [] };
};

export default fetchAllData;
