"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const NotificationsPage = () => {
  const [data, setData] = useState({ posts: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = 1; // This should be replaced with the actual logged-in user's ID
    fetch(`/api/notifications/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Notifications
      </h1>
      <div className="divide-y divide-gray-300">
        <section>
          <h2 className="text-2xl font-bold mt-4">Latest Posts</h2>
          {data.posts.length ? (
            data.posts.map((post) => (
              <div key={post.postId} className="p-4">
                <h3 className="text-xl font-semibold">
                  {post.user.username}: {post.content}
                </h3>
                {post.medias.length > 0 && (
                  <img
                    src={post.medias[0].url}
                    alt="Media content"
                    className="max-w-full h-auto"
                  />
                )}
                <p className="text-gray-600">
                  Posted on {new Date(post.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No new posts from your clubs.</p>
          )}
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-4">Upcoming Events</h2>
          {data.events.length ? (
            data.events.map((event) => (
              <div key={event.eventId} className="p-4">
                <h3 className="text-xl font-semibold">{event.name}</h3>
                <p>{event.description}</p>
                <p className="text-gray-600">
                  Event Date: {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No upcoming events from your clubs.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default NotificationsPage;
