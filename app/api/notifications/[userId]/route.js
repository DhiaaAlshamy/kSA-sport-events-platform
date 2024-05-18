import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const userId = parseInt(params.userId, 10);

  try {
    // Get the clubs followed by the user
    const followedClubs = await prisma.user.findUnique({
      where: { userId },
      select: {
        Clubs: {
          select: {
            clubId: true,
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    if (!followedClubs) {
      return new Response(
        JSON.stringify({ followedClubs: [], posts: [], events: [] }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Get the posts related to the clubs that the user follows
    const posts = await prisma.post.findMany({
      where: {
        user: {
          clubClubId: {
            in: followedClubs.Clubs.map((club) => club.clubId),
          },
        },
      },
      include: {
        user: true,
        comments: true,
        medias: true,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    // Get the events related to the clubs that the user follows
    const events = await prisma.event.findMany({
      where: {
        organizerId: {
          in: followedClubs.Clubs.map((club) => club.clubId),
        },
      },
      include: {
        organizer: true,
      },
    });

    return new Response(
      JSON.stringify({ followedClubs: followedClubs.Clubs, posts, events }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}


