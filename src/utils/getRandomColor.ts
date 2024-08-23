// src/utils/getRandomColor.ts
export const getRandomColor = () => {
  const colors = [
    "bg-red-50",
    "bg-green-50",
    "bg-blue-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-pink-50",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
