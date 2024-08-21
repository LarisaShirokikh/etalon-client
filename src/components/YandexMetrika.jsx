"use client";

import { useEffect } from "react";

// Компонент YandexMetrika, который загружает скрипт только после взаимодействия пользователя
function YandexMetrika() {
  useEffect(() => {
    const handleInteraction = () => {
      const script = document.createElement("script");
      script.src = "https://mc.yandex.ru/metrika/tag.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.ym =
          window.ym ||
          function () {
            (window.ym.a = window.ym.a || []).push(arguments);
          };
        ym(97935366, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        });
      };

      // Удаляем обработчики после загрузки скрипта
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("click", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  return null;
}

export default YandexMetrika;
