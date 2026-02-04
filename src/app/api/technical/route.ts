import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  try {
    const technicalSkills = await db.technical.findMany({
      orderBy: { proficiency: "desc" },
    });
    return NextResponse.json(technicalSkills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch technical skills" },
      { status: 500 },
    );
  }
}
