"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const EventListingPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Example fetch call - replace with your actual API endpoint
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold text-center my-4">
        Upcoming Sports Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.event_id}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500">
              {new Date(event.start_date).toLocaleDateString()} to{" "}
              {new Date(event.end_date).toLocaleDateString()}
            </p>
            <Link
              href={`/events/${event.event_id}`}
              className="text-blue-500 hover:text-blue-600"
            >
              Learn more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListingPage;
