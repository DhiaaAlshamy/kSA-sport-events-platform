import React from "react";
import Link from "next/link";

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="mb-4 p-4 border rounded">
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p>{event.description}</p>
      <p>
        {new Date(event.startDate).toLocaleString()} -{" "}
        {new Date(event.endDate).toLocaleString()}
      </p>
      <p>Location: {event.location}</p>
      <p>Tickets: {event._count.Ticket}</p>
      <p>Reviews: {event._count.Review}</p>
      <div className="flex space-x-2 mt-2">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => onEdit(event)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => onDelete(event.eventId)}
        >
          Delete
        </button>
        <Link
          href={`/organizer/events/${event.eventId}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
