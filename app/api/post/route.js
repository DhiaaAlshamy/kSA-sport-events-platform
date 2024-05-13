import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const items = await prisma.post.findMany({
      include: {
        medias: true,
        comments: true,
        user: true,
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

export async function POST(request) {
  try {
    const postData = await request.json();
    const { userId, content, mediaUrl } = postData;

    if (!userId || !content) {
      throw new Error("User ID and content are required");
    }

    const newPost = await prisma.post.create({
      data: {
        content: content,
        user: {
          connect: {
            userId: userId,
          },
        },
        medias: {
          create: {
            url: mediaUrl,
            type: "image", // Adjust this based on your media type
          },
        },
      },
    });

    return new Response(JSON.stringify(newPost), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function PUT(request) {
  try {
    const { postId, content, mediaUrls } = await request.json();

    if (!postId || !content) {
      throw new Error("Post ID and content are required");
    }

    const updateData = {
      content,
      medias: {
        deleteMany: {}, // Delete all existing media
        create: mediaUrls.map((url) => ({ url })), // Add new media
      },
    };

    const updatedPost = await prisma.post.update({
      where: { postId: Number(postId) },
      data: updateData,
    });

    return new Response(JSON.stringify(updatedPost), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("PUT error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const { postId } = await request.json();
    if (!postId) {
      throw new Error("Post ID is required");
    }

    await prisma.post.delete({
      where: { postId: Number(postId) },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
