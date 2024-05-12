"use client";
import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">KSA Sports Events Platform</h1>
          <nav>
            <Link href="dashboard" className="px-4 hover:underline">
              Home
            </Link>
            <Link href="events" className="px-4 hover:underline">
              Events
            </Link>
            <Link href="clubs" className="px-4 hover:underline">
              Clubs
            </Link>
            <Link href="/profile" className="px-4 hover:underline">
              Profile
            </Link>
            <Link href="/notifications" className="px-4 hover:underline">
              Notifications
            </Link>
          </nav>
          <button className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded">
            Log Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>KSA Sports Events Platform © 2023</p>
      </footer>
    </div>
  );
};

export default Layout;
