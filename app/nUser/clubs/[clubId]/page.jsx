"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ClubDetailsPage = ({ params }) => {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clubId } = params;
  const [isFollowing, setIsFollowing] = useState(false);
  const userId = 1; // This should be dynamically determined based on the logged-in user

  useEffect(() => {
    if (!clubId) return;
    fetch(`/api/club/${clubId}`)
      .then((response) => response.json())
      .then((data) => {
        setClub(data);
        setIsFollowing(data.followers?.includes(userId)); // Check for followers safely
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch club details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [clubId]);

  const handleFollow = () => {
    const method = isFollowing ? "DELETE" : "POST";
    fetch(`/api/club/${clubId}/follow`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((response) => {
        if (response.ok) setIsFollowing(!isFollowing);
      })
      .catch((error) =>
        console.error("Failed to update follow status:", error)
      );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-4">{`Error: ${error}`}</div>
    );
  if (!club) return <div className="text-center mt-4">No club found.</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          {club.name}
        </h1>
        <div className="flex flex-col items-center mb-6">
          {club.logoUrl ? (
            <Image
              src="/default-club-logo.png"
              alt="Club Logo"
              width={200}
              height={200}
              className="rounded-full"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-300 flex items-center justify-center rounded-full">
              <span className="text-sm text-gray-600">No Image Available</span>
            </div>
          )}
        </div>
        <p className="text-lg text-center text-gray-700 mb-4">
          {club.description || "No description available."}
        </p>
        {club.foundedDate && (
          <p className="text-sm text-center text-gray-600 mb-6">
            Founded: {new Date(club.foundedDate).toLocaleDateString()}
          </p>
        )}
        <div className="text-center mb-4">
          <button
            className={`px-4 py-2 rounded font-bold text-white ${
              isFollowing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="flex justify-center">
          <Link
            href="../clubs"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Back to Clubs List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailsPage;
