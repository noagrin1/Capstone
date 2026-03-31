import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food2Go Prototype",
  description: "Mobile-first food delivery prototype by Noa Grinderfer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
