"use client";
import React, { createContext, useContext } from "react";

// Создаем контекст для переводов
const TranslationsContext = createContext<{ [key: string]: string }>({});

// Создаем хук для использования контекста переводов
export const useTranslations = () => useContext(TranslationsContext);

// Компонент-обертка, который предоставляет переводы через контекст
export const TranslationsProvider: React.FC<{
  translations: { [key: string]: string };
  children?: React.ReactNode;
}> = ({ translations, children }) => {
  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
};
