import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await sql`
    INSERT INTO reservations
      (room_name, grade, equipment, use_date, start_hour, end_hour, people, total_price)
    VALUES
      (${body.roomName}, ${body.grade}, ${body.equipment}, ${body.date}, ${body.startHour}, ${body.endHour}, ${body.people}, ${body.totalPrice})
    RETURNING *
  `;

  return NextResponse.json(result[0]);
}

export async function GET() {
  const reservations = await sql`
    SELECT *
    FROM reservations
    ORDER BY created_at DESC
  `;

  return NextResponse.json(reservations);
}