"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Link from "next/link";
import Image from "next/image";

Modal.setAppElement("#__next");

const EventDetailsPage = ({ params }) => {
  const { eventId } = params;
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
  const [newTicketPrice, setNewTicketPrice] = useState("");
  const [newTicketSeat, setNewTicketSeat] = useState("");
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [editingTicketPrice, setEditingTicketPrice] = useState("");
  const [editingTicketSeat, setEditingTicketSeat] = useState("");

  useEffect(() => {
    fetch(`/api/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEventDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch event details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [eventId]);

  const handleAddTicket = () => {
    fetch(`/api/ticket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: Number(eventId),
        price: parseFloat(newTicketPrice),
        seatNumber: newTicketSeat,
        isAvailable: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEventDetails({
          ...eventDetails,
          Ticket: [...eventDetails.Ticket, data],
        });
        setNewTicketPrice("");
        setNewTicketSeat("");
        setTicketModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Failed to add ticket:", error);
        setError(error.message);
      });
  };

  const handleEditTicket = (ticket) => {
    setEditingTicketId(ticket.ticketId);
    setEditingTicketPrice(ticket.price);
    setEditingTicketSeat(ticket.seatNumber);
    setTicketModalIsOpen(true);
  };

  const handleUpdateTicket = () => {
    fetch(`/api/ticket`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: editingTicketId,
        price: parseFloat(editingTicketPrice),
        seatNumber: editingTicketSeat,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEventDetails({
          ...eventDetails,
          Ticket: eventDetails.Ticket.map((ticket) =>
            ticket.ticketId === editingTicketId ? data : ticket
          ),
        });
        setEditingTicketId(null);
        setEditingTicketPrice("");
        setEditingTicketSeat("");
        setTicketModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Failed to update ticket:", error);
        setError(error.message);
      });
  };

  const handleDeleteTicket = (ticketId) => {
    fetch(`/api/ticket`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId }),
    })
      .then(() => {
        setEventDetails({
          ...eventDetails,
          Ticket: eventDetails.Ticket.filter(
            (ticket) => ticket.ticketId !== ticketId
          ),
        });
      })
      .catch((error) => {
        console.error("Failed to delete ticket:", error);
        setError(error.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!eventDetails) return <div>No Event Found</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">
        {eventDetails.name}
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Image
            src={eventDetails.logoUrl || "/default-event-image.jpg"}
            alt="Event"
            className="rounded-lg shadow-lg"
            width={1000}
            height={1000}
          />
          <p className="text-lg text-gray-700 mt-4">
            {eventDetails.description}
          </p>
          <p className="text-gray-600">
            {new Date(eventDetails.startDate).toLocaleString()} -{" "}
            {new Date(eventDetails.endDate).toLocaleString()}
          </p>
          <p className="text-gray-600">Location: {eventDetails.location}</p>
          {eventDetails.organizer && (
            <p className="text-gray-600">
              Organized by: {eventDetails.organizer.username}
            </p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold">Ticket Information</h2>
          {eventDetails.Ticket &&
            eventDetails.Ticket.map((ticket) => (
              <div key={ticket.ticketId} className="mt-2 p-2 border rounded">
                <p>Price: ${ticket.price.toFixed(2)}</p>
                <p>Seat: {ticket.seatNumber}</p>
                <p>Available: {ticket.isAvailable ? "Yes" : "No"}</p>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mt-2"
                  onClick={() => handleEditTicket(ticket)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mt-2"
                  onClick={() => handleDeleteTicket(ticket.ticketId)}
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setTicketModalIsOpen(true)}
          >
            Add Ticket
          </button>

          <div className="mt-4">
            <h2 className="text-2xl font-bold">Reviews</h2>
            {eventDetails.Review &&
              eventDetails.Review.map((review) => (
                <div key={review.reviewId} className="mt-2 p-2 border rounded">
                  <p>{review.comment}</p>
                  <p>Rating: {review.rating} Stars</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={ticketModalIsOpen}
        onRequestClose={() => setTicketModalIsOpen(false)}
        contentLabel="Manage Ticket"
        className="bg-white rounded-lg p-8 shadow-lg max-w-lg mx-auto my-16"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editingTicketId ? "Edit Ticket" : "Add Ticket"}
        </h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Ticket Price"
          value={editingTicketId ? editingTicketPrice : newTicketPrice}
          onChange={(e) =>
            editingTicketId
              ? setEditingTicketPrice(e.target.value)
              : setNewTicketPrice(e.target.value)
          }
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Seat Number"
          value={editingTicketId ? editingTicketSeat : newTicketSeat}
          onChange={(e) =>
            editingTicketId
              ? setEditingTicketSeat(e.target.value)
              : setNewTicketSeat(e.target.value)
          }
        />
        {editingTicketId ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpdateTicket}
          >
            Update Ticket
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddTicket}
          >
            Add Ticket
          </button>
        )}
      </Modal>
    </div>
  );
};

export default EventDetailsPage;
