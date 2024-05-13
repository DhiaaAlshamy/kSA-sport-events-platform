import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, params) {
  // console.log(params);
  const { eventId } = params;
  try {
    const items = await prisma.event.findUnique({
      where: {
        eventId: eventId,
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
