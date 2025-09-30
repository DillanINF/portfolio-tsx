import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Portfolio - Full-stack Developer & UI/UX Designer",
  description: "Portfolio website showcasing modern web development projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.71/build/spline-viewer.js"></script>
      </head>
      <body className={`${inter.variable} ${orbitron.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
