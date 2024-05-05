import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shipshop",
  description:
    "Shipshop is your one-stop destination for all your shopping needs. Discover a wide range of products including electronics, fashion, home decor, and much more. With seamless navigation and secure checkout, shopping at Shipshop is convenient and enjoyable. Explore the latest trends, find great deals, and have your purchases delivered right to your doorstep. Start shopping today and experience the ultimate online shopping experience with Shipshop.",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
