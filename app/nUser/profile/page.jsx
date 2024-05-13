"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/user/1`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
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
          <p>Role: {userInfo.role}</p>
          <Link
            href="/edit-profile"
            className="text-blue-500 hover:text-blue-600"
          >
            Edit Profile
          </Link>
        </div>
        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
          <h2 className="text-xl font-bold">Your Activities</h2>
          <section>
            <h3 className="text-lg font-semibold mt-2">Posts</h3>
            <ul>
              {userInfo.posts.map((post) => (
                <li key={post.postId} className="mt-1">
                  {post.content} - {new Date(post.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4">Comments</h3>
            <ul>
              {userInfo.comments.map((comment) => (
                <li key={comment.commentId} className="mt-1">
                  {comment.content} -{" "}
                  {new Date(comment.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4">Reviews</h3>
            <ul>
              {userInfo.reviews.map((review) => (
                <li key={review.reviewId} className="mt-1">
                  {review.comment} - Rated: {review.rating} stars
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4">Organized Events</h3>
            <ul>
              {userInfo.organizedEvents.map((event) => (
                <li key={event.eventId} className="mt-1">
                  {event.name} -{" "}
                  {new Date(event.startDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </section>
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
