import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "UniPath — Your Global Education Partner",
  description:
    "UniPath guides ambitious students through every step of their international university journey — from school selection to visa approval and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
