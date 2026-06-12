import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import GridBackdrop from "@/components/layout/GridBackdrop";
import TopNav from "@/components/layout/TopNav";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Preppi — YO-preppausalusta",
  description:
    "Suunnittele ylioppilaskirjoitukset, seuraa edistymistä ja optimoi pisteesi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={spaceMono.variable}>
      <body>
        <GridBackdrop />
        <div className="app">
          <TopNav />
          {children}
        </div>
      </body>
    </html>
  );
}
