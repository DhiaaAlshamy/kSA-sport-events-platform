
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const items = await prisma.review.findMany();
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
    const itemData = await request.json();
    const item = await prisma.review.create({
      data: itemData,
    });
    return new Response(JSON.stringify(item), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const item = await prisma.review.update({
      where: { id },
      data,
    });
    return new Response(JSON.stringify(item), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.review.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
