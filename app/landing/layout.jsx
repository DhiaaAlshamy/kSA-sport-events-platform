import Link from "next/link";
import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KSA Sport Events Platform",
  description: "KSA Sport Events Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="bg-gray-100 text-gray-800">
        <div class="container mx-auto px-4">
          {/* Header with Navigation, using gradient and typography enhancements */}
          <header className="bg-gradient-to-r from-blue-700 to-green-700 text-white py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">KSA Sports</h1>
              <nav>
                <a href="#about" className="mx-4 hover:text-blue-300">
                  About
                </a>
                <a href="#services" className="mx-4 hover:text-blue-300">
                  Services
                </a>
                <a href="#contact" className="mx-4 hover:text-blue-300">
                  Contact
                </a>
              </nav>
            </div>
          </header>
          {children}
          {/* Footer Section with minimalistic approach */}
          <footer className="text-center p-4 bg-gray-900 text-white">
            <p>Your company name, 2023</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
