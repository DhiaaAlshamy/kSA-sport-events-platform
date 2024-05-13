import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { userId } = params;
    if (!userId) {
      throw new Error("User ID is required");
    }

    const posts = await prisma.post.findMany({
      where: { userId: parseInt(userId) },
      include: {
        comments: true,
        medias: true,
      },
    });

    return new Response(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("GET error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
