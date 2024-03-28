import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";


const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Commune room rental",
  description: "Enjoy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
          <main className="pb-16 md:pt-28 pt-24">{children}</main>
      </body>
    </html>
  );
}
