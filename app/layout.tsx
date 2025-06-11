import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./(components)/Navigation";
import SessionWrapper from "./(components)/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Binge-it 2.0",
  description:
    "A modern web app for wishlisting and tracking your favorite movies and TV shows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Navigation />
          <div className="pt-16">{children}</div>
        </body>
      </html>
    </SessionWrapper>
  );
}
