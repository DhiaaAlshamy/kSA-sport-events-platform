import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KSA Sport Events Platform",
  description: "KSA Sport Events Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="bg-gray-100 text-gray-800">{children}</body>
    </html>
  );
}
