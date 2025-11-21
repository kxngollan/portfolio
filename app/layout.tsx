import type { Metadata } from "next";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import StairTransition from "@/components/StairTransition";
import PageTransition from "@/components/PageTransition";
import FacingLaptop from "@/public/FacingLaptopSVG.svg";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ollanmuza.com"),
  title: "Ollan Muza - Software Engineer",
  description: "A Fullstack Software Engineer",
  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: "Ollan Muza –  Fullstack Software Engineer",
    description: "Fullstack Software Engineer",
    url: "https://www.ollanmuza.com",
    siteName: "Ollan Muza",
    images: [
      {
        url: "/FacingLaptopSVG.svg",
        width: 630,
        height: 630,
        alt: "Ollan Muza",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ollan Muza - Fullstack Software Engineer",
    description: "Fullstack Software Engineer.",
    images: ["/FacingLaptopSVG.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="hidden">
          <Image
            draggable={false}
            priority
            src={FacingLaptop}
            alt="Facing laptop"
            className="z-20 "
          />
          <h1>Fullstack Software Engineer</h1>
        </header>
        <Navbar />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
