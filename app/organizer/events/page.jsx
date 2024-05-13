"use client";
import React, { useEffect, useState } from "react";
import EventCard from "@/app/components/eventCard";
import EventModal from "@/app/components/eventModal"; // Assuming you have a similar modal component for events

const ManageEventsPage = ({ params }) => {
  //   const { userId } = params; // Organizer's userId
  const userId = 1;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/event/1/${userId}`)
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
  }, [userId]);

  const handleCreateEvent = (eventData) => {
    fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents([...events, data]);
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create event:", error);
        setError(error.message);
      });
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setModalIsOpen(true);
  };

  const handleUpdateEvent = (eventData) => {
    fetch(`/api/event/${eventData.eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(
          events.map((event) =>
            event.eventId === eventData.eventId ? data : event
          )
        );
        setEditingEvent(null);
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Failed to update event:", error);
        setError(error.message);
      });
  };

  const handleDeleteEvent = (eventId) => {
    fetch(`/api/event/${eventId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setEvents(events.filter((event) => event.eventId !== eventId));
      })
      .catch((error) => {
        console.error("Failed to delete event:", error);
        setError(error.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!events.length) return <div>No Events Found</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">Manage Events</h1>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => {
          setEditingEvent(null);
          setModalIsOpen(true);
        }}
      >
        Add New Event
      </button>
      {events.map((event) => (
        <EventCard
          key={event.eventId}
          event={event}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      ))}
      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSave={editingEvent ? handleUpdateEvent : handleCreateEvent}
        initialData={editingEvent || undefined}
      />
    </div>
  );
};

export default ManageEventsPage;
