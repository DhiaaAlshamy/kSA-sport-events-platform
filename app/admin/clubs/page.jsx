"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ClubsManagementPage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/club")
      .then((response) => response.json())
      .then((data) => {
        setClubs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch clubs:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDeleteClub = (clubId) => {
    fetch(`/api/club/${clubId}`, {
      method: "DELETE",
    })
      .then(() => {
        setClubs(clubs.filter((club) => club.clubId !== clubId));
      })
      .catch((error) => {
        console.error("Failed to delete club:", error);
        setError(error.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">Clubs Management</h1>
      <Link
        href="/admin/clubs/create"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
      >
        Create New Club
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <div key={club.clubId} className="bg-white p-6 shadow-lg rounded-lg">
            {club.logoUrl && (
              <img
                src={club.logoUrl}
                alt={club.name}
                className="w-32 h-32 mx-auto mb-4 object-cover rounded-full"
              />
            )}
            <h2 className="text-2xl font-bold text-center">{club.name}</h2>
            <p className="text-center">{club.description}</p>
            <div className="flex justify-center space-x-2 mt-2">
              <Link
                href={`/admin/clubs/edit/${club.clubId}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDeleteClub(club.clubId)}
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

export default ClubsManagementPage;
