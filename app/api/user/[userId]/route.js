import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const userId = params.userId; // Correctly destructured assuming params has a userId key

  try {
    const items = await prisma.user.findUnique({
      where: {
        userId: parseInt(userId), // Make sure userId is an integer if your database expects an integer
      },
      include: {
        posts: true,
        comments: true,
        reviews: true,
        organizedEvents: true,
        Clubs: true,
        Tickets: true,
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
