import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const userId = params.userId;
  try {
    const items = await prisma.event.findMany({
      where: {
        organizerId: parseInt(userId),
      },
      include: {
        organizer: true,
        medias: true,
        _count: {
          select: {
            Ticket: true,
            Review: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(items), {
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
