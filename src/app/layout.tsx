import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
// Pastikan file globals.css ada di folder src/app/
import "./globals.css"; 

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mawar Indah | Katalog Tanaman & Edukasi AI",
  description: "Pusat tanaman hias dengan integrasi WhatsApp dan AI Assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}