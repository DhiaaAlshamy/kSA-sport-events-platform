"use client";
import { useState, useEffect } from "react";

const AdminDashboardPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalClubs, setTotalClubs] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalUsersResponse,
          totalClubsResponse,
          totalEventsResponse,
          upcomingEventsResponse,
          recentUsersResponse,
        ] = await Promise.all([
          fetch("/api/reports?type=totalUsers").then((res) => res.json()),
          fetch("/api/reports?type=totalClubs").then((res) => res.json()),
          fetch("/api/reports?type=totalEvents").then((res) => res.json()),
          fetch("/api/reports?type=upcomingEvents").then((res) => res.json()),
          fetch("/api/reports?type=recentUsers").then((res) => res.json()),
        ]);

        setTotalUsers(totalUsersResponse.totalUsers);
        setTotalClubs(totalClubsResponse.totalClubs);
        setTotalEvents(totalEventsResponse.totalEvents);
        setUpcomingEvents(upcomingEventsResponse.upcomingEvents || []);
        setRecentUsers(recentUsersResponse.recentUsers || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-bold">Total Users</h2>
          <p className="text-3xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-bold">Total Clubs</h2>
          <p className="text-3xl">{totalClubs}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-bold">Total Events</h2>
          <p className="text-3xl">{totalEvents}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <ul>
              {upcomingEvents.map((event) => (
                <li key={event.eventId} className="mb-2">
                  <strong>{event.name}</strong>
                  <p>{new Date(event.startDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Recent User Registrations</h2>
          {recentUsers.length > 0 ? (
            <ul>
              {recentUsers.map((user) => (
                <li key={user.userId} className="mb-2">
                  <strong>{user.username}</strong>
                  <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent user registrations</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
