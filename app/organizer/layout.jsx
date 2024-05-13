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
      <body className="bg-gray-100 text-gray-800">
        <div className="flex flex-col min-h-screen bg-gray-100">
          {/* Header */}
          <header className="bg-blue-500 text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-lg font-bold">KSA Sports Events Platform</h1>
              <nav>
                <Link
                  href="/organizer/dashboard"
                  className="px-4 hover:underline"
                >
                  Home
                </Link>
                <Link href="/organizer/events" className="px-4 hover:underline">
                  Events
                </Link>
                <Link href="/organizer/posts" className="px-4 hover:underline">
                  Posts
                </Link>
                <Link
                  href="/organizer/profile"
                  className="px-4 hover:underline"
                >
                  Profile
                </Link>
                <Link
                  href="/organizer/notifications"
                  className="px-4 hover:underline"
                >
                  Notifications
                </Link>
              </nav>
              <button className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">
                Log Out
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main id="__next" className="flex-grow container mx-auto px-4 py-4">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white text-center p-4">
            <p>KSA Sports Events Platform © 2023</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
