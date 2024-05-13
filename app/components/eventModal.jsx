import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const EventModal = ({
  isOpen,
  onRequestClose,
  onSave,
  initialData = {}, // Default to an empty object
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [startDate, setStartDate] = useState(initialData.startDate || "");
  const [endDate, setEndDate] = useState(initialData.endDate || "");
  const [location, setLocation] = useState(initialData.location || "");

  useEffect(() => {
    // Update state only if initialData is not null
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setStartDate(initialData.startDate || "");
      setEndDate(initialData.endDate || "");
      setLocation(initialData.location || "");
    }
  }, [initialData]);

  const handleSave = () => {
    onSave({
      eventId: initialData.eventId, // Preserve the eventId if it exists
      name,
      description,
      startDate,
      endDate,
      location,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={initialData?.eventId ? "Edit Event" : "Add New Event"}
      className="bg-white rounded-lg p-8 shadow-lg max-w-lg mx-auto my-16"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">
        {initialData?.eventId ? "Edit Event" : "Add New Event"}
      </h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="datetime-local"
        className="w-full p-2 border rounded mb-4"
        placeholder="Start Date"
        value={startDate ? new Date(startDate).toISOString().slice(0, 16) : ""}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="datetime-local"
        className="w-full p-2 border rounded mb-4"
        placeholder="End Date"
        value={endDate ? new Date(endDate).toISOString().slice(0, 16) : ""}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        {initialData?.eventId ? "Save Changes" : "Add Event"}
      </button>
    </Modal>
  );
};

export default EventModal;
