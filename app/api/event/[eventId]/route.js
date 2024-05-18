import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  // console.log(params);
  const eventId = params.eventId;
  try {
    const items = await prisma.event.findUnique({
      where: {
        eventId: parseInt(eventId),
      },
      include: {
        Review: true,
        organizer: true,
        Ticket: true,
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

export async function PUT(request, { params }) {
  const eventId = parseInt(params.eventId);
  const data = await request.json();

  try {
    const updatedEvent = await prisma.event.update({
      where: { eventId },
      data: {
        name: data.name,
        description: data.description,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        location: data.location,
        medias: {
          deleteMany: {}, // Delete existing media
          create: data.mediaUrls
            .filter((url) => url) // Filter out empty URLs
            .map((url) => ({ url })), // Add new media
        },
      },
      include: {
        medias: true,
      },
    });
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE: Delete an event
export async function DELETE(request, { params }) {
  const eventId = parseInt(params.eventId);

  try {
    await prisma.event.delete({
      where: { eventId },
    });
    return new NextResponse(JSON.stringify({ message: "Event deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
