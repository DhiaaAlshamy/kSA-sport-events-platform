import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const userId = params.userId; // Assume userId is passed as a query parameter

  try {
    // Fetch clubs followed by the user
    const followedClubs = await prisma.user.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        Clubs: true, // Include clubs the user follows
      },
    });

    if (!followedClubs) {
      res.status(404).json({ error: "User not found or follows no clubs" });
      return;
    }

    // Extract club IDs
    const clubIds = followedClubs.Clubs.map((club) => club.clubId);

    // Fetch posts related to followed clubs
    const posts = await prisma.post.findMany({
      where: {
      },
      include: {
        user: true, // Include user details of the post
        comments: true, // Include comments on the post
        medias: true, // Include media associated with the post
      },
    });

    // Fetch events organized by followed clubs
    const events = await prisma.event.findMany({
      where: {
        organizerId: { in: clubIds },
      },
      include: {
        organizer: true, // Include details of the organizer
        Ticket: true, // Include tickets available for the events
      },
    });

    // Respond with combined data
    return new Response(
      JSON.stringify({
        followedClubs: followedClubs.Clubs,
        posts,
        events,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
