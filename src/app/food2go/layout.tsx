import type { Metadata } from "next";
import "../globals.css";
import { Food2GoProviders } from "./prototype/state/Food2GoProviders";

export const metadata: Metadata = {
  title: "Food2Go Prototype",
  description:
    "Mobile-first food delivery prototype demonstrating core user flow.",
};

export default function Food2GoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Food2GoProviders>{children}</Food2GoProviders>;
}

