// admin/events/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import prisma from "@/app/lib/prisma"; // Ensure the correct import path

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetch("/api/event")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await fetch(`/api/event/${eventId}`, {
        method: "DELETE",
      });
      setEvents(events.filter((event) => event.eventId !== eventId));
    } catch (error) {
      console.error("Failed to delete event:", error);
      setError(error.message);
    }
  };

  const handleSaveEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`/api/event/${updatedEvent.eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      const data = await response.json();
      setEvents(
        events.map((event) => (event.eventId === data.eventId ? data : event))
      );
      setEditingEvent(null);
    } catch (error) {
      console.error("Failed to update event:", error);
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!events.length) return <div>No Events Found</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">Manage Events</h1>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Event Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Start Date</th>
            <th className="py-2 px-4 border">End Date</th>
            <th className="py-2 px-4 border">Location</th>
            <th className="py-2 px-4 border">Media</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.eventId}>
              <td className="py-2 px-4 border">{event.name}</td>
              <td className="py-2 px-4 border">{event.description}</td>
              <td className="py-2 px-4 border">
                {new Date(event.startDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {new Date(event.endDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{event.location}</td>
              <td className="py-2 px-4 border">
                {event.medias.map((media, index) => (
                  <img
                    key={index}
                    src={media.url}
                    alt="Event Media"
                    className="w-16 h-16"
                  />
                ))}
              </td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditEvent(event)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDeleteEvent(event.eventId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onSave={handleSaveEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </div>
  );
};

const EditEventModal = ({ event, onSave, onClose }) => {
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [startDate, setStartDate] = useState(
    event.startDate ? new Date(event.startDate).toISOString().split("T")[0] : ""
  );
  const [endDate, setEndDate] = useState(
    event.endDate ? new Date(event.endDate).toISOString().split("T")[0] : ""
  );
  const [location, setLocation] = useState(event.location);
  const [mediaUrls, setMediaUrls] = useState(
    event.medias.map((media) => media.url)
  );

  const handleSave = () => {
    const updatedEvent = {
      eventId: event.eventId,
      name,
      description,
      startDate,
      endDate,
      location,
      mediaUrls,
    };
    onSave(updatedEvent);
  };

  const handleAddMedia = () => {
    setMediaUrls([...mediaUrls, ""]);
  };

  const handleRemoveMedia = (index) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  const handleMediaChange = (index, value) => {
    const newMediaUrls = [...mediaUrls];
    newMediaUrls[index] = value;
    setMediaUrls(newMediaUrls);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Edit Event</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Description:
          <input
            type="text"
            className="border p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Start Date:
          <input
            type="date"
            className="border p-2 w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          End Date:
          <input
            type="date"
            className="border p-2 w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Location:
          <input
            type="text"
            className="border p-2 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Media:
          {mediaUrls.map((url, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                className="border p-2 w-full"
                value={url}
                onChange={(e) => handleMediaChange(index, e.target.value)}
              />
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                onClick={() => handleRemoveMedia(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleAddMedia}
          >
            Add Media
          </button>
        </label>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEventsPage;
