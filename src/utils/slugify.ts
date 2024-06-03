// utils/slugify.ts
export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Заменяет пробелы на -
    .replace(/[^\w\-]+/g, "") // Убирает все не буквы и не цифры
    .replace(/\-\-+/g, "-") // Заменяет многократные - на один
    .replace(/^-+/, "") // Убирает начальные -
    .replace(/-+$/, ""); // Убирает конечные -
};
