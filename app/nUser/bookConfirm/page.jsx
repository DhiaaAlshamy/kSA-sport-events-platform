"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ticketId) {
      fetch(`/api/ticket/${ticketId}`)
        .then((response) => response.json())
        .then((data) => {
          setTicket(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch ticket details:", error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [ticketId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!ticket) return <div>No Ticket Found</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-center my-4">
        Booking Confirmation
      </h1>
      <div className="mt-4 p-4 border rounded">
        <p>Seat Number: {ticket.seatNumber}</p>
        <p>Price: ${ticket.price.toFixed(2)}</p>
        <p>Attendee: {ticket.booked_for.username}</p>
        <p>Email: {ticket.booked_for.email}</p>
      </div>
      <div className="text-center mt-4">
        <Link
          href="/nUser/events/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
