import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Byte4Directory",
  description: "A minimal implementation of ByteDirectory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Nav/>
        <main className="w-[50%] mx-auto py-12">
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
