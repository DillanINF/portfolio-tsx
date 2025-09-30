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

        {/* Shared Footer */}
        <footer className="bg-gradient-to-b from-gray-900 to-black py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <h3 className="text-white font-bold text-2xl mb-4">Your Name</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                  Creative developer crafting exceptional digital experiences with clean code and elegant design.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                  </a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
                <div className="space-y-3">
                  <a href="#home" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">Home</a>
                  <a href="#about" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">About</a>
                  <a href="#projects" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">Projects</a>
                  <a href="#contact" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">Contact</a>
                </div>
              </div>
              
              {/* Contact Info */}
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
                <div className="space-y-3">
                  <a href="mailto:hello@example.com" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                    hello@example.com
                  </a>
                  <p className="text-gray-400 text-sm">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm">
                  © 2025 Your Name. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  Designed & Built with 
                  <span className="text-yellow-500">❤️</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
