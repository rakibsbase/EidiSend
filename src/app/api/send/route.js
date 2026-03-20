/**
 * @file api/send/route.js
 * @description API endpoints for managing Eidi submissions. Handles fetching recent submissions and creating new ones.
 */

import { connectDB, collections } from "@/lib/connectDB";
import { NextResponse } from "next/server";

/**
 * GET - Fetch recent Eidi submissions for the leaderboard.
 * Returns the most recent 6 submissions.
 */
export async function GET() {
  try {
    const db = await connectDB();
    const submissions = await db
      .collection(collections.sendSalami)
      .find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    return NextResponse.json({ 
      success: true, 
      data: submissions 
    });
  } catch (err) {
    console.error("GET /api/send error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leaderboard data" },
      { status: 500 },
    );
  }
}

/**
 * POST - Create a new Eidi submission.
 * Validates input and persists data to MongoDB.
 * Note: Screenshots are not stored on the server for privacy and cost reasons.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const name = (body.name || "").trim();
    const method = body.method || "";
    const message = (body.message || "").trim();
    const amount = Number(body.amount) || 0;

    // --- Validation ---
    if (!name || !method) {
      return NextResponse.json(
        { success: false, error: "Sender name and payment method are required." },
        { status: 400 },
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Transaction amount must be greater than zero." },
        { status: 400 },
      );
    }

    const doc = {
      name,
      method,
      message,
      amount,
      createdAt: new Date(),
    };

    const db = await connectDB();
    const result = await db.collection(collections.sendSalami).insertOne(doc);

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId 
    });
  } catch (err) {
    console.error("POST /api/send error:", err);
    return NextResponse.json(
      { success: false, error: "Submission failed. Please check your connection and try again." },
      { status: 500 },
    );
  }
}
