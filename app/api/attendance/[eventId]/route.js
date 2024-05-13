import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const eventId = params.eventId;

  try {
    const event = await prisma.event.findUnique({
      where: { eventId: parseInt(eventId) },
      include: {
        Ticket: {
          include: {
            booked_for: true,
          },
        },
      },
    });

    if (!event) {
      return new Response(JSON.stringify({ error: "Event not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    const attendees = event.Ticket.filter(
      (ticket) => ticket.booked_for !== null
    );

    return new Response(JSON.stringify({ event, attendees }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
