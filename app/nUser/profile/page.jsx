"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [followedClubs, setFollowedClubs] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = 1;
    // Replace `/api/user/${userId}` with your actual API endpoint to fetch user details
    fetch(`/api/user/1`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setFollowedClubs(data.clubs ?? []);
        setEventBookings(data.Tickets ?? 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user information:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;
  if (!userInfo) return <div className="text-center">No User Found</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">Your Profile</h1>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">User Details</h2>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          <Link
            href="/edit-profile"
            className="text-blue-500 hover:text-blue-600"
          >
            Edit Profile
          </Link>
        </div>
        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
          <h2 className="text-xl font-bold">Your Activities</h2>
          <h3 className="text-lg font-semibold mt-2">Followed Clubs</h3>
          <ul>
            {followedClubs.map((club) => (
              <li key={club.clubId} className="mt-1">
                {club.name}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4">Event Bookings</h3>
          <ul>
            {eventBookings.map((event) => (
              <li key={event.eventId} className="mt-1">
                {event.name} - {new Date(event.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => console.log("Logging out...")}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
