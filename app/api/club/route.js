import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Ensure the correct import path

// GET: Fetch all clubs
export async function GET() {
  try {
    const clubs = await prisma.club.findMany();
    return NextResponse.json(clubs);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}


// POST: Create a new club
export async function POST(request) {
  const data = await request.json();
  try {
    const newData = {
      ...data,
      foundedDate: data.foundedDate ? new Date(data.foundedDate) : null,
    };
    const club = await prisma.club.create({
      data: newData,
    });
    return NextResponse.json(club, { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
