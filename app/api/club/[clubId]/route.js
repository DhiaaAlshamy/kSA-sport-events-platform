import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Ensure the correct import path

// GET: Fetch a single club by ID

export async function GET(request, { params }) {
  const { clubId } = params;

  try {
    const club = await prisma.club.findUnique({
      where: { clubId: parseInt(clubId) },
      include: {
        followers: true,
      },
    });

    if (!club) {
      return new Response(JSON.stringify({ error: "Club not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(club), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PUT: Update a club by ID
export async function PUT(request, { params }) {
  const { clubId } = params;
  const data = await request.json();
  try {
    const updatedData = {
      ...data,
      foundedDate: data.foundedDate ? new Date(data.foundedDate) : null,
    };
    const club = await prisma.club.update({
      where: { clubId: parseInt(clubId) },
      data: updatedData,
    });
    return NextResponse.json(club);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
// DELETE: Delete a club by ID
export async function DELETE(request, { params }) {
  const { clubId } = params;
  try {
    await prisma.club.delete({
      where: { clubId: parseInt(clubId) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
