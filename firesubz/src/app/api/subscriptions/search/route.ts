import { db } from "@/server/db";
import { subscriptions } from "@/server/db/schema";
import { eq, ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("q");
    if (!searchTerm) {
      return NextResponse.json({ subscriptions: [] }, { status: 400 });
    }
    const filteredSubscriptions = await db.query.subscriptions.findMany({
      where: ilike(subscriptions.name, `%${searchTerm}%`), // Search by subscription name (case-insensitive)
      // You can add more conditions here to search in other fields like category:
      // where: or(ilike(subscriptions.name, `%${searchTerm}%`), ilike(subscriptions.category, `%${searchTerm}%`)),
    });

    return NextResponse.json({ subscriptions: filteredSubscriptions });
  } catch (error) {
    console.error("Error searching subscriptions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}