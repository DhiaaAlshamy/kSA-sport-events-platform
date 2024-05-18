// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Ensure the correct import path
import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   const userId = params.userId; // Correctly destructured assuming params has a userId key

//   try {
//     const items = await prisma.user.findUnique({
//       where: {
//         userId: parseInt(userId), // Make sure userId is an integer if your database expects an integer
//       },
//       include: {
//         posts: true,
//         comments: true,
//         reviews: true,
//         organizedEvents: true,
//         Clubs: true,
//         Tickets: true,
//       },
//     });

//     return new Response(JSON.stringify(items), {
//       headers: { "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }

// GET: Fetch a single user by ID

export async function GET(request, { params }) {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        posts: {
          include: {
            comments: true,
            medias: true,
          },
        },
        comments: true,
        organizedEvents: {
          include: {
            Review: true,
            Ticket: true,
            medias: true,
          },
        },
        Tickets: {
          include: {
            event: true,
          },
        },
        reviews: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
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

// PUT: Update a user by ID
export async function PUT(request, { params }) {
  const { userId } = params;
  const data = await request.json();
  try {
    const user = await prisma.user.update({
      where: { userId: parseInt(userId) },
      data,
    });
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE: Delete a user by ID
export async function DELETE(request, { params }) {
  const { userId } = params;
  try {
    await prisma.user.delete({
      where: { user_id: parseInt(userId) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
