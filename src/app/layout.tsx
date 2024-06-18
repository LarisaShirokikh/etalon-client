
import type { Metadata, NextPageContext } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Menu/Navbar";
import Footer from "@/components/Footer";
import { TranslationsProvider } from "@/context/translationsContext";
import { translations } from "@/utils/translations";
import YandexMetrika from "@/components/YandexMetrika";
import "@/utils/wdyr";
import MobileNavbar from "@/components/Menu/MobileNavbar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Входные металлические двери в Москве",
  description: "Входные металлические двери в Москве",
};





export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <YandexMetrika />
        <TranslationsProvider translations={translations}>
          <Navbar session={session} />
          {children}
          <MobileNavbar session={session} />
          <Footer />
        </TranslationsProvider>
      </body>
    </html>
  );
}
function getActivePageCtx() {
  throw new Error("Function not implemented.");
}

function buildCookieHeader(name: string, value: string, options: any): any {
  throw new Error("Function not implemented.");
}

