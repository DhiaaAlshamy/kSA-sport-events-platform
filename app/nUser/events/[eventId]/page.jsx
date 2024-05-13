"use client";
// use client
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const EventDetailsPage = ({ params }) => {
  const { eventId } = params;
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch event details from API, ensure your API is set to join necessary tables
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
              </div>
            ))}
          <Link
            href={`/book/${eventId}`}
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Book Now
          </Link>
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
