"use client";
import React, { useEffect, useState } from "react";
import PostModal from "@/app/components/postModal";
import Link from "next/link";

const ManagePostsPage = ({ params }) => {
  // const { userId } = params; // Organizer's userId
  const userId = 1; // Organizer's userId

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetch(`/api/post/1/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [userId]);

  const handleCreatePost = (postData) => {
    fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: Number(userId),
        content: postData.content,
        mediaUrls: postData.mediaItems.map((media) => media.url),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create post:", error);
        setError(error.message);
      });
  };

  const handleEditPost = (post) => {
    setEditingPost({
      postId: post.postId,
      content: post.content,
      mediaItems: post.medias,
    });
    setModalIsOpen(true);
  };

  const handleUpdatePost = (postData) => {
    fetch("/api/post", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: postData.postId,
        content: postData.content,
        mediaUrls: postData.mediaItems.map((media) => media.url),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(
          posts.map((post) => (post.postId === postData.postId ? data : post))
        );
        setEditingPost(null);
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Failed to update post:", error);
        setError(error.message);
      });
  };

  const handleDeletePost = (postId) => {
    fetch("/api/post", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    })
      .then(() => {
        setPosts(posts.filter((post) => post.postId !== postId));
      })
      .catch((error) => {
        console.error("Failed to delete post:", error);
        setError(error.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!posts.length) return <div>No Posts Found</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">Manage Posts</h1>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setModalIsOpen(true)}
      >
        Add New Post
      </button>
      {posts.map((post) => (
        <div key={post.postId} className="mb-4 p-4 border rounded">
          <p>{post.content}</p>
          {post.medias.map((media, index) => (
            <img
              key={index}
              src={media.url}
              alt="Media"
              className="w-42 h-auto mt-2 rounded"
            />
          ))}
          <div className="flex space-x-2 mt-2">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleEditPost(post)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDeletePost(post.postId)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <PostModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSave={editingPost ? handleUpdatePost : handleCreatePost}
        initialContent={editingPost ? editingPost.content : ""}
        initialMedia={editingPost ? editingPost.mediaItems : []}
        postId={editingPost ? editingPost.postId : null}
      />
    </div>
  );
};

export default ManagePostsPage;
