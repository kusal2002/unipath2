import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Inquiry from "@/models/Inquiry";

// GET /api/inquiries - Fetch all inquiries sorted by latest first
export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(inquiries, { status: 200 });
  } catch (error) {
    console.error("GET /api/inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

// POST /api/inquiries - Create a new inquiry
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, country, level, message } = body;

    // Basic validation
    if (!name || !email || !phone || !country || !level || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const inquiry = await Inquiry.create({ name, email, phone, country, level, message });
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}
