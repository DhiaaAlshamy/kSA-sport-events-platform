"use client";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
