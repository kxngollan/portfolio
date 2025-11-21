import type { Metadata } from "next";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";
import StairTransition from "@/components/StairTransition";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const siteUrl = "https://www.ollanmuza.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ollan Muza - Software Engineer",
  description: "A Fullstack Software Engineer",
  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: "Ollan Muza – Fullstack Software Engineer",
    description: "Fullstack Software Engineer",
    url: siteUrl,
    siteName: "Ollan Muza",
    images: [
      {
        url: "/og/ollan-muza-og.png",
        width: 1200,
        height: 630,
        alt: "Ollan Muza - Fullstack Software Engineer",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ollan Muza - Fullstack Software Engineer",
    description: "Fullstack Software Engineer.",
    images: ["/og/ollan-muza-og.png"],
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
        <Navbar />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
