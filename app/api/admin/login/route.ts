import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !verifyAdminCredentials(username, password)
    ) {
      return NextResponse.json(
        { message: "Invalid username or password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ message: "Logged in." });

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: createAdminSession(username),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to log in right now.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
