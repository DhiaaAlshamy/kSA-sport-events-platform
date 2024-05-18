"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const NotificationsPage = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.userId) {
      fetch(`/api/notifications/${session.userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          if (data.error) {
            setError(data.error);
          } else {
            const combinedNotifications = [
              ...data.posts.map((post) => ({
                type: "post",
                clubName: data.followedClubs.find(
                  (club) => club.clubId === post.user.clubClubId
                )?.name,
                clubLogo: data.followedClubs.find(
                  (club) => club.clubId === post.user.clubClubId
                )?.logoUrl,
                content: post.content,
                timestamp: post.timestamp,
                user: post.user.username,
                comments: post.comments,
                medias: post.medias,
              })),
              ...data.events.map((event) => ({
                type: "event",
                name: event.name,
                description: event.description,
                startDate: event.startDate,
                endDate: event.endDate,
                location: event.location,
                organizer: event.organizer.username,
              })),
            ];
            setNotifications(combinedNotifications);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch notifications:", error);
          setError("Failed to fetch notifications");
          setLoading(false);
        });
    }
  }, [session]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!notifications.length) return <div>No Notifications Found</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            {notification.type === "post" && (
              <>
                <div className="flex items-center">
                  {notification.clubLogo ? (
                    <Image
                      src={notification.clubLogo}
                      alt="Club Logo"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-300 flex items-center justify-center rounded-full">
                      <span className="text-sm text-gray-600">No Image</span>
                    </div>
                  )}
                  <h2 className="ml-4 text-xl font-bold text-gray-800">
                    {notification.clubName}
                  </h2>
                </div>
                <p className="mt-4 text-gray-700">{notification.content}</p>
                <p className="text-sm text-gray-600">
                  Posted by: {notification.user} on{" "}
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
                {notification.medias.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {notification.medias.map((media, index) => (
                      <Image
                        key={index}
                        src={media.url}
                        alt="Media"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    ))}
                  </div>
                )}
                {notification.comments.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Comments</h3>
                    {notification.comments.map((comment, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-2 rounded-lg mt-2"
                      >
                        <p>{comment.content}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {notification.type === "event" && (
              <>
                <h2 className="text-xl font-bold text-gray-800">
                  {notification.name}
                </h2>
                <p className="mt-4 text-gray-700">{notification.description}</p>
                <p className="text-sm text-gray-600">
                  {new Date(notification.startDate).toLocaleString()} -{" "}
                  {new Date(notification.endDate).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Location: {notification.location}
                </p>
                <p className="text-sm text-gray-600">
                  Organized by: {notification.organizer}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
