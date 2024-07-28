import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Menu/Navbar";
import Footer from "@/components/Footer";
import YandexMetrika from "@/components/YandexMetrika";
import "@/utils/wdyr";
import MobileNavbar from "@/components/Menu/MobileNavbar";
import Script from "next/script";
import { Suspense } from "react";
import { CartProvider } from "@/context/CartContext";
import ToastProvider from "@/context/ToastProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Входные металлические двери в Москве",
  description: "При покупке двери, доставка в пределах МКАД - бесплатно",
  keywords:
    "входные двери, металлические двери, двери в Москве, бесплатная доставка, качественные двери",
  openGraph: {
    title: "Входные металлические двери в Москве",
    description: "При покупке двери, доставка в пределах МКАД - бесплатно",
    type: "website",
    locale: "ru_RU",
    url: process.env.PROD_URL || "https://dverietalon.ru",
    siteName: "Двери-Эталон",
    images: [
      {
        url: "https://dverietalon.ru/public/issida.webp",
        width: 800,
        height: 600,
        alt: "Каталог входных дверей",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Script id="metrika-counter" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
              ym(97508850, "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });`}
        </Script>
        <Suspense fallback={<></>}>
          <YandexMetrika />
        </Suspense>
        <ClientProviders>
          <CartProvider>
            <Navbar />
            <ToastProvider>
              {children}
              <SpeedInsights />
            </ToastProvider>
            <MobileNavbar />
          </CartProvider>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
