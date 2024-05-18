"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const ClubDetailsPage = ({ params }) => {
  const { clubId } = params;
  const { data: session, status } = useSession();
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetch(`/api/club/${clubId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClubData(data);
          if (
            status === "authenticated" &&
            data.followers.some(
              (follower) => follower.userId === session.userId
            )
          ) {
            setIsFollowing(true);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch club data:", error);
        setError("Failed to fetch club data");
        setLoading(false);
      });
  }, [clubId, session, status]);

  const handleFollow = async () => {
    if (status === "authenticated") {
      await fetch(`/api/club/${clubId}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.userId }),
      });
      setIsFollowing(true);
    }
  };

  const handleUnfollow = async () => {
    if (status === "authenticated") {
      await fetch(`/api/club/${clubId}/unfollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.userId }),
      });
      setIsFollowing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">{`Error: ${error}`}</div>
    );
  }

  if (!clubData) {
    return <div className="text-center mt-4">No club data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">{clubData.name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Club Information</h2>
        {clubData.logoUrl && (
          <div className="flex justify-center">
            <Image
              src={clubData.logoUrl}
              alt="Club Logo"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}
        <p className="mt-4">
          <strong>Description:</strong>{" "}
          {clubData.description || "No description available."}
        </p>
        {clubData.foundedDate && (
          <p className="mt-2">
            <strong>Founded:</strong>{" "}
            {new Date(clubData.foundedDate).toLocaleDateString()}
          </p>
        )}
        {status === "authenticated" && (
          <div className="mt-4 flex justify-center">
            {isFollowing ? (
              <button
                onClick={handleUnfollow}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Follow
              </button>
            )}
          </div>
        )}
        <h2 className="text-2xl font-bold my-4">Followers</h2>
        {clubData.followers.length > 0 ? (
          clubData.followers.map((follower) => (
            <div key={follower.userId} className="mb-4 p-4 border rounded">
              <p>
                <strong>Username:</strong> {follower.username}
              </p>
              <p>
                <strong>Email:</strong> {follower.email}
              </p>
              <p>
                <strong>Role:</strong> {follower.role}
              </p>
              <Link
                href={`/profile/${follower.userId}`}
                className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <p>No followers available</p>
        )}
      </div>
    </div>
  );
};

export default ClubDetailsPage;
