import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TranslationsProvider } from "@/context/translationsContext"; 
import { translations } from "@/utils/translations";
import YandexMetrika from "@/components/YandexMetrika";
import Slider from "@/components/Slider";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Входные металлические двери в Москве",
  description: "Входные металлические двери в Москве",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <YandexMetrika />
        <TranslationsProvider translations={translations}>
          <Navbar />
          <Slider/>
          {children}
          <Footer />
        </TranslationsProvider>
      </body>
    </html>
  );
}
