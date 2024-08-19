import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"], weight: ["400", '600', '700'] });

export const metadata: Metadata = {
  title: "Movie Search Admin",
  description: "Custom admin panel for Movie Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialised`}>
        <StoreProvider>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
