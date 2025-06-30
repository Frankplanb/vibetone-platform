import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/ShoppingCart";
import { FavoritesProvider } from "@/components/FavoritesContext";
import AudioPlayer from "@/components/AudioPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VIBETONE - More than sound - it's a vibe.",
  description: "Über 500 sofort nutzbare Tracks für Social Media, Events & Werbung. Keine versteckten Gebühren - Sofort verfügbar.",
  keywords: "Musik-Lizenzierung, Stock Music, Royalty Free, Deep House, Elektro House, Pop, Jazz, Ambiente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen`}>
        <CartProvider>
          <FavoritesProvider>
            <Header />
            <main className="min-h-screen pb-24">
              {children}
            </main>
            <Footer />
            <AudioPlayer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
