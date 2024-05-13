import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, params) {
  console.log(params);
  const { userId } = params;
  console.log(userId);
  try {
    const items = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        posts: true,
        comments: true,
        reviews: true,
        organizedEvents: true,
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
