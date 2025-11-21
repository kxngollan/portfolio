import type { Metadata } from "next";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import StairTransition from "@/components/StairTransition";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ollan Muza - Software Engineer",
  description: "A Fullstack Software Engineer",
  icons: {
    icon : "/icon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Ollan Muza - Software Engineer</title>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>

      <body>
        <Navbar />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
