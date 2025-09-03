import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Anton } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollContext from "@/components/Scrollcontext";
import ChatBot from "@/components/chatbot";
const anaton = Anton({
  variable: "--font-anaton",
  subsets: ["latin"],
  weight: "400",
});
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jode Restaurent",
  description: "Jode Restaurent website with ai chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${anaton.variable}  antialiased`}
      >
        <ScrollContext>
          {children}
          <Footer />
        </ScrollContext>
        <ChatBot />
      </body>
    </html>
  );
}
