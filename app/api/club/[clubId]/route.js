import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const clubId = params.clubId;
  //   console.log(clubId);
  try {
    const items = await prisma.club.findUnique({
      where: {
        clubId: parseInt(clubId),
      },
      include: {
        followers: true,
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
