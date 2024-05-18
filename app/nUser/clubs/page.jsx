"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ClubListingPage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
          Clubs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club.clubId}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <h2 className="text-xl font-bold text-gray-800">{club.name}</h2>
              {club.logoUrl ? (
                <Image
                  src={club.logoUrl || "/default-club-logo.png"}
                  alt="Club Logo"
                  width={160}
                  height={160}
                  className="object-cover mx-auto"
                />
              ) : (
                <div className="h-40 w-40 bg-gray-300 flex items-center justify-center mx-auto">
                  <span className="text-sm text-gray-600">No Image</span>
                </div>
              )}
              <p className="text-gray-700 mt-2">
                {club.description || "No description available."}
              </p>
              {club.foundedDate && (
                <p className="text-sm text-gray-600">
                  Founded: {new Date(club.foundedDate).toLocaleDateString()}
                </p>
              )}
              <Link
                href={`/nUser/clubs/${club.clubId}`}
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubListingPage;
