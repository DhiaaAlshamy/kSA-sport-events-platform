import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request, { params }) {
  const { clubId } = params;
  const { userId } = await request.json();

  try {
    const club = await prisma.club.update({
      where: { clubId: parseInt(clubId) },
      data: {
        followers: {
          disconnect: { userId: parseInt(userId) },
        },
      },
    });

    return new Response(JSON.stringify(club), {
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
