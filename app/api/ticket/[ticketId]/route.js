import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const ticketId = params.ticketId;
  try {
    const items = await prisma.ticket.findUnique({
      where: {
        ticketId: parseInt(ticketId),
      },
      include: {
        booked_for: true,
      },
    });
    return new Response(JSON.stringify(items), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const { ticketId, userId } = await request.json();

    // Update the ticket to associate it with the user
    const updatedTicket = await prisma.ticket.update({
      where: { ticketId: parseInt(ticketId) },
      data: {
        booked_for: {
          connect: { userId: parseInt(userId) },
        },
        isAvailable: false,
      },
    });

    return new Response(JSON.stringify(updatedTicket), {
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
