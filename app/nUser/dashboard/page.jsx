"use client";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch events
    fetch("/api/events/upcoming") // Adjust API endpoint as needed
      .then((response) => response.json())
      .then((data) => setEvents(data));

    // Fetch recommended clubs
    fetch("/api/clubs/recommended") // Adjust API endpoint as needed
      .then((response) => response.json())
      .then((data) => setClubs(data));

    // Fetch notifications
    fetch("/api/notifications") // Adjust API endpoint as needed
      .then((response) => response.json())
      .then((data) => setNotifications(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">
        Welcome to Your Sports Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Upcoming Events */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                {event.name} - {new Date(event.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Clubs */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Recommended Clubs</h2>
          <ul>
            {clubs.map((club) => (
              <li key={club.id}>{club.name}</li>
            ))}
          </ul>
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
