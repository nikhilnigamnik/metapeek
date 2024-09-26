import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metapeek",
  description:
    "Preview how your website will appear on social media platforms like Twitter, WhatsApp, and Discord. Easily visualize metadata and enhance link sharing across networks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased max-w-4xl mx-auto px-4`}
      >
        {children}
      </body>
    </html>
  );
}
