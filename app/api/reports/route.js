// api/reports/route.js

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Ensure the correct import path

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    switch (type) {
      case "totalUsers":
        const totalUsers = await prisma.user.count();
        return NextResponse.json({ totalUsers });

      case "totalClubs":
        const totalClubs = await prisma.club.count();
        return NextResponse.json({ totalClubs });

      case "totalEvents":
        const totalEvents = await prisma.event.count();
        return NextResponse.json({ totalEvents });

      case "upcomingEvents":
        const upcomingEvents = await prisma.event.findMany({
          where: {
            startDate: {
              gte: new Date(),
            },
          },
          orderBy: {
            startDate: "asc",
          },
          take: 5,
        });
        return NextResponse.json({ upcomingEvents });

      case "recentUsers":
        const recentUsers = await prisma.user.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        });
        return NextResponse.json({ recentUsers });

      default:
        return NextResponse.json(
          { error: "Invalid report type" },
          { status: 400 }
        );
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
