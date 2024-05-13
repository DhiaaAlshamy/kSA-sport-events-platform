import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const PostModal = ({
  isOpen,
  onRequestClose,
  onSave,
  initialContent = "",
  initialMedia = [],
  postId = null,
}) => {
  const [content, setContent] = useState(initialContent);
  const [mediaItems, setMediaItems] = useState(initialMedia);
  const [newMediaUrl, setNewMediaUrl] = useState("");

  // Set content and mediaItems whenever initialContent or initialMedia changes
  useEffect(() => {
    setContent(initialContent);
    setMediaItems(initialMedia);
  }, [initialContent, initialMedia]);

  const handleAddMedia = () => {
    setMediaItems([...mediaItems, { url: newMediaUrl }]);
    setNewMediaUrl("");
  };

  const handleRemoveMedia = (url) => {
    setMediaItems(mediaItems.filter((media) => media.url !== url));
  };

  const handleSave = () => {
    onSave({ content, mediaItems, postId });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={postId ? "Edit Post" : "Add New Post"}
      className="bg-white rounded-lg p-8 shadow-lg max-w-lg mx-auto my-16"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">
        {postId ? "Edit Post" : "Add New Post"}
      </h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Post content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      {mediaItems.map((media, index) => (
        <div key={index} className="flex items-center">
          <img src={media.url} alt="Media" className="w-16 h-16 mr-2 rounded" />
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleRemoveMedia(media.url)}
          >
            Remove
          </button>
        </div>
      ))}
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Media URL"
        value={newMediaUrl}
        onChange={(e) => setNewMediaUrl(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleAddMedia}
      >
        Add Media
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        {postId ? "Save Changes" : "Add Post"}
      </button>
    </Modal>
  );
};

export default PostModal;
