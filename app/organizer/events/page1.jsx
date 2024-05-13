"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import EventFormModal from "@/app/components/eventModal"; // Import the modal component

const EventListingPage = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/event")
      .then((response) => response.json())
      .then(setEvents)
      .catch((error) => setError(error.message));
  }, []);

  const handleAddEvent = () => {
    setSelectedEvent(null); // Clear any selected event for the form
    setModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event); // Set the selected event for the form
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveEvent = (eventData) => {
    const method = selectedEvent ? "PUT" : "POST";
    const url = selectedEvent
      ? `/api/event/${selectedEvent.eventId}`
      : "/api/event";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return response.json();
      })
      .then(() => {
        setModalOpen(false);
        setError(null); // Clear any previous error
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Managed Events</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleAddEvent}
        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-4"
      >
        Add New Event
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.eventId} className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-xl">{event.name}</h2>
            <p>
              {new Date(event.startDate).toLocaleDateString()} -{" "}
              {new Date(event.endDate).toLocaleDateString()}
            </p>
            <p className="truncate">{event.description}</p>
            <div className="flex justify-between items-center mt-4">
              <Link
                href={`/organizer/events/${event.eventId}`}
                className="text-blue-500 hover:underline"
              >
                Details
              </Link>
              <button
                onClick={() => handleEditEvent(event)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <EventFormModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          event={selectedEvent}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default EventListingPage;
