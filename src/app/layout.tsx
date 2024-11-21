import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import YandexMetrika from "@/components/YandexMetrika";
import { Suspense } from "react";
import { CartProvider } from "@/context/CartContext";
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
        <Suspense fallback={<></>}>
          <YandexMetrika />
        </Suspense>
        <ClientProviders>
          <CartProvider>
            
              {children}
              <SpeedInsights />
            
            {/* <MobileNavbar /> */}
          </CartProvider>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
