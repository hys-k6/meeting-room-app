import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const rooms = await sql`
    SELECT * FROM rooms
  `;

  return NextResponse.json(rooms);
}