import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Menu/Navbar";
import Footer from "@/components/Footer";
import { TranslationsProvider } from "@/context/translationsContext";
import { translations } from "@/utils/translations";
import YandexMetrika from "@/components/YandexMetrika";
import NavMenu from "@/components/Menu/NavMenu";
import MobileNavbar from "@/components/Menu/MobileNavbar";

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
          {children}
          <MobileNavbar/>
          <Footer />
        </TranslationsProvider>
      </body>
    </html>
  );
}
