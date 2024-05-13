import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  // console.log(params);
  const eventId = params.eventId;
  try {
    const items = await prisma.event.findUnique({
      where: {
        eventId: parseInt(eventId),
      },
      include: {
        Review: true,
        organizer: true,
        Ticket: true,
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

export async function PUT(request, { params }) {
  try {
    const id = params.eventId;
    const { ...data } = await request.json();
    const item = await prisma.event.update({
      where: { eventId: parseInt(id) },
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
    return new Response(JSON.stringify(item), {
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
