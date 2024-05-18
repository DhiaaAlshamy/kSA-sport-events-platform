"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const EventDetailsPage = ({ params }) => {
  const { eventId } = params;
  const { data: session, status } = useSession();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setEventDetails(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch event details:", error);
        setError("Failed to fetch event details");
        setLoading(false);
      });
  }, [eventId]);

  const handleBookTicket = () => {
    fetch("/api/ticket/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: selectedTicketId,
        userId: session.userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push(`/nUser/bookConfirm/?ticketId=${data.ticketId}`);
      })
      .catch((error) => {
        console.error("Failed to book ticket:", error);
        setError("Failed to book ticket");
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
            {eventDetails.description || "No description available."}
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
                {ticket.isAvailable && (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => setSelectedTicketId(ticket.ticketId)}
                  >
                    Select Ticket
                  </button>
                )}
              </div>
            ))}
          {selectedTicketId && (
            <button
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleBookTicket}
            >
              Book Now
            </button>
          )}
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
    </div>
  );
};

export default EventDetailsPage;
