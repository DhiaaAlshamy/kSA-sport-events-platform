"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfilePage = () => {
  // const { userId } = params;
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/landing/home");
    } else if (status === "authenticated") {
      fetch(`/api/user/${session.userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setUserData(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          setError("Failed to fetch user data");
          setLoading(false);
        });
    }
  }, [status, session, router]);

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

  if (!userData) {
    return <div className="text-center mt-4">No user data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">
        {userData.username}'s Profile
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Role:</strong> {userData.role}
        </p>
        <h2 className="text-2xl font-bold my-4">Posts</h2>
        {userData.posts.length > 0 ? (
          userData.posts.map((post) => (
            <div key={post.postId} className="mb-4 p-4 border rounded">
              <p>{post.content}</p>
              {post.medias.map((media, index) => (
                <img
                  key={index}
                  src={media.url}
                  alt="Media"
                  className="w-full h-auto mt-2 rounded"
                />
              ))}
              <div className="mt-2">
                <strong>Comments:</strong>
                {post.comments.map((comment) => (
                  <p key={comment.commentId}>{comment.content}</p>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
        <h2 className="text-2xl font-bold my-4">Organized Events</h2>
        {userData.organizedEvents.length > 0 ? (
          userData.organizedEvents.map((event) => (
            <div key={event.eventId} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-bold">{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(event.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(event.endDate).toLocaleDateString()}
              </p>
              <h4 className="font-bold">Reviews:</h4>
              {event.Review.length > 0 ? (
                event.Review.map((review) => (
                  <p key={review.reviewId}>
                    {review.comment} - {review.rating} stars
                  </p>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          ))
        ) : (
          <p>No organized events available</p>
        )}
        <h2 className="text-2xl font-bold my-4">Tickets</h2>
        {userData.Tickets.length > 0 ? (
          userData.Tickets.map((ticket) => (
            <div key={ticket.ticketId} className="mb-4 p-4 border rounded">
              <p>
                <strong>Event:</strong> {ticket.event.name}
              </p>
              <p>
                <strong>Price:</strong> ${ticket.price}
              </p>
              <p>
                <strong>Seat Number:</strong> {ticket.seatNumber}
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                {ticket.isAvailable ? "Available" : "Not Available"}
              </p>
            </div>
          ))
        ) : (
          <p>No tickets available</p>
        )}
        <h2 className="text-2xl font-bold my-4">Reviews</h2>
        {userData.reviews.length > 0 ? (
          userData.reviews.map((review) => (
            <div key={review.reviewId} className="mb-4 p-4 border rounded">
              <p>
                <strong>Event:</strong> {review.event.name}
              </p>
              <p>
                {review.comment} - {review.rating} stars
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
