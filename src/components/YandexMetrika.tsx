"use client";
import { useEffect } from "react";

const YandexMetrika = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    script.async = true;
    script.onload = () => {
      (window as any).ym &&
        (window as any).ym(97508850, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: "dataLayer",
        });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default YandexMetrika;
