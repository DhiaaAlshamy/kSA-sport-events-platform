import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(Request, params) {
  //   const { postId } = params;
  console.log(params);
  try {
    const items = await prisma.post.findUnique({
      where: {
        postId: params.postId,
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
