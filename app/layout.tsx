import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Koppenhága Buddy",
  description: "5 napos koppenhágai utazási segítő — 4 felnőtt + 1 baba",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={`h-full ${geist.className}`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
