"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AccountManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    fetch(`/api/user/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((user) => user.userId !== userId));
      })
      .catch((error) => {
        console.error("Failed to delete user:", error);
        setError(error.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">
        Account Management
      </h1>
      <Link
        href="/admin/users/create"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create New User
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.userId} className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <div className="flex space-x-2 mt-2">
              <Link
                href={`/admin/users/edit/${user.userId}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDeleteUser(user.userId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountManagementPage;
