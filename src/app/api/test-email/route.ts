import { NextRequest, NextResponse } from "next/server";
import { sendEmailWelcome } from "@/features/auth/emails/send-email-welcome";

export async function POST(request: NextRequest) {
  try {
    const { username, email } = await request.json();

    if (!username || !email) {
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 }
      );
    }

    const result = await sendEmailWelcome(username, email);

    return NextResponse.json(
      {
        success: true,
        message: "Test email sent successfully",
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email test error:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
