"use client";
import React, { useEffect, useState } from "react";

const AttendeesPage = ({ params }) => {
  //   const eventId = params.eventId;
  const eventId = 1;
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventId) {
      fetch(`/api/attendance/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setEvent(data.event);
          setAttendees(data.attendees);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch attendees:", error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No Event Found</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">{event.name}</h1>
      <h2 className="text-xl font-semibold mb-4">
        Attendees and Ticket Information
      </h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Seat Number</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Attendee</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((ticket) => (
            <tr key={ticket.ticketId}>
              <td className="border px-4 py-2">{ticket.seatNumber}</td>
              <td className="border px-4 py-2">${ticket.price.toFixed(2)}</td>
              <td className="border px-4 py-2">{ticket.booked_for.username}</td>
              <td className="border px-4 py-2">{ticket.booked_for.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeesPage;
